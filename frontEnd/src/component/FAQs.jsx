import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
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

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "Business",
      question: "Who operates Ziveline?",
      answer:
        "Ziveline is operated by Ziveline LLC, a Texas limited liability company.",
    },
    {
      category: "Product Information",
      question: "What products do you sell?",
      answer:
        "We sell handbags, tote bags, shoulder bags, crossbody bags, and related fashion accessories.",
    },
    {
      category: "Orders & Payment",
      question: "Are prices in U.S. dollars?",
      answer:
        "Yes. All prices are displayed and charged in United States dollars unless clearly stated otherwise.",
    },
    {
      category: "Orders & Payment",
      question: "Do you accept online payments?",
      answer:
        "Ziveline accepts online electronic payments only through methods displayed at checkout. Payment processing is currently being set up and will become available after an authorized payment provider is activated.",
    },
    {
      category: "Orders & Payment",
      question: "Do you offer Cash on Delivery?",
      answer:
        "No. Ziveline does not accept Cash on Delivery.",
    },
    {
      category: "Orders & Payment",
      question: "Do you offer recurring subscriptions?",
      answer:
        "No. Product orders are one-time purchases and are not automatically recurring.",
    },
    {
      category: "Orders & Payment",
      question: "What will appear on my card statement?",
      answer:
        "After online payments are activated, the exact processor-approved billing descriptor will be displayed at checkout or in the order confirmation. It will identify the transaction as associated with Ziveline LLC or Ziveline.",
    },
    {
      category: "Shipping",
      question: "How much does shipping cost?",
      answer:
        "We provide free standard shipping on eligible orders within our published U.S. shipping area.",
    },
    {
      category: "Shipping",
      question: "Where do you ship?",
      answer:
        "We currently ship within the contiguous 48 United States. We do not currently ship internationally or to Alaska, Hawaii, U.S. territories, APO/FPO/DPO addresses, or P.O. boxes.",
    },
    {
      category: "Shipping",
      question: "How long does processing take?",
      answer:
        "Orders are normally processed within 1–2 business days after payment authorization and order acceptance.",
    },
    {
      category: "Shipping",
      question: "How long does delivery take?",
      answer:
        "Standard delivery normally takes 3–7 business days after processing. The estimated total period is generally 4–9 business days.",
    },
    {
      category: "Shipping",
      question: "How can I track my order?",
      answer:
        "When tracking becomes available, it will be sent to the email address used for the order. Carrier tracking may take up to 48 hours to update after label creation.",
    },
    {
      category: "Shipping",
      question: "Can I change my shipping address?",
      answer:
        "Contact info@ziveline.com immediately. Address changes are available only before shipment and cannot be guaranteed after fulfillment begins.",
    },
    {
      category: "Orders & Payment",
      question: "Can I cancel my order?",
      answer:
        "A cancellation may be requested before the order ships. Once an order has shipped, the Return and Refund Policy applies.",
    },
    {
      category: "Returns & Refunds",
      question: "What is your return period?",
      answer:
        "Eligible products may be returned within 30 days of confirmed delivery.",
    },
    {
      category: "Returns & Refunds",
      question: "What condition must a returned item be in?",
      answer:
        "It must be unused, unworn, unwashed, unaltered, and in original condition with tags, accessories, and packaging.",
    },
    {
      category: "Returns & Refunds",
      question: "Do you charge a restocking fee?",
      answer:
        "No. We do not charge a restocking fee for an eligible return.",
    },
    {
      category: "Returns & Refunds",
      question: "Who pays for return shipping?",
      answer:
        "For a change-of-mind return, the customer pays return shipping. For a verified damaged, defective, or incorrect product, Ziveline covers reasonable return-shipping costs.",
    },
    {
      category: "Returns & Refunds",
      question: "What if my order arrives damaged or incorrect?",
      answer:
        "Contact info@ziveline.com within 48 hours of delivery. Include the order number and clear photographs of the item, packaging, and shipping label.",
    },
    {
      category: "Returns & Refunds",
      question: "Do you offer exchanges?",
      answer:
        "No. We provide refunds for eligible returns. A customer may place a separate order for another product.",
    },
    {
      category: "Returns & Refunds",
      question: "How long does a refund take?",
      answer:
        "An approved refund is issued to the original payment method within 5–7 business days after inspection. The bank or card issuer may take additional time to post it.",
    },
    {
      category: "Returns & Refunds",
      question: "Where should I send an authorized return?",
      answer:
        "After receiving return authorization, send the product according to our instructions to: Ziveline LLC, 2125 Strawberry Rd, Pasadena, TX 77502, United States. Do not mail an unauthorized return.",
    },
    {
      category: "Business",
      question: "Where is your inventory stored?",
      answer:
        "Ziveline fulfills customer orders from inventory held for sale by the business. Our published address is a business mailing and authorized return address and is not presented as a walk-in retail store.",
    },
    {
      category: "Business",
      question: "Can I shop at the Pasadena address?",
      answer:
        "No walk-in retail shopping or customer pickup is offered unless Ziveline confirms an appointment or pickup option in writing.",
    },
    {
      category: "Support",
      question: "How can I contact customer support?",
      answer:
        "Email: info@ziveline.com. Phone: +1 (832) 285-3511. Hours: Monday–Friday, 9:00 AM–5:00 PM Central Time. We generally respond within one business day.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex((current) =>
      current === index ? -1 : index
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* HERO */}
      <section className="border-b border-line bg-ink px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-paper text-ink sm:h-16 sm:w-16">
            <HelpCircle
              size={24}
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-paper/60 sm:tracking-[0.25em]">
            Ziveline
          </p>

          <h1 className="mt-3 font-display text-3xl leading-tight text-paper sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-paper/70 sm:text-base">
            Find helpful information about Ziveline, orders, payments,
            shipping, returns, refunds, and customer support.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y divide-line">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={faq.question}
                className="py-5 sm:py-6"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex min-h-12 w-full items-start justify-between gap-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-bottle sm:text-xs">
                      {faq.category}
                    </p>

                    <h2 className="mt-1.5 pr-2 text-base font-bold leading-6 text-ink sm:text-lg">
                      {faq.question}
                    </h2>
                  </div>

                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`mt-1 shrink-0 text-ink/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                  >
                    <p className="mt-3 max-w-2xl pr-1 whitespace-pre-line text-sm leading-7 text-ink/60 sm:pr-8">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 border border-line bg-ink p-6 text-center text-paper sm:p-8 md:flex-row md:justify-between md:text-left lg:p-10">
          <div className="min-w-0">
            <h2 className="font-display text-2xl sm:text-3xl">
              Still have questions?
            </h2>

            <p className="mt-2 text-sm leading-6 text-paper/60">
              Contact {BUSINESS_INFO.businessName} if you need
              additional information.
            </p>

            <p className="mt-2 text-xs leading-5 text-paper/50">
              {BUSINESS_INFO.email} · {BUSINESS_INFO.phoneDisplay}
              <br />
              {BUSINESS_INFO.businessDays} · {BUSINESS_INFO.supportHours}
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 bg-paper px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-[#EFE9DE] sm:w-auto"
          >
            Contact Support

            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQs;