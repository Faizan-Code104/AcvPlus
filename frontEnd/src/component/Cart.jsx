import React from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImageOff,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import { useCart } from "./CartContext";

/* =========================================================
   ACV PLUS CART
========================================================= */

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();

  /* =======================================================
     QUANTITY
  ======================================================= */

  const handleQuantityChange = (id, action, currentQuantity) => {
    const newQuantity =
      action === "increase"
        ? currentQuantity + 1
        : Math.max(1, currentQuantity - 1);

    updateQuantity(id, newQuantity);
  };

  /* =======================================================
     REMOVE ITEM
  ======================================================= */

  const removeItem = (id) => {
    removeFromCart(id);
  };

  /* =======================================================
     TOTALS
  ======================================================= */

  const subtotal = Number(cartSubtotal || 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="min-h-[80vh] bg-[#F1F6FF] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1050px]">
          <div className="relative overflow-hidden rounded-[32px] border border-[#D6E2F7] bg-white px-6 py-16 text-center shadow-[0_20px_60px_rgba(16,40,93,0.05)] sm:px-10 sm:py-20">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F1F6FF]" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full border-[45px] border-[#F1F6FF]" />

            <div className="relative">
              <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <ShoppingBag size={34} strokeWidth={1.4} />
              </div>

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8]">
                Your Cart
              </p>

              <h1 className="mt-3 font-serif text-[38px] font-semibold tracking-[-0.035em] text-[#10285D] sm:text-[48px]">
                Your cart is empty.
              </h1>

              <p className="mx-auto mt-5 max-w-[500px] text-[13px] leading-7 text-[#263B63]/62 sm:text-[14px]">
                You haven't added any products yet. Explore ACV Plus wellness
                products and add the items you'd like to order.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#23458C] px-7 py-3.5 text-[11px] font-bold text-white transition-all hover:bg-[#315FBA]"
              >
                Shop All Products
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     CART
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F1F6FF]">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <section className="border-b border-[#D6E2F7] bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold text-[#263B63]/60 transition-colors hover:text-[#183A7A]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Continue Shopping
          </Link>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#3569C8]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                  ACV Plus
                </p>
              </div>

              <h1 className="mt-4 font-serif text-[39px] font-semibold leading-none tracking-[-0.035em] text-[#10285D] sm:text-[48px]">
                Your Cart
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <ShoppingBag size={16} strokeWidth={1.6} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#263B63]/45">
                  Cart total
                </p>

                <p className="mt-0.5 text-[12px] font-bold text-[#10285D]">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN CART AREA
      =================================================== */}

      <section className="px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#10285D]">
                Cart Items
              </h2>

              <span className="text-[11px] text-[#263B63]/50">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white p-4 transition-all duration-300 hover:border-[#C5D7FF] hover:shadow-[0_15px_45px_rgba(16,40,93,0.06)] sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* PRODUCT IMAGE */}

                    <div className="flex h-[125px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F1F6FF] sm:h-[150px] sm:w-[135px]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <ImageOff
                          size={25}
                          strokeWidth={1.4}
                          className="text-[#183A7A]/25"
                        />
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                            ACV Plus
                          </p>

                          <h3 className="mt-2 line-clamp-2 text-[15px] font-bold leading-6 text-[#10285D] sm:text-[17px]">
                            {item.name}
                          </h3>

                          <p className="mt-1.5 text-[11px] text-[#263B63]/45">
                            ${Number(item.price).toFixed(2)} each
                          </p>
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          title="Remove item"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D6E2F7] text-[#263B63]/45 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} strokeWidth={1.7} />
                        </button>
                      </div>

                      {/* BOTTOM */}

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                        {/* QUANTITY */}

                        <div>
                          <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] text-[#263B63]/40">
                            Quantity
                          </p>

                          <div className="inline-flex items-center rounded-full border border-[#C5D7FF] bg-[#F8FBFF] p-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  "decrease",
                                  item.quantity,
                                )
                              }
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[#183A7A] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Minus size={12} />
                            </button>

                            <span className="w-9 text-center text-[12px] font-bold text-[#10285D]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  "increase",
                                  item.quantity,
                                )
                              }
                              aria-label="Increase quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[#183A7A] transition-colors hover:bg-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* ITEM TOTAL */}

                        <div className="text-right">
                          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#263B63]/40">
                            Item Total
                          </p>

                          <p className="mt-1 text-[18px] font-bold text-[#10285D]">
                            $
                            {(
                              Number(item.price) * Number(item.quantity)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* =================================================
                SHIPPING INFO
            ================================================= */}

            <div className="mt-5 overflow-hidden rounded-[20px] border border-[#C5D7FF] bg-[#E8F1FF]">
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#183A7A]">
                  <Truck size={19} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[13px] font-bold text-[#10285D]">
                    Shipping details shown at checkout
                  </p>

                  <p className="mt-1.5 max-w-[600px] text-[11px] leading-6 text-[#263B63]/60">
                    Review your shipping information and any applicable shipping
                    charges before completing your order.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                SMALL BENEFITS
            ================================================= */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-[16px] bg-white px-5 py-4">
                <RotateCcw
                  size={17}
                  strokeWidth={1.5}
                  className="text-[#3569C8]"
                />

                <div>
                  <p className="text-[11px] font-bold text-[#10285D]">
                    14-Day Eligible Returns
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#263B63]/45">
                    Subject to our return policy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[16px] bg-white px-5 py-4">
                <PackageCheck
                  size={17}
                  strokeWidth={1.5}
                  className="text-[#3569C8]"
                />

                <div>
                  <p className="text-[11px] font-bold text-[#10285D]">
                    Order Tracking
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#263B63]/45">
                    Tracking provided after shipment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="overflow-hidden rounded-[24px] bg-[#172D57] shadow-[0_25px_65px_rgba(16,40,93,0.12)]">
              {/* SUMMARY HEADER */}

              <div className="border-b border-white/10 px-6 py-6 sm:px-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                      Your Order
                    </p>

                    <h2 className="mt-2 font-serif text-[27px] font-semibold text-white">
                      Order Summary
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#AFC8FF]">
                    <ShoppingBag size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* SUMMARY DETAILS */}

              <div className="px-6 py-6 sm:px-7">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/55">Items ({totalItems})</span>

                    <span className="font-semibold text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/55">Shipping</span>

                    <span className="font-semibold text-white">
                      {shipping === 0 ? "$0.00" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* TOTAL */}

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#AFC8FF]">
                        Estimated Total
                      </p>

                      <p className="mt-1 text-[9px] text-white/40">USD</p>
                    </div>

                    <p className="font-serif text-[32px] font-semibold leading-none text-white">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* CHECKOUT */}

                <Link
                  to="/checkout"
                  className="group mt-7 flex w-full items-center justify-between rounded-full bg-white px-5 py-4 text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
                >
                  <span className="flex items-center gap-2 text-[11px] font-bold">
                    Proceed to Checkout
                  </span>

                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                {/* NOTE */}

                <div className="mt-5 flex items-start gap-3">
                  <ShieldCheck
                    size={15}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#AFC8FF]"
                  />

                  <p className="text-[9px] leading-5 text-white/45">
                    Review your items, quantities, shipping information, and
                    available checkout options before completing your order.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                ORDER CHECKLIST
            ================================================= */}

            <div className="mt-4 rounded-[20px] border border-[#D6E2F7] bg-white p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                Before Checkout
              </p>

              <div className="mt-4 space-y-3">
                {[
                  "Check product quantities",
                  "Review your order total",
                  "Confirm shipping details at checkout",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Check size={10} strokeWidth={2} />
                    </div>

                    <p className="text-[10px] text-[#263B63]/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Cart;
