import React, { useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  MapPin,
  CalendarDays,
  ArrowRight,
  Copy,
  Check,
  CircleDot,
  Loader2,
  ImageOff,
  XCircle,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const STATUS_STEPS = [
  { key: "Pending", title: "Order Placed", icon: Package },
  { key: "Processing", title: "Processing", icon: CheckCircle2 },
  { key: "Shipped", title: "Shipped", icon: Truck },
  { key: "Delivered", title: "Delivered", icon: CheckCircle2 },
];

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getDestination = (shippingAddress) => {
    if (!shippingAddress) return "—";

    return [shippingAddress.city, shippingAddress.state]
      .filter(Boolean)
      .join(", ");
  };

  const handleTrackOrder = async (event) => {
    event.preventDefault();

    const value = trackingNumber.trim().toUpperCase();

    setError("");
    setOrder(null);

    if (!value) {
      setError("Please enter your order number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/orders/track/${encodeURIComponent(value)}`,
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "We couldn't find an order with this number. Please check and try again.",
        );
      }

      setOrder(data.order);
    } catch (fetchError) {
      setError(
        fetchError?.message ||
          "Unable to retrieve this order right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTracking = async () => {
    if (!order?.orderNumber) return;

    try {
      await navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(
      `Order Support - ${order?.orderNumber || ""}`,
    );

    window.location.href = `mailto:info@ziveline.com?subject=${subject}`;
  };

  const isCancelled = order?.status === "Cancelled";

  const currentStepIndex = order
    ? STATUS_STEPS.findIndex((step) => step.key === order.status)
    : -1;

  return (
    <section className="min-h-screen bg-[#F4F1EB]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-ink">
        <img
          src="/order tracking.png"
          alt="Track Your Order"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-paper text-ink">
              <Truck size={30} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-paper/60">
              Ziveline Delivery
            </p>

            <h1 className="mt-4 font-display text-4xl text-paper sm:text-5xl lg:text-6xl">
              Track Your Order
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-paper/70 sm:text-base">
              Enter your order number to see its current status.
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Search */}
      <div className="relative mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border border-line bg-paper p-5 shadow-lg sm:p-7">
          <form onSubmit={handleTrackOrder}>
            <label
              htmlFor="trackingNumber"
              className="mb-3 block text-sm font-bold text-ink"
            >
              Order Number
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Package
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                />

                <input
                  id="trackingNumber"
                  type="text"
                  value={trackingNumber}
                  onChange={(event) => {
                    setTrackingNumber(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your order number"
                  className={`h-14 w-full border bg-[#F4F1EB] pl-12 pr-4 text-sm font-medium text-ink outline-none transition-all placeholder:text-ink/40 focus:bg-paper ${
                    error
                      ? "border-red-300 focus:border-red-500"
                      : "border-line focus:border-ink"
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 items-center justify-center gap-2 bg-ink px-7 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Track Order
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>
            )}

            <p className="mt-4 text-xs leading-5 text-ink/40">
              If you have an existing order, enter the order number provided
              with your order confirmation.
            </p>
          </form>
        </div>
      </div>

      {/* Results */}
      {order && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Status Header */}
          <div className="border border-line bg-paper">
            <div className="border-b border-line p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`px-3 py-1.5 text-xs font-bold ${
                        isCancelled
                          ? "bg-red-50 text-red-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {order.status}
                    </span>

                    <span className="text-sm font-medium text-ink/40">
                      {order.orderNumber}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-3xl text-ink">
                    {isCancelled
                      ? "This order was cancelled"
                      : order.status === "Delivered"
                        ? "Your order has been delivered"
                        : "Your order is in progress"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    Placed on{" "}
                    <span className="font-bold text-ink">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </p>
                </div>

                <div className="bg-[#F4F1EB] p-4 sm:min-w-[260px]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/40">
                    Order Number
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="break-all text-sm font-bold text-ink">
                      {order.orderNumber}
                    </span>

                    <button
                      type="button"
                      onClick={handleCopyTracking}
                      className="flex h-9 w-9 shrink-0 items-center justify-center bg-paper text-ink/60 transition hover:bg-ink hover:text-paper"
                      aria-label="Copy order number"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  {copied && (
                    <p className="mt-2 text-xs font-semibold text-emerald-600">
                      Order number copied.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F4F1EB] text-ink/70">
                  <Package size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                    Order Status
                  </p>

                  <p className="mt-1 text-sm font-bold text-ink">
                    {order.status || "Processing"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F4F1EB] text-ink/70">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                    Destination
                  </p>

                  <p className="mt-1 text-sm font-bold text-ink">
                    {getDestination(order.shippingAddress)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F4F1EB] text-ink/70">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm font-bold text-ink">
                    {formatDateTime(order.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <div className="border border-line bg-paper p-6 sm:p-8">
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
                    Shipment Progress
                  </p>

                  <h3 className="mt-2 font-display text-2xl text-ink">
                    Order Timeline
                  </h3>
                </div>

                {isCancelled ? (
                  <div className="flex items-start gap-5 bg-red-50 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                      <XCircle size={20} />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-red-700">
                        Order Cancelled
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-red-600">
                        This order was cancelled and will not be delivered.
                        Contact support if you believe this is a mistake.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {STATUS_STEPS.map((step, index) => {
                      const Icon = step.icon;
                      const isLast = index === STATUS_STEPS.length - 1;

                      const completed = index <= currentStepIndex;

                      const isCurrent = index === currentStepIndex;

                      return (
                        <div key={step.key} className="relative flex gap-5">
                          {!isLast && (
                            <div
                              className={`absolute left-[22px] top-12 h-[calc(100%-24px)] w-px ${
                                completed ? "bg-ink" : "bg-line"
                              }`}
                            />
                          )}

                          <div
                            className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-paper ${
                              isCurrent
                                ? "bg-bottle text-paper"
                                : completed
                                  ? "bg-ink text-paper"
                                  : "bg-[#F4F1EB] text-ink/40"
                            }`}
                          >
                            <Icon size={17} />
                          </div>

                          <div className={`flex-1 ${!isLast ? "pb-9" : ""}`}>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-sm font-bold ${
                                    isCurrent
                                      ? "text-ink"
                                      : completed
                                        ? "text-ink/80"
                                        : "text-ink/40"
                                  }`}
                                >
                                  {step.title}
                                </h4>

                                {isCurrent && (
                                  <span className="bg-[#F4F1EB] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ink/70">
                                    Current
                                  </span>
                                )}
                              </div>

                              {index === 0 && (
                                <span className="text-xs font-semibold text-ink/40">
                                  {formatDateTime(order.createdAt)}
                                </span>
                              )}

                              {isCurrent && index !== 0 && (
                                <span className="text-xs font-semibold text-ink/40">
                                  {formatDateTime(order.updatedAt)}
                                </span>
                              )}
                            </div>

                            <p
                              className={`mt-1 max-w-xl text-sm leading-6 ${
                                completed ? "text-ink/60" : "text-ink/40"
                              }`}
                            >
                              {completed ? "Completed" : "Not reached yet"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Order Items */}
              <div className="border border-line bg-paper p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                      Your Purchase
                    </p>

                    <h3 className="mt-2 font-display text-xl text-ink">
                      Order Items
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center bg-[#F4F1EB] text-ink/70">
                    <Package size={18} />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {(order.items || []).map((item, index) => (
                    <div
                      key={`${item.product}-${index}`}
                      className="flex gap-4 bg-[#F4F1EB] p-3"
                    >
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-line text-ink/40">
                          <ImageOff size={20} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-sm font-bold text-ink">
                          {item.name}
                        </h4>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-ink/50">
                            Qty: {item.quantity}
                          </span>

                          <span className="text-sm font-bold text-ink">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
                  <span className="text-sm font-bold text-ink/60">Total</span>

                  <span className="font-display text-lg text-ink">
                    ${Number(order.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-ink p-6 text-paper">
                <div className="flex h-11 w-11 items-center justify-center bg-paper/10">
                  <Truck size={21} />
                </div>

                <h3 className="mt-5 font-display text-xl">
                  Delivery Information
                </h3>

                <p className="mt-2 text-sm leading-6 text-paper/70">
                  Follow this page for the latest status available for your
                  order.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-paper">
                  <CircleDot size={15} />
                  Status Updates
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 border border-line bg-paper p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
                  Need Assistance?
                </p>

                <h3 className="mt-2 font-display text-2xl text-ink">
                  Something not looking right?
                </h3>

                <p className="mt-2 text-sm text-ink/60">
                  Our support team is here to help with your order.
                </p>
              </div>

              <button
                type="button"
                onClick={handleContactSupport}
                className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark"
              >
                Contact Support
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!order && !error && !loading && (
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                icon: Package,
                title: "Enter Order Number",
                description:
                  "Enter the order number from your existing order confirmation.",
              },
              {
                icon: Truck,
                title: "Follow Progress",
                description: "See the current stage of your order.",
              },
              {
                icon: CheckCircle2,
                title: "30-Day Returns",
                description:
                  "Eligible items may be returned within 30 days of confirmed delivery.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="border border-line bg-paper p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#F4F1EB] text-ink/70">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-semibold text-ink/40">
            <Clock3 size={14} />
            Status updates as soon as our team updates your order.
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderTracking;
