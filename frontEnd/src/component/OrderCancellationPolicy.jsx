import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Ban,
  Clock3,
  PackageCheck,
  RotateCcw,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "Ziveline LLC",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  email: "info@ziveline.com",
  businessDays: "Monday – Friday",
  supportHours: "9:00 AM – 5:00 PM Central Time",
};

const OrderCancellationPolicy = () => {
  const cancellationDetails = [
    {
      label: "Cancellation Window",
      value: "Before Shipment",
    },
    {
      label: "Refund Method",
      value: "Original Payment Method",
    },
    {
      label: "Refund Submission",
      value: "5–7 Business Days",
    },
  ];

  const requestItems = [
    "Customer name",
    "Order number",
    "Email address used for the order",
    "Reason for cancellation",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* HERO */}
      <section className="border-b border-line bg-ink px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-paper text-ink">
            <Ban size={24} aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h1 className="mt-3 font-display text-4xl leading-tight text-paper sm:text-5xl">
            Order Cancellation Policy
          </h1>

          <p className="mt-4 text-sm text-paper/60">
            Last updated: September 11, 2026
          </p>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-ink">
              Cancellation Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink/60 sm:text-[15px]">
              Customers may request an order cancellation before the order has
              shipped. Cancellation requests should be submitted as soon as
              possible.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cancellationDetails.map((item) => (
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

      {/* CANCELLATION FLOW */}
      <section className="bg-[#F4F1EB] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          <div className="border border-line bg-paper p-6">
            <div className="flex h-11 w-11 items-center justify-center bg-ink text-paper">
              <Clock3 size={20} aria-hidden="true" />
            </div>

            <h3 className="mt-4 font-display text-xl text-ink">
              Request Early
            </h3>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              Contact us as soon as possible before the order enters shipment
              or tracking is issued.
            </p>
          </div>

          <div className="border border-line bg-paper p-6">
            <div className="flex h-11 w-11 items-center justify-center bg-ink text-paper">
              <PackageCheck size={20} aria-hidden="true" />
            </div>

            <h3 className="mt-4 font-display text-xl text-ink">
              Before Shipment
            </h3>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              Cancellation and address-change requests are available only
              before shipment and cannot be guaranteed after fulfillment
              begins.
            </p>
          </div>

          <div className="border border-line bg-paper p-6">
            <div className="flex h-11 w-11 items-center justify-center bg-ink text-paper">
              <RotateCcw size={20} aria-hidden="true" />
            </div>

            <h3 className="mt-4 font-display text-xl text-ink">
              Refund
            </h3>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              Approved cancellations are refunded to the original payment
              method.
            </p>
          </div>
        </div>
      </section>

      {/* POLICY DETAILS */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-ink/60">
          <section>
            <h2 className="font-display text-2xl text-ink">
              Cancellation Requests
            </h2>

            <p className="mt-3">
              Customers may request an order cancellation before the order has
              shipped.
            </p>

            <p className="mt-3">
              To request cancellation, contact{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="font-bold text-ink underline underline-offset-2"
              >
                {BUSINESS_INFO.email}
              </a>{" "}
              as soon as possible and include:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {requestItems.map((item) => (
                <li key={item}>{item}.</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Fulfillment and Shipment
            </h2>

            <p className="mt-3">
              We cannot guarantee cancellation after an order has entered
              fulfillment.
            </p>

            <p className="mt-3">
              Once tracking has been issued or the order has shipped, the
              customer must follow our{" "}
              <Link
                to="/return-policy"
                className="font-bold text-ink underline underline-offset-2"
              >
                Return and Refund Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Cancellation Refunds
            </h2>

            <p className="mt-3">
              Approved cancellations are refunded to the original payment
              method.
            </p>

            <p className="mt-3">
              The refund is generally submitted within{" "}
              <strong className="text-ink">5–7 business days</strong>, although
              the customer’s bank may require additional posting time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Cancellations by Ziveline
            </h2>

            <p className="mt-3">
              If Ziveline cancels an order because of unavailable inventory, a
              pricing error, delivery restrictions, payment problems, or
              suspected fraud, any collected payment for the canceled products
              will be returned to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Shipping Address Changes
            </h2>

            <p className="mt-3">
              Shipping-address changes are also available only before shipment
              and cannot be guaranteed after fulfillment begins.
            </p>

            <p className="mt-3">
              Customers should contact us immediately if an address correction
              is needed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Contact
            </h2>

            <div className="mt-3 space-y-1">
              <p className="font-medium text-ink">
                {BUSINESS_INFO.businessName}
              </p>

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
              Need to cancel an order?
            </h3>

            <p className="mt-2 text-sm leading-6 text-paper/60">
              Contact us as soon as possible before your order ships.
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

export default OrderCancellationPolicy;