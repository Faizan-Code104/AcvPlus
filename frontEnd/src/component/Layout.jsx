import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  ArrowRight,
  Mail,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { useCart } from "../component/CartContext";

/* =========================================================
   ACV PLUS — BUSINESS INFO
========================================================= */

const BUSINESS_INFO = {
  email: "Support@acvplus.us",
  phoneDisplay: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
  descriptor: "Sophia Strategic Travisions LLC",
};

/* =========================================================
   MAIN NAVIGATION
========================================================= */

const navigation = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "FAQs",
    path: "/faqs",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

/* =========================================================
   QUICK LINKS
========================================================= */

const quickLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "FAQs",
    path: "/faqs",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

/* =========================================================
   BOTTOM POLICY LINKS
========================================================= */

const policyLinks = [
  {
    name: "Shipping Policy",
    path: "/shipping-policy",
  },
  {
    name: "Returns & Refunds",
    path: "/return-policy",
  },
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
];

/* =========================================================
   PAYMENT CARD IMAGES
========================================================= */

const paymentCards = [
  {
    name: "Visa",
    src: "/visa card.jpeg",
  },
  {
    name: "Discover",
    src: "/pay-mastercard_4K.png",
  },
  {
    name: "American Express",
    src: "/discover card.jpeg",
  },
];

/* =========================================================
   LAYOUT
========================================================= */

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [newsletterMessage, setNewsletterMessage] = useState("");

  const { cartCount } = useCart();

  const location = useLocation();

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (path === "/shop") {
      return (
        location.pathname === "/shop" || location.pathname.startsWith("/shop/")
      );
    }

    return location.pathname === path;
  };

  /* =======================================================
     MOBILE MENU
  ======================================================= */

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

  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const handleNewsletter = (event) => {
    event.preventDefault();

    const value = newsletterEmail.trim();

    if (!value) {
      setNewsletterMessage("Please enter your email.");

      return;
    }

    setNewsletterMessage("Thank you for subscribing.");

    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-50 bg-[#172D57] text-white shadow-[0_4px_20px_rgba(16,40,93,0.08)]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="relative flex h-[70px] items-center justify-between lg:h-[74px]">
            {/* LOGO */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              aria-label="ACV Plus Home"
              className="flex shrink-0 items-center"
            >
              <img
                src="/logo.png"
                alt="ACV Plus"
                className="h-[46px] w-auto max-w-[190px] object-contain sm:h-[50px]"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}

            <nav
              aria-label="Main navigation"
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
            >
              {navigation.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative flex h-[74px] items-center whitespace-nowrap text-[13px] font-medium transition-colors ${
                      active ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {item.name}

                    <span
                      className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#AFC8FF] transition-all duration-300 ${
                        active ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* HEADER ACTIONS */}

            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/shop"
                aria-label="Search products"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 sm:flex"
              >
                <Search size={19} strokeWidth={1.7} />
              </Link>

              <Link
                to="/login"
                aria-label="My account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 sm:flex"
              >
                <User size={19} strokeWidth={1.7} />
              </Link>

              <Link
                to="/cart"
                aria-label={`Shopping cart${
                  cartCount > 0 ? ` with ${cartCount} items` : ""
                }`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
              >
                <ShoppingBag size={20} strokeWidth={1.7} />

                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#AFC8FF] px-1 text-[9px] font-bold text-[#172D57] ring-2 ring-[#172D57]">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/shop"
                className="ml-2 hidden min-h-[40px] items-center justify-center rounded-full bg-[#AFC8FF] px-7 text-[12px] font-bold text-[#172D57] shadow-[0_8px_22px_rgba(175,200,255,0.12)] transition-all hover:bg-white lg:inline-flex"
              >
                Order Now
              </Link>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((current) => !current)}
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              >
                {mobileMenuOpen ? (
                  <X size={21} strokeWidth={1.7} />
                ) : (
                  <Menu size={21} strokeWidth={1.7} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        {mobileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
              className="fixed inset-0 top-[70px] z-[-1] bg-[#10285D]/30 backdrop-blur-[2px] lg:hidden"
            />

            <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-[#172D57] shadow-[0_20px_40px_rgba(16,40,93,0.2)] lg:hidden">
              <nav
                aria-label="Mobile navigation"
                className="mx-auto max-w-[1280px] px-5 pb-6 pt-3 sm:px-6"
              >
                {navigation.map((item) => {
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`flex min-h-[52px] items-center justify-between border-b border-white/10 text-[13px] font-medium ${
                        active ? "text-[#AFC8FF]" : "text-white/75"
                      }`}
                    >
                      <span>{item.name}</span>

                      <ArrowRight size={14} />
                    </Link>
                  );
                })}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-[0.06em] text-white"
                  >
                    <User size={15} />
                    Account
                  </Link>

                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#AFC8FF] text-[11px] font-bold uppercase tracking-[0.06em] text-[#172D57]"
                  >
                    <ShoppingBag size={15} />
                    Cart
                    {cartCount > 0 ? ` (${cartCount})` : ""}
                  </Link>
                </div>

                <Link
                  to="/shop"
                  onClick={closeMobileMenu}
                  className="mt-3 flex min-h-[48px] items-center justify-center rounded-full bg-white text-[11px] font-bold uppercase tracking-[0.08em] text-[#172D57]"
                >
                  Order Now
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main>{children}</main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="relative overflow-hidden bg-[#172D57] text-white">
        {/* SUBTLE BACKGROUND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-52 h-[340px] w-[340px] rounded-full bg-[#3569C8]/[0.035] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-40 h-[300px] w-[300px] rounded-full bg-[#3569C8]/[0.02] blur-3xl"
        />

        <div className="relative mx-auto max-w-[1280px] px-5 pb-5 pt-10 sm:px-6 sm:pt-11 lg:px-8">
          {/* =============================================
              MAIN FOOTER
          ============================================= */}

          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.72fr_1.12fr_1.3fr] lg:gap-9 xl:gap-12">
            {/* ===========================================
                BRAND
            =========================================== */}

            <div>
              <Link
                to="/"
                aria-label="ACV Plus Home"
                className="inline-flex items-center"
              >
                <img
                  src="/logo.png"
                  alt="ACV Plus"
                  className="h-[54px] w-auto max-w-[210px] object-contain"
                />
              </Link>

              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
                Everyday Wellness. Made Simple.
              </p>

              <p className="mt-4 max-w-[280px] text-[12px] leading-6 text-white/60">
                Explore ACV Plus products and review available product
                information before ordering.
              </p>

              <div className="mt-5 max-w-[300px] rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#AFC8FF]">
                  Descriptor
                </p>

                <p className="mt-1.5 text-[12px] font-medium leading-5 text-white/80">
                  {BUSINESS_INFO.descriptor}
                </p>
              </div>
            </div>

            {/* ===========================================
                QUICK LINKS
            =========================================== */}

            <FooterColumn title="Quick Links" links={quickLinks} />

            {/* ===========================================
                PAYMENT METHODS
            =========================================== */}

            <div>
              <h3 className="text-[14px] font-bold text-white">
                Payment Methods
              </h3>

              <p className="mt-3 text-[12px] leading-5 text-white/60">
                Payment options displayed at checkout.
              </p>

              {/* ALL 3 CARDS IN ONE ROW */}

              <div className="mt-5 flex flex-nowrap items-center gap-2">
                {paymentCards.map((card) => (
                  <div
                    key={card.name}
                    title={card.name}
                    className="group relative flex h-[50px] w-[72px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] bg-white p-[1px] shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out hover:z-10 hover:scale-110 hover:shadow-[0_10px_25px_rgba(0,0,0,0.22)] xl:h-[52px] xl:w-[76px]"
                  >
                    <img
                      src={card.src}
                      alt={`${card.name} card`}
                      className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-4 max-w-[250px] text-[11px] leading-5 text-white/45">
                Available payment methods are confirmed during checkout.
              </p>
            </div>

            {/* ===========================================
                NEWSLETTER / CONTACT
            =========================================== */}

            <div>
              <h3 className="text-[14px] font-bold text-white">
                Join Our Newsletter
              </h3>

              <p className="mt-3 max-w-[330px] text-[12px] leading-6 text-white/60">
                Get ACV Plus store updates and product news.
              </p>

              <form onSubmit={handleNewsletter} className="mt-4">
                <div className="flex h-[46px] overflow-hidden rounded-full bg-white">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>

                  <div className="flex min-w-0 flex-1 items-center gap-2 pl-4">
                    <Mail size={15} className="shrink-0 text-[#3569C8]/50" />

                    <input
                      id="footer-newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(event) => {
                        setNewsletterEmail(event.target.value);

                        if (newsletterMessage) {
                          setNewsletterMessage("");
                        }
                      }}
                      placeholder="Your email address"
                      className="h-full min-w-0 flex-1 border-0 bg-transparent pr-2 text-[12px] text-[#10285D] outline-none placeholder:text-[#263B63]/45"
                    />
                  </div>

                  <button
                    type="submit"
                    className="m-[3px] shrink-0 rounded-full bg-[#AFC8FF] px-5 text-[11px] font-bold text-[#172D57] transition-all duration-200 hover:bg-[#C5D7FF]"
                  >
                    Subscribe
                  </button>
                </div>

                {newsletterMessage && (
                  <p className="mt-2 pl-2 text-[11px] text-[#AFC8FF]">
                    {newsletterMessage}
                  </p>
                )}
              </form>

              <div className="mt-5 space-y-2">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="block text-[12px] text-white/60 transition-colors hover:text-white"
                >
                  {BUSINESS_INFO.email}
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="block text-[12px] text-white/60 transition-colors hover:text-white"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>

                <p className="max-w-[320px] text-[12px] leading-5 text-white/55">
                  {BUSINESS_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* =============================================
              FDA DISCLAIMER
          ============================================= */}

          <div className="mx-auto mt-9 max-w-[920px] px-3 text-center">
            <p className="text-[12px] leading-6 text-white/60">
              These statements have not been evaluated by the Food and Drug
              Administration. ACV Plus products are not intended to diagnose,
              treat, cure, or prevent any disease. Results may vary.
            </p>
          </div>

          {/* =============================================
              DIVIDER
          ============================================= */}

          <div className="mt-6 h-px w-full bg-white/20" />

          {/* =============================================
              BOTTOM ROW
          ============================================= */}

          <div className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="shrink-0 text-[11px] text-white/55">
              © {new Date().getFullYear()} ACV Plus. All rights reserved.
            </p>

            <nav
              aria-label="Footer policies"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end"
            >
              {policyLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-[11px] text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* =========================================================
   FOOTER COLUMN
========================================================= */

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-[14px] font-bold text-white">{title}</h3>

      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="inline-block text-[12px] leading-5 text-white/60 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layout;
