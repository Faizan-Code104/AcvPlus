import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Package,
  Truck,
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

const ShippingPolicy = () => {
  const shippingDetails = [
    {
      label: "Shipping Area",
      value: "Contiguous 48 U.S. States",
    },
    {
      label: "Order Processing",
      value: "1–2 business days",
    },
    {
      label: "Shipping Cost",
      value: "Free Standard Shipping",
    },
  ];

  const steps = [
    {
      icon: Package,
      title: "Order Accepted",
      description:
        "After payment authorization and order acceptance, your order enters processing.",
    },
    {
      icon: Clock3,
      title: "Order Processing",
      description:
        "Orders are normally processed within 1–2 business days, excluding weekends and federal holidays.",
    },
    {
      icon: Truck,
      title: "In Transit",
      description:
        "After processing, standard delivery normally takes 3–7 business days through a recognized third-party carrier.",
    },
    {
      icon: MapPin,
      title: "Delivery",
      description:
        "Your order is delivered to the complete and accurate shipping address provided during checkout.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* HERO */}
      <section className="border-b border-line bg-ink px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-paper text-ink">
            <Truck size={24} aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h1 className="mt-3 font-display text-4xl leading-tight text-paper sm:text-5xl">
            Shipping Policy
          </h1>

          <p className="mt-4 text-sm text-paper/60">
            Last updated: September 11, 2026
          </p>
        </div>
      </section>

      {/* SHIPPING SUMMARY */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-ink">
              Shipping Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink/60 sm:text-[15px]">
              This Shipping Policy applies to physical products purchased from{" "}
              {BUSINESS_INFO.businessName} through https://www.ziveline.com.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {shippingDetails.map((item) => (
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

          <p className="mt-5 text-xs leading-5 text-ink/45">
            Estimated total time from order acceptance to delivery is generally
            4–9 business days. Delivery estimates are not guaranteed.
          </p>
        </div>
      </section>

      {/* SHIPPING PROCESS */}
      <section className="bg-[#F4F1EB] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Order Journey
            </p>

            <h2 className="mt-2 font-display text-3xl leading-tight text-ink">
              How Shipping Works
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="border border-line bg-paper p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-paper">
                      <Icon size={17} aria-hidden="true" />
                    </div>

                    <span className="text-xs font-bold text-ink/40">
                      Step {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-ink">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-ink/55">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POLICY DETAILS */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-ink/60">
          {/* SHIPPING AREA */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Shipping Area
            </h2>

            <p className="mt-3">
              We currently ship to deliverable addresses within the contiguous
              48 United States.
            </p>

            <p className="mt-3">
              We do not currently ship internationally or to Alaska, Hawaii,
              U.S. territories, APO/FPO/DPO addresses, or P.O. boxes.
            </p>
          </section>

          {/* SHIPPING COST */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Shipping Cost
            </h2>

            <p className="mt-3">
              Ziveline provides <strong className="text-ink">free standard shipping</strong>{" "}
              on eligible orders within our published U.S. shipping area.
            </p>

            <p className="mt-3">
              Customers will not be charged a standard shipping fee unless a
              different charge is clearly disclosed before completing the
              order.
            </p>
          </section>

          {/* ORDER PROCESSING */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Order Processing
            </h2>

            <p className="mt-3">
              Orders are normally processed within{" "}
              <strong className="text-ink">1–2 business days</strong> after
              payment authorization and order acceptance.
            </p>

            <p className="mt-3">
              Business days are Monday through Friday and exclude federal
              holidays. Orders submitted during weekends or holidays begin
              processing on the following business day.
            </p>

            <p className="mt-3">
              An order confirmation does not mean the order has shipped.
              Customers will receive a separate shipping confirmation when
              tracking becomes available.
            </p>
          </section>

          {/* ESTIMATED DELIVERY */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Estimated Delivery
            </h2>

            <p className="mt-3">
              After processing, standard delivery normally takes{" "}
              <strong className="text-ink">3–7 business days</strong>.
            </p>

            <p className="mt-3">
              The estimated total period from order acceptance to delivery is
              generally <strong className="text-ink">4–9 business days</strong>.
            </p>

            <p className="mt-3">
              Delivery estimates are not guarantees. Severe weather, carrier
              disruptions, incorrect addresses, holidays, emergencies, or
              other circumstances outside our control may cause delays.
            </p>

            <p className="mt-3">
              If we cannot ship within the promised period, we will notify the
              customer and provide available options, including cancellation
              and refund when required.
            </p>
          </section>

          {/* SHIPPING METHOD */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Shipping Method
            </h2>

            <p className="mt-3">
              Orders are shipped using standard ground or parcel delivery
              through a recognized third-party carrier. The carrier used may
              depend on the destination, package size, and operational
              availability.
            </p>

            <p className="mt-3">
              Available tracking information will be included in the shipping
              confirmation.
            </p>
          </section>

          {/* ADDRESS ACCURACY */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Address Accuracy
            </h2>

            <p className="mt-3">
              Customers are responsible for providing a complete and accurate
              delivery address.
            </p>

            <p className="mt-3">
              Contact{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="font-bold text-ink underline underline-offset-2"
              >
                {BUSINESS_INFO.email}
              </a>{" "}
              immediately if an address needs to be corrected. We cannot
              guarantee changes after an order enters fulfillment or has
              shipped.
            </p>

            <p className="mt-3">
              Ziveline is not responsible for delays or failed delivery caused
              by incorrect or incomplete information supplied by the customer.
            </p>
          </section>

          {/* TRACKING */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Tracking
            </h2>

            <p className="mt-3">
              Tracking information may take up to 48 hours to update after a
              label is created.
            </p>

            <p className="mt-3">
              A carrier’s “delivered” scan does not always mean the package
              was handed directly to the recipient. Customers should check the
              delivery area, household members, property staff, and carrier
              notices before reporting a missing delivery.
            </p>

            <p className="mt-3">
              You can also use your Ziveline order number on our{" "}
              <Link
                to="/track-order"
                className="font-bold text-ink underline underline-offset-2"
              >
                Order Tracking page
              </Link>
              .
            </p>
          </section>

          {/* LOST PACKAGES */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Lost Packages
            </h2>

            <p className="mt-3">
              If tracking does not update for an unusual period or a package
              appears lost, contact us at{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="font-bold text-ink underline underline-offset-2"
              >
                {BUSINESS_INFO.email}
              </a>{" "}
              with the order number.
            </p>

            <p className="mt-3">
              We will review the shipment with the carrier and provide an
              appropriate resolution based on the investigation and applicable
              law.
            </p>
          </section>

          {/* DAMAGED PACKAGES */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Damaged Packages
            </h2>

            <p className="mt-3">
              If a package arrives visibly damaged, photograph the package and
              product and contact us within{" "}
              <strong className="text-ink">48 hours of delivery</strong>.
            </p>

            <p className="mt-3">
              Please retain the item, packaging, labels, and shipping materials
              until we complete our review.
            </p>
          </section>

          {/* REFUSED OR UNDELIVERABLE */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Refused or Undeliverable Packages
            </h2>

            <p className="mt-3">
              A shipment returned because of refusal, an incorrect address,
              repeated failed delivery, or failure to collect the package may
              be treated as a return.
            </p>

            <p className="mt-3">
              Any additional reshipping charge will be disclosed and approved
              before reshipment. If a refund is requested, unavoidable carrier
              charges incurred because of an incorrect address or refused
              delivery may be deducted where legally permitted.
            </p>
          </section>

          {/* SPLIT SHIPMENTS */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Split Shipments
            </h2>

            <p className="mt-3">
              If an order contains multiple products, products may arrive in
              separate packages. Additional standard shipping will not be
              charged unless disclosed before purchase.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-display text-2xl text-ink">
              Contact
            </h2>

            <div className="mt-3 space-y-1">
              <p>{BUSINESS_INFO.businessName}</p>
              <p>2125 Strawberry Rd</p>
              <p>Pasadena, TX 77502</p>
              <p>United States</p>

              <p className="pt-2">
                Email:{" "}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-bold text-ink underline underline-offset-2"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>

              <p>
                Phone:{" "}
                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="font-bold text-ink underline underline-offset-2"
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
      <section className="border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 border border-line bg-ink p-6 text-paper sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h3 className="font-display text-2xl">
              Already submitted an order?
            </h3>

            <p className="mt-2 text-sm leading-6 text-paper/60">
              Check the latest available status using your order number.
            </p>
          </div>

          <Link
            to="/track-order"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 bg-paper px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-[#EFE9DE] md:w-auto"
          >
            Track Order
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;