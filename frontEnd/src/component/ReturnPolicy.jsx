import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Truck,
  PackageCheck,
  Ban,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

/* =========================================
   ACV PLUS BUSINESS INFORMATION
========================================= */

const BUSINESS_INFO = {
  businessName: "ACV Plus",
  website: "https://acvplus.us/",
  email: "Support@acvplus.us",
  phoneDisplay: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
};

/* =========================================
   RETURN POLICY SECTIONS
========================================= */

const policySections = [
  {
    number: "01",
    title: "Return Eligibility",
    icon: CheckCircle2,

    intro: "You may request a return if:",

    bullets: [
      "The item received is damaged, defective, or incorrect.",
      "The return request is submitted within 14 days of delivery.",
      "The product is unused and remains in its original packaging.",
    ],

    after:
      "Our products may include dietary supplements, wellness products, and related items.",
  },

  {
    number: "02",
    title: "Non-Returnable Items",
    icon: XCircle,

    intro: "The following items are not eligible for return:",

    bullets: [
      "Products showing signs of use.",
      "Products damaged after delivery due to customer handling.",
      "Items returned after the return period has expired.",
      "Products missing original packaging, seals, labels, or accessories.",
    ],
  },

  {
    number: "03",
    title: "Refund Process",
    icon: RefreshCcw,

    intro: "Once your returned item is received and inspected:",

    bullets: [
      "We will notify you regarding the approval or rejection of your refund.",
      "Approved refunds are generally processed within 5–10 business days.",
      "Refunds will be issued to the original payment method used for the purchase.",
    ],
  },

  {
    number: "04",
    title: "Exchange Policy",
    icon: PackageCheck,

    paragraphs: [
      "We only replace items that arrive damaged or defective. If you require an exchange, please contact our support team for assistance.",
    ],
  },

  {
    number: "05",
    title: "Return Shipping",
    icon: Truck,

    bullets: [
      "Customers are responsible for return shipping costs unless the item received is incorrect, damaged, or defective.",
      "Original shipping charges are non-refundable.",
    ],
  },

  {
    number: "06",
    title: "Order Cancellations",
    icon: Ban,

    paragraphs: [
      "Orders may only be cancelled before shipment. Once an order has been shipped, it must follow the return process outlined in this policy.",
    ],
  },
];

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F1F6FF] text-[#263B63]">
      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative overflow-hidden border-b border-[#D6E2F7] bg-white">
        {/* DECORATIVE SHAPES */}

        <div className="pointer-events-none absolute -right-28 -top-28 h-[390px] w-[390px] rounded-full bg-[#E8F1FF]" />

        <div className="pointer-events-none absolute right-[17%] top-16 h-28 w-28 rounded-full border border-[#C5D7FF]/60" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#F1F6FF]" />

        <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[760px] text-center">
            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C5D7FF] bg-[#E8F1FF] text-[#183A7A]">
              <RotateCcw size={24} strokeWidth={1.7} aria-hidden="true" />
            </div>

            {/* EYEBROW */}

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8] sm:text-[11px]">
              Simple & Clear Returns
            </p>

            {/* TITLE */}

            <h1 className="mt-3 font-serif text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#10285D] sm:text-5xl lg:text-[56px]">
              Return &amp; Refund Policy
            </h1>

            <p className="mx-auto mt-5 max-w-[650px] text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
              At ACV Plus, we want you to be satisfied with your purchase. If
              you are not completely satisfied with your order, please review
              our return and refund policy below.
            </p>

            <div className="mx-auto mt-7 h-[2px] w-12 rounded-full bg-[#3569C8]" />
          </div>
        </div>
      </section>

      {/* =========================================
          14 DAY SUMMARY
      ========================================= */}

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid overflow-hidden rounded-[20px] border border-[#D6E2F7] bg-white shadow-[0_8px_30px_rgba(16,40,93,0.04)] md:grid-cols-[0.36fr_1fr]">
            {/* NUMBER */}

            <div className="flex items-center justify-center bg-[#172D57] px-6 py-8 text-center md:py-10">
              <div>
                <p className="font-serif text-[52px] font-semibold leading-none text-white sm:text-[60px]">
                  14
                </p>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                  Day Return Window
                </p>
              </div>
            </div>

            {/* TEXT */}

            <div className="flex items-center p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                  Returns Made Simple
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#10285D] sm:text-3xl">
                  Return Eligibility
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
                  Eligible return requests must be submitted within 14 days of
                  delivery. Products must be unused and remain in their original
                  packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          QUICK OVERVIEW
      ========================================= */}

      <section className="px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto grid max-w-[1000px] gap-4 sm:grid-cols-3">
          {/* CARD 1 */}

          <div className="rounded-[16px] border border-[#D6E2F7] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
              <RotateCcw size={18} strokeWidth={1.7} />
            </div>

            <h3 className="mt-4 font-serif text-lg font-semibold text-[#10285D]">
              14-Day Returns
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#263B63]/65">
              Submit an eligible return request within 14 days of delivery.
            </p>
          </div>

          {/* CARD 2 */}

          <div className="rounded-[16px] border border-[#D6E2F7] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
              <PackageCheck size={18} strokeWidth={1.7} />
            </div>

            <h3 className="mt-4 font-serif text-lg font-semibold text-[#10285D]">
              Original Condition
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#263B63]/65">
              Products must be unused and remain in their original packaging.
            </p>
          </div>

          {/* CARD 3 */}

          <div className="rounded-[16px] border border-[#D6E2F7] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
              <RefreshCcw size={18} strokeWidth={1.7} />
            </div>

            <h3 className="mt-4 font-serif text-lg font-semibold text-[#10285D]">
              Refund Processing
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#263B63]/65">
              Approved refunds are generally processed within 5–10 business
              days.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          POLICY SECTIONS
      ========================================= */}

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-[1000px] space-y-5">
          {policySections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.number}
                className="overflow-hidden rounded-[18px] border border-[#D6E2F7] bg-white shadow-[0_5px_20px_rgba(16,40,93,0.035)] transition-shadow duration-300 hover:shadow-[0_10px_35px_rgba(16,40,93,0.07)]"
              >
                {/* HEADER */}

                <div className="flex items-start gap-4 border-b border-[#D6E2F7] bg-[#FAFCFF] px-5 py-5 sm:gap-5 sm:px-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>

                  <div className="pt-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                      Section {section.number}
                    </span>

                    <h2 className="mt-1 font-serif text-[22px] font-semibold leading-tight text-[#10285D] sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="px-5 py-6 sm:px-7 sm:py-7">
                  {section.intro && (
                    <p className="text-sm leading-7 text-[#263B63]/72 sm:text-[15px]">
                      {section.intro}
                    </p>
                  )}

                  {section.paragraphs && (
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm leading-7 text-[#263B63]/72 sm:text-[15px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.bullets && (
                    <ul className={`${section.intro ? "mt-5" : ""} space-y-3`}>
                      {section.bullets.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm leading-7 text-[#263B63]/72 sm:text-[15px]"
                        >
                          <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#3569C8]" />

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.after && (
                    <p className="mt-5 text-sm leading-7 text-[#263B63]/72 sm:text-[15px]">
                      {section.after}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================
          CONTACT US
      ========================================= */}

      <section className="border-y border-[#D6E2F7] bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid overflow-hidden rounded-[22px] border border-[#D6E2F7] lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT */}

            <div className="bg-[#172D57] p-7 text-white sm:p-9 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#AFC8FF]">
                Returns Support
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-[36px]">
                Need help with a return?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                If you have any questions regarding returns or refunds, please
                contact our support team for assistance.
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[12px] font-bold text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
              >
                Contact Us
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>

            {/* RIGHT */}

            <div className="bg-[#FAFCFF] p-7 sm:p-9 lg:p-10">
              <h3 className="font-serif text-2xl font-semibold text-[#10285D]">
                Contact Information
              </h3>

              <div className="mt-6 space-y-5">
                {/* EMAIL */}

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <Mail size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#263B63]/50">
                      Email
                    </p>

                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="mt-1 inline-block text-sm font-semibold text-[#183A7A] transition-colors hover:text-[#3569C8]"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* PHONE */}

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <Phone size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#263B63]/50">
                      Phone
                    </p>

                    <a
                      href={`tel:${BUSINESS_INFO.phoneHref}`}
                      className="mt-1 inline-block text-sm font-semibold text-[#183A7A] transition-colors hover:text-[#3569C8]"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* ADDRESS */}

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#263B63]/50">
                      Address
                    </p>

                    <p className="mt-1 text-sm font-medium leading-6 text-[#263B63]">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* WEBSITE */}

              <div className="mt-7 border-t border-[#D6E2F7] pt-5">
                <p className="text-xs leading-6 text-[#263B63]/60">
                  Website:{" "}
                  <span className="font-semibold text-[#183A7A]">
                    acvplus.us
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="bg-[#F1F6FF] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto flex max-w-[1000px] flex-col items-start justify-between gap-6 rounded-[18px] border border-[#D6E2F7] bg-white p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              ACV Plus Support
            </p>

            <h3 className="mt-2 font-serif text-2xl font-semibold text-[#10285D]">
              Questions about your return?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#263B63]/65">
              Our support team is available to assist with return, refund, or
              exchange questions.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#23458C] px-7 text-xs font-bold text-white transition-colors hover:bg-[#315FBA] md:w-auto"
          >
            Contact Support
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ReturnPolicy;
