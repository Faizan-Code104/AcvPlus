import React from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BadgeDollarSign,
  Ban,
  Check,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileText,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

/* =========================================================
   ACV PLUS — PAYMENT POLICY
========================================================= */

const BUSINESS_INFO = {
  brandName: "ACV Plus",
  descriptor: "Sophia Strategic Travisions LLC",
  email: "Support@acvplus.us",
  phoneDisplay: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
};

const PaymentPolicy = () => {
  const paymentSummary = [
    {
      icon: CreditCard,
      label: "Current Status",
      value: "Payment Setup In Progress",
    },
    {
      icon: BadgeDollarSign,
      label: "Currency",
      value: "United States Dollars (USD)",
    },
    {
      icon: CircleDollarSign,
      label: "Purchase Type",
      value: "One-Time Purchases",
    },
  ];

  const unavailableMethods = [
    "Cash on Delivery (COD)",
    "Cash sent through the mail",
    "Personal checks",
    "Payment-card details sent by email",
    "Payment-card details submitted through contact forms",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-white px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        {/* DECORATIVE BACKGROUND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[170px] -top-[190px] h-[470px] w-[470px] rounded-full border-[85px] border-[#E8F1FF]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[230px] -left-[180px] h-[470px] w-[470px] rounded-full border-[90px] border-[#F1F6FF]"
        />

        <div className="relative mx-auto max-w-[1120px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_390px] lg:gap-16">
            {/* HERO CONTENT */}

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#3569C8]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                  ACV Plus Policies
                </p>
              </div>

              <h1 className="mt-6 max-w-[680px] font-serif text-[44px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#10285D] sm:text-[56px] lg:text-[66px]">
                Payment
                <span className="block text-[#3569C8]">Policy</span>
              </h1>

              <p className="mt-6 max-w-[650px] text-[13px] leading-7 text-[#263B63]/60">
                This policy explains the current payment status of ACV Plus, how
                payments will be handled when online payment processing becomes
                available, and important information about billing, refunds, and
                payment security.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <Clock3 size={14} className="text-[#3569C8]" />

                  <span className="text-[9px] font-semibold text-[#263B63]/45">
                    Updated September 19, 2026
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#3569C8]" />

                  <span className="text-[9px] font-semibold text-[#263B63]/45">
                    United States
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT VISUAL */}

            <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center lg:mx-0">
              <div className="relative flex aspect-square w-full items-center justify-center rounded-full bg-[#E8F1FF]">
                <div className="absolute inset-[28px] rounded-full border border-[#C5D7FF]" />

                <div className="absolute inset-[58px] rounded-full bg-white shadow-[0_25px_60px_rgba(16,40,93,0.08)]" />

                <div className="relative flex h-[105px] w-[105px] items-center justify-center rounded-full bg-[#183A7A] text-white shadow-[0_20px_45px_rgba(24,58,122,0.22)]">
                  <WalletCards size={40} strokeWidth={1.4} />
                </div>

                <div className="absolute right-[12%] top-[19%] flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#3569C8] shadow-md">
                  <ShieldCheck size={18} />
                </div>

                <div className="absolute bottom-[15%] left-[9%] flex h-10 w-10 items-center justify-center rounded-full bg-[#3569C8] text-white shadow-md">
                  <LockKeyhole size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CURRENT PAYMENT STATUS
      ===================================================== */}

      <section className="px-5 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="relative overflow-hidden rounded-[28px] bg-[#172D57] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[55px] border-white/[0.04]"
            />

            <div className="relative grid gap-7 lg:grid-cols-[80px_1fr] lg:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[#AFC8FF]">
                <CreditCard size={24} strokeWidth={1.5} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                  Current Payment Status
                </p>

                <h2 className="mt-3 font-serif text-[28px] font-semibold leading-tight sm:text-[34px]">
                  Online payment processing is currently being set up.
                </h2>

                <p className="mt-4 max-w-[780px] text-[12px] leading-6 text-white/55">
                  ACV Plus is currently completing its online payment setup.
                  Until an active payment method is displayed at checkout and a
                  transaction can be successfully authorized, the website will
                  not collect card payments for completed online purchases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PAYMENT SUMMARY
      ===================================================== */}

      <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-4 md:grid-cols-3">
            {paymentSummary.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="relative overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>

                    <span className="font-serif text-[26px] text-[#D6E2F7]">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                    {item.label}
                  </p>

                  <h3 className="mt-2 font-serif text-[20px] font-semibold leading-snug text-[#10285D]">
                    {item.value}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHEN PAYMENTS BECOME AVAILABLE
      ===================================================== */}

      <section className="bg-[#E8F1FF] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183A7A] text-white">
              <ShieldCheck size={20} strokeWidth={1.6} />
            </div>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              Payment Processing
            </p>

            <h2 className="mt-4 font-serif text-[33px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#10285D] sm:text-[39px]">
              When online payments become available.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={CreditCard}
              title="Checkout Methods"
              text="Customers will only use payment methods that are clearly displayed and available at checkout."
            />

            <FeatureCard
              icon={ShieldCheck}
              title="Payment Processor"
              text="Online transactions will be handled through the payment-processing service connected to the ACV Plus checkout."
            />

            <FeatureCard
              icon={LockKeyhole}
              title="Card Information"
              text="Customers should never send complete payment-card numbers or card security codes through email, contact forms, or voicemail."
            />

            <FeatureCard
              icon={ReceiptText}
              title="Order Confirmation"
              text="A successful payment does not by itself guarantee fulfillment. Orders remain subject to confirmation, availability, and applicable review."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          POLICY DETAILS
      ===================================================== */}

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[980px]">
          <div className="max-w-[650px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              Detailed Information
            </p>

            <h2 className="mt-4 font-serif text-[35px] font-semibold tracking-[-0.035em] text-[#10285D] sm:text-[43px]">
              Understanding payments
            </h2>

            <p className="mt-4 text-[12px] leading-6 text-[#263B63]/50">
              The following sections explain how payment-related matters are
              handled on ACV Plus.
            </p>
          </div>

          <div className="mt-12 divide-y divide-[#D6E2F7] border-y border-[#D6E2F7]">
            {/* CURRENT PAYMENT STATUS */}

            <PolicySection
              number="01"
              icon={CreditCard}
              title="Current Payment Status"
            >
              <p>ACV Plus is currently completing its online payment setup.</p>

              <p>
                Until an active payment method is displayed at checkout and
                payment can be successfully authorized, no card payment will be
                collected through the website for a completed online purchase.
              </p>
            </PolicySection>

            {/* PAYMENT METHODS */}

            <PolicySection
              number="02"
              icon={WalletCards}
              title="Payment Methods"
            >
              <p>
                When online payment processing is activated, ACV Plus will
                accept only the payment methods that are displayed as available
                at checkout.
              </p>

              <p>
                The availability of a particular payment method may depend on
                the payment processor and checkout configuration in use at the
                time of purchase.
              </p>
            </PolicySection>

            {/* CURRENCY */}

            <PolicySection
              number="03"
              icon={BadgeDollarSign}
              title="Currency and Pricing"
            >
              <p>
                All prices displayed on ACV Plus are stated in{" "}
                <strong className="font-semibold text-[#10285D]">
                  United States dollars (USD)
                </strong>
                .
              </p>

              <p>
                Any applicable taxes, shipping charges, or other amounts will be
                shown during checkout when applicable.
              </p>
            </PolicySection>

            {/* AUTHORIZATION */}

            <PolicySection
              number="04"
              icon={ShieldCheck}
              title="Payment Authorization"
            >
              <p>
                Once online payments are active, submitting a payment will
                authorize the applicable payment processor to verify and process
                the selected payment method for the amount shown at checkout.
              </p>

              <p>
                A payment authorization does not guarantee order fulfillment.
                Orders remain subject to confirmation, product availability,
                applicable payment review, and fraud-prevention checks.
              </p>
            </PolicySection>

            {/* ONE TIME */}

            <PolicySection
              number="05"
              icon={CircleDollarSign}
              title="One-Time Purchases"
            >
              <p>
                Products currently offered by ACV Plus are intended as one-time
                purchases.
              </p>

              <p>
                Customers are not automatically enrolled in recurring product
                subscriptions through the current store.
              </p>

              <p>
                If a subscription or recurring billing option is offered in the
                future, its terms and billing frequency will be clearly
                disclosed before the customer agrees to it.
              </p>
            </PolicySection>

            {/* DECLINES */}

            <PolicySection
              number="06"
              icon={Ban}
              title="Declined or Unsuccessful Payments"
            >
              <p>
                Once payment processing is active, a transaction may be declined
                or unsuccessful because of the card issuer, payment processor,
                incorrect billing information, insufficient authorization, or
                fraud-prevention controls.
              </p>

              <p>
                Customers may need to verify their payment information or
                contact their card issuer or financial institution when a
                payment is declined.
              </p>
            </PolicySection>

            {/* BILLING DESCRIPTOR */}

            <PolicySection
              number="07"
              icon={FileText}
              title="Billing Descriptor"
            >
              <p>
                The legal business descriptor associated with ACV Plus is{" "}
                <strong className="font-semibold text-[#10285D]">
                  {BUSINESS_INFO.descriptor}
                </strong>
                .
              </p>

              <p>
                The exact text that appears on a bank or card statement may be
                determined by the payment processor and will be communicated
                through checkout or order information when payment processing is
                active.
              </p>
            </PolicySection>

            {/* REFUNDS */}

            <PolicySection number="08" icon={CircleDollarSign} title="Refunds">
              <p>
                When payment processing is active, approved refunds will
                generally be returned to the original payment method used for
                the applicable transaction.
              </p>

              <p>
                Eligibility and other refund conditions are governed by our{" "}
                <Link
                  to="/return-policy"
                  className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4"
                >
                  Return & Refund Policy
                </Link>
                .
              </p>
            </PolicySection>
          </div>
        </div>
      </section>

      {/* =====================================================
          NOT ACCEPTED
      ===================================================== */}

      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] overflow-hidden rounded-[28px] border border-[#D6E2F7] bg-white lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-[#F1F6FF] p-7 sm:p-9 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183A7A] text-white">
              <Ban size={20} strokeWidth={1.7} />
            </div>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
              Payment Safety
            </p>

            <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#10285D]">
              Payment methods we do not accept.
            </h2>

            <p className="mt-4 text-[11px] leading-6 text-[#263B63]/50">
              Do not send sensitive card information through email or other
              customer-support communication.
            </p>
          </div>

          <div className="p-7 sm:p-9 lg:p-10">
            <div className="space-y-3">
              {unavailableMethods.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[14px] border border-[#D6E2F7] bg-[#FAFCFF] px-4 py-3.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <Ban size={12} />
                  </div>

                  <span className="text-[10px] font-semibold leading-5 text-[#263B63]/65">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS INFORMATION
      ===================================================== */}

      <section className="bg-[#E8F1FF] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-9 lg:grid-cols-[330px_1fr] lg:gap-14">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Payment Questions
              </p>

              <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight tracking-[-0.03em] text-[#10285D]">
                Contact ACV Plus
              </h2>

              <p className="mt-4 text-[11px] leading-6 text-[#263B63]/50">
                Contact us if you have a question about payment information or
                an ACV Plus order.
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

      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[30px] bg-[#172D57] px-6 py-10 text-white sm:px-9 sm:py-12 lg:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[55px] border-white/[0.04]"
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                ACV Plus Support
              </p>

              <h2 className="mt-3 font-serif text-[29px] font-semibold sm:text-[34px]">
                Have a payment question?
              </h2>

              <p className="mt-3 max-w-[570px] text-[11px] leading-6 text-white/50">
                Our support team can assist with questions about payment
                information, orders, refunds, and checkout.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-colors hover:bg-[#E8F1FF] md:w-auto"
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
   FEATURE CARD
========================================================= */

const FeatureCard = ({ icon: Icon, title, text }) => {
  return (
    <article className="rounded-[20px] border border-[#C5D7FF] bg-white p-5 sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F6FF] text-[#183A7A]">
        <Icon size={17} strokeWidth={1.7} />
      </div>

      <h3 className="mt-5 font-serif text-[20px] font-semibold text-[#10285D]">
        {title}
      </h3>

      <p className="mt-2.5 text-[10px] leading-6 text-[#263B63]/50">{text}</p>
    </article>
  );
};

/* =========================================================
   POLICY SECTION
========================================================= */

const PolicySection = ({ number, icon: Icon, title, children }) => {
  return (
    <article className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] sm:py-10">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
          <Icon size={17} strokeWidth={1.7} />
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
        className="flex items-start gap-3 rounded-[16px] border border-[#C5D7FF] bg-white p-4 transition-colors hover:border-[#3569C8]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-[16px] border border-[#C5D7FF] bg-white p-4">
      {content}
    </div>
  );
};

export default PaymentPolicy;
