import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  ClipboardCheck,
  Clock3,
  ImageOff,
  Mail,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "./CartContext";

/* =========================================================
   ACV PLUS CHECKOUT
========================================================= */

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, cartSubtotal } = useCart();

  /* =======================================================
     SAVED USER EMAIL
  ======================================================= */

  const getSavedEmail = () => {
    try {
      const savedUser = localStorage.getItem("acvplus-user");

      if (!savedUser) {
        return "";
      }

      const user = JSON.parse(savedUser);

      return typeof user?.email === "string" ? user.email : "";
    } catch {
      return "";
    }
  };

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState(() => ({
    firstName: "",
    lastName: "",
    email: getSavedEmail(),
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  }));

  /* =======================================================
     EMPTY CART GUARD
  ======================================================= */

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", {
        replace: true,
      });
    }
  }, [cartItems.length, navigate]);

  /* =======================================================
     TOTALS
  ======================================================= */

  const subtotal = Number(cartSubtotal) || 0;

  /*
    Shipping/payment configuration can be connected here
    when the live checkout system is activated.
  */

  const shipping = 0;
  const total = subtotal + shipping;

  const totalItems = cartItems.reduce(
    (count, item) => count + (Number(item.quantity) || 0),
    0,
  );

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  /* =======================================================
     CHECKOUT SUBMISSION
     Payment/order placement is intentionally not active yet.
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  /* =======================================================
     INPUT STYLE
  ======================================================= */

  const inputClass =
    "min-h-[52px] w-full rounded-[13px] border border-[#D6E2F7] bg-[#FAFCFF] px-4 py-3 text-[13px] text-[#10285D] outline-none transition-all duration-300 placeholder:text-[#263B63]/30 hover:border-[#C5D7FF] focus:border-[#3569C8] focus:bg-white focus:ring-4 focus:ring-[#3569C8]/[0.06]";

  const labelClass =
    "mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#263B63]/65";

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F1F6FF]">
      {/* ===================================================
          TOP HEADER
      =================================================== */}

      <section className="border-b border-[#D6E2F7] bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Link
            to="/cart"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold text-[#263B63]/55 transition-colors hover:text-[#183A7A]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Cart
          </Link>

          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#3569C8]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                  ACV Plus
                </p>
              </div>

              <h1 className="mt-4 font-serif text-[40px] font-semibold leading-none tracking-[-0.035em] text-[#10285D] sm:text-[50px]">
                Checkout
              </h1>

              <p className="mt-4 max-w-[570px] text-[12px] leading-6 text-[#263B63]/55">
                Review your contact information, shipping address, and order
                details before continuing.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[#D6E2F7] bg-[#F8FBFF] px-4 py-2.5">
              <ShoppingBag size={15} className="text-[#3569C8]" />

              <span className="text-[10px] font-bold text-[#10285D]">
                {totalItems} {totalItems === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CHECKOUT CONTENT
      =================================================== */}

      <section className="px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto max-w-[1240px]"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-10">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="min-w-0 space-y-6">
              {/* ===============================================
                  CONTACT INFORMATION
              =============================================== */}

              <section className="overflow-hidden rounded-[24px] border border-[#D6E2F7] bg-white shadow-[0_15px_50px_rgba(16,40,93,0.035)]">
                <div className="border-b border-[#D6E2F7] px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Mail size={18} strokeWidth={1.6} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                        Step 01
                      </p>

                      <h2 className="mt-1 font-serif text-[24px] font-semibold text-[#10285D] sm:text-[27px]">
                        Contact Information
                      </h2>

                      <p className="mt-1 text-[11px] leading-5 text-[#263B63]/50">
                        Enter the contact details associated with your order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 555 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ===============================================
                  SHIPPING ADDRESS
              =============================================== */}

              <section className="overflow-hidden rounded-[24px] border border-[#D6E2F7] bg-white shadow-[0_15px_50px_rgba(16,40,93,0.035)]">
                <div className="border-b border-[#D6E2F7] px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <MapPin size={18} strokeWidth={1.6} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                        Step 02
                      </p>

                      <h2 className="mt-1 font-serif text-[24px] font-semibold text-[#10285D] sm:text-[27px]">
                        Shipping Address
                      </h2>

                      <p className="mt-1 text-[11px] leading-5 text-[#263B63]/50">
                        Enter the U.S. address where your order should be
                        delivered.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="address" className={labelClass}>
                        Street Address
                      </label>

                      <input
                        id="address"
                        type="text"
                        name="address"
                        autoComplete="address-line1"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="apartment" className={labelClass}>
                        Apartment, Suite, etc.{" "}
                        <span className="font-medium normal-case tracking-normal text-[#263B63]/35">
                          (Optional)
                        </span>
                      </label>

                      <input
                        id="apartment"
                        type="text"
                        name="apartment"
                        autoComplete="address-line2"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="Apartment 4B"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="city" className={labelClass}>
                          City
                        </label>

                        <input
                          id="city"
                          type="text"
                          name="city"
                          autoComplete="address-level2"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Houston"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className={labelClass}>
                          State
                        </label>

                        <input
                          id="state"
                          type="text"
                          name="state"
                          autoComplete="address-level1"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Texas"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="postalCode" className={labelClass}>
                          ZIP Code
                        </label>

                        <input
                          id="postalCode"
                          type="text"
                          name="postalCode"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="77001"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className={labelClass}>
                          Country
                        </label>

                        <input
                          id="country"
                          type="text"
                          name="country"
                          value="United States"
                          readOnly
                          className={`${inputClass} cursor-not-allowed bg-[#F1F6FF] text-[#263B63]/55`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===============================================
                  PAYMENT
              =============================================== */}

              <section className="overflow-hidden rounded-[24px] border border-[#D6E2F7] bg-white shadow-[0_15px_50px_rgba(16,40,93,0.035)]">
                <div className="border-b border-[#D6E2F7] px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Clock3 size={18} strokeWidth={1.6} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                        Step 03
                      </p>

                      <h2 className="mt-1 font-serif text-[24px] font-semibold text-[#10285D] sm:text-[27px]">
                        Payment
                      </h2>

                      <p className="mt-1 text-[11px] leading-5 text-[#263B63]/50">
                        Current checkout availability for ACV Plus orders.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="rounded-[18px] border border-[#C5D7FF] bg-[#E8F1FF] p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#183A7A]">
                        <Clock3 size={17} strokeWidth={1.6} />
                      </div>

                      <div>
                        <h3 className="text-[13px] font-bold text-[#10285D]">
                          Online Payment Setup in Progress
                        </h3>

                        <p className="mt-2 text-[11px] leading-6 text-[#263B63]/60">
                          We are currently completing our online payment setup.
                          ACV Plus is not accepting completed online orders or
                          card payments through this website at this time.
                        </p>

                        <p className="mt-3 text-[11px] leading-6 text-[#263B63]/60">
                          For questions, please contact{" "}
                          <a
                            href="mailto:Support@acvplus.us"
                            className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4"
                          >
                            Support@acvplus.us
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* =================================================
                RIGHT ORDER SUMMARY
            ================================================= */}

            <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
              <div className="overflow-hidden rounded-[24px] bg-[#172D57] shadow-[0_25px_70px_rgba(16,40,93,0.14)]">
                {/* SUMMARY HEADER */}

                <div className="border-b border-white/10 px-6 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                        ACV Plus
                      </p>

                      <h2 className="mt-2 font-serif text-[26px] font-semibold text-white">
                        Your Order
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#AFC8FF]">
                      <ShoppingBag size={18} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* PRODUCTS */}

                <div className="px-6 py-6">
                  <div className="space-y-5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex min-w-0 gap-4">
                        <div className="relative flex h-[74px] w-[74px] shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-white">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain p-1.5"
                            />
                          ) : (
                            <ImageOff size={19} className="text-[#183A7A]/25" />
                          )}

                          <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#23458C] px-1 text-[9px] font-bold text-white">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="line-clamp-2 text-[12px] font-semibold leading-5 text-white">
                            {item.name}
                          </p>

                          <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="text-[9px] text-white/40">
                              Qty {item.quantity}
                            </span>

                            <span className="text-[12px] font-bold text-white">
                              $
                              {(
                                Number(item.price) * Number(item.quantity)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* TOTALS */}

                  <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/50">Subtotal</span>

                      <span className="font-semibold text-white">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/50">Shipping</span>

                      <span className="font-semibold text-white">
                        {shipping === 0 ? "$0.00" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  {/* TOTAL */}

                  <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#AFC8FF]">
                          Estimated Total
                        </p>

                        <p className="mt-1 text-[9px] text-white/35">USD</p>
                      </div>

                      <p className="font-serif text-[31px] font-semibold leading-none text-white">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* PAYMENT STATUS */}

                  <div className="mt-7 rounded-[17px] border border-white/10 bg-white/[0.06] p-5">
                    <div className="flex items-start gap-3">
                      <Clock3
                        size={17}
                        className="mt-0.5 shrink-0 text-[#AFC8FF]"
                      />

                      <div>
                        <p className="text-[11px] font-bold text-white">
                          Checkout Activation in Progress
                        </p>

                        <p className="mt-2 text-[9px] leading-5 text-white/45">
                          Online order completion and card payment are not
                          currently available.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===============================================
                  CHECKOUT INFO
              =============================================== */}

              <div className="mt-4 rounded-[20px] border border-[#D6E2F7] bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  Order Review
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Check size={11} />
                    </div>

                    <p className="text-[10px] text-[#263B63]/60">
                      Review your contact information
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Check size={11} />
                    </div>

                    <p className="text-[10px] text-[#263B63]/60">
                      Confirm your shipping address
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Check size={11} />
                    </div>

                    <p className="text-[10px] text-[#263B63]/60">
                      Check products and quantities
                    </p>
                  </div>
                </div>
              </div>

              {/* ===============================================
                  DELIVERY NOTE
              =============================================== */}

              <div className="mt-4 flex items-start gap-3 rounded-[20px] border border-[#C5D7FF] bg-[#E8F1FF] p-5">
                <Truck size={18} className="mt-0.5 shrink-0 text-[#183A7A]" />

                <div>
                  <p className="text-[11px] font-bold text-[#10285D]">
                    U.S. Shipping
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-[#263B63]/55">
                    ACV Plus currently ships within the United States. Shipping
                    information will be shown as applicable during checkout.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Checkout;
