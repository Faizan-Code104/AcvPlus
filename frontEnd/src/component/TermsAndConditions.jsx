import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Check,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  UserRound,
  Scale,
  ExternalLink,
  LockKeyhole,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   ACV PLUS BUSINESS INFORMATION
========================================================= */

const BUSINESS_INFO = {
  brand: "ACV Plus",
  website: "acvplus.us",
  email: "Support@acvplus.us",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
};

/* =========================================================
   PAGE NAVIGATION
========================================================= */

const navigation = [
  { number: "01", label: "General Use", id: "general-use" },
  { number: "02", label: "Products", id: "products" },
  { number: "03", label: "Orders & Payments", id: "orders" },
  { number: "04", label: "Shipping & Delivery", id: "shipping" },
  { number: "05", label: "Returns & Refunds", id: "returns" },
  { number: "06", label: "Intellectual Property", id: "intellectual-property" },
  { number: "07", label: "User Responsibilities", id: "responsibilities" },
  { number: "08", label: "Limitation of Liability", id: "liability" },
  { number: "09", label: "Third-Party Links", id: "third-party" },
  { number: "10", label: "Privacy", id: "privacy" },
  { number: "11", label: "Contact", id: "contact" },
];

/* =========================================================
   SMALL REUSABLE BULLET
========================================================= */

const PolicyBullet = ({ children }) => {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[5px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
        <Check size={10} strokeWidth={2.5} />
      </span>

      <span className="text-[14px] leading-7 text-[#263B63]/70 sm:text-[15px]">
        {children}
      </span>
    </li>
  );
};

/* =========================================================
   SECTION LABEL
========================================================= */

const SectionHeading = ({ number, title, eyebrow, icon: Icon }) => {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold tracking-[0.18em] text-[#3569C8]">
          {number}
        </span>

        <span className="h-px w-8 bg-[#C5D7FF]" />

        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
          {eyebrow}
        </span>
      </div>

      <div className="mt-4 flex items-start gap-4">
        {Icon && (
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
            <Icon size={18} strokeWidth={1.6} />
          </div>
        )}

        <h2 className="font-serif text-[29px] font-semibold leading-tight tracking-[-0.025em] text-[#10285D] sm:text-[34px]">
          {title}
        </h2>
      </div>
    </div>
  );
};

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#263B63]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F4F8FE]">
        {/* decorative background */}
        <div className="pointer-events-none absolute -right-[170px] -top-[240px] h-[620px] w-[620px] rounded-full border-[105px] border-[#E4EFFC]" />

        <div className="pointer-events-none absolute left-[8%] top-[90px] h-14 w-14 rounded-full border border-[#C5D7FF]" />

        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}

            <div className="max-w-[680px]">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#3569C8]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8]">
                  Legal Information
                </p>
              </div>

              <h1 className="mt-5 font-serif text-[45px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#10285D] sm:text-[58px] lg:text-[68px]">
                Terms &
                <br />
                Conditions
              </h1>

              <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
                Welcome to ACV Plus. By accessing or using our website, you
                agree to comply with and be bound by these Terms &amp;
                Conditions. Please read them carefully before using our website
                or purchasing our products.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                    Website
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#10285D]">
                    acvplus.us
                  </p>
                </div>

                <div className="border-l border-[#C5D7FF] pl-8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                    Sections
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#10285D]">
                    11 Terms
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL */}

            <div className="relative hidden min-h-[330px] lg:flex lg:items-center lg:justify-center">
              <div className="absolute h-[320px] w-[320px] rounded-full border border-[#C5D7FF]" />

              <div className="absolute h-[245px] w-[245px] rounded-full bg-white" />

              <div className="relative flex h-[135px] w-[135px] items-center justify-center rounded-full bg-[#183A7A] shadow-[0_24px_60px_rgba(24,58,122,0.14)]">
                <FileText size={46} strokeWidth={1.15} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO STRIP
      ===================================================== */}

      <section className="border-y border-[#D6E2F7] bg-white">
        <div className="mx-auto grid max-w-[1200px] md:grid-cols-3">
          <div className="flex items-center gap-4 border-b border-[#D6E2F7] px-5 py-6 md:border-b-0 md:border-r sm:px-8">
            <ShoppingBag
              size={21}
              strokeWidth={1.5}
              className="shrink-0 text-[#183A7A]"
            />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#3569C8]">
                Products
              </p>

              <p className="mt-1 text-xs font-semibold text-[#10285D]">
                Wellness &amp; Supplements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-[#D6E2F7] px-5 py-6 md:border-b-0 md:border-r sm:px-8">
            <ShieldCheck
              size={21}
              strokeWidth={1.5}
              className="shrink-0 text-[#183A7A]"
            />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#3569C8]">
                Your Use
              </p>

              <p className="mt-1 text-xs font-semibold text-[#10285D]">
                Lawful &amp; Responsible
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-6 sm:px-8">
            <Scale
              size={21}
              strokeWidth={1.5}
              className="shrink-0 text-[#183A7A]"
            />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#3569C8]">
                Agreement
              </p>

              <p className="mt-1 text-xs font-semibold text-[#10285D]">
                Please Read Carefully
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN LEGAL LAYOUT
      ===================================================== */}

      <section className="bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[245px_1fr] lg:gap-16">
          {/* =================================================
              LEFT SIDE NAVIGATION
          ================================================= */}

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
              In These Terms
            </p>

            <nav className="border-t border-[#D6E2F7]">
              {navigation.map((item) => (
                <a
                  key={item.number}
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 border-b border-[#D6E2F7] py-3.5"
                >
                  <span className="w-6 text-[9px] font-bold text-[#3569C8]/60 transition-colors group-hover:text-[#3569C8]">
                    {item.number}
                  </span>

                  <span className="flex-1 text-[11px] font-semibold text-[#263B63]/60 transition-colors group-hover:text-[#10285D]">
                    {item.label}
                  </span>

                  <ChevronRight
                    size={13}
                    className="text-[#C5D7FF] transition-transform group-hover:translate-x-1 group-hover:text-[#3569C8]"
                  />
                </a>
              ))}
            </nav>

            <div className="mt-7 rounded-[18px] bg-[#F1F6FF] p-5">
              <p className="font-serif text-lg font-semibold text-[#10285D]">
                Need assistance?
              </p>

              <p className="mt-2 text-[11px] leading-5 text-[#263B63]/60">
                Our support team can help with questions about our policies.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#183A7A]"
              >
                Contact Us
                <ArrowRight size={13} />
              </Link>
            </div>
          </aside>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <main className="min-w-0">
            {/* ================= 01 ================= */}

            <section
              id="general-use"
              className="scroll-mt-28 border-b border-[#D6E2F7] pb-12"
            >
              <SectionHeading
                number="01"
                eyebrow="Website Access"
                title="General Use"
                icon={UserRound}
              />

              <ul className="space-y-4">
                <PolicyBullet>
                  By using this website, you confirm that you are at least 18
                  years of age or accessing the website under appropriate
                  supervision.
                </PolicyBullet>

                <PolicyBullet>
                  You agree to use this website only for lawful purposes.
                </PolicyBullet>

                <PolicyBullet>
                  We reserve the right to update, modify, or change these Terms
                  &amp; Conditions at any time without prior notice.
                </PolicyBullet>
              </ul>
            </section>

            {/* ================= 02 ================= */}

            <section
              id="products"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="02"
                eyebrow="Our Store"
                title="Products & Information"
                icon={ShoppingBag}
              />

              {/* DIFFERENT FEATURE BLOCK */}

              <div className="mb-7 overflow-hidden rounded-[22px] bg-[#F1F6FF]">
                <div className="grid sm:grid-cols-[1fr_auto]">
                  <div className="p-6 sm:p-7">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                      What We Offer
                    </p>

                    <p className="mt-3 max-w-[500px] font-serif text-[22px] font-semibold leading-8 text-[#10285D]">
                      ACV Plus offers wellness products, dietary supplements,
                      and related items.
                    </p>
                  </div>

                  <div className="hidden min-w-[130px] items-center justify-center border-l border-[#D6E2F7] sm:flex">
                    <ShoppingBag
                      size={34}
                      strokeWidth={1.3}
                      className="text-[#183A7A]"
                    />
                  </div>
                </div>
              </div>

              <ul className="space-y-4">
                <PolicyBullet>
                  We make reasonable efforts to ensure product descriptions,
                  pricing, and information are accurate.
                </PolicyBullet>

                <PolicyBullet>
                  Errors, inaccuracies, or omissions may occasionally occur, and
                  we reserve the right to correct them without prior notice.
                </PolicyBullet>

                <PolicyBullet>
                  Product availability may change at any time.
                </PolicyBullet>
              </ul>
            </section>

            {/* ================= 03 ================= */}

            <section
              id="orders"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="03"
                eyebrow="Checkout"
                title="Orders & Payments"
                icon={CreditCard}
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-t-2 border-[#3569C8] bg-[#FAFCFF] p-5">
                  <span className="font-serif text-[26px] text-[#C5D7FF]">
                    01
                  </span>

                  <p className="mt-3 text-sm leading-6 text-[#263B63]/70">
                    All orders are subject to acceptance and product
                    availability.
                  </p>
                </div>

                <div className="border-t-2 border-[#3569C8] bg-[#FAFCFF] p-5">
                  <span className="font-serif text-[26px] text-[#C5D7FF]">
                    02
                  </span>

                  <p className="mt-3 text-sm leading-6 text-[#263B63]/70">
                    We reserve the right to refuse or cancel any order at our
                    discretion.
                  </p>
                </div>

                <div className="border-t-2 border-[#3569C8] bg-[#FAFCFF] p-5">
                  <span className="font-serif text-[26px] text-[#C5D7FF]">
                    03
                  </span>

                  <p className="mt-3 text-sm leading-6 text-[#263B63]/70">
                    Payment must be completed using the available payment
                    methods during checkout.
                  </p>
                </div>
              </div>
            </section>

            {/* ================= 04 ================= */}

            <section
              id="shipping"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="04"
                eyebrow="Order Delivery"
                title="Shipping & Delivery"
                icon={Truck}
              />

              <ul className="space-y-4">
                <PolicyBullet>
                  Orders are processed and shipped according to our Shipping
                  Policy.
                </PolicyBullet>

                <PolicyBullet>
                  Delivery times are estimates and may vary depending on
                  location and carrier performance.
                </PolicyBullet>

                <PolicyBullet>
                  We are not responsible for shipping delays caused by
                  third-party carriers or circumstances beyond our control.
                </PolicyBullet>
              </ul>

              <Link
                to="/shipping-policy"
                className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#C5D7FF] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
              >
                Read Shipping Policy
                <ArrowRight size={13} />
              </Link>
            </section>

            {/* ================= 05 ================= */}

            <section
              id="returns"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <div className="grid gap-8 rounded-[24px] bg-[#172D57] p-7 text-white sm:p-9 md:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <RotateCcw
                    size={28}
                    strokeWidth={1.4}
                    className="text-[#AFC8FF]"
                  />

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                    05 · Returns
                  </p>

                  <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight">
                    Returns &
                    <br />
                    Refunds
                  </h2>
                </div>

                <div className="md:border-l md:border-white/10 md:pl-8">
                  <p className="text-sm leading-7 text-white/70">
                    Returns and refunds are handled according to our Refund
                    Policy.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Customers must follow the requirements and procedures
                    outlined in that policy.
                  </p>

                  <Link
                    to="/return-policy"
                    className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#AFC8FF]"
                  >
                    Read Refund Policy
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </section>

            {/* ================= 06 ================= */}

            <section
              id="intellectual-property"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="06"
                eyebrow="Ownership"
                title="Intellectual Property"
                icon={ShieldCheck}
              />

              <ul className="space-y-4">
                <PolicyBullet>
                  All content on this website, including text, graphics, logos,
                  images, product descriptions, and website design, is the
                  property of ACV Plus unless otherwise stated.
                </PolicyBullet>

                <PolicyBullet>
                  No content may be copied, reproduced, distributed, or used
                  without prior written permission.
                </PolicyBullet>
              </ul>
            </section>

            {/* ================= 07 ================= */}

            <section
              id="responsibilities"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="07"
                eyebrow="Your Account"
                title="User Responsibilities"
                icon={UserRound}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-l-2 border-[#3569C8] pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                    Website Use
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#263B63]/70">
                    You agree not to misuse the website or attempt unauthorized
                    access to any part of the website.
                  </p>
                </div>

                <div className="border-l-2 border-[#C5D7FF] pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                    Account Security
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#263B63]/70">
                    You are responsible for maintaining the confidentiality of
                    any account information you use on our website.
                  </p>
                </div>
              </div>
            </section>

            {/* ================= 08 ================= */}

            <section
              id="liability"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="08"
                eyebrow="Legal"
                title="Limitation of Liability"
                icon={Scale}
              />

              <div className="relative overflow-hidden bg-[#F1F6FF] p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-[#E1ECFA]" />

                <p className="relative text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
                  ACV Plus shall not be liable for any indirect, incidental,
                  special, or consequential damages arising from the use of our
                  website or products.
                </p>

                <div className="relative my-5 h-px bg-[#D6E2F7]" />

                <p className="relative text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
                  All products and website content are provided on an “as
                  available” basis except where otherwise required by applicable
                  law.
                </p>
              </div>
            </section>

            {/* ================= 09 ================= */}

            <section
              id="third-party"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <SectionHeading
                number="09"
                eyebrow="External Websites"
                title="Third-Party Links"
                icon={ExternalLink}
              />

              <ul className="space-y-4">
                <PolicyBullet>
                  Our website may contain links to third-party websites for your
                  convenience.
                </PolicyBullet>

                <PolicyBullet>
                  We are not responsible for the content, policies, or practices
                  of any third-party websites.
                </PolicyBullet>
              </ul>
            </section>

            {/* ================= 10 ================= */}

            <section
              id="privacy"
              className="scroll-mt-28 border-b border-[#D6E2F7] py-12"
            >
              <div className="flex flex-col justify-between gap-7 rounded-[22px] border border-[#D6E2F7] bg-[#FAFCFF] p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <LockKeyhole size={19} strokeWidth={1.6} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                      10 · Privacy
                    </p>

                    <h2 className="mt-2 font-serif text-[27px] font-semibold text-[#10285D]">
                      Your privacy matters.
                    </h2>

                    <p className="mt-3 max-w-[500px] text-sm leading-7 text-[#263B63]/65">
                      Your use of this website is also governed by our Privacy
                      Policy, which explains how we collect, use, and protect
                      your information.
                    </p>
                  </div>
                </div>

                <Link
                  to="/privacy-policy"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5D7FF] text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
                  aria-label="Read Privacy Policy"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </section>

            {/* ================= 11 ================= */}

            <section id="contact" className="scroll-mt-28 pt-12">
              <SectionHeading
                number="11"
                eyebrow="Questions"
                title="Contact Information"
                icon={Mail}
              />

              <p className="max-w-[650px] text-sm leading-7 text-[#263B63]/68 sm:text-[15px]">
                If you have any questions regarding these Terms &amp;
                Conditions, please contact us:
              </p>

              <div className="mt-8 grid gap-0 overflow-hidden rounded-[22px] border border-[#D6E2F7] sm:grid-cols-2">
                {/* EMAIL */}

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-4 border-b border-[#D6E2F7] p-6 transition-colors hover:bg-[#FAFCFF] sm:border-b-0 sm:border-r"
                >
                  <Mail
                    size={19}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#183A7A]"
                  />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                      Email
                    </p>

                    <p className="mt-2 break-all text-sm font-semibold text-[#10285D]">
                      {BUSINESS_INFO.email}
                    </p>
                  </div>
                </a>

                {/* ADDRESS */}

                <div className="flex items-start gap-4 p-6">
                  <MapPin
                    size={19}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#183A7A]"
                  />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                      Address
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-[#10285D]">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-[14px] bg-[#F1F6FF] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3569C8]">
                  Official Website
                </p>

                <span className="text-xs font-semibold text-[#10285D]">
                  {BUSINESS_INFO.website}
                </span>
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* =====================================================
          RELATED POLICIES
      ===================================================== */}

      <section className="border-t border-[#D6E2F7] bg-[#F1F6FF] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Helpful Information
              </p>

              <h2 className="mt-2 font-serif text-[30px] font-semibold text-[#10285D]">
                Related policies
              </h2>
            </div>

            <p className="max-w-[400px] text-xs leading-6 text-[#263B63]/55">
              Review our supporting policies for more information about orders,
              returns, and your privacy.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              to="/shipping-policy"
              className="group flex items-center justify-between bg-white p-5"
            >
              <div className="flex items-center gap-4">
                <Truck size={19} className="text-[#183A7A]" />

                <span className="text-xs font-bold text-[#10285D]">
                  Shipping Policy
                </span>
              </div>

              <ArrowRight
                size={14}
                className="text-[#3569C8] transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/return-policy"
              className="group flex items-center justify-between bg-white p-5"
            >
              <div className="flex items-center gap-4">
                <RotateCcw size={19} className="text-[#183A7A]" />

                <span className="text-xs font-bold text-[#10285D]">
                  Return &amp; Refund Policy
                </span>
              </div>

              <ArrowRight
                size={14}
                className="text-[#3569C8] transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/privacy-policy"
              className="group flex items-center justify-between bg-white p-5"
            >
              <div className="flex items-center gap-4">
                <LockKeyhole size={19} className="text-[#183A7A]" />

                <span className="text-xs font-bold text-[#10285D]">
                  Privacy Policy
                </span>
              </div>

              <ArrowRight
                size={14}
                className="text-[#3569C8] transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
