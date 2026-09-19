import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CircleAlert,
  Clock3,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

/* =========================================================
   ACV PLUS — ORDER CANCELLATION POLICY
========================================================= */

const BUSINESS_INFO = {
  brandName: "ACV Plus",
  descriptor: "Sophia Strategic Travisions LLC",
  email: "Support@acvplus.us",
  phoneDisplay: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
};

const OrderCancellationPolicy = () => {
  const cancellationSummary = [
    {
      icon: Clock3,
      label: "Cancellation Window",
      value: "Before Shipment",
      description:
        "Send your request as soon as possible after placing your order.",
    },
    {
      icon: RotateCcw,
      label: "Approved Refunds",
      value: "Original Payment Method",
      description:
        "Approved cancellation refunds are returned to the original payment method.",
    },
    {
      icon: CalendarClock,
      label: "Refund Processing",
      value: "5–7 Business Days",
      description:
        "Additional posting time may depend on your bank or payment provider.",
    },
  ];

  const requestItems = [
    "Customer name",
    "Order number",
    "Email address used for the order",
    "Reason for the cancellation request",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#172D57] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* DECORATIVE ELEMENTS */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-36 h-[380px] w-[380px] rounded-full border-[70px] border-white/[0.04]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-[8%] h-[350px] w-[350px] rounded-full border-[65px] border-[#3569C8]/10"
        />

        <div className="relative mx-auto max-w-[1120px]">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_330px]">
            {/* HERO COPY */}

            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                <ReceiptText size={14} className="text-[#AFC8FF]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                  ACV Plus Policies
                </span>
              </div>

              <h1 className="mt-7 max-w-[760px] font-serif text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[64px]">
                Order Cancellation
                <span className="block text-[#AFC8FF]">Policy</span>
              </h1>

              <p className="mt-6 max-w-[680px] text-[13px] leading-7 text-white/55 sm:text-[14px]">
                This policy explains when an ACV Plus order cancellation may be
                requested, what information to provide, and what happens after
                an order has entered fulfillment.
              </p>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                Last updated: September 19, 2026
              </p>
            </div>

            {/* HERO POLICY NOTE */}

            <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#183A7A]">
                <Clock3 size={18} strokeWidth={1.7} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC8FF]">
                Key Point
              </p>

              <h2 className="mt-2 font-serif text-[23px] font-semibold leading-tight text-white">
                Contact us before your order ships.
              </h2>

              <p className="mt-3 text-[11px] leading-6 text-white/50">
                Once an order has shipped, it can no longer be handled as a
                cancellation request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK SUMMARY
      ===================================================== */}

      <section className="relative z-10 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px] -translate-y-5">
          <div className="grid overflow-hidden rounded-[26px] border border-[#D6E2F7] bg-white shadow-[0_20px_60px_rgba(16,40,93,0.07)] md:grid-cols-3">
            {cancellationSummary.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`p-6 sm:p-7 ${
                    index !== cancellationSummary.length - 1
                      ? "border-b border-[#D6E2F7] md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Icon size={17} strokeWidth={1.7} />
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                        {item.label}
                      </p>

                      <p className="mt-1.5 text-[13px] font-bold text-[#10285D]">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[10px] leading-5 text-[#263B63]/50">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="px-5 pb-14 pt-5 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[340px_1fr] lg:gap-16">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              Cancellation Information
            </p>

            <h2 className="mt-4 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#10285D] sm:text-[40px]">
              Need to change
              <span className="block">your mind?</span>
            </h2>
          </div>

          <div className="border-l-2 border-[#AFC8FF] pl-6 sm:pl-8">
            <p className="text-[13px] leading-7 text-[#263B63]/65">
              Customers may request cancellation of an order before it has
              shipped. Because orders may move into fulfillment after they are
              placed, we recommend submitting your request as soon as possible.
            </p>

            <p className="mt-4 text-[13px] leading-7 text-[#263B63]/65">
              A cancellation request does not guarantee that an order can be
              stopped if fulfillment has already begun.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW CANCELLATION WORKS
      ===================================================== */}

      <section className="bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-[620px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              How It Works
            </p>

            <h2 className="mt-4 font-serif text-[34px] font-semibold tracking-[-0.035em] text-[#10285D] sm:text-[42px]">
              Three things to know.
            </h2>

            <p className="mt-4 text-[12px] leading-6 text-[#263B63]/55">
              Timing is important when requesting a cancellation or
              shipping-address change.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {/* STEP 1 */}

            <article className="group rounded-[24px] border border-[#D6E2F7] bg-[#FAFCFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,40,93,0.06)] sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183A7A] text-white">
                  <Clock3 size={19} strokeWidth={1.7} />
                </div>

                <span className="font-serif text-[30px] text-[#D6E2F7]">
                  01
                </span>
              </div>

              <h3 className="mt-7 font-serif text-[23px] font-semibold text-[#10285D]">
                Request Early
              </h3>

              <p className="mt-3 text-[11px] leading-6 text-[#263B63]/55">
                Contact ACV Plus as soon as possible after deciding that you
                want to cancel an order.
              </p>
            </article>

            {/* STEP 2 */}

            <article className="group rounded-[24px] border border-[#D6E2F7] bg-[#FAFCFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,40,93,0.06)] sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                  <PackageCheck size={19} strokeWidth={1.7} />
                </div>

                <span className="font-serif text-[30px] text-[#D6E2F7]">
                  02
                </span>
              </div>

              <h3 className="mt-7 font-serif text-[23px] font-semibold text-[#10285D]">
                Before Shipment
              </h3>

              <p className="mt-3 text-[11px] leading-6 text-[#263B63]/55">
                Cancellation and address-change requests can only be considered
                before shipment and may not be possible once fulfillment begins.
              </p>
            </article>

            {/* STEP 3 */}

            <article className="group rounded-[24px] border border-[#D6E2F7] bg-[#FAFCFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,40,93,0.06)] sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                  <RotateCcw size={19} strokeWidth={1.7} />
                </div>

                <span className="font-serif text-[30px] text-[#D6E2F7]">
                  03
                </span>
              </div>

              <h3 className="mt-7 font-serif text-[23px] font-semibold text-[#10285D]">
                Approved Refund
              </h3>

              <p className="mt-3 text-[11px] leading-6 text-[#263B63]/55">
                If cancellation is approved and payment has already been
                collected, the refund is returned to the original payment
                method.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          REQUEST REQUIREMENTS
      ===================================================== */}

      <section className="px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid overflow-hidden rounded-[28px] border border-[#D6E2F7] bg-white lg:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT */}

            <div className="bg-[#E8F1FF] p-7 sm:p-9 lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183A7A] text-white">
                <ReceiptText size={20} strokeWidth={1.7} />
              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Cancellation Request
              </p>

              <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#10285D]">
                What to include in your message.
              </h2>

              <p className="mt-4 text-[11px] leading-6 text-[#263B63]/55">
                Providing the correct order information helps us identify your
                request.
              </p>
            </div>

            {/* RIGHT */}

            <div className="p-7 sm:p-9 lg:p-10">
              <div className="space-y-4">
                {requestItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[15px] border border-[#D6E2F7] bg-[#FAFCFF] px-4 py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Check size={14} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#3569C8]">
                        Detail {String(index + 1).padStart(2, "0")}
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-[#10285D]">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="group mt-7 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#23458C] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#315FBA]"
              >
                Email Cancellation Request
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DETAILED POLICY
      ===================================================== */}

      <section className="bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              Policy Details
            </p>

            <h2 className="mt-4 font-serif text-[34px] font-semibold tracking-[-0.035em] text-[#10285D] sm:text-[42px]">
              Important information
            </h2>
          </div>

          <div className="mt-12 divide-y divide-[#D6E2F7] border-y border-[#D6E2F7]">
            {/* CANCELLATION REQUESTS */}

            <PolicySection
              number="01"
              title="Cancellation Requests"
              icon={Clock3}
            >
              <p>
                Customers may request an order cancellation before the order has
                shipped.
              </p>

              <p>
                To request cancellation, email{" "}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4"
                >
                  {BUSINESS_INFO.email}
                </a>{" "}
                as soon as possible and include your customer name, order
                number, email address used for the order, and the reason for
                your request.
              </p>
            </PolicySection>

            {/* FULFILLMENT */}

            <PolicySection
              number="02"
              title="Fulfillment and Shipment"
              icon={Truck}
            >
              <p>
                We cannot guarantee cancellation after an order has entered
                fulfillment.
              </p>

              <p>
                Once tracking has been issued or an order has shipped, the order
                can no longer be cancelled. Customers should review our{" "}
                <Link
                  to="/return-policy"
                  className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4"
                >
                  Return & Refund Policy
                </Link>{" "}
                for applicable return information.
              </p>
            </PolicySection>

            {/* REFUNDS */}

            <PolicySection
              number="03"
              title="Cancellation Refunds"
              icon={RotateCcw}
            >
              <p>
                If a cancellation is approved and payment has already been
                collected, the refund will be returned to the original payment
                method.
              </p>

              <p>
                Approved cancellation refunds are generally submitted within{" "}
                <strong className="font-semibold text-[#10285D]">
                  5–7 business days
                </strong>
                . Your bank or payment provider may require additional time to
                post the funds.
              </p>
            </PolicySection>

            {/* ACV PLUS CANCELLATION */}

            <PolicySection
              number="04"
              title="Cancellations by ACV Plus"
              icon={CircleAlert}
            >
              <p>
                ACV Plus may cancel an order when necessary, including because
                of unavailable inventory, pricing or listing errors, delivery
                restrictions, payment issues, or suspected fraudulent activity.
              </p>

              <p>
                If payment has already been collected for an order cancelled by
                ACV Plus, the applicable amount will be returned to the original
                payment method.
              </p>
            </PolicySection>

            {/* ADDRESS CHANGES */}

            <PolicySection
              number="05"
              title="Shipping Address Changes"
              icon={MapPin}
            >
              <p>
                Shipping-address changes should be requested before shipment and
                cannot be guaranteed once fulfillment has begun.
              </p>

              <p>
                Contact us as soon as possible if you notice an error in the
                shipping address associated with your order.
              </p>
            </PolicySection>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 rounded-[28px] border border-[#D6E2F7] bg-[#FAFCFF] p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183A7A] text-white">
                <ShieldCheck size={20} strokeWidth={1.7} />
              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Contact ACV Plus
              </p>

              <h2 className="mt-3 font-serif text-[31px] font-semibold leading-tight tracking-[-0.03em] text-[#10285D]">
                Questions about an order?
              </h2>

              <p className="mt-4 max-w-[390px] text-[11px] leading-6 text-[#263B63]/55">
                Contact our customer support team with your order information
                and question.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ContactItem
                icon={Mail}
                label="Email"
                value={BUSINESS_INFO.email}
                href={`mailto:${BUSINESS_INFO.email}`}
              />

              <ContactItem
                icon={Phone}
                label="Phone"
                value={BUSINESS_INFO.phoneDisplay}
                href={`tel:${BUSINESS_INFO.phoneHref}`}
              />

              <ContactItem
                icon={MapPin}
                label="Business Address"
                value={BUSINESS_INFO.address}
              />

              <ContactItem
                icon={ReceiptText}
                label="Descriptor"
                value={BUSINESS_INFO.descriptor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[30px] bg-[#172D57] px-6 py-10 sm:px-9 sm:py-12 lg:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[55px] border-white/[0.04]"
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                Need Assistance?
              </p>

              <h2 className="mt-3 font-serif text-[29px] font-semibold text-white sm:text-[34px]">
                Need to cancel an order?
              </h2>

              <p className="mt-3 max-w-[560px] text-[11px] leading-6 text-white/50">
                Contact us as soon as possible before the order enters shipment.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-all duration-300 hover:bg-[#E8F1FF] md:w-auto"
            >
              Contact Us
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   POLICY SECTION
========================================================= */

const PolicySection = ({ number, title, icon: Icon, children }) => {
  return (
    <article className="grid gap-5 py-8 sm:grid-cols-[75px_1fr] sm:py-10">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
          <Icon size={18} strokeWidth={1.7} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
            {number}
          </span>

          <span className="h-px w-7 bg-[#C5D7FF]" />
        </div>

        <h3 className="mt-2 font-serif text-[24px] font-semibold tracking-[-0.02em] text-[#10285D]">
          {title}
        </h3>

        <div className="mt-4 space-y-3 text-[12px] leading-7 text-[#263B63]/60">
          {children}
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   CONTACT ITEM
========================================================= */

const ContactItem = ({ icon: Icon, label, value, href }) => {
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
        <Icon size={15} strokeWidth={1.7} />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#3569C8]">
          {label}
        </p>

        <p className="mt-1 break-words text-[10px] font-semibold leading-5 text-[#10285D]">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-start gap-3 rounded-[16px] border border-[#D6E2F7] bg-white p-4 transition-colors hover:border-[#AFC8FF]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-[16px] border border-[#D6E2F7] bg-white p-4">
      {content}
    </div>
  );
};

export default OrderCancellationPolicy;
