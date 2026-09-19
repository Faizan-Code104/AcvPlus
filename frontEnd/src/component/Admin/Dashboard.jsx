import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  Eye,
  Loader2,
  Package,
  RefreshCw,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  XCircle,
} from "lucide-react";

import { API_BASE_URL } from "../../config";

/* =========================================================
   API
========================================================= */

const PRODUCTS_API_URL = `${API_BASE_URL}/api/products`;

const ORDERS_API_URL = `${API_BASE_URL}/api/orders`;

const USERS_API_URL = `${API_BASE_URL}/api/users`;

const SERVER_URL = API_BASE_URL;

/* =========================================================
   ORDER STATUSES
========================================================= */

const STATUS_ORDER = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

/* =========================================================
   DASHBOARD
========================================================= */

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  /* =======================================================
     AUTH
  ======================================================= */

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

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${SERVER_URL}${image}`;
  };

  /* =======================================================
     FETCH DASHBOARD DATA
  ======================================================= */

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch(PRODUCTS_API_URL, {
          headers: getHeaders(),
        }),

        fetch(ORDERS_API_URL, {
          headers: getHeaders(),
        }),

        fetch(USERS_API_URL, {
          headers: getHeaders(),
        }),
      ]);

      const productsData = await productsRes.json();

      const ordersData = await ordersRes.json();

      const usersData = await usersRes.json();

      if (!productsRes.ok) {
        throw new Error(productsData.message || "Failed to fetch products.");
      }

      if (!ordersRes.ok) {
        throw new Error(ordersData.message || "Failed to fetch orders.");
      }

      if (!usersRes.ok) {
        throw new Error(usersData.message || "Failed to fetch users.");
      }

      setProducts(
        Array.isArray(productsData?.products)
          ? productsData.products
          : Array.isArray(productsData)
            ? productsData
            : [],
      );

      setOrders(
        Array.isArray(ordersData?.orders)
          ? ordersData.orders
          : Array.isArray(ordersData)
            ? ordersData
            : [],
      );

      setUsers(
        Array.isArray(usersData?.users)
          ? usersData.users
          : Array.isArray(usersData)
            ? usersData
            : [],
      );
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);

      setErrorMessage(error.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* =======================================================
     DATE HELPERS
  ======================================================= */

  const now = new Date();

  const isInMonth = (dateString, year, month) => {
    if (!dateString) return false;

    const date = new Date(dateString);

    return date.getFullYear() === year && date.getMonth() === month;
  };

  const getPercentChange = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    return ((current - previous) / previous) * 100;
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

  /* =======================================================
     CORE STATS
  ======================================================= */

  const dashboardStats = useMemo(() => {
    const currentDate = new Date();

    const thisMonth = currentDate.getMonth();

    const thisYear = currentDate.getFullYear();

    const prevMonthDate = new Date(thisYear, thisMonth - 1, 1);

    const prevMonth = prevMonthDate.getMonth();

    const prevYear = prevMonthDate.getFullYear();

    const nonCancelled = orders.filter((order) => order.status !== "Cancelled");

    /* REVENUE */

    const revenueThisMonth = nonCancelled
      .filter((order) => isInMonth(order.createdAt, thisYear, thisMonth))
      .reduce((sum, order) => sum + getOrderTotal(order), 0);

    const revenueLastMonth = nonCancelled
      .filter((order) => isInMonth(order.createdAt, prevYear, prevMonth))
      .reduce((sum, order) => sum + getOrderTotal(order), 0);

    const totalRevenue = nonCancelled.reduce(
      (sum, order) => sum + getOrderTotal(order),
      0,
    );

    /* ORDERS */

    const ordersThisMonth = orders.filter((order) =>
      isInMonth(order.createdAt, thisYear, thisMonth),
    ).length;

    const ordersLastMonth = orders.filter((order) =>
      isInMonth(order.createdAt, prevYear, prevMonth),
    ).length;

    /* PRODUCTS */

    const productsThisMonth = products.filter((product) =>
      isInMonth(product.createdAt, thisYear, thisMonth),
    ).length;

    const productsLastMonth = products.filter((product) =>
      isInMonth(product.createdAt, prevYear, prevMonth),
    ).length;

    /* CUSTOMERS */

    const customers = users.filter((user) => user.role !== "admin");

    const customersThisMonth = customers.filter((user) =>
      isInMonth(user.createdAt, thisYear, thisMonth),
    ).length;

    const customersLastMonth = customers.filter((user) =>
      isInMonth(user.createdAt, prevYear, prevMonth),
    ).length;

    return [
      {
        title: "Total Revenue",
        value: `$${totalRevenue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        change: getPercentChange(revenueThisMonth, revenueLastMonth),
        icon: DollarSign,
        description: "vs. last month",
      },

      {
        title: "Total Orders",
        value: orders.length.toLocaleString(),
        change: getPercentChange(ordersThisMonth, ordersLastMonth),
        icon: ShoppingCart,
        description: "vs. last month",
      },

      {
        title: "Products",
        value: products.length.toLocaleString(),
        change: getPercentChange(productsThisMonth, productsLastMonth),
        icon: Package,
        description: "vs. last month",
      },

      {
        title: "Customers",
        value: customers.length.toLocaleString(),
        change: getPercentChange(customersThisMonth, customersLastMonth),
        icon: Users,
        description: "vs. last month",
      },
    ];
  }, [orders, products, users]);

  const totalRevenueValue = useMemo(() => {
    return orders
      .filter((order) => order.status !== "Cancelled")
      .reduce((sum, order) => sum + getOrderTotal(order), 0);
  }, [orders]);

  const revenueChangeThisVsLast = dashboardStats[0]?.change || 0;

  /* =======================================================
     12 MONTH SALES DATA
  ======================================================= */

  const salesData = useMemo(() => {
    const currentDate = new Date();
    const months = [];

    for (let index = 11; index >= 0; index -= 1) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - index,
        1,
      );

      months.push({
        label: date.toLocaleDateString("en-US", {
          month: "short",
        }),
        year: date.getFullYear(),
        month: date.getMonth(),
        revenue: 0,
      });
    }

    orders
      .filter((order) => order.status !== "Cancelled")
      .forEach((order) => {
        if (!order.createdAt) return;

        const orderDate = new Date(order.createdAt);

        const bucket = months.find(
          (month) =>
            month.year === orderDate.getFullYear() &&
            month.month === orderDate.getMonth(),
        );

        if (bucket) {
          bucket.revenue += getOrderTotal(order);
        }
      });

    const maxRevenue = Math.max(...months.map((month) => month.revenue), 1);

    return months.map((month) => ({
      ...month,

      heightPercent: Math.max(
        (month.revenue / maxRevenue) * 100,
        month.revenue > 0 ? 5 : 0,
      ),
    }));
  }, [orders]);

  /* =======================================================
     STATUS BREAKDOWN
  ======================================================= */

  const statusBreakdown = useMemo(() => {
    const total = orders.length || 1;

    return STATUS_ORDER.map((status) => {
      const count = orders.filter((order) => order.status === status).length;

      return {
        status,
        count,
        percent: (count / total) * 100,
      };
    });
  }, [orders]);

  const validOrders = orders.filter((order) => order.status !== "Cancelled");

  const avgOrderValue =
    validOrders.length > 0 ? totalRevenueValue / validOrders.length : 0;

  /* =======================================================
     RECENT ORDERS
  ======================================================= */

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [orders]);

  const getOrderCustomer = (order) => {
    const first = order.shippingAddress?.firstName || "";

    const last = order.shippingAddress?.lastName || "";

    const fullName = `${first} ${last}`.trim();

    return fullName || order.user?.name || "Guest";
  };

  const getOrderSummary = (order) => {
    const items = order.items || [];

    if (items.length === 0) {
      return "—";
    }

    if (items.length === 1) {
      return items[0].name;
    }

    return `${items[0].name} +${items.length - 1} more`;
  };

  /* =======================================================
     TOP PRODUCTS
  ======================================================= */

  const productMap = useMemo(() => {
    const map = {};

    products.forEach((product) => {
      const id = product._id || product.id;

      if (id) {
        map[String(id)] = product;
      }
    });

    return map;
  }, [products]);

  const topProducts = useMemo(() => {
    const salesMap = {};

    orders
      .filter((order) => order.status !== "Cancelled")
      .forEach((order) => {
        (order.items || []).forEach((item) => {
          const productId = item.product?._id || item.product || "";

          const key = String(productId) || item.name;

          if (!salesMap[key]) {
            salesMap[key] = {
              key,
              name: item.name || "Product",
              unitsSold: 0,
              revenue: 0,
              productId: productId ? String(productId) : "",
            };
          }

          salesMap[key].unitsSold += Number(item.quantity || 0);

          salesMap[key].revenue +=
            Number(item.price || 0) * Number(item.quantity || 0);
        });
      });

    return Object.values(salesMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 4)
      .map((entry) => {
        const details = productMap[entry.productId];

        return {
          ...entry,

          image: details?.images?.[0] || "",

          sku: details?.sku || "",

          stock: details?.stock,
        };
      });
  }, [orders, productMap]);

  /* =======================================================
     STATUS STYLES
  ======================================================= */

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "border border-emerald-100 bg-emerald-50 text-emerald-700";

      case "Processing":
        return "border border-blue-100 bg-blue-50 text-blue-700";

      case "Shipped":
        return "border border-violet-100 bg-violet-50 text-violet-700";

      case "Pending":
        return "border border-amber-100 bg-amber-50 text-amber-700";

      case "Cancelled":
        return "border border-red-100 bg-red-50 text-red-600";

      default:
        return "border border-[#D6E2F7] bg-[#F1F6FF] text-[#263B63]";
    }
  };

  const getStatusBarColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500";

      case "Processing":
        return "bg-[#3569C8]";

      case "Shipped":
        return "bg-violet-500";

      case "Pending":
        return "bg-amber-400";

      case "Cancelled":
        return "bg-red-500";

      default:
        return "bg-[#AFC8FF]";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 size={13} />;

      case "Processing":
        return <Clock3 size={13} />;

      case "Shipped":
        return <Truck size={13} />;

      case "Cancelled":
        return <XCircle size={13} />;

      case "Pending":
        return <Clock3 size={13} />;

      default:
        return null;
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_35px_rgba(16,40,93,0.08)]">
          <Loader2
            size={27}
            strokeWidth={1.8}
            className="animate-spin text-[#183A7A]"
          />
        </div>

        <p className="mt-4 text-[13px] font-semibold text-[#263B63]/60">
          Loading dashboard...
        </p>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <section className="relative overflow-hidden rounded-[24px] bg-[#172D57] px-5 py-6 text-white shadow-[0_15px_45px_rgba(16,40,93,0.10)] sm:px-7 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-[230px] w-[230px] rounded-full bg-[#AFC8FF]/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-24 top-10 h-[90px] w-[90px] rounded-full border border-white/10"
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#AFC8FF]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C5D7FF]">
                ACV Plus Admin
              </span>
            </div>

            <h1 className="mt-4 text-[28px] font-bold tracking-[-0.035em] sm:text-[34px]">
              Store Overview
            </h1>

            <p className="mt-2 max-w-[540px] text-[13px] leading-6 text-white/60">
              Review your store performance, recent orders, products and
              customer activity.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => fetchDashboardData(true)}
              disabled={refreshing}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-[11px] font-bold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing" : "Refresh"}
            </button>

            <Link
              to="/shop"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-[#AFC8FF] px-5 text-[11px] font-bold text-[#172D57] transition-all hover:bg-white"
            >
              View Store
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {errorMessage && (
        <div className="rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-[12px] font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {/* =================================================
          STATS
      ================================================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;

          const positive = stat.change >= 0;

          return (
            <article
              key={stat.title}
              className="group rounded-[20px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_28px_rgba(16,40,93,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_38px_rgba(16,40,93,0.08)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#E8F1FF] text-[#183A7A] transition-colors group-hover:bg-[#183A7A] group-hover:text-white">
                  <Icon size={19} strokeWidth={1.9} />
                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    positive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  {Math.abs(stat.change).toFixed(1)}%
                </span>
              </div>

              <p className="mt-5 text-[12px] font-semibold text-[#263B63]/55">
                {stat.title}
              </p>

              <h2 className="mt-1.5 text-[25px] font-bold tracking-[-0.03em] text-[#10285D]">
                {stat.value}
              </h2>

              <p className="mt-1 text-[10px] font-medium text-[#263B63]/40">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* =================================================
          SALES + ORDER SUMMARY
      ================================================= */}

      <section className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        {/* SALES */}

        <article className="rounded-[22px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_28px_rgba(16,40,93,0.035)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                Revenue
              </p>

              <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.025em] text-[#10285D]">
                Sales Overview
              </h2>
            </div>

            <span className="w-fit rounded-full border border-[#D6E2F7] bg-[#F1F6FF] px-3.5 py-2 text-[10px] font-bold text-[#263B63]/60">
              Last 12 months
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[30px] font-bold tracking-[-0.04em] text-[#10285D]">
                $
                {totalRevenueValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <div
                className={`mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold ${
                  revenueChangeThisVsLast >= 0
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {revenueChangeThisVsLast >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {Math.abs(revenueChangeThisVsLast).toFixed(1)}% from last month
              </div>
            </div>
          </div>

          {/* CHART */}

          <div className="mt-8">
            {salesData.every((month) => month.revenue === 0) ? (
              <div className="flex h-[250px] flex-col items-center justify-center rounded-[16px] bg-[#F8FAFF] text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
                  <TrendingUp size={20} />
                </div>

                <p className="mt-3 text-[12px] font-semibold text-[#263B63]/45">
                  No sales recorded yet.
                </p>
              </div>
            ) : (
              <>
                <div className="flex h-[250px] items-end gap-2 border-b border-[#D6E2F7] px-1 sm:gap-3">
                  {salesData.map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="group relative flex h-full flex-1 flex-col justify-end"
                    >
                      <div
                        className="w-full rounded-t-[6px] bg-[#3569C8] transition-all duration-300 group-hover:bg-[#183A7A]"
                        style={{
                          height: `${item.heightPercent}%`,
                        }}
                      />

                      <span className="pointer-events-none absolute -top-7 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-[7px] bg-[#172D57] px-2 py-1 text-[9px] font-bold text-white shadow-lg group-hover:block">
                        ${item.revenue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-2 sm:gap-3">
                  {salesData.map((item, index) => (
                    <span
                      key={`${item.label}-label-${index}`}
                      className="flex-1 text-center text-[8px] font-bold uppercase text-[#263B63]/40 sm:text-[9px]"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </article>

        {/* ORDER SUMMARY */}

        <article className="rounded-[22px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_28px_rgba(16,40,93,0.035)] sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
            Orders
          </p>

          <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.025em] text-[#10285D]">
            Order Summary
          </h2>

          <div className="mt-7 space-y-5">
            {statusBreakdown.map((row) => (
              <div key={row.status}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-[#263B63]/65">
                      {row.status}
                    </span>

                    <span className="text-[9px] font-bold text-[#263B63]/35">
                      {row.count}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#10285D]">
                    {row.percent.toFixed(0)}%
                  </span>
                </div>

                <div className="h-[7px] overflow-hidden rounded-full bg-[#E8F1FF]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getStatusBarColor(
                      row.status,
                    )}`}
                    style={{
                      width: `${row.percent}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-[15px] bg-[#F1F6FF] p-4">
              <p className="text-[10px] font-semibold text-[#263B63]/45">
                Total Orders
              </p>

              <p className="mt-1.5 text-[20px] font-bold text-[#10285D]">
                {orders.length.toLocaleString()}
              </p>
            </div>

            <div className="rounded-[15px] bg-[#F1F6FF] p-4">
              <p className="text-[10px] font-semibold text-[#263B63]/45">
                Avg. Order
              </p>

              <p className="mt-1.5 text-[20px] font-bold text-[#10285D]">
                ${avgOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* =================================================
          RECENT ORDERS
      ================================================= */}

      <section className="overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white shadow-[0_8px_28px_rgba(16,40,93,0.035)]">
        <div className="flex flex-col gap-3 border-b border-[#D6E2F7] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
              Latest Activity
            </p>

            <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.025em] text-[#10285D]">
              Recent Orders
            </h2>
          </div>

          <Link
            to="/admin/orders"
            className="inline-flex w-fit items-center gap-2 text-[11px] font-bold text-[#3569C8] transition-colors hover:text-[#183A7A]"
          >
            View all orders
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
              <ShoppingCart size={19} />
            </div>

            <p className="mt-3 text-[12px] font-semibold text-[#263B63]/45">
              No orders have been placed yet.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#D6E2F7] bg-[#F8FAFF]">
                    <TableHeading>Order</TableHeading>

                    <TableHeading>Customer</TableHeading>

                    <TableHeading>Product</TableHeading>

                    <TableHeading>Amount</TableHeading>

                    <TableHeading>Status</TableHeading>

                    <th className="px-6 py-4 text-right text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#D6E2F7] transition-colors last:border-0 hover:bg-[#F8FAFF]"
                    >
                      <td className="px-6 py-4">
                        <p className="text-[12px] font-bold text-[#10285D]">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 text-[10px] text-[#263B63]/40">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-[12px] font-medium text-[#263B63]/70">
                          {getOrderCustomer(order)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="max-w-[220px] truncate text-[12px] font-medium text-[#263B63]/65">
                          {getOrderSummary(order)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-[12px] font-bold text-[#10285D]">
                          ${getOrderTotal(order).toFixed(2)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusStyles(
                            order.status,
                          )}`}
                        >
                          {getStatusIcon(order.status)}

                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          to="/admin/orders"
                          aria-label={`View ${order.orderNumber || "order"}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F6FF] text-[#3569C8] transition-all hover:bg-[#183A7A] hover:text-white"
                        >
                          <Eye size={15} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}

            <div className="divide-y divide-[#D6E2F7] md:hidden">
              {recentOrders.map((order) => (
                <div key={order._id} className="p-5">
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
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold ${getStatusStyles(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status)}

                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-[12px] font-semibold text-[#263B63]/80">
                      {getOrderCustomer(order)}
                    </p>

                    <p className="mt-1 text-[10px] text-[#263B63]/50">
                      {getOrderSummary(order)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[15px] font-bold text-[#10285D]">
                      ${getOrderTotal(order).toFixed(2)}
                    </p>

                    <Link
                      to="/admin/orders"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#3569C8]"
                    >
                      View
                      <Eye size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* =================================================
          TOP PRODUCTS
      ================================================= */}

      <section className="overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white shadow-[0_8px_28px_rgba(16,40,93,0.035)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#D6E2F7] px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
              Best Sellers
            </p>

            <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.025em] text-[#10285D]">
              Top Products
            </h2>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-[#3569C8] transition-colors hover:text-[#183A7A]"
          >
            Manage
            <ArrowRight size={14} />
          </Link>
        </div>

        {topProducts.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
              <Package size={19} />
            </div>

            <p className="mt-3 text-[12px] font-semibold text-[#263B63]/45">
              No sales yet. Top products will appear here after orders are
              placed.
            </p>
          </div>
        ) : (
          <div className="grid gap-px bg-[#D6E2F7] sm:grid-cols-2">
            {topProducts.map((product, index) => (
              <article
                key={product.key}
                className="group flex items-center gap-4 bg-white p-5 transition-colors hover:bg-[#F8FAFF] sm:p-6"
              >
                <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#D6E2F7] bg-[#F1F6FF]">
                  {product.image ? (
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-[12px] font-bold text-[#183A7A]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-[#10285D]">
                    {product.name}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {product.sku && (
                      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#263B63]/40">
                        SKU: {product.sku}
                      </p>
                    )}

                    {product.stock !== undefined && (
                      <p className="text-[9px] font-semibold text-[#3569C8]">
                        Stock: {product.stock}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold text-[#263B63]/50">
                      {product.unitsSold} sold
                    </p>

                    <p className="text-[13px] font-bold text-[#10285D]">
                      $
                      {product.revenue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="relative overflow-hidden rounded-[22px] bg-[#172D57] px-6 py-7 text-white sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-[220px] w-[220px] rounded-full bg-[#AFC8FF]/10"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#AFC8FF]">
              ACV Plus Admin
            </p>

            <h2 className="mt-2 text-[23px] font-bold tracking-[-0.03em] sm:text-[27px]">
              Manage your store from one place.
            </h2>

            <p className="mt-2 max-w-[570px] text-[12px] leading-6 text-white/60">
              Manage products, review orders and keep track of customer activity
              from your ACV Plus dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              to="/admin/products"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-white px-5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#172D57] transition-all hover:bg-[#AFC8FF]"
            >
              Manage Products
              <ArrowRight size={14} />
            </Link>

            <Link
              to="/admin/orders"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition-all hover:bg-white/10"
            >
              View Orders
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
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

export default Dashboard;
