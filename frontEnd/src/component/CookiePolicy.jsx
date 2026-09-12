import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "Ziveline LLC",
  address: "2125 Strawberry Rd, Pasadena, TX 77502",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  email: "info@ziveline.com",
};

const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: "Essential Technologies",
      description:
        "Support necessary website functions including navigation, shopping-cart operation, account login, security, fraud prevention, and privacy choices.",
    },
    {
      title: "Preference Technologies",
      description:
        "Remember selections such as account settings, display preferences, or shopping-cart contents.",
    },
    {
      title: "Analytics Technologies",
      description:
        "If enabled, help us understand website usage, identify technical errors, and improve website performance.",
    },
    {
      title: "Advertising Technologies",
      description:
        "If enabled, may help measure advertising performance or provide relevant advertising, subject to applicable consent or opt-out requirements.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* HERO */}
      <section className="border-b border-line bg-ink px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-paper text-ink">
            <Cookie size={24} aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h1 className="mt-3 font-display text-4xl leading-tight text-paper sm:text-5xl">
            Cookie Policy
          </h1>

          <p className="mt-4 text-sm text-paper/60">
            Last updated: September 11, 2026
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl leading-tight text-ink">
            Cookies &amp; Similar Technologies
          </h2>

          <p className="mt-4 text-sm leading-7 text-ink/60 sm:text-[15px]">
            This Cookie Policy explains how {BUSINESS_INFO.businessName} uses
            cookies, local storage, session technologies, and similar tools on
            https://www.ziveline.com.
          </p>
        </div>
      </section>

      {/* TECHNOLOGY CARDS */}
      <section className="bg-[#F4F1EB] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Technology Types
            </p>

            <h2 className="mt-2 font-display text-3xl leading-tight text-ink">
              Technologies We May Use
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {cookieTypes.map((item) => (
              <div
                key={item.title}
                className="border border-line bg-paper p-5 sm:p-6"
              >
                <h3 className="text-sm font-bold text-ink">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-ink/55 sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICY DETAILS */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-ink/60">
          <section>
            <h2 className="font-display text-2xl text-ink">
              What Are Cookies and Similar Technologies?
            </h2>

            <p className="mt-3">
              Cookies are small files stored through a browser. Local storage
              and session storage allow a website to remember information on a
              device.
            </p>

            <p className="mt-3">
              These technologies may help operate website features, maintain a
              shopping cart, remember preferences, support account access, and
              understand website performance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Essential Technologies
            </h2>

            <p className="mt-3">
              These support necessary functions such as:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Website navigation.</li>
              <li>Shopping-cart operation.</li>
              <li>Account login.</li>
              <li>Security.</li>
              <li>Fraud prevention.</li>
              <li>Remembering privacy choices.</li>
            </ul>

            <p className="mt-3">
              Disabling essential technologies may prevent parts of the website
              from working correctly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Preference Technologies
            </h2>

            <p className="mt-3">
              These remember selections such as account settings, display
              preferences, or shopping-cart contents.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Analytics Technologies
            </h2>

            <p className="mt-3">
              If enabled, analytics technologies help us understand how visitors
              use the website, identify technical errors, and improve
              performance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Advertising Technologies
            </h2>

            <p className="mt-3">
              If advertising tools are enabled, they may help measure
              advertising performance or provide relevant advertising. Where
              required by law, these technologies will be subject to consent or
              opt-out rights.
            </p>
          </section>

          <section>
            <div className="flex items-start gap-4 border border-line bg-[#F4F1EB] p-5 sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-paper">
                <ShieldCheck size={18} aria-hidden="true" />
              </div>

              <div>
                <h2 className="font-display text-2xl text-ink">
                  Payment Information
                </h2>

                <p className="mt-3">
                  Cookies and local storage used by Ziveline are not intended
                  to store complete payment-card numbers or card security
                  codes.
                </p>

                <p className="mt-3">
                  When payments are activated, payment providers may use their
                  own necessary security and fraud-prevention technologies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-paper">
                <SlidersHorizontal size={18} aria-hidden="true" />
              </div>

              <div>
                <h2 className="font-display text-2xl text-ink">
                  Managing Cookies
                </h2>

                <p className="mt-3">
                  Customers may block, delete, or restrict cookies through
                  browser settings. Doing so may affect shopping-cart, account,
                  and website functionality.
                </p>

                <p className="mt-3">
                  Where a cookie-preference tool is available, customers may use
                  it to manage non-essential technologies.
                </p>

                <p className="mt-3">
                  We will recognize legally required browser-based opt-out
                  signals where applicable and technically supported.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">
              Changes
            </h2>

            <p className="mt-3">
              We may update this Cookie Policy when our technology, providers,
              or legal obligations change. Updates will be posted with a revised
              date.
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

              <p>2125 Strawberry Rd</p>
              <p>Pasadena, TX 77502</p>
              <p>United States</p>

              <p className="pt-2">
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
          </section>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 border border-line bg-ink p-6 text-paper sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h3 className="font-display text-2xl">
              Have a privacy question?
            </h3>

            <p className="mt-2 text-sm leading-6 text-paper/60">
              Contact us if you have questions about cookies or website privacy.
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

export default CookiePolicy;