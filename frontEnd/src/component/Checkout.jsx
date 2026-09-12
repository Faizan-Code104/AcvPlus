import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Package,
  ImageOff,
  ClipboardCheck,
  Clock3,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "./CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartSubtotal,
  } = useCart();

  /*
    =========================================
    SAVED EMAIL
    =========================================
  */

  const getSavedEmail = () => {
    try {
      const savedUser = localStorage.getItem("Ziveline-user");

      if (!savedUser) {
        return "";
      }

      const user = JSON.parse(savedUser);

      return typeof user?.email === "string"
        ? user.email
        : "";
    } catch {
      return "";
    }
  };

  /*
    =========================================
    FORM STATE
    =========================================
  */

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

  /*
    =========================================
    EMPTY CART GUARD
    =========================================
  */

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", {
        replace: true,
      });
    }
  }, [cartItems.length, navigate]);

  /*
    =========================================
    TOTALS
    =========================================
  */

  const subtotal = Number(cartSubtotal) || 0;
  const shipping = 0;
  const total = subtotal + shipping;

  /*
    =========================================
    INPUT CHANGE
    =========================================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
    =========================================
    PREVENT CHECKOUT SUBMISSION
    =========================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /*
    =========================================
    INPUT CLASS
    =========================================
  */

  const inputClass =
    "w-full min-h-12 border border-line bg-[#F4F1EB] px-4 py-3 text-base text-ink outline-none transition-all duration-300 placeholder:text-ink/40 focus:border-ink focus:bg-paper sm:text-sm";

  /*
    =========================================
    CHECKOUT PAGE
    =========================================
  */

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#F4F1EB] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* BACK */}

        <div className="mb-8">
          <Link
            to="/cart"
            className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />

            Back to Cart
          </Link>
        </div>

        {/* HEADER */}

        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle sm:tracking-[0.25em]">
            Ziveline Store
          </p>

          <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm leading-6 text-ink/60">
            Review your contact and delivery information. Online
            checkout is currently being activated.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            {/* LEFT SIDE */}

            <div className="min-w-0 space-y-6">
              {/* CONTACT INFORMATION */}

              <div className="border border-line bg-paper p-5 sm:p-8">
                <div className="mb-7 flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-paper">
                    <Package
                      size={19}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-display text-2xl text-ink">
                      Contact Information
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-ink/50">
                      Enter your contact information for reference while
                      reviewing checkout.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* FIRST NAME */}

                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-xs font-bold text-ink/70"
                    >
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

                  {/* LAST NAME */}

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-xs font-bold text-ink/70"
                    >
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

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold text-ink/70"
                    >
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

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-bold text-ink/70"
                    >
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

              {/* SHIPPING ADDRESS */}

              <div className="border border-line bg-paper p-5 sm:p-8">
                <div className="mb-7 flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-paper">
                    <MapPin
                      size={19}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-2xl text-ink">
                      Shipping Address
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-ink/50">
                      Enter the U.S. address where your order would
                      be delivered once checkout is active.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* STREET */}

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-xs font-bold text-ink/70"
                    >
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

                  {/* APARTMENT */}

                  <div>
                    <label
                      htmlFor="apartment"
                      className="mb-2 block text-xs font-bold text-ink/70"
                    >
                      Apartment, Suite, etc.{" "}

                      <span className="font-normal text-ink/40">
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
                    {/* CITY */}

                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-xs font-bold text-ink/70"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className={inputClass}
                      />
                    </div>

                    {/* STATE */}

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-2 block text-xs font-bold text-ink/70"
                      >
                        State
                      </label>

                      <input
                        id="state"
                        type="text"
                        name="state"
                        autoComplete="address-level1"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="New York"
                        className={inputClass}
                      />
                    </div>

                    {/* ZIP */}

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mb-2 block text-xs font-bold text-ink/70"
                      >
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
                        placeholder="10001"
                        className={inputClass}
                      />
                    </div>

                    {/* COUNTRY */}

                    <div>
                      <label
                        htmlFor="country"
                        className="mb-2 block text-xs font-bold text-ink/70"
                      >
                        Country
                      </label>

                      <input
                        id="country"
                        type="text"
                        name="country"
                        value="United States"
                        readOnly
                        className={`${inputClass} cursor-not-allowed text-ink/60`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}

              <div className="border border-line bg-paper p-5 sm:p-8">
                <div className="mb-7 flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-paper">
                    <Clock3
                      size={19}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-2xl text-ink">
                      Payment
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-ink/50">
                      Current payment availability for Ziveline orders.
                    </p>
                  </div>
                </div>

                <div className="border border-line bg-[#F4F1EB] p-5">
                  <div className="flex items-center gap-3">
                    <Clock3
                      size={19}
                      className="shrink-0 text-ink"
                      aria-hidden="true"
                    />

                    <span className="text-sm font-bold text-ink">
                      Online Payment Setup in Progress
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-6 text-ink/60">
                    We are currently completing our secure online
                    payment setup. Ziveline is not accepting completed
                    online orders or card payments through this website
                    at this time.
                  </p>

                  <p className="mt-3 text-xs leading-6 text-ink/60">
                    Please return after checkout has been activated or
                    contact{" "}
                    <a
                      href="mailto:info@ziveline.com"
                      className="font-semibold text-ink underline underline-offset-2"
                    >
                      info@ziveline.com
                    </a>{" "}
                    with questions. We do not accept Cash on Delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="min-w-0 lg:sticky lg:top-8 lg:h-fit">
              <div className="bg-ink p-5 text-paper sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-2xl">
                    Your Order
                  </h2>

                  <span className="shrink-0 border border-paper/20 px-3 py-1 text-xs font-bold text-paper/70">
                    {cartItems.reduce(
                      (count, item) =>
                        count +
                        (Number(item.quantity) || 0),
                      0
                    )}{" "}
                    Items
                  </span>
                </div>

                {/* PRODUCTS */}

                <div className="mt-7 space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-w-0 gap-3 sm:gap-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-paper/10">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-paper/40">
                            <ImageOff
                              size={20}
                              aria-hidden="true"
                            />
                          </div>
                        )}

                        <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-paper px-1 text-[10px] font-bold text-ink">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-bold text-paper">
                          {item.name}
                        </p>

                        {item.category && (
                          <p className="mt-1 text-xs text-paper/50">
                            {item.category}
                          </p>
                        )}

                        <p className="mt-2 text-sm font-bold text-paper">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTALS */}

                <div className="mt-7 space-y-4 border-t border-paper/10 pt-7">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-paper/60">
                      Subtotal
                    </span>

                    <span className="font-semibold text-paper">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-paper/60">
                      Shipping
                    </span>

                    <span className="font-semibold text-paper">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-paper/10 pt-7">
                  <span className="text-sm font-bold text-paper/60">
                    Total
                  </span>

                  <span className="font-display text-2xl text-paper sm:text-3xl">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* ONLINE PAYMENT STATUS */}

                <div className="mt-8 border border-paper/20 bg-paper/10 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Clock3
                      size={20}
                      className="mt-0.5 shrink-0 text-paper"
                      aria-hidden="true"
                    />

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-paper">
                        Online Payment Setup in Progress
                      </h3>

                      <p className="mt-3 text-xs leading-6 text-paper/65">
                        We are currently completing our online
                        payment setup. Ziveline is not accepting
                        completed online orders or card payments through
                        this website at this time.
                      </p>

                      <p className="mt-3 text-xs leading-6 text-paper/65">
                        Please return after checkout has been activated
                        or contact{" "}
                        <a
                          href="mailto:info@ziveline.com"
                          className="font-semibold text-paper underline underline-offset-2 transition-opacity hover:opacity-70"
                        >
                          info@ziveline.com
                        </a>{" "}
                        with questions. We do not accept Cash on
                        Delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFO CARDS */}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="border border-line bg-paper p-5">
                  <ClipboardCheck
                    size={20}
                    className="text-ink"
                    aria-hidden="true"
                  />

                  <p className="mt-3 text-xs font-bold text-ink">
                    Review Your Details
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/50">
                    You may review your contact and delivery
                    information while checkout activation is in
                    progress.
                  </p>
                </div>

                <div className="border border-line bg-paper p-5">
                  <Clock3
                    size={20}
                    className="text-ink"
                    aria-hidden="true"
                  />

                  <p className="mt-3 text-xs font-bold text-ink">
                    Checkout Not Active
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/50">
                    Online orders and card payments are not currently
                    being accepted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;