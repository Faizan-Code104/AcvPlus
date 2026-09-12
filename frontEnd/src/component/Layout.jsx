import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import { useCart } from "../component/CartContext";

const BUSINESS_INFO = {
  businessName: "Ziveline",
  email: "info@Ziveline.com",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  addressLine1: "2125 Strawberry Rd",
  addressLine2: "Pasadena, TX 77502",
  country: "United States",
  businessDays: "Monday – Friday",
  supportHours: "9:00 AM – 5:00 PM",
  timeZone: "Central Time (CT)",
};

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  const navigation = [
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Collection",
      path: "/categories",
    },
    {
      name: "Order Tracking",
      path: "/track-order",
    },
    {
      name: "Shipping Policy",
      path: "/shipping-policy",
    },
    {
      name: "Return Policy",
      path: "/return-policy",
    },
  ];

  const footerLinks = {
    Ziveline: [
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "Shop",
        path: "/shop",
      },
      {
        name: "Collections",
        path: "/categories",
      },
    ],

    Help: [
      {
        name: "FAQ",
        path: "/faqs",
      },
      {
        name: "Order Tracking",
        path: "/track-order",
      },
      {
        name: "Shipping Policy",
        path: "/shipping-policy",
      },
      {
        name: "Return Policy",
        path: "/return-policy",
      },
      {
        name: "Order Cancellation Policy",
        path: "/order-cancellation-policy",
      },
    ],

    Information: [
      {
        name: "Terms & Conditions",
        path: "/terms-and-conditions",
      },
      {
        name: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        name: "Payment Policy",
        path: "/payment-policy",
      },
      {
        name: "Cookie Policy",
        path: "/cookie-policy",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ],
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* ========================================
          PROMO BAR
      ======================================== */}

      <div className="relative bg-bottle px-4 py-2.5 text-center">
        <p className="mx-auto max-w-5xl text-[11px] font-medium tracking-wide text-paper sm:text-xs">
          Free shipping within the United States
        </p>
      </div>

      {/* ========================================
          NAVBAR
      ======================================== */}

      {/* ========================================
          NAVBAR
      ======================================== */}

      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center justify-between sm:h-[72px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            {/* ========================================
                LEFT DESKTOP NAVIGATION
            ======================================== */}

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-7 lg:flex xl:gap-9"
            >
              {navigation.slice(0, 3).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 xl:text-xs ${
                    isActive(item.path)
                      ? "text-ink"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {item.name}

                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 h-[1px] w-full bg-bottle" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ========================================
                MOBILE MENU BUTTON
            ======================================== */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-bottle lg:hidden"
            >
              {mobileMenuOpen ? (
                <X
                  size={22}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={22}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              )}
            </button>

            {/* ========================================
                CENTER LOGO
            ======================================== */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              aria-label="Ziveline home"
              className="shrink-0 select-none whitespace-nowrap font-display text-[27px] tracking-[0.02em] text-ink sm:text-3xl lg:justify-self-center"
            >
              Ziveline
            </Link>

            {/* ========================================
                RIGHT DESKTOP NAVIGATION + ICONS
            ======================================== */}

            <div className="flex items-center justify-end lg:gap-2">
              <nav
                aria-label="Secondary navigation"
                className="mr-3 hidden items-center gap-6 lg:flex xl:mr-5 xl:gap-8"
              >
                {navigation.slice(3).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative whitespace-nowrap py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 xl:text-[11px] ${
                      isActive(item.path)
                        ? "text-ink"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {item.name}

                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 h-[1px] w-full bg-bottle" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* ACCOUNT */}

              <Link
                to="/login"
                aria-label="Account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-ink/65 transition-all duration-200 hover:bg-ink/5 hover:text-ink sm:flex"
              >
                <User
                  size={19}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </Link>

              {/* CART */}

              <Link
                to="/cart"
                aria-label={`Shopping bag${
                  cartCount > 0
                    ? ` with ${cartCount} item${
                        cartCount === 1 ? "" : "s"
                      }`
                    : ""
                }`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink/75 transition-all duration-200 hover:bg-ink/5 hover:text-ink"
              >
                <ShoppingBag
                  size={19}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-bottle px-1 text-[9px] font-bold leading-none text-paper">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* ========================================
              MOBILE MENU
          ======================================== */}

          {mobileMenuOpen && (
            <div
              id="mobile-navigation"
              className="absolute left-0 right-0 top-full max-h-[calc(100vh-68px)] overflow-y-auto border-t border-line bg-paper shadow-[0_12px_30px_rgba(0,0,0,0.08)] lg:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="px-5 pb-7 sm:px-7"
              >
                <div className="flex flex-col">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`group flex min-h-[58px] items-center justify-between border-b border-line text-[11px] font-medium uppercase tracking-[0.13em] transition-colors ${
                        isActive(item.path)
                          ? "text-bottle"
                          : "text-ink/75 hover:text-ink"
                      }`}
                    >
                      {item.name}

                      <ArrowRight
                        size={15}
                        strokeWidth={1.7}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>

                {/* MOBILE ACCOUNT */}

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 border border-ink/20 px-5 text-[11px] font-medium uppercase tracking-[0.13em] text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <User
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  Account
                </Link>

                {/* MOBILE CART */}

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-5 text-[11px] font-medium uppercase tracking-[0.13em] text-paper transition-colors duration-200 hover:bg-bottle-dark"
                >
                  <ShoppingBag
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  Shopping Bag

                  {cartCount > 0 && (
                    <span>({cartCount})</span>
                  )}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* ========================================
          PAGE CONTENT
      ======================================== */}

      <main>{children}</main>

      {/* ========================================
          FOOTER
      ======================================== */}

      <footer className="border-t border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* BRAND / CONTACT */}

            <div className="sm:col-span-2 lg:col-span-2">
              <Link
                to="/"
                className="font-display text-3xl text-ink"
              >
                Ziveline
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-7 text-ink/60">
                Handbags designed with everyday use,
                practical details, and contemporary style
                in mind.
              </p>

              {/* CONTACT DETAILS */}

              <div className="mt-6 space-y-3">
                <div className="text-sm text-ink/65">
                  {BUSINESS_INFO.businessName}
                </div>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex min-w-0 items-start gap-3 text-sm text-ink/65 transition-colors hover:text-ink"
                >
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />

                  <span className="break-all">
                    {BUSINESS_INFO.email}
                  </span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="flex items-center gap-3 text-sm text-ink/65 transition-colors hover:text-ink"
                >
                  <Phone
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  {BUSINESS_INFO.phoneDisplay}
                </a>

                <div className="flex items-start gap-3 text-sm leading-6 text-ink/65">
                  <MapPin
                    size={16}
                    className="mt-1 shrink-0"
                    aria-hidden="true"
                  />

                  <span>
                    {BUSINESS_INFO.addressLine1}
                    <br />
                    {BUSINESS_INFO.addressLine2}
                    <br />
                    {BUSINESS_INFO.country}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-sm leading-6 text-ink/65">
                  <Clock
                    size={16}
                    className="mt-1 shrink-0"
                    aria-hidden="true"
                  />

                  <span>
                    {BUSINESS_INFO.businessDays}
                    <br />
                    {BUSINESS_INFO.supportHours}{" "}
                    {BUSINESS_INFO.timeZone}
                  </span>
                </div>
              </div>
            </div>

            {/* FOOTER LINKS */}

            {Object.entries(footerLinks).map(
              ([title, links]) => (
                <div key={title}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                    {title}
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {links.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="inline-flex min-h-7 items-center text-sm text-ink/65 transition-colors hover:text-ink"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* SUPPORT BLOCK */}

          <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                Need Assistance?
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink/60">
                Visit our contact page if you have a
                question about an order or product.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark sm:w-auto"
            >
              Contact Support

              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ========================================
            BOTTOM BAR
        ======================================== */}

        <div className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-5 text-center text-[11px] leading-5 text-ink/50 sm:px-6 sm:text-xs lg:px-8">
            <p>
              © {new Date().getFullYear()} Ziveline LLC.
              All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link
                to="/privacy-policy"
                className="transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="transition-colors hover:text-ink"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;