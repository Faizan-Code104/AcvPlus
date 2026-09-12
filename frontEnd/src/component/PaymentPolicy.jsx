import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "Ziveline LLC",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  email: "info@ziveline.com",
  businessDays: "Monday – Friday",
  supportHours: "9:00 AM – 5:00 PM Central Time",
};

const PaymentPolicy = () => {
  const paymentDetails = [
    {
      label: "Payment Type",
      value: "Online Electronic Payments",
    },
    {
      label: "Currency",
      value: "United States Dollars (USD)",
    },
    {
      label: "Purchases",
      value: "One-Time Purchases",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* HERO */}
      <section className="border-b border-line bg-ink px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-paper text-ink">
            <CreditCard size={24} aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h1 className="mt-3 font-display text-4xl leading-tight text-paper sm:text-5xl">
            Payment Policy
          </h1>

          <p className="mt-4 text-sm text-paper/60">
            Last updated: September 11, 2026
          </p>
        </div>
      </section>

      {/* PAYMENT SUMMARY */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-ink">
              Payment Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink/60 sm:text-[15px]">
              Ziveline accepts online electronic payments only through the
              payment methods displayed at checkout. Our online payment setup
              is currently being completed.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {paymentDetails.map((item) => (
              <div
                key={item.label}
                className="border border-line bg-[#F4F1EB] p-5 sm:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/40">
                  {item.label}
                </p>

                <p className="mt-2 text-base font-bold text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY STRIP */}
      <section className="bg-[#F4F1EB] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="border border-line bg-paper p-6">
            <div className="flex h-11 w-11 items-center justify-center bg-ink text-paper">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>

            <h2 className="mt-4 font-display text-2xl text-ink">
              Secure Payment Processing
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              Once online payments are activated, transactions will be
              processed by an authorized third-party payment processor.
              Ziveline will not intentionally store complete card numbers or
              card security codes on its own systems.
            </p>
          </div>

          <div className="border border-line bg-paper p-6">
            <div className="flex h-11 w-11 items-center justify-center bg-ink text-paper">
              <CircleDollarSign size={20} aria-hidden="true" />
            </div>

            <h2 className="mt-4 font-display text-2xl text-ink">
              No Recurring Charges
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              Ziveline sells products through one-time purchases. Customers
              are not automatically enrolled in recurring product
              subscriptions.
            </p>
          </div>
        </div>
      </section>

      {/* POLICY DETAILS */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-ink/60">
          {/* ONLINE PAYMENTS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Online Payments Only
            </h2>

            <p className="mt-3">
              Ziveline accepts online electronic payments only through the
              payment methods displayed at checkout.
            </p>

            <p className="mt-3">We do not accept:</p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Cash on Delivery.</li>
              <li>Payment by cash through the mail.</li>
              <li>Personal checks.</li>
              <li>
                Telephone collection of complete payment-card details.
              </li>
            </ul>
          </section>

          {/* CURRENT STATUS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Current Payment Status
            </h2>

            <p className="mt-3">
              Ziveline is currently completing its secure online payment
              setup.
            </p>

            <p className="mt-3">
              Until an active payment method is displayed at checkout and
              payment is successfully authorized, no completed online purchase
              will be accepted and no card payment will be collected through
              the website.
            </p>
          </section>

          {/* CURRENCY */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Currency
            </h2>

            <p className="mt-3">
              All product prices and transactions are stated in{" "}
              <strong className="text-ink">
                United States dollars (USD)
              </strong>
              .
            </p>

            <p className="mt-3">
              Applicable sales tax will be calculated and disclosed at
              checkout where required.
            </p>
          </section>

          {/* PAYMENT PROCESSING */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Payment Processing
            </h2>

            <p className="mt-3">
              Once online payments are activated, transactions will be
              processed by an authorized third-party payment processor.
            </p>

            <p className="mt-3">
              Ziveline will not intentionally store complete card numbers or
              card security codes on its own systems. Customers should never
              send complete card information through email, contact forms, or
              voicemail.
            </p>
          </section>

          {/* AUTHORIZATION */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Authorization
            </h2>

            <p className="mt-3">
              Submitting payment authorizes the payment processor to verify and
              charge the selected payment method for the total amount displayed
              at checkout.
            </p>

            <p className="mt-3">
              An authorization does not guarantee acceptance. Orders remain
              subject to payment approval, inventory availability, fraud
              review, and order confirmation.
            </p>
          </section>

          {/* ONE-TIME PURCHASES */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              One-Time Purchases
            </h2>

            <p className="mt-3">
              Ziveline sells products through one-time purchases. We do not
              automatically enroll product customers in recurring
              subscriptions.
            </p>

            <p className="mt-3">
              Any future recurring service would require separate, clear
              disclosure and express customer authorization before billing.
            </p>
          </section>

          {/* BILLING DESCRIPTOR */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Billing Descriptor
            </h2>

            <p className="mt-3">
              Once payment processing is activated, the exact
              processor-approved billing descriptor will be displayed at
              checkout or in the order confirmation.
            </p>

            <p className="mt-3">
              The descriptor will identify the charge as associated with
              Ziveline LLC or the Ziveline brand.
            </p>
          </section>

          {/* DECLINED PAYMENTS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Declined Payments
            </h2>

            <p className="mt-3">
              A payment may be declined by the card issuer, payment processor,
              or fraud-prevention system. Customers should verify their
              information or contact their financial institution.
            </p>

            <p className="mt-3">
              Ziveline does not control issuer decline decisions.
            </p>
          </section>

          {/* REFUNDS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Refunds
            </h2>

            <p className="mt-3">
              Approved refunds are returned to the original payment method in
              accordance with our{" "}
              <Link
                to="/return-policy"
                className="font-bold text-ink underline underline-offset-2"
              >
                Return and Refund Policy
              </Link>
              .
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Contact
            </h2>

            <div className="mt-3 space-y-1">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-medium text-ink underline underline-offset-2 transition-opacity hover:opacity-70"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>

              <p>
                Phone:{" "}
                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="font-medium text-ink underline underline-offset-2 transition-opacity hover:opacity-70"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>

              <p>
                Hours: {BUSINESS_INFO.businessDays},{" "}
                {BUSINESS_INFO.supportHours}
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 border border-line bg-ink p-6 text-paper sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h3 className="font-display text-2xl">
              Have a payment question?
            </h3>

            <p className="mt-2 text-sm leading-6 text-paper/60">
              Contact our support team for assistance.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 bg-paper px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-[#EFE9DE] md:w-auto"
          >
            Contact Us
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PaymentPolicy;