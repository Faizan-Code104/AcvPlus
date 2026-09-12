import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "Ziveline LLC",
  email: "info@Ziveline.com",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  addressLine1: "2125 Strawberry Rd",
  addressLine2: "Pasadena, TX 77502",
  country: "United States",
  hours: "Monday – Friday",
  time: "9:00 AM – 5:00 PM CT",
};

const Contact = () => {
  return (
    <section className="min-h-screen overflow-x-hidden bg-[#F4F1EB]">

      {/* =========================================
          HERO
      ========================================= */}

      <div className="bg-ink px-4 py-14 text-paper sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/60 sm:text-sm sm:tracking-[0.25em]">
              Get In Touch
            </p>

            <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              We&apos;re here
              <span className="block text-paper/60">
                to help.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-paper/70 sm:text-base">
              Have a question about an order, product, shipping,
              returns, or anything Ziveline? You can reach our
              support team using the contact information below.
            </p>

          </div>
        </div>
      </div>

      {/* =========================================
          CONTACT CONTENT
      ========================================= */}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-5xl">

          <div className="mb-10 text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Contact Information
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Contact Ziveline
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/60">
              Our support team is available during normal business
              hours. For general questions, order assistance, or
              product support, please contact us by email or phone.
            </p>

          </div>

          {/* =========================================
              CONTACT CARDS
          ========================================= */}

          <div className="grid gap-5 sm:grid-cols-2">

            {/* EMAIL */}

            <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6 sm:p-7">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                <Mail
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                  Email
                </p>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="mt-1 block break-all font-semibold text-ink transition-opacity hover:opacity-70"
                >
                  {BUSINESS_INFO.email}
                </a>

                <p className="mt-2 text-sm leading-6 text-ink/50">
                  We usually respond within 24 hours during
                  business days.
                </p>

              </div>

            </div>

            {/* PHONE */}

            <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6 sm:p-7">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                <Phone
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                  Phone
                </p>

                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="mt-1 block break-words font-semibold text-ink transition-opacity hover:opacity-70"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>

                <p className="mt-2 text-sm leading-6 text-ink/50">
                  {BUSINESS_INFO.hours}
                  <br />
                  {BUSINESS_INFO.time}
                </p>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6 sm:p-7">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                <MapPin
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                  Business Location
                </p>

                <p className="mt-1 font-semibold text-ink">
                  {BUSINESS_INFO.businessName}
                </p>

                <p className="mt-2 text-sm leading-6 text-ink/50">
                  {BUSINESS_INFO.addressLine1}
                  <br />
                  {BUSINESS_INFO.addressLine2}
                  <br />
                  {BUSINESS_INFO.country}
                </p>

              </div>

            </div>

            {/* WORKING HOURS */}

            <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6 sm:p-7">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                <Clock3
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-wider text-ink/40">
                  Working Hours
                </p>

                <p className="mt-1 font-semibold text-ink">
                  {BUSINESS_INFO.hours}
                </p>

                <p className="mt-2 text-sm leading-6 text-ink/50">
                  {BUSINESS_INFO.time}
                </p>

              </div>

            </div>

          </div>

          {/* =========================================
              SUPPORT NOTE
          ========================================= */}

          <div className="mt-8 border border-line bg-paper p-6 text-center sm:p-8">

            <h3 className="font-display text-2xl text-ink">
              Need Assistance?
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink/60">
              For the fastest assistance, please email us and include
              your order number when contacting us about an existing
              order.
            </p>

            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="mt-5 inline-flex min-h-11 items-center justify-center bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark"
            >
              Email Support
            </a>

          </div>

        </div>

      </div>

      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <div className="border-t border-line bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="mx-auto max-w-7xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
            Ziveline
          </p>

          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Carry Your Style.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ink/60">
            Designed for everyday use with practical details
            and modern style.
          </p>

        </div>

      </div>

    </section>
  );
};

export default Contact;