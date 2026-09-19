import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  Eye,
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  MapPin,
  User,
  Mail,
  Phone,
  CalendarDays,
  DollarSign,
  ChevronDown,
  ArrowUpDown,
  ShoppingBag,
  Loader2,
  RefreshCw,
  ImageOff,
} from "lucide-react";

import { API_BASE_URL } from "../../config";

const API_URL = `${API_BASE_URL}/api/orders`;
const SERVER_URL = API_BASE_URL;

const STATUS_OPTIONS = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  /* =========================================================
     AUTH
  ========================================================= */

  const getToken = () => {
    return localStorage.getItem("acvplus-token");
  };

  const getHeaders = () => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
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

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${SERVER_URL}${image}`;
  };

  const getCustomerName = (order) => {
    const first = order?.shippingAddress?.firstName || "";
    const last = order?.shippingAddress?.lastName || "";

    const fullName = `${first} ${last}`.trim();

    return fullName || order?.user?.name || "Guest";
  };

  const getCustomerEmail = (order) => {
    return order?.shippingAddress?.email || order?.user?.email || "—";
  };

  const getFullAddress = (order) => {
    const address = order?.shippingAddress;

    if (!address) return "—";

    return [
      address.address,
      address.apartment,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
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

  const getOrderTotal = (order) => {
    return Number(order?.total ?? order?.totalAmount ?? 0);
  };

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  /* =========================================================
     FETCH ORDERS
  ========================================================= */

  const fetchOrders = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      const response = await fetch(API_URL, {
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders.");
      }

      setOrders(
        Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data)
            ? data
            : [],
      );
    } catch (error) {
      console.error("Fetch Orders Error:", error);

      setErrorMessage(error.message || "Unable to load orders.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusClasses = (status) => {
    const styles = {
      Pending: "border border-amber-200 bg-amber-50 text-amber-700",

      Processing: "border border-blue-200 bg-blue-50 text-blue-700",

      Shipped: "border border-violet-200 bg-violet-50 text-violet-700",

      Delivered: "border border-emerald-200 bg-emerald-50 text-emerald-700",

      Cancelled: "border border-red-200 bg-red-50 text-red-600",
    };

    return (
      styles[status] || "border border-[#D6E2F7] bg-[#F1F6FF] text-[#263B63]"
    );
  };

  const getStatusIcon = (status, size = 13) => {
    const icons = {
      Pending: Clock3,
      Processing: Package,
      Shipped: Truck,
      Delivered: CheckCircle2,
      Cancelled: XCircle,
    };

    const Icon = icons[status] || Clock3;

    return <Icon size={size} />;
  };

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (searchTerm.trim()) {
      const search = searchTerm.trim().toLowerCase();

      result = result.filter((order) => {
        const orderNumber = String(order?.orderNumber || "").toLowerCase();

        const customer = getCustomerName(order).toLowerCase();

        const email = getCustomerEmail(order).toLowerCase();

        return (
          orderNumber.includes(search) ||
          customer.includes(search) ||
          email.includes(search)
        );
      });
    }

    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (sortBy === "Highest") {
      result.sort((a, b) => getOrderTotal(b) - getOrderTotal(a));
    }

    if (sortBy === "Lowest") {
      result.sort((a, b) => getOrderTotal(a) - getOrderTotal(b));
    }

    if (sortBy === "Items") {
      result.sort((a, b) => (b.items?.length || 0) - (a.items?.length || 0));
    }

    if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [orders, searchTerm, statusFilter, sortBy]);

  /* =========================================================
     STATS
  ========================================================= */

  const totalRevenue = useMemo(() => {
    return orders
      .filter((order) => order.status !== "Cancelled")
      .reduce((sum, order) => sum + getOrderTotal(order), 0);
  }, [orders]);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  /* =========================================================
     STATUS UPDATE
  ========================================================= */

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingStatusId(orderId);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/${orderId}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status.");
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? data.order : order,
        ),
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder(data.order);
      }
    } catch (error) {
      console.error("Update Order Status Error:", error);

      setErrorMessage(error.message || "Unable to update order status.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSortBy("Newest");
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="min-h-screen bg-[#F1F6FF] px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="relative overflow-hidden rounded-[24px] bg-[#172D57] px-5 py-6 text-white shadow-[0_15px_45px_rgba(16,40,93,0.10)] sm:px-7 sm:py-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-[230px] w-[230px] rounded-full bg-[#AFC8FF]/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-28 top-7 h-[90px] w-[90px] rounded-full border border-white/10"
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#AFC8FF]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C5D7FF]">
                  ACV Plus Admin
                </span>
              </div>

              <h1 className="mt-4 text-[28px] font-bold tracking-[-0.035em] sm:text-[34px]">
                Orders
              </h1>

              <p className="mt-2 max-w-[570px] text-[13px] leading-6 text-white/60">
                Manage customer orders, review fulfillment status and keep track
                of deliveries from one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => fetchOrders(true)}
                disabled={refreshing}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-[11px] font-bold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={15}
                  className={refreshing ? "animate-spin" : ""}
                />

                {refreshing ? "Refreshing" : "Refresh"}
              </button>

              <div className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#AFC8FF] px-5 text-[#172D57]">
                <ShoppingBag size={15} />

                <span className="text-[11px] font-bold">
                  {orders.length} Total Orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {errorMessage && (
          <div className="flex items-center justify-between gap-4 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-[12px] font-semibold text-red-600">
            <span>{errorMessage}</span>

            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-red-100"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={`$${formatPrice(totalRevenue)}`}
            note="Excludes cancelled orders"
            icon={DollarSign}
            iconClass="bg-[#E8F1FF] text-[#183A7A]"
          />

          <StatCard
            title="Pending"
            value={pendingOrders}
            note="Awaiting confirmation"
            icon={Clock3}
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            title="Processing"
            value={processingOrders}
            note="Being prepared"
            icon={Package}
            iconClass="bg-blue-50 text-[#3569C8]"
          />

          <StatCard
            title="Delivered"
            value={deliveredOrders}
            note="Successfully completed"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* ===================================================
            SEARCH + FILTERS
        =================================================== */}

        <div className="rounded-[20px] border border-[#D6E2F7] bg-white p-4 shadow-[0_8px_28px_rgba(16,40,93,0.035)] sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-[520px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search order number, customer or email..."
                className="w-full rounded-full border border-[#D6E2F7] bg-[#F8FAFF] py-3.5 pl-11 pr-5 text-[12px] font-medium text-[#263B63] outline-none transition-all placeholder:text-[#263B63]/35 focus:border-[#AFC8FF] focus:bg-white focus:ring-4 focus:ring-[#AFC8FF]/15"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-full border px-4 text-[10px] font-bold uppercase tracking-[0.06em] transition-all ${
                  showFilters
                    ? "border-[#183A7A] bg-[#183A7A] text-white"
                    : "border-[#D6E2F7] bg-white text-[#263B63] hover:border-[#AFC8FF] hover:bg-[#F1F6FF]"
                }`}
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>

              <div className="relative">
                <ArrowUpDown
                  size={14}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                />

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="min-h-[42px] appearance-none rounded-full border border-[#D6E2F7] bg-white py-2 pl-10 pr-10 text-[10px] font-bold text-[#263B63] outline-none transition hover:border-[#AFC8FF]"
                >
                  <option value="Newest">Newest</option>

                  <option value="Highest">Highest Value</option>

                  <option value="Lowest">Lowest Value</option>

                  <option value="Items">Most Items</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#263B63]/40"
                />
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 border-t border-[#D6E2F7] pt-4">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.14em] text-[#263B63]/45">
                Order Status
              </p>

              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full border px-4 py-2 text-[10px] font-bold transition-all ${
                      statusFilter === status
                        ? "border-[#183A7A] bg-[#183A7A] text-white"
                        : "border-[#D6E2F7] bg-[#F8FAFF] text-[#263B63]/65 hover:border-[#AFC8FF] hover:bg-[#F1F6FF]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(searchTerm || statusFilter !== "All" || sortBy !== "Newest") && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D6E2F7] pt-4">
              <p className="text-[10px] font-semibold text-[#263B63]/50">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-bold text-[#3569C8] underline underline-offset-4 transition-colors hover:text-[#183A7A]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ===================================================
            ORDERS
        =================================================== */}

        {loading ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-[#D6E2F7] bg-white">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF]">
              <Loader2 size={24} className="animate-spin text-[#183A7A]" />
            </div>

            <p className="mt-4 text-[12px] font-semibold text-[#263B63]/50">
              Loading orders...
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}

            <div className="hidden overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white shadow-[0_8px_28px_rgba(16,40,93,0.035)] lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-[#D6E2F7] bg-[#F8FAFF]">
                      <TableHeading>Order</TableHeading>

                      <TableHeading>Customer</TableHeading>

                      <TableHeading>Date</TableHeading>

                      <TableHeading>Items</TableHeading>

                      <TableHeading>Total</TableHeading>

                      <TableHeading>Status</TableHeading>

                      <th className="px-6 py-4 text-right text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#D6E2F7]">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="group transition-colors hover:bg-[#F8FAFF]"
                      >
                        <td className="px-6 py-5">
                          <p className="text-[12px] font-bold text-[#10285D]">
                            {order.orderNumber}
                          </p>

                          <p className="mt-1 text-[9px] font-medium text-[#263B63]/40">
                            {order.items?.length || 0} product
                            {(order.items?.length || 0) !== 1 ? "s" : ""}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-[12px] font-semibold text-[#263B63]/80">
                            {getCustomerName(order)}
                          </p>

                          <p className="mt-1 max-w-[210px] truncate text-[10px] text-[#263B63]/40">
                            {getCustomerEmail(order)}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-[11px] font-medium text-[#263B63]/65">
                            {formatDate(order.createdAt)}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex min-w-[34px] justify-center rounded-full bg-[#F1F6FF] px-3 py-1.5 text-[10px] font-bold text-[#183A7A]">
                            {order.items?.length || 0}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-[12px] font-bold text-[#10285D]">
                            ${formatPrice(getOrderTotal(order))}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="relative inline-block">
                            <select
                              value={order.status}
                              disabled={updatingStatusId === order._id}
                              onChange={(event) =>
                                handleStatusChange(
                                  order._id,
                                  event.target.value,
                                )
                              }
                              className={`min-w-[132px] appearance-none rounded-full py-2 pl-8 pr-8 text-[10px] font-bold outline-none disabled:cursor-not-allowed disabled:opacity-50 ${getStatusClasses(
                                order.status,
                              )}`}
                            >
                              {STATUS_OPTIONS.filter(
                                (status) => status !== "All",
                              ).map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>

                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                              {updatingStatusId === order._id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                getStatusIcon(order.status, 12)
                              )}
                            </span>

                            <ChevronDown
                              size={11}
                              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                            />
                          </div>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            onClick={() => handleViewOrder(order)}
                            title="View order"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F6FF] text-[#3569C8] transition-all hover:bg-[#183A7A] hover:text-white"
                          >
                            <Eye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <EmptyOrders hasOrders={orders.length > 0} />
              )}
            </div>

            {/* MOBILE */}

            <div className="space-y-3 lg:hidden">
              {filteredOrders.map((order) => (
                <article
                  key={order._id}
                  className="rounded-[20px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_25px_rgba(16,40,93,0.035)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] font-bold text-[#10285D]">
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-[10px] text-[#263B63]/40">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${getStatusClasses(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status, 11)}

                      {order.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-b border-[#D6E2F7] pb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
                      <User size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-[#263B63]/80">
                        {getCustomerName(order)}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-[#263B63]/40">
                        {getCustomerEmail(order)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5">
                    <div className="rounded-[13px] bg-[#F1F6FF] p-3.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#263B63]/40">
                        Items
                      </p>

                      <p className="mt-1 text-[14px] font-bold text-[#10285D]">
                        {order.items?.length || 0}
                      </p>
                    </div>

                    <div className="rounded-[13px] bg-[#F1F6FF] p-3.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#263B63]/40">
                        Total
                      </p>

                      <p className="mt-1 text-[14px] font-bold text-[#10285D]">
                        ${formatPrice(getOrderTotal(order))}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewOrder(order)}
                      className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-full bg-[#183A7A] px-4 text-[10px] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#315FBA]"
                    >
                      <Eye size={14} />
                      View Order
                    </button>
                  </div>
                </article>
              ))}

              {filteredOrders.length === 0 && (
                <div className="overflow-hidden rounded-[20px] border border-[#D6E2F7] bg-white">
                  <EmptyOrders hasOrders={orders.length > 0} />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#10285D]/65 px-4 py-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[820px] overflow-y-auto rounded-[24px] border border-white/20 bg-white shadow-[0_25px_80px_rgba(16,40,93,0.30)]">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#D6E2F7] bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  Order Details
                </p>

                <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.025em] text-[#10285D]">
                  {selectedOrder.orderNumber}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F6FF] text-[#263B63]/60 transition-all hover:bg-[#183A7A] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              {/* STATUS */}

              <div className="rounded-[18px] bg-[#F1F6FF] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                      Current Status
                    </p>

                    <span
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusClasses(
                        selectedOrder.status,
                      )}`}
                    >
                      {getStatusIcon(selectedOrder.status, 12)}

                      {selectedOrder.status}
                    </span>
                  </div>

                  <div>
                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                      Update Status
                    </label>

                    <div className="relative">
                      <select
                        value={selectedOrder.status}
                        disabled={updatingStatusId === selectedOrder._id}
                        onChange={(event) =>
                          handleStatusChange(
                            selectedOrder._id,
                            event.target.value,
                          )
                        }
                        className="min-w-[160px] appearance-none rounded-full border border-[#D6E2F7] bg-white px-4 py-2.5 pr-9 text-[11px] font-bold text-[#263B63] outline-none transition focus:border-[#AFC8FF] disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.filter(
                          (status) => status !== "All",
                        ).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      {updatingStatusId === selectedOrder._id ? (
                        <Loader2
                          size={13}
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-[#3569C8]"
                        />
                      ) : (
                        <ChevronDown
                          size={13}
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#263B63]/40"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* CUSTOMER + ADDRESS */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InfoCard icon={User} title="Customer">
                  <p className="text-[13px] font-bold text-[#10285D]">
                    {getCustomerName(selectedOrder)}
                  </p>

                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-start gap-2.5 text-[11px] leading-5 text-[#263B63]/60">
                      <Mail
                        size={13}
                        className="mt-0.5 shrink-0 text-[#3569C8]"
                      />

                      <span className="break-all">
                        {getCustomerEmail(selectedOrder)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-[#263B63]/60">
                      <Phone size={13} className="shrink-0 text-[#3569C8]" />

                      <span>{selectedOrder.shippingAddress?.phone || "—"}</span>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard icon={MapPin} title="Shipping Address">
                  <p className="text-[12px] leading-6 text-[#263B63]/65">
                    {getFullAddress(selectedOrder)}
                  </p>
                </InfoCard>
              </div>

              {/* ORDER INFO */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <MiniInfoCard
                  icon={CalendarDays}
                  label="Date"
                  value={formatDate(selectedOrder.createdAt)}
                />

                <MiniInfoCard
                  icon={Package}
                  label="Items"
                  value={selectedOrder.items?.length || 0}
                />

                <div className="rounded-[16px] bg-[#172D57] p-4 text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <DollarSign size={15} />
                  </div>

                  <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-white/45">
                    Total
                  </p>

                  <p className="mt-1 text-[15px] font-bold">
                    ${formatPrice(getOrderTotal(selectedOrder))}
                  </p>
                </div>
              </div>

              {/* PRODUCTS */}

              <div className="rounded-[18px] border border-[#D6E2F7] bg-white p-5">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
                    <ShoppingBag size={14} />
                  </div>

                  <div>
                    <h3 className="text-[13px] font-bold text-[#10285D]">
                      Products
                    </h3>

                    <p className="mt-0.5 text-[9px] text-[#263B63]/40">
                      Items included in this order
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {(selectedOrder.items || []).map((item, index) => (
                    <div
                      key={`${item.product || "item"}-${index}`}
                      className="flex items-center justify-between gap-4 rounded-[14px] bg-[#F8FAFF] p-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[#D6E2F7] bg-white">
                          {item.image ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.name || "Product"}
                              className="h-full w-full object-contain p-1"
                            />
                          ) : (
                            <ImageOff size={16} className="text-[#263B63]/30" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-bold text-[#10285D]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-[9px] text-[#263B63]/45">
                            ${formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-flex min-w-[34px] justify-center rounded-full bg-[#E8F1FF] px-2.5 py-1.5 text-[9px] font-bold text-[#183A7A]">
                          x{item.quantity}
                        </span>

                        <p className="mt-1.5 text-[10px] font-bold text-[#10285D]">
                          $
                          {formatPrice(
                            Number(item.price || 0) *
                              Number(item.quantity || 0),
                          )}
                        </p>
                      </div>
                    </div>
                  ))}

                  {(selectedOrder.items || []).length === 0 && (
                    <div className="py-8 text-center text-[11px] font-semibold text-[#263B63]/40">
                      No products found in this order.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   COMPONENTS
========================================================= */

const StatCard = ({ title, value, note, icon: Icon, iconClass }) => {
  return (
    <article className="group rounded-[20px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_28px_rgba(16,40,93,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_38px_rgba(16,40,93,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-[#263B63]/50">{title}</p>

          <h3 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-[#10285D]">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] transition-transform duration-300 group-hover:scale-105 ${iconClass}`}
        >
          <Icon size={19} strokeWidth={1.9} />
        </div>
      </div>

      <p className="mt-4 text-[10px] font-semibold text-[#263B63]/40">{note}</p>
    </article>
  );
};

const TableHeading = ({ children }) => {
  return (
    <th className="px-6 py-4 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
      {children}
    </th>
  );
};

const InfoCard = ({ icon: Icon, title, children }) => {
  return (
    <div className="rounded-[18px] border border-[#D6E2F7] bg-white p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
          <Icon size={14} />
        </div>

        <h3 className="text-[12px] font-bold text-[#10285D]">{title}</h3>
      </div>

      {children}
    </div>
  );
};

const MiniInfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-[16px] bg-[#F1F6FF] p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#3569C8] shadow-sm">
        <Icon size={14} />
      </div>

      <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-[#263B63]/40">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-bold text-[#10285D]">{value}</p>
    </div>
  );
};

const EmptyOrders = ({ hasOrders }) => {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
        <ShoppingBag size={22} />
      </div>

      <h3 className="mt-4 text-[16px] font-bold text-[#10285D]">
        No orders found
      </h3>

      <p className="mx-auto mt-2 max-w-[340px] text-[11px] leading-5 text-[#263B63]/50">
        {hasOrders
          ? "Try adjusting your search or order filters."
          : "No orders have been placed yet."}
      </p>
    </div>
  );
};

export default Orders;
