import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  X,
  User,
  Mail,
  CalendarDays,
  ShoppingBag,
  DollarSign,
  ChevronDown,
  ArrowUpDown,
  Users as UsersIcon,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRound,
  ReceiptText,
  CircleDollarSign,
} from "lucide-react";

import { API_BASE_URL } from "../../config";

const USERS_API_URL = `${API_BASE_URL}/api/users`;
const ORDERS_API_URL = `${API_BASE_URL}/api/orders`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [selectedUser, setSelectedUser] = useState(null);

  const roleOptions = ["All", "Customer", "Admin"];

  /* =========================================================
     AUTH
  ========================================================= */

  const getToken = () => {
    return localStorage.getItem("acvplus-token");
  };

  const getHeaders = () => {
    const token = getToken();

    return {
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  };

  /* =========================================================
     HELPERS
  ========================================================= */

  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleLabel = (role) => {
    return role === "admin" ? "Admin" : "Customer";
  };

  const getRoleClasses = (role) => {
    if (role === "admin") {
      return "border border-violet-100 bg-violet-50 text-violet-700";
    }

    return "border border-[#C5D7FF] bg-[#F1F6FF] text-[#183A7A]";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatMoney = (amount) => {
    const number = Number(amount);

    if (!Number.isFinite(number)) {
      return "$0.00";
    }

    return `$${number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getOrderUserId = (order) => {
    if (!order?.user) return null;

    if (typeof order.user === "string") {
      return order.user;
    }

    return order.user._id || order.user.id || null;
  };

  const getOrderTotal = (order) => {
    const value = order?.total ?? order?.totalAmount ?? order?.grandTotal ?? 0;

    const number = Number(value);

    return Number.isFinite(number) ? number : 0;
  };

  /* =========================================================
     FETCH USERS + ORDERS
  ========================================================= */

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [usersResponse, ordersResponse] = await Promise.all([
        fetch(USERS_API_URL, {
          headers: getHeaders(),
        }),

        fetch(ORDERS_API_URL, {
          headers: getHeaders(),
        }),
      ]);

      let usersData = {};
      let ordersData = {};

      try {
        usersData = await usersResponse.json();
      } catch {
        usersData = {};
      }

      try {
        ordersData = await ordersResponse.json();
      } catch {
        ordersData = {};
      }

      if (!usersResponse.ok) {
        throw new Error(usersData?.message || "Failed to fetch users.");
      }

      if (!ordersResponse.ok) {
        throw new Error(ordersData?.message || "Failed to fetch orders.");
      }

      const usersList = Array.isArray(usersData)
        ? usersData
        : Array.isArray(usersData?.users)
          ? usersData.users
          : [];

      const ordersList = Array.isArray(ordersData)
        ? ordersData
        : Array.isArray(ordersData?.orders)
          ? ordersData.orders
          : [];

      setUsers(usersList);
      setOrders(ordersList);
    } catch (error) {
      console.error("Fetch Users Error:", error);

      setErrorMessage(error?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================================================
     USER ORDER STATS
  ========================================================= */

  const getUserStats = (userId) => {
    const userOrders = orders.filter((order) => {
      return String(getOrderUserId(order)) === String(userId);
    });

    const spent = userOrders
      .filter((order) => order.status !== "Cancelled")
      .reduce((sum, order) => {
        return sum + getOrderTotal(order);
      }, 0);

    return {
      orderCount: userOrders.length,
      spent,
    };
  };

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredUsers = useMemo(() => {
    let result = users.map((user) => ({
      ...user,
      ...getUserStats(user._id || user.id),
    }));

    if (searchTerm.trim()) {
      const search = searchTerm.trim().toLowerCase();

      result = result.filter((user) => {
        const name = user?.name?.toLowerCase() || "";
        const email = user?.email?.toLowerCase() || "";

        return name.includes(search) || email.includes(search);
      });
    }

    if (roleFilter !== "All") {
      const targetRole = roleFilter === "Admin" ? "admin" : "user";

      result = result.filter((user) => user.role === targetRole);
    }

    if (sortBy === "Highest Spent") {
      result.sort((a, b) => b.spent - a.spent);
    }

    if (sortBy === "Most Orders") {
      result.sort((a, b) => b.orderCount - a.orderCount);
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    if (sortBy === "Newest") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [users, orders, searchTerm, roleFilter, sortBy]);

  /* =========================================================
     STATS
  ========================================================= */

  const totalUsers = users.length;

  const totalCustomers = users.filter((user) => user.role !== "admin").length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const totalCustomerSpend = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => {
      return sum + getOrderTotal(order);
    }, 0);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("All");
    setSortBy("Newest");
  };

  const hasFilters = searchTerm || roleFilter !== "All" || sortBy !== "Newest";

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="min-h-screen bg-[#F1F6FF] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* =====================================================
            HERO
        ===================================================== */}

        <div className="relative overflow-hidden rounded-[26px] bg-[#172D57] px-5 py-6 text-white shadow-[0_18px_50px_rgba(16,40,93,0.12)] sm:px-7 sm:py-7 lg:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-[280px] w-[280px] rounded-full bg-[#3569C8]/15"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-[24%] h-[190px] w-[190px] rounded-full bg-[#AFC8FF]/[0.06]"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                <ShieldCheck size={13} />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C5D7FF]">
                  ACV Plus Admin
                </span>
              </div>

              <h1 className="mt-4 text-[30px] font-bold tracking-[-0.035em] sm:text-[34px]">
                Customers & Users
              </h1>

              <p className="mt-2 max-w-[600px] text-[12px] leading-6 text-white/60 sm:text-[13px]">
                Review registered customer accounts and their real order
                activity in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5">
                <UsersIcon size={15} className="text-[#AFC8FF]" />

                <span className="text-[11px] font-bold text-white">
                  {totalUsers}
                </span>

                <span className="text-[10px] font-semibold text-white/55">
                  Total Users
                </span>
              </div>

              <button
                type="button"
                onClick={fetchData}
                disabled={loading}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#AFC8FF] px-5 text-[11px] font-bold text-[#172D57] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {errorMessage && (
          <div className="flex items-center justify-between gap-4 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-[11px] font-semibold text-red-600">
            <span>{errorMessage}</span>

            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-red-100"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            description="Registered accounts"
            icon={UsersIcon}
            iconClass="bg-[#E8F1FF] text-[#183A7A]"
          />

          <StatCard
            title="Customers"
            value={totalCustomers}
            description="Store customers"
            icon={UserRound}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Admins"
            value={totalAdmins}
            description="Admin accounts"
            icon={ShieldCheck}
            iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
            title="Customer Spend"
            value={formatMoney(totalCustomerSpend)}
            description="Across non-cancelled orders"
            icon={CircleDollarSign}
            iconClass="bg-emerald-50 text-emerald-600"
            compact
          />
        </div>

        {/* =====================================================
            SEARCH / FILTERS
        ===================================================== */}

        <div className="rounded-[22px] border border-[#D6E2F7] bg-white p-4 shadow-[0_8px_28px_rgba(16,40,93,0.035)] sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-[500px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search customer name or email..."
                className="h-[46px] w-full rounded-full border border-[#D6E2F7] bg-[#F8FAFF] pl-11 pr-5 text-[12px] font-medium text-[#263B63] outline-none transition placeholder:text-[#263B63]/30 focus:border-[#AFC8FF] focus:bg-white focus:ring-4 focus:ring-[#AFC8FF]/10"
              />
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              {/* ROLE FILTER */}

              <div className="relative">
                <SlidersHorizontal
                  size={14}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                />

                <select
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  className="h-[46px] w-full min-w-[155px] appearance-none rounded-full border border-[#D6E2F7] bg-white pl-10 pr-10 text-[10px] font-bold text-[#263B63] outline-none transition hover:border-[#AFC8FF] focus:border-[#AFC8FF] sm:w-auto"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role === "All" ? "All Roles" : role}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#263B63]/40"
                />
              </div>

              {/* SORT */}

              <div className="relative">
                <ArrowUpDown
                  size={14}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                />

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-[46px] w-full min-w-[180px] appearance-none rounded-full border border-[#D6E2F7] bg-white pl-10 pr-10 text-[10px] font-bold text-[#263B63] outline-none transition hover:border-[#AFC8FF] focus:border-[#AFC8FF] sm:w-auto"
                >
                  <option value="Newest">Newest</option>

                  <option value="Highest Spent">Highest Spent</option>

                  <option value="Most Orders">Most Orders</option>

                  <option value="A-Z">A-Z</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#263B63]/40"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D6E2F7] pt-4">
            <p className="text-[10px] font-semibold text-[#263B63]/45">
              Showing{" "}
              <span className="font-bold text-[#10285D]">
                {filteredUsers.length}
              </span>{" "}
              of {users.length} users
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4 transition hover:text-[#3569C8]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            USERS
        ===================================================== */}

        <section className="overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white shadow-[0_8px_28px_rgba(16,40,93,0.035)]">
          <div className="flex items-center justify-between border-b border-[#D6E2F7] px-5 py-5 sm:px-6">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                Accounts
              </p>

              <h2 className="mt-1 text-[19px] font-bold text-[#10285D]">
                Registered Users
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#E8F1FF] text-[#3569C8]">
              <UsersIcon size={18} />
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[380px] flex-col items-center justify-center px-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF]">
                <Loader2 size={24} className="animate-spin text-[#183A7A]" />
              </div>

              <p className="mt-4 text-[11px] font-semibold text-[#263B63]/45">
                Loading users...
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <EmptyUsers />
          ) : (
            <>
              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[950px]">
                  <thead>
                    <tr className="border-b border-[#D6E2F7] bg-[#F8FAFF]">
                      <TableHeading>User</TableHeading>

                      <TableHeading>Role</TableHeading>

                      <TableHeading>Joined</TableHeading>

                      <TableHeading>Orders</TableHeading>

                      <TableHeading>Spent</TableHeading>

                      <th className="px-6 py-4 text-right text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#D6E2F7]">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id || user.id}
                        className="transition duration-200 hover:bg-[#F8FAFF]"
                      >
                        {/* USER */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <UserAvatar name={user.name} role={user.role} />

                            <div className="min-w-0">
                              <p className="max-w-[250px] truncate text-[12px] font-bold text-[#10285D]">
                                {user.name || "Unnamed User"}
                              </p>

                              <div className="mt-1 flex items-center gap-1.5">
                                <Mail
                                  size={10}
                                  className="shrink-0 text-[#3569C8]"
                                />

                                <p className="max-w-[260px] truncate text-[10px] text-[#263B63]/45">
                                  {user.email || "—"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${getRoleClasses(
                              user.role,
                            )}`}
                          >
                            {user.role === "admin" ? (
                              <ShieldCheck size={11} />
                            ) : (
                              <User size={11} />
                            )}

                            {getRoleLabel(user.role)}
                          </span>
                        </td>

                        {/* JOINED */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#263B63]/65">
                            <CalendarDays
                              size={13}
                              className="text-[#3569C8]"
                            />

                            {formatDate(user.createdAt)}
                          </div>
                        </td>

                        {/* ORDERS */}

                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-2 rounded-full bg-[#F1F6FF] px-3 py-1.5">
                            <ShoppingBag size={12} className="text-[#3569C8]" />

                            <span className="text-[10px] font-bold text-[#10285D]">
                              {user.orderCount}
                            </span>
                          </div>
                        </td>

                        {/* SPENT */}

                        <td className="px-6 py-4">
                          <p className="text-[12px] font-bold text-[#10285D]">
                            {formatMoney(user.spent)}
                          </p>
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleViewUser(user)}
                            title="View user"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D6E2F7] bg-white text-[#3569C8] transition hover:border-[#183A7A] hover:bg-[#183A7A] hover:text-white"
                          >
                            <Eye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =================================================
                  MOBILE USERS
              ================================================= */}

              <div className="divide-y divide-[#D6E2F7] lg:hidden">
                {filteredUsers.map((user) => (
                  <article key={user._id || user.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <UserAvatar name={user.name} role={user.role} large />

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-bold text-[#10285D]">
                            {user.name || "Unnamed User"}
                          </p>

                          <p className="mt-1 truncate text-[10px] text-[#263B63]/45">
                            {user.email || "—"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[8px] font-bold ${getRoleClasses(
                          user.role,
                        )}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 divide-x divide-[#D6E2F7] rounded-[15px] bg-[#F8FAFF] py-4">
                      <MobileStat
                        label="Joined"
                        value={formatDate(user.createdAt)}
                      />

                      <MobileStat label="Orders" value={user.orderCount} />

                      <MobileStat
                        label="Spent"
                        value={formatMoney(user.spent)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleViewUser(user)}
                      className="mt-4 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#183A7A] px-5 text-[10px] font-bold text-white transition hover:bg-[#315FBA]"
                    >
                      <Eye size={14} />
                      View Customer
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* =======================================================
          VIEW USER MODAL
      ======================================================= */}

      {selectedUser && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#10285D]/65 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedUser(null);
            }
          }}
        >
          <div className="mx-auto my-auto w-full max-w-[680px] overflow-hidden rounded-[25px] border border-[#D6E2F7] bg-white shadow-[0_25px_80px_rgba(16,40,93,0.28)]">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-[#D6E2F7] bg-white px-5 py-5 sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  ACV Plus Customer
                </p>

                <h2 className="mt-1 text-[20px] font-bold text-[#10285D]">
                  User Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F6FF] text-[#263B63]/55 transition hover:bg-[#183A7A] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              {/* PROFILE HERO */}

              <div className="relative overflow-hidden rounded-[20px] bg-[#172D57] p-5 text-white sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-[180px] w-[180px] rounded-full bg-[#3569C8]/15"
                />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[20px] border border-white/10 bg-white text-[20px] font-bold text-[#183A7A] shadow-lg">
                    {getInitials(selectedUser.name)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-[20px] font-bold">
                      {selectedUser.name || "Unnamed User"}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-white/55">
                      <Mail size={13} />

                      <span className="truncate">
                        {selectedUser.email || "—"}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${getRoleClasses(
                          selectedUser.role,
                        )}`}
                      >
                        {selectedUser.role === "admin" ? (
                          <ShieldCheck size={11} />
                        ) : (
                          <User size={11} />
                        )}

                        {getRoleLabel(selectedUser.role)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCOUNT INFORMATION */}

              <div className="rounded-[18px] border border-[#D6E2F7] bg-white p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#E8F1FF] text-[#3569C8]">
                    <User size={15} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#3569C8]">
                      Account
                    </p>

                    <h3 className="mt-0.5 text-[13px] font-bold text-[#10285D]">
                      Account Information
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <InformationRow
                    icon={Mail}
                    label="Email Address"
                    value={selectedUser.email || "—"}
                  />

                  <InformationRow
                    icon={CalendarDays}
                    label="Joined"
                    value={formatDate(selectedUser.createdAt)}
                  />

                  <InformationRow
                    icon={ShieldCheck}
                    label="Account Role"
                    value={getRoleLabel(selectedUser.role)}
                  />
                </div>
              </div>

              {/* ORDER STATS */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] border border-[#D6E2F7] bg-[#F8FAFF] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#E8F1FF] text-[#3569C8]">
                    <ReceiptText size={17} />
                  </div>

                  <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                    Total Orders
                  </p>

                  <p className="mt-1.5 text-[24px] font-bold text-[#10285D]">
                    {selectedUser.orderCount || 0}
                  </p>

                  <p className="mt-1 text-[9px] text-[#263B63]/40">
                    Orders linked to this account
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#D6E2F7] bg-[#F8FAFF] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-50 text-emerald-600">
                    <DollarSign size={17} />
                  </div>

                  <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                    Total Spent
                  </p>

                  <p className="mt-1.5 text-[24px] font-bold text-[#10285D]">
                    {formatMoney(selectedUser.spent)}
                  </p>

                  <p className="mt-1 text-[9px] text-[#263B63]/40">
                    Excludes cancelled orders
                  </p>
                </div>
              </div>

              {/* CLOSE */}

              <div className="flex justify-end border-t border-[#D6E2F7] pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#183A7A] px-7 text-[10px] font-bold text-white transition hover:bg-[#315FBA]"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  compact = false,
}) => {
  return (
    <article className="rounded-[20px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_28px_rgba(16,40,93,0.035)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-[#263B63]/50">{title}</p>

          <h3
            className={`mt-2 truncate font-bold text-[#10285D] ${
              compact ? "text-[20px] sm:text-[22px]" : "text-[25px]"
            }`}
          >
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] ${iconClass}`}
        >
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-[9px] font-semibold text-[#263B63]/35">
        {description}
      </p>
    </article>
  );
};

/* =========================================================
   USER AVATAR
========================================================= */

const UserAvatar = ({ name, role, large = false }) => {
  const getInitials = (value) => {
    if (!value) return "?";

    return value
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-[13px] font-bold ${
        large ? "h-12 w-12 text-[12px]" : "h-11 w-11 text-[11px]"
      } ${
        role === "admin"
          ? "bg-violet-50 text-violet-700"
          : "bg-[#E8F1FF] text-[#183A7A]"
      }`}
    >
      {getInitials(name)}

      {role === "admin" && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-white">
          <Sparkles size={7} />
        </span>
      )}
    </div>
  );
};

/* =========================================================
   TABLE HEADING
========================================================= */

const TableHeading = ({ children }) => {
  return (
    <th className="px-6 py-4 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
      {children}
    </th>
  );
};

/* =========================================================
   MOBILE STAT
========================================================= */

const MobileStat = ({ label, value }) => {
  return (
    <div className="min-w-0 px-3 text-center">
      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#263B63]/35">
        {label}
      </p>

      <p className="mt-1.5 truncate text-[10px] font-bold text-[#10285D]">
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   INFORMATION ROW
========================================================= */

const InformationRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 rounded-[13px] bg-[#F8FAFF] px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#3569C8] shadow-[0_3px_10px_rgba(16,40,93,0.05)]">
        <Icon size={14} />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#263B63]/35">
          {label}
        </p>

        <p className="mt-1 break-words text-[11px] font-semibold text-[#10285D]">
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyUsers = () => {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
        <UsersIcon size={25} />
      </div>

      <h3 className="mt-5 text-[17px] font-bold text-[#10285D]">
        No users found
      </h3>

      <p className="mx-auto mt-2 max-w-[360px] text-[11px] leading-5 text-[#263B63]/45">
        No registered users match your current search or filter settings.
      </p>
    </div>
  );
};

export default Users;
