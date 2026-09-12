import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "Ziveline LLC",
  address: "2125 Strawberry Rd, Pasadena, TX 77502",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  email: "info@ziveline.com",
  businessDays: "Monday – Friday",
  supportHours: "9:00 AM – 5:00 PM Central Time",
};

const ReturnPolicy = () => {
  const eligible = [
    "Unused and unworn",
    "Unwashed and unaltered",
    "Free from stains, odors, scratches, or customer-caused damage",
    "Original tags, accessories, and packaging are included",
    "Order number or proof of purchase is provided",
    "Return is requested within 30 days of confirmed delivery",
  ];

  const notEligible = [
    "Used, worn, washed, altered, or customer-damaged products",
    "Products missing tags, accessories, components, or original packaging",
    "Products showing misuse, improper cleaning, or ordinary wear",
    "Products returned more than 30 days after delivery",
    "Products mailed without authorization",
    "Products not purchased directly from Ziveline",
  ];

  const steps = [
    {
      title: "Request a return",
      description:
        "Contact our support team within 30 days of confirmed delivery and provide your order number and return reason.",
    },
    {
      title: "Receive authorization",
      description:
        "If approved, we will provide return instructions. Do not mail a product before authorization is provided.",
    },
    {
      title: "Ship the return",
      description:
        "Send the authorized product as instructed and retain your tracking number and shipping receipt.",
    },
    {
      title: "Refund processed",
      description:
        "After inspection and approval, the refund is issued to the original payment method within 5–7 business days.",
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* HERO */}
      <section className="border-b border-line bg-ink px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-paper text-ink">
            <RotateCcw size={24} aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
            Return &amp; Refund Policy
          </h1>

          <p className="mt-4 text-sm text-paper/60">
            Last updated: September 11, 2026
          </p>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-ink">
            30-Day Return Window
          </h2>

          <p className="mt-4 text-sm leading-7 text-ink/60">
            {BUSINESS_INFO.businessName} accepts eligible returns requested
            within 30 days of confirmed delivery. Products must meet the return
            conditions described below.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={19}
                className="text-emerald-600"
                aria-hidden="true"
              />

              <h3 className="text-sm font-bold text-emerald-800">
                Eligible for Return
              </h3>
            </div>

            <ul className="mt-4 space-y-2.5">
              {eligible.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-5 text-emerald-800"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-2">
              <XCircle
                size={19}
                className="text-red-600"
                aria-hidden="true"
              />

              <h3 className="text-sm font-bold text-red-800">
                May Not Be Eligible
              </h3>
            </div>

            <ul className="mt-4 space-y-2.5">
              {notEligible.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-5 text-red-800"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RETURN STEPS */}
      <section className="bg-[#F4F1EB] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl text-ink">
            How to Return an Item
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="border border-line bg-paper p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center bg-ink text-sm font-bold text-paper">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-sm font-bold text-ink">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-ink/50">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICY DETAILS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-ink/60">
          {/* RETURN ELIGIBILITY */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Return Eligibility
            </h2>

            <p className="mt-3">
              To qualify for a return, the product must be unused and unworn,
              unwashed and unaltered, free from stains, odors, scratches, or
              customer-caused damage, and returned with its original tags,
              accessories, and packaging.
            </p>

            <p className="mt-3">
              The return must also be accompanied by the order number or proof
              of purchase.
            </p>

            <p className="mt-3">
              Products returned without authorization or outside the return
              period may be refused.
            </p>
          </section>

          {/* STARTING A RETURN */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Starting a Return
            </h2>

            <p className="mt-3">
              Before mailing a return, contact our support team using the
              following details:
            </p>

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
            </div>

            <p className="mt-4">Please provide:</p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Customer name.</li>
              <li>Order number.</li>
              <li>Product being returned.</li>
              <li>Reason for return.</li>
              <li>
                Photographs if the item is damaged, defective, or incorrect.
              </li>
            </ul>

            <p className="mt-3">
              If approved, we will provide return instructions. Do not mail a
              product until return authorization has been provided.
            </p>
          </section>

          {/* RETURN ADDRESS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Return Address
            </h2>

            <p className="mt-3">
              Authorized returns should be sent as instructed to:
            </p>

            <div className="mt-3 space-y-1">
              <p className="font-medium text-ink">
                {BUSINESS_INFO.businessName}
              </p>
              <p>2125 Strawberry Rd</p>
              <p>Pasadena, TX 77502</p>
              <p>United States</p>
            </div>

            <p className="mt-3">
              The customer should retain the return tracking number and
              shipping receipt until the refund is completed.
            </p>
          </section>

          {/* CHANGE OF MIND */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Change-of-Mind Returns
            </h2>

            <p className="mt-3">
              If a customer changes their mind, orders the wrong item, or no
              longer wants the product:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                The customer is responsible for return-shipping costs.
              </li>
              <li>The return shipment should include tracking.</li>
              <li>
                Ziveline is not responsible for a return lost before it reaches
                us.
              </li>
              <li>
                The product must satisfy all return-eligibility requirements.
              </li>
            </ul>
          </section>

          {/* DAMAGED ITEMS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Damaged, Defective, or Incorrect Products
            </h2>

            <p className="mt-3">
              A damaged, defective, or incorrect product should be reported
              within <strong className="text-ink">48 hours of delivery</strong>.
            </p>

            <p className="mt-3">
              The customer should provide photographs of:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>The product.</li>
              <li>The packaging.</li>
              <li>The shipping label.</li>
              <li>The damaged or incorrect area.</li>
            </ul>

            <p className="mt-3">
              After verification, Ziveline will provide appropriate return
              instructions and cover reasonable return-shipping costs.
            </p>
          </section>

          {/* EXCHANGES */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Exchanges
            </h2>

            <p className="mt-3">
              We do <strong className="text-ink">not offer direct exchanges</strong>.
            </p>

            <p className="mt-3">
              A customer who wants another color, style, or product may return
              the eligible original product for a refund and place a separate
              order.
            </p>
          </section>

          {/* RESTOCKING FEES */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Restocking Fees
            </h2>

            <p className="mt-3">
              Ziveline does{" "}
              <strong className="text-ink">
                not charge a restocking fee
              </strong>{" "}
              for an eligible return.
            </p>
          </section>

          {/* NON RETURNABLE */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Non-Returnable Products
            </h2>

            <p className="mt-3">
              A return may be refused if the product:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Was used, worn, washed, altered, or damaged after delivery.
              </li>
              <li>
                Is missing tags, accessories, components, or original
                packaging.
              </li>
              <li>
                Shows signs of misuse, improper cleaning, or ordinary wear.
              </li>
              <li>Is returned more than 30 days after delivery.</li>
              <li>Was mailed without authorization.</li>
              <li>Was not purchased directly from Ziveline.</li>
            </ul>

            <p className="mt-3">
              These exclusions do not limit legal rights concerning defective
              or misrepresented products.
            </p>
          </section>

          {/* RETURN INSPECTION */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Return Inspection
            </h2>

            <p className="mt-3">
              Returned products are inspected after receipt. We will notify the
              customer whether the return has been approved or rejected.
            </p>

            <p className="mt-3">
              If a return does not meet the stated conditions, we will explain
              the reason and may ask the customer to pay for shipment of the
              product back to them.
            </p>
          </section>

          {/* REFUND TIMING */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Refund Timing
            </h2>

            <p className="mt-3">
              Approved refunds are issued to the{" "}
              <strong className="text-ink">original payment method within 5–7 business days after inspection</strong>.
            </p>

            <p className="mt-3">
              The customer’s bank or card issuer may require additional time to
              post the credit. Ziveline does not control financial-institution
              posting times.
            </p>

            <p className="mt-3">
              Shipping charges paid for expedited or optional delivery
              services, if any, are not refundable unless the return resulted
              from our error or applicable law requires otherwise.
            </p>
          </section>

          {/* LATE REFUNDS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Late or Missing Refunds
            </h2>

            <p className="mt-3">
              If an approved refund does not appear:
            </p>

            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Review the original payment account.</li>
              <li>Contact the bank or card issuer.</li>
              <li>Allow for the institution’s processing period.</li>
              <li>
                Contact{" "}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-medium text-ink underline underline-offset-2"
                >
                  {BUSINESS_INFO.email}
                </a>{" "}
                if the refund still cannot be located.
              </li>
            </ol>
          </section>

          {/* REFUSED ORDERS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Refused and Undeliverable Orders
            </h2>

            <p className="mt-3">
              Packages returned because of refusal, an inaccurate address, or
              repeated failed delivery may be processed under this policy.
            </p>

            <p className="mt-3">
              Actual carrier costs caused by refusal or inaccurate customer
              information may be deducted from the refund where legally
              permitted.
            </p>
          </section>

          {/* CHARGE QUESTIONS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Charge and Order Questions
            </h2>

            <p className="mt-3">
              Contact us before initiating a payment dispute so we can
              investigate the order promptly. This request does not restrict
              any rights a customer may have through their card issuer or
              applicable law.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Contact
            </h2>

            <div className="mt-3 space-y-1">
              <p className="font-medium text-ink">
                {BUSINESS_INFO.businessName}
              </p>
              <p>2125 Strawberry Rd</p>
              <p>Pasadena, TX 77502</p>
              <p>United States</p>

              <p className="pt-2">
                Email:{" "}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-medium text-ink transition-opacity hover:opacity-70"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>

              <p>
                Phone:{" "}
                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="font-medium text-ink transition-opacity hover:opacity-70"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>

              <p>
                Support Hours: {BUSINESS_INFO.businessDays},{" "}
                {BUSINESS_INFO.supportHours}
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 border border-line bg-ink p-10 text-center text-paper sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl">
              Need to start a return?
            </h3>

            <p className="mt-1 text-sm text-paper/60">
              Contact our support team before mailing your return.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 bg-paper px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-[#EFE9DE]"
          >
            Contact Support
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ReturnPolicy;