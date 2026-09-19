import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Truck,
  CreditCard,
  AlertTriangle,
  MapPinned,
  PackageCheck,
  Check,
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
   SHIPPING HIGHLIGHTS
========================================= */

const shippingHighlights = [
  {
    icon: Clock3,
    label: "Order Processing",
    value: "1–3",
    suffix: "Business Days",
  },
  {
    icon: Truck,
    label: "Estimated Delivery",
    value: "5–10",
    suffix: "Business Days",
  },
  {
    icon: Search,
    label: "Order Tracking",
    value: "Email",
    suffix: "After Shipment",
  },
  {
    icon: MapPin,
    label: "Shipping Area",
    value: "U.S.",
    suffix: "United States Only",
  },
];

/* =========================================
   POLICY SECTIONS
========================================= */

const policySections = [
  {
    number: "01",
    icon: Package,
    title: "Order Processing Time",
    description:
      "We begin preparing your order as soon as it has been successfully placed.",
    bullets: [
      "Orders are typically processed within 1–3 business days after purchase.",
      "Orders are not processed or shipped on weekends or public holidays.",
      "A confirmation email will be sent once your order has been successfully placed.",
      "Our products may include wellness products, dietary supplements, and related items.",
    ],
  },
  {
    number: "02",
    icon: Truck,
    title: "Shipping Time",
    description:
      "Once processing is complete, your order moves into the delivery stage.",
    bullets: [
      "Estimated delivery time is 5–10 business days.",
      "Delivery times may vary depending on destination, carrier schedules, and other external factors.",
    ],
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Shipping Charges",
    description:
      "Any applicable delivery cost is shown clearly before your order is completed.",
    bullets: [
      "Shipping costs, if applicable, will be calculated and displayed during checkout.",
      "Any shipping fees will be shown before you complete your purchase.",
    ],
  },
  {
    number: "04",
    icon: Search,
    title: "Order Tracking",
    description:
      "We make it easy to follow your shipment after it leaves our facility.",
    bullets: [
      "Once your order has been shipped, you will receive a tracking number via email.",
      "You may use the tracking information to monitor the status of your shipment.",
    ],
  },
  {
    number: "05",
    icon: AlertTriangle,
    title: "Shipping Delays",
    description:
      "While we work to ensure timely delivery, delays may occasionally occur due to:",
    bullets: [
      "Weather conditions.",
      "Carrier-related issues.",
      "Increased order volume or peak seasons.",
      "Other circumstances beyond our control.",
    ],
    footer: "We appreciate your patience in these situations.",
  },
  {
    number: "06",
    icon: MapPinned,
    title: "Incorrect Shipping Address",
    description:
      "Please make sure your delivery information is complete and accurate before placing your order.",
    bullets: [
      "Please verify your shipping address before completing your order.",
      "ACV Plus is not responsible for shipments sent to incorrect or incomplete addresses provided during checkout.",
    ],
  },
  {
    number: "07",
    icon: PackageCheck,
    title: "Lost or Damaged Packages",
    description:
      "If your package arrives damaged or appears to be lost during transit, please contact us as soon as possible. We will work with the shipping carrier to investigate and help resolve the issue.",
  },
];

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#263B63]">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden border-b border-[#D6E2F7] bg-[#F7FAFF]">
        {/* subtle decorative elements */}
        <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border-[70px] border-[#E8F1FF]" />

        <div className="pointer-events-none absolute right-[14%] top-[30%] h-20 w-20 rounded-full bg-[#E8F1FF]" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          {/* LEFT */}
          <div className="max-w-[650px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#3569C8]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8]">
                Shipping & Delivery
              </p>
            </div>

            <h1 className="mt-5 max-w-[600px] font-serif text-[44px] font-semibold leading-[1.03] tracking-[-0.035em] text-[#10285D] sm:text-[54px] lg:text-[64px]">
              Your order,
              <br />
              carefully delivered.
            </h1>

            <p className="mt-6 max-w-[590px] text-[14px] leading-7 text-[#263B63]/70 sm:text-[15px]">
              At ACV Plus, we strive to provide reliable and efficient shipping
              for all orders. This policy explains our processing procedures,
              delivery timelines, tracking, and other important shipping
              information.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/track-order"
                className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#23458C] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:bg-[#315FBA]"
              >
                Track Your Order
                <ArrowRight size={15} />
              </Link>

              <span className="text-[12px] font-semibold text-[#263B63]/60">
                United States shipping only
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative hidden min-h-[330px] lg:block">
            <div className="absolute right-0 top-1/2 w-[360px] -translate-y-1/2 rounded-[180px_180px_28px_28px] bg-[#E8F1FF] px-12 pb-10 pt-20">
              <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full bg-white shadow-[0_12px_35px_rgba(16,40,93,0.08)]">
                <Truck
                  size={38}
                  strokeWidth={1.35}
                  className="text-[#183A7A]"
                />
              </div>

              <p className="mt-7 text-center font-serif text-[25px] font-semibold text-[#10285D]">
                Reliable Delivery
              </p>

              <p className="mt-2 text-center text-xs leading-6 text-[#263B63]/60">
                Clear timelines. Easy tracking.
                <br />
                Helpful support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SHIPPING STATS
      ================================================== */}

      <section className="border-b border-[#D6E2F7] bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {shippingHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 py-7 sm:px-6 lg:py-8 ${
                    index !== shippingHighlights.length - 1
                      ? "border-b border-[#D6E2F7] sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <Icon size={19} strokeWidth={1.6} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                      {item.label}
                    </p>

                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-serif text-[23px] font-semibold leading-none text-[#10285D]">
                        {item.value}
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] text-[#263B63]/55">
                      {item.suffix}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          INTRO
      ================================================== */}

      <section className="bg-white px-5 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid gap-7 md:grid-cols-[0.65fr_1.35fr] md:gap-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Shipping Guide
              </p>

              <h2 className="mt-3 font-serif text-[34px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#10285D] sm:text-[40px]">
                What to expect after checkout.
              </h2>
            </div>

            <div className="border-l border-[#C5D7FF] pl-6 sm:pl-8">
              <p className="text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
                Once your order is placed, our process moves through
                preparation, shipment, and delivery. You'll receive confirmation
                when your order is placed and tracking information after it
                ships.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#183A7A]">
                <Check size={15} />
                Tracking sent by email after shipment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          POLICY CONTENT
      ================================================== */}

      <section className="bg-white px-5 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1000px] border-t border-[#D6E2F7]">
          {policySections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.number}
                className="grid gap-5 border-b border-[#D6E2F7] py-9 sm:py-11 md:grid-cols-[210px_1fr] md:gap-12"
              >
                {/* SECTION TITLE */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Icon size={16} strokeWidth={1.7} />
                    </div>

                    <span className="text-[9px] font-bold tracking-[0.18em] text-[#3569C8]">
                      {section.number}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-[22px] font-semibold leading-tight text-[#10285D]">
                    {section.title}
                  </h2>
                </div>

                {/* SECTION BODY */}
                <div className="md:pt-1">
                  {section.description && (
                    <p className="max-w-[680px] text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
                      {section.description}
                    </p>
                  )}

                  {section.bullets && (
                    <ul className="mt-5 space-y-3.5">
                      {section.bullets.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm leading-7 text-[#263B63]/70 sm:text-[15px]"
                        >
                          <span className="mt-[7px] flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#E8F1FF]">
                            <Check
                              size={10}
                              strokeWidth={2.5}
                              className="text-[#183A7A]"
                            />
                          </span>

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.footer && (
                    <p className="mt-5 border-l-2 border-[#3569C8] pl-4 text-sm font-medium leading-7 text-[#263B63]">
                      {section.footer}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          TRACKING FEATURE
      ================================================== */}

      <section className="bg-[#F1F6FF] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1100px] overflow-hidden rounded-[28px] border border-[#D6E2F7] bg-white lg:grid-cols-2">
          {/* LEFT */}
          <div className="flex items-center justify-center bg-[#E8F1FF] p-10 sm:p-14">
            <div className="relative flex h-[230px] w-[230px] items-center justify-center rounded-full border border-[#C5D7FF] sm:h-[280px] sm:w-[280px]">
              <div className="absolute h-[190px] w-[190px] rounded-full border border-[#C5D7FF]/70 sm:h-[230px] sm:w-[230px]" />

              <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-[0_15px_40px_rgba(16,40,93,0.09)] sm:h-[140px] sm:w-[140px]">
                <Search
                  size={40}
                  strokeWidth={1.35}
                  className="text-[#183A7A]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center p-8 sm:p-12 lg:p-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Stay Updated
              </p>

              <h2 className="mt-3 font-serif text-[34px] font-semibold leading-tight tracking-[-0.025em] text-[#10285D] sm:text-[40px]">
                Follow your order
                <br />
                every step of the way.
              </h2>

              <p className="mt-5 max-w-[440px] text-sm leading-7 text-[#263B63]/65">
                Once your order ships, we'll send your tracking number by email.
                You can also use our order tracking page to check the latest
                available order status.
              </p>

              <Link
                to="/track-order"
                className="mt-7 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#23458C] px-7 text-xs font-bold text-white transition-colors hover:bg-[#315FBA]"
              >
                Track Your Order
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTACT SECTION
      ================================================== */}

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-9 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
              We're Here to Help
            </p>

            <h2 className="mt-3 font-serif text-[34px] font-semibold text-[#10285D] sm:text-[40px]">
              Shipping Support
            </h2>

            <p className="mx-auto mt-3 max-w-[560px] text-sm leading-7 text-[#263B63]/65">
              For shipping-related questions or assistance, contact our support
              team using the information below.
            </p>
          </div>

          <div className="grid border-y border-[#D6E2F7] sm:grid-cols-3">
            {/* EMAIL */}
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="group flex items-start gap-4 border-b border-[#D6E2F7] px-2 py-7 transition-colors hover:bg-[#FAFCFF] sm:border-b-0 sm:border-r sm:px-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <Mail size={17} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  Email
                </p>

                <p className="mt-2 break-all text-sm font-semibold text-[#10285D]">
                  {BUSINESS_INFO.email}
                </p>
              </div>
            </a>

            {/* PHONE */}
            <a
              href={`tel:${BUSINESS_INFO.phoneHref}`}
              className="group flex items-start gap-4 border-b border-[#D6E2F7] px-2 py-7 transition-colors hover:bg-[#FAFCFF] sm:border-b-0 sm:border-r sm:px-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <Phone size={17} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  Phone
                </p>

                <p className="mt-2 text-sm font-semibold text-[#10285D]">
                  {BUSINESS_INFO.phoneDisplay}
                </p>
              </div>
            </a>

            {/* ADDRESS */}
            <div className="flex items-start gap-4 px-2 py-7 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <MapPin size={17} />
              </div>

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

          <div className="mt-7 text-center">
            <p className="text-xs text-[#263B63]/50">
              Website:{" "}
              <span className="font-semibold text-[#183A7A]">acvplus.us</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
