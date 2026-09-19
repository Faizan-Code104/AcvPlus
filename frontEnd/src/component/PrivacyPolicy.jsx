import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  Database,
  Cookie,
  UserCheck,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";

/* =========================================
   ACV PLUS BUSINESS INFORMATION
========================================= */

const BUSINESS_INFO = {
  businessName: "ACV Plus",
  website: "https://acvplus.us/",
  email: "Support@acvplus.us",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
  descriptor: "Sophia Strategic Travisions LLC",
};

/* =========================================
   PRIVACY POLICY SECTIONS
========================================= */

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    icon: Database,

    intro:
      "When you visit ACV Plus, make a purchase, or contact us, we may collect information including:",

    bullets: [
      "Your name, email address, telephone number, billing address, and shipping address.",

      "Information necessary to process your purchases and transactions. Payment details may be handled securely by third-party payment processors.",

      "Information about your orders, purchases, and interactions with products available through our website.",

      "Technical information such as your IP address, browser type, device type, operating system, and general website activity.",

      "Information you voluntarily provide when contacting our customer service team or submitting forms through our website.",
    ],
  },

  {
    number: "02",
    title: "How We Use Your Information",
    icon: UserCheck,

    intro: "We may use the information we collect to:",

    bullets: [
      "Process, confirm, fulfill, and deliver your orders.",

      "Communicate with you regarding purchases, shipping, returns, or other order-related matters.",

      "Respond to customer service requests and inquiries.",

      "Maintain and improve the functionality and performance of our website.",

      "Understand how visitors interact with our website and services.",

      "Protect our website, customers, and transactions against unauthorized or fraudulent activity.",

      "Send promotional or marketing communications where permitted and where you have chosen to receive them.",

      "Comply with applicable legal, regulatory, and business requirements.",
    ],
  },

  {
    number: "03",
    title: "How We Protect Your Information",
    icon: LockKeyhole,

    paragraphs: [
      "ACV Plus takes reasonable administrative, technical, and organizational measures designed to safeguard personal information against unauthorized access, loss, misuse, alteration, or disclosure.",

      "While we take appropriate precautions to protect your information, no method of electronic transmission or storage can be guaranteed to be completely secure.",

      "We do not sell, rent, or trade your personal information to third parties for their independent use.",
    ],
  },

  {
    number: "04",
    title: "Sharing Information With Service Providers",
    icon: ShieldCheck,

    intro:
      "We may share limited personal information with trusted third-party providers when necessary to operate our business and provide services to you. These may include providers responsible for:",

    bullets: [
      "Secure payment processing.",
      "Order fulfillment, shipping, and delivery.",
      "Website hosting and technical services.",
      "Analytics and website performance.",
      "Fraud prevention and transaction security.",
      "Customer service and business operations.",
    ],

    after:
      "We only provide information reasonably necessary for these providers to perform their respective services.",
  },

  {
    number: "05",
    title: "Cookies and Similar Technologies",
    icon: Cookie,

    paragraphs: [
      "ACV Plus may use cookies and similar technologies to provide essential website functionality, remember preferences, understand website usage, and improve the overall browsing experience.",

      "Your browser may allow you to block or delete cookies. Please note that disabling certain cookies may affect some features or functionality of our website.",
    ],
  },

  {
    number: "06",
    title: "Your Privacy Choices and Rights",
    icon: UserCheck,

    intro:
      "Depending on your location and applicable privacy laws, you may have certain rights concerning your personal information, including the ability to:",

    bullets: [
      "Request access to personal information we maintain about you.",

      "Request that inaccurate information be corrected or updated.",

      "Request deletion of certain personal information, where legally applicable.",

      "Withdraw consent where processing is based on consent.",

      "Opt out of promotional or marketing communications.",

      "Ask questions about how your personal information is collected or used.",
    ],

    after:
      "To submit a privacy-related request, please contact us using the information provided below. We may need to verify your identity before processing certain requests.",
  },

  {
    number: "07",
    title: "Data Retention",
    icon: Database,

    paragraphs: [
      "We may retain personal information for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, maintain business and transaction records, resolve disputes, prevent fraud, and comply with applicable legal obligations.",
    ],
  },

  {
    number: "08",
    title: "Third-Party Websites",
    icon: ShieldCheck,

    paragraphs: [
      "Our website may contain links to websites or services operated by third parties. ACV Plus is not responsible for the privacy practices, security, or content of third-party websites. We encourage you to review their privacy policies before providing personal information.",
    ],
  },

  {
    number: "09",
    title: "Children’s Privacy",
    icon: UserCheck,

    paragraphs: [
      "Our website and products are not intended to knowingly collect personal information from children where prohibited by applicable law. If we become aware that personal information has been collected improperly from a child, we may take reasonable steps to remove it.",
    ],
  },

  {
    number: "10",
    title: "Changes to This Privacy Policy",
    icon: ShieldCheck,

    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes to our practices, services, or applicable requirements. Any revised policy will be posted on this website, and we encourage visitors to review this page periodically.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F1F6FF] text-[#263B63]">
      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative overflow-hidden border-b border-[#D6E2F7] bg-white">
        {/* DECORATIVE BACKGROUND */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#E8F1FF]" />

        <div className="pointer-events-none absolute right-[18%] top-16 h-28 w-28 rounded-full border border-[#C5D7FF]/60" />

        <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[760px] text-center">
            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C5D7FF] bg-[#E8F1FF] text-[#183A7A]">
              <ShieldCheck size={25} strokeWidth={1.7} aria-hidden="true" />
            </div>

            {/* EYEBROW */}

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8] sm:text-[11px]">
              Your Information Matters
            </p>

            {/* HEADING */}

            <h1 className="mt-3 font-serif text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#10285D] sm:text-5xl lg:text-[56px]">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#263B63]/70 sm:text-[15px]">
              At ACV Plus, we value your privacy and are committed to protecting
              the personal information you share with us.
            </p>

            {/* SMALL DIVIDER */}

            <div className="mx-auto mt-7 h-[2px] w-12 rounded-full bg-[#3569C8]" />
          </div>
        </div>
      </section>

      {/* =========================================
          INTRODUCTION
      ========================================= */}

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-[18px] border border-[#D6E2F7] bg-white p-6 shadow-[0_8px_30px_rgba(16,40,93,0.04)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <ShieldCheck size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#10285D]">
                  Our Commitment to Your Privacy
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#263B63]/72 sm:text-[15px]">
                  At{" "}
                  <strong className="font-semibold text-[#10285D]">
                    ACV Plus
                  </strong>
                  , we value your privacy and are committed to protecting the
                  personal information you share with us. This Privacy Policy
                  describes how ACV Plus collects, uses, stores, and protects
                  your information when you visit our website, interact with our
                  services, or place an order.
                </p>

                <p className="mt-3 text-sm leading-7 text-[#263B63]/72 sm:text-[15px]">
                  By using our website, you acknowledge the practices described
                  in this Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          POLICY CONTENT
      ========================================= */}

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="space-y-5">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="group overflow-hidden rounded-[18px] border border-[#D6E2F7] bg-white shadow-[0_5px_20px_rgba(16,40,93,0.035)] transition-shadow duration-300 hover:shadow-[0_10px_35px_rgba(16,40,93,0.07)]"
                >
                  {/* CARD HEADER */}

                  <div className="flex items-start gap-4 border-b border-[#D6E2F7] bg-[#FAFCFF] px-5 py-5 sm:gap-5 sm:px-7">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Icon size={19} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                        Section {section.number}
                      </span>

                      <h2 className="mt-1 font-serif text-[22px] font-semibold leading-tight text-[#10285D] sm:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* CARD CONTENT */}

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
                      <ul
                        className={`${section.intro ? "mt-5" : ""} space-y-3`}
                      >
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
        </div>
      </section>

      {/* =========================================
          CONTACT INFORMATION
      ========================================= */}

      <section className="border-y border-[#D6E2F7] bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid overflow-hidden rounded-[22px] border border-[#D6E2F7] lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT */}

            <div className="bg-[#172D57] p-7 text-white sm:p-9 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#AFC8FF]">
                Privacy Support
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-[36px]">
                Have a privacy question?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                If you have questions regarding this Privacy Policy or would
                like to submit a privacy-related request, please contact us.
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

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#263B63]/50">
                      Business Address
                    </p>

                    <p className="mt-1 text-sm font-medium leading-6 text-[#263B63]">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-[#D6E2F7] pt-5">
                <p className="text-xs leading-6 text-[#263B63]/60">
                  Website:{" "}
                  <span className="font-semibold text-[#183A7A]">
                    acvplus.us
                  </span>
                </p>

                <p className="mt-1 text-xs leading-6 text-[#263B63]/60">
                  Descriptor:{" "}
                  <span className="font-semibold text-[#183A7A]">
                    {BUSINESS_INFO.descriptor}
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
              We're here to help.
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#263B63]/65">
              Contact our support team if you have a question about your
              information or an order.
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

export default PrivacyPolicy;
