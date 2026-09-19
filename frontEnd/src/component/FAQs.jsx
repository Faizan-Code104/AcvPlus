import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ChevronDown,
  Search,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  PackageSearch,
  Mail,
  MapPin,
  Phone,
  HelpCircle,
  ShieldCheck,
  Clock3,
  PackageCheck,
  Headphones,
} from "lucide-react";

/* =========================================================
   ACV PLUS BUSINESS INFO
========================================================= */

const BUSINESS_INFO = {
  website: "acvplus.us",
  email: "Support@acvplus.us",
  phone: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
};

/* =========================================================
   FAQ DATA
========================================================= */

const FAQ_GROUPS = [
  {
    id: "products",
    number: "01",
    title: "Products",
    shortTitle: "Products",
    description:
      "Helpful information about ACV Plus wellness products, supplements, labels, and availability.",
    icon: ShoppingBag,
    faqs: [
      {
        question: "What products does ACV Plus offer?",
        answer:
          "ACV Plus offers wellness products, dietary supplements, and related items available through our online store.",
      },
      {
        question: "Where can I find product information?",
        answer:
          "Product-specific information is available on each product page. Please review the product description, ingredients, serving information, directions, warnings, and other available label details before purchasing or using a product.",
      },
      {
        question: "Can product availability change?",
        answer:
          "Yes. Product availability and stock levels may change at any time. Products that are temporarily unavailable may be marked as out of stock.",
      },
      {
        question: "Should supplements replace professional medical advice?",
        answer:
          "No. Product information on ACV Plus is not intended to replace professional medical advice, diagnosis, or treatment. If you have questions about whether a product is appropriate for you, consult a qualified healthcare professional.",
      },
    ],
  },

  {
    id: "orders",
    number: "02",
    title: "Orders & Payments",
    shortTitle: "Orders",
    description:
      "Information about placing an order, checkout, payment options, and cancellations.",
    icon: CreditCard,
    faqs: [
      {
        question: "How do I place an order?",
        answer:
          "Choose the product you want, add it to your cart, proceed to checkout, provide the requested shipping information, and complete the available checkout steps.",
      },
      {
        question: "What currency is used on ACV Plus?",
        answer:
          "Prices displayed on ACV Plus are in U.S. dollars unless clearly stated otherwise.",
      },
      {
        question: "What payment methods are available?",
        answer:
          "The payment methods currently available to you will be displayed during checkout. Please use one of the available checkout options to complete your purchase.",
      },
      {
        question: "Can an order be cancelled?",
        answer:
          "Orders may only be cancelled before shipment. Once an order has shipped, it must follow the applicable return process.",
      },
      {
        question: "Are all orders guaranteed to be accepted?",
        answer:
          "All orders are subject to acceptance and product availability. ACV Plus may refuse or cancel an order where appropriate.",
      },
    ],
  },

  {
    id: "shipping",
    number: "03",
    title: "Shipping & Delivery",
    shortTitle: "Shipping",
    description:
      "Processing times, delivery estimates, shipping costs, and tracking information.",
    icon: Truck,
    faqs: [
      {
        question: "Where does ACV Plus ship?",
        answer: "ACV Plus currently ships within the United States only.",
      },
      {
        question: "How long does order processing take?",
        answer:
          "Orders are typically processed within 1–3 business days after purchase. Orders are not processed or shipped on weekends or public holidays.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Estimated delivery time is 5–10 business days. Delivery times may vary depending on destination, carrier schedules, weather, peak seasons, and other external factors.",
      },
      {
        question: "How much does shipping cost?",
        answer:
          "Shipping costs, if applicable, are calculated and displayed during checkout before you complete your purchase.",
      },
      {
        question: "Will I receive tracking information?",
        answer:
          "Yes. Once your order has shipped, tracking information will be sent to the email address associated with your order.",
      },
      {
        question: "What if my package is lost or damaged?",
        answer:
          "If your package appears to be lost during transit or arrives damaged, contact our support team as soon as possible. We will work with the shipping carrier to investigate and help resolve the issue.",
      },
    ],
  },

  {
    id: "returns",
    number: "04",
    title: "Returns & Refunds",
    shortTitle: "Returns",
    description:
      "Return eligibility, refund processing, return shipping, and exchanges.",
    icon: RotateCcw,
    faqs: [
      {
        question: "What is the ACV Plus return period?",
        answer:
          "You may request an eligible return within 14 days of delivery.",
      },
      {
        question: "What condition must a return be in?",
        answer:
          "The product must be unused and remain in its original packaging. Products missing original packaging, seals, labels, or accessories may not be eligible for return.",
      },
      {
        question: "Which products cannot be returned?",
        answer:
          "Products showing signs of use, products damaged after delivery due to customer handling, items returned after the return period, and products missing original packaging, seals, labels, or accessories are not eligible for return.",
      },
      {
        question: "Who pays return shipping?",
        answer:
          "Customers are responsible for return shipping costs unless the item received is incorrect, damaged, or defective. Original shipping charges are non-refundable.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "After an eligible return is received and inspected, approved refunds are generally processed within 5–10 business days and issued to the original payment method.",
      },
      {
        question: "Does ACV Plus offer exchanges?",
        answer:
          "We replace items that arrive damaged or defective. Please contact our support team for assistance with an eligible exchange.",
      },
    ],
  },

  {
    id: "support",
    number: "05",
    title: "Order Support",
    shortTitle: "Support",
    description:
      "Get help with tracking information, order questions, and contacting ACV Plus.",
    icon: PackageSearch,
    faqs: [
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you will receive tracking information by email. You can use that information to monitor your shipment.",
      },
      {
        question: "I haven't received tracking information. What should I do?",
        answer:
          "Tracking information is sent after shipment. Please check your inbox and spam folder. If your order has shipped and you still cannot find the tracking information, contact our support team.",
      },
      {
        question: "How can I contact ACV Plus?",
        answer:
          "You can contact us at Support@acvplus.us or call +1 (888) 944-6546. You may also use the Contact Us page on our website.",
      },
      {
        question: "What is the ACV Plus address?",
        answer:
          "Our published address is 4808 Fairmont Pkwy, Pasadena, TX 77505.",
      },
    ],
  },
];

/* =========================================================
   SEARCH DATA
========================================================= */

const ALL_FAQS = FAQ_GROUPS.flatMap((group) =>
  group.faqs.map((faq) => ({
    ...faq,
    groupId: group.id,
    groupTitle: group.title,
    groupDescription: group.description,
    icon: group.icon,
  })),
);

/* =========================================================
   FAQ ITEM
========================================================= */

const FAQItem = ({ question, answer, itemKey, openKey, setOpenKey, index }) => {
  const isOpen = openKey === itemKey;

  return (
    <div className="border-b border-[#D6E2F7] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : itemKey)}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7"
      >
        <span className="mt-[2px] hidden min-w-[28px] text-[10px] font-bold tracking-[0.12em] text-[#3569C8]/55 sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-[15px] font-semibold leading-6 transition-colors sm:text-[16px] ${
              isOpen
                ? "text-[#183A7A]"
                : "text-[#10285D] group-hover:text-[#315FBA]"
            }`}
          >
            {question}
          </h3>

          <div
            className={`grid transition-all duration-300 ease-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="max-w-[720px] pt-4 text-[13px] leading-7 text-[#263B63]/68 sm:text-[14px]">
                {answer}
              </p>
            </div>
          </div>
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-0 border-[#183A7A] bg-[#183A7A] text-white"
              : "border-[#C5D7FF] bg-white text-[#183A7A] group-hover:border-[#3569C8]"
          }`}
        >
          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [openKey, setOpenKey] = useState("products-0");

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (query) {
      const results = ALL_FAQS.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.groupTitle.toLowerCase().includes(query),
      );

      return [
        {
          id: "search",
          number: "",
          title: "Search Results",
          description:
            results.length > 0
              ? `We found ${results.length} ${
                  results.length === 1 ? "answer" : "answers"
                } related to your search.`
              : "No matching questions were found.",
          icon: Search,
          faqs: results,
        },
      ];
    }

    if (activeCategory === "all") {
      return FAQ_GROUPS;
    }

    return FAQ_GROUPS.filter((group) => group.id === activeCategory);
  }, [activeCategory, searchTerm]);

  const totalResults = filteredGroups.reduce(
    (total, group) => total + group.faqs.length,
    0,
  );

  const selectCategory = (id) => {
    setActiveCategory(id);
    setSearchTerm("");

    if (id === "all") {
      setOpenKey("products-0");
    } else {
      setOpenKey(`${id}-0`);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#263B63]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F1F6FF]">
        <div className="pointer-events-none absolute right-[-160px] top-[-220px] h-[570px] w-[570px] rounded-full border-[90px] border-[#E4EEFC]" />

        <div className="pointer-events-none absolute bottom-[-170px] left-[-180px] h-[390px] w-[390px] rounded-full border-[60px] border-white/60" />

        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
          <div className="grid min-h-[480px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            {/* LEFT */}

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#3569C8]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8]">
                  Help Center
                </span>
              </div>

              <h1 className="mt-6 max-w-[680px] font-serif text-[46px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#10285D] sm:text-[58px] lg:text-[68px]">
                Answers for a
                <br />
                smoother shop.
              </h1>

              <p className="mt-6 max-w-[570px] text-[14px] leading-7 text-[#263B63]/68 sm:text-[15px]">
                Everything you need to know about ACV Plus products, orders,
                delivery, returns and customer support — all in one place.
              </p>

              {/* SEARCH */}

              <div className="mt-8 flex max-w-[590px] items-center rounded-full border border-[#C5D7FF] bg-white p-[6px] shadow-[0_15px_45px_rgba(16,40,93,0.07)]">
                <Search
                  size={18}
                  strokeWidth={1.6}
                  className="ml-4 shrink-0 text-[#183A7A]"
                />

                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="What can we help you find?"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[13px] text-[#10285D] outline-none placeholder:text-[#263B63]/40"
                />

                {searchTerm ? (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="hidden rounded-full bg-[#23458C] px-6 py-3 text-[10px] font-bold text-white transition-colors hover:bg-[#315FBA] sm:block"
                  >
                    Clear
                  </button>
                ) : (
                  <span className="hidden rounded-full bg-[#23458C] px-6 py-3 text-[10px] font-bold text-white sm:block">
                    Search
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative hidden min-h-[350px] lg:block">
              <div className="absolute right-0 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-[#C5D7FF]" />

              <div className="absolute right-[45px] top-1/2 flex h-[250px] w-[250px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_25px_70px_rgba(16,40,93,0.08)]">
                <HelpCircle
                  size={70}
                  strokeWidth={0.9}
                  className="text-[#183A7A]"
                />
              </div>

              <div className="absolute bottom-[30px] left-[20px] w-[210px] rounded-[18px] bg-[#172D57] p-5 text-white shadow-[0_20px_50px_rgba(16,40,93,0.15)]">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC8FF]">
                  ACV Plus Support
                </p>

                <p className="mt-2 font-serif text-[20px] leading-6">
                  Helpful answers,
                  <br />
                  made simple.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK INFORMATION BAR
      ===================================================== */}

      <section className="border-y border-[#D6E2F7] bg-white">
        <div className="mx-auto grid max-w-[1240px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Clock3,
              title: "Processing",
              value: "1–3 Business Days",
            },
            {
              icon: Truck,
              title: "Delivery",
              value: "5–10 Business Days",
            },
            {
              icon: RotateCcw,
              title: "Eligible Returns",
              value: "Within 14 Days",
            },
            {
              icon: PackageCheck,
              title: "Shipping Area",
              value: "United States",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-6 py-6 lg:px-7 ${
                  index < 3
                    ? "border-b border-[#D6E2F7] sm:border-r lg:border-b-0"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                  <Icon size={18} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#3569C8]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[12px] font-semibold text-[#10285D]">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CATEGORY SELECTOR
      ===================================================== */}

      <section className="bg-white px-5 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Browse by topic
              </p>

              <h2 className="mt-3 font-serif text-[34px] font-semibold tracking-[-0.03em] text-[#10285D] sm:text-[40px]">
                Find the right answer.
              </h2>
            </div>

            <p className="max-w-[410px] text-[13px] leading-6 text-[#263B63]/60">
              Choose a topic to narrow the questions, or browse everything
              below.
            </p>
          </div>

          <div className="mt-9 flex gap-2 overflow-x-auto border-b border-[#D6E2F7] pb-4">
            <button
              type="button"
              onClick={() => selectCategory("all")}
              className={`shrink-0 rounded-full px-5 py-3 text-[11px] font-semibold transition-all ${
                activeCategory === "all" && !searchTerm
                  ? "bg-[#183A7A] text-white"
                  : "bg-[#F1F6FF] text-[#10285D] hover:bg-[#E8F1FF]"
              }`}
            >
              All Questions
            </button>

            {FAQ_GROUPS.map((group) => {
              const Icon = group.icon;

              const active = activeCategory === group.id && !searchTerm;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => selectCategory(group.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[11px] font-semibold transition-all ${
                    active
                      ? "bg-[#183A7A] text-white"
                      : "bg-[#F1F6FF] text-[#10285D] hover:bg-[#E8F1FF]"
                  }`}
                >
                  <Icon size={14} strokeWidth={1.7} />

                  {group.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ CONTENT
      ===================================================== */}

      <section className="bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          {/* SEARCH COUNT */}

          {searchTerm && (
            <div className="mb-12 flex flex-col justify-between gap-4 border-b border-[#D6E2F7] pb-7 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                  Search Results
                </p>

                <p className="mt-2 font-serif text-[27px] font-semibold text-[#10285D]">
                  {totalResults} {totalResults === 1 ? "answer" : "answers"}{" "}
                  found
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="self-start text-[10px] font-bold uppercase tracking-[0.14em] text-[#183A7A]"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* EMPTY RESULTS */}

          {totalResults === 0 && (
            <div className="rounded-[26px] bg-[#F1F6FF] px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#183A7A]">
                <Search size={23} />
              </div>

              <h3 className="mt-5 font-serif text-[28px] font-semibold text-[#10285D]">
                We couldn't find that answer.
              </h3>

              <p className="mx-auto mt-3 max-w-[480px] text-[13px] leading-7 text-[#263B63]/60">
                Try another keyword or contact our support team if you need more
                help.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="mt-6 rounded-full bg-[#23458C] px-6 py-3 text-[11px] font-bold text-white transition-colors hover:bg-[#315FBA]"
              >
                Browse All FAQs
              </button>
            </div>
          )}

          {/* GROUPS */}

          <div className="space-y-20">
            {filteredGroups.map((group, groupIndex) => {
              const Icon = group.icon;

              if (!group.faqs.length) {
                return null;
              }

              return (
                <div
                  key={group.id}
                  className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16"
                >
                  {/* LEFT */}

                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                        <Icon size={19} strokeWidth={1.5} />
                      </div>

                      {!searchTerm && (
                        <span className="font-serif text-[24px] text-[#AFC8FF]">
                          {group.number ||
                            String(groupIndex + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-6 font-serif text-[30px] font-semibold leading-tight tracking-[-0.025em] text-[#10285D]">
                      {group.title}
                    </h2>

                    <p className="mt-4 max-w-[260px] text-[12px] leading-6 text-[#263B63]/58">
                      {group.description}
                    </p>

                    {!searchTerm && (
                      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                        {group.faqs.length}{" "}
                        {group.faqs.length === 1 ? "Question" : "Questions"}
                      </p>
                    )}
                  </div>

                  {/* RIGHT */}

                  <div className="border-t border-[#C5D7FF]">
                    {group.faqs.map((faq, faqIndex) => {
                      const itemKey = searchTerm
                        ? `search-${faq.groupId || "result"}-${faqIndex}`
                        : `${group.id}-${faqIndex}`;

                      return (
                        <FAQItem
                          key={`${group.id}-${faq.question}-${faqIndex}`}
                          question={faq.question}
                          answer={faq.answer}
                          itemKey={itemKey}
                          openKey={openKey}
                          setOpenKey={setOpenKey}
                          index={faqIndex}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          POLICY LINKS
      ===================================================== */}

      <section className="bg-[#F1F6FF] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Store Information
              </p>

              <h2 className="mt-3 font-serif text-[35px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#10285D] sm:text-[41px]">
                Need the
                <br />
                full details?
              </h2>
            </div>

            <div className="grid border-y border-[#C5D7FF] sm:grid-cols-2">
              {[
                {
                  icon: Truck,
                  title: "Shipping Policy",
                  path: "/shipping-policy",
                },
                {
                  icon: RotateCcw,
                  title: "Return & Refund Policy",
                  path: "/return-policy",
                },
                {
                  icon: ShieldCheck,
                  title: "Privacy Policy",
                  path: "/privacy-policy",
                },
                {
                  icon: CreditCard,
                  title: "Terms & Conditions",
                  path: "/terms-and-conditions",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={`group flex min-h-[92px] items-center justify-between gap-4 py-5 transition-colors hover:bg-white/60 sm:px-5 ${
                      index < 2 ? "border-b border-[#C5D7FF]" : ""
                    } ${
                      index % 2 === 0 ? "sm:border-r sm:border-[#C5D7FF]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-[#183A7A]"
                      />

                      <span className="text-[12px] font-semibold text-[#10285D]">
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight
                      size={14}
                      className="text-[#3569C8] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUPPORT CTA
      ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[28px] bg-[#172D57] text-white">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT */}

            <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -bottom-[150px] -left-[150px] h-[360px] w-[360px] rounded-full border-[60px] border-white/[0.04]" />

              <div className="relative">
                <Headphones
                  size={29}
                  strokeWidth={1.35}
                  className="text-[#AFC8FF]"
                />

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#AFC8FF]">
                  Need more help?
                </p>

                <h2 className="mt-3 max-w-[430px] font-serif text-[37px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[43px]">
                  We're here when
                  <br />
                  you need us.
                </h2>

                <p className="mt-5 max-w-[440px] text-[13px] leading-7 text-white/65">
                  If your question isn't covered above, contact ACV Plus for
                  help with your order, delivery, return, or product
                  information.
                </p>

                <Link
                  to="/contact"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[11px] font-bold text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
                >
                  Contact Support
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* RIGHT CONTACT */}

            <div className="border-t border-white/10 bg-white/[0.025] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                Contact Information
              </p>

              <div className="mt-7">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="group flex items-center justify-between gap-5 border-t border-white/10 py-5"
                >
                  <div className="flex items-center gap-4">
                    <Mail
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#AFC8FF]"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                        Email
                      </p>

                      <p className="mt-1 text-[13px] font-semibold text-white">
                        {BUSINESS_INFO.email}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={13}
                    className="text-white/40 transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="group flex items-center justify-between gap-5 border-t border-white/10 py-5"
                >
                  <div className="flex items-center gap-4">
                    <Phone
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#AFC8FF]"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                        Phone
                      </p>

                      <p className="mt-1 text-[13px] font-semibold text-white">
                        {BUSINESS_INFO.phone}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={13}
                    className="text-white/40 transition-transform group-hover:translate-x-1"
                  />
                </a>

                <div className="flex items-center gap-4 border-y border-white/10 py-5">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#AFC8FF]"
                  />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                      Address
                    </p>

                    <p className="mt-1 text-[13px] font-semibold leading-6 text-white">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[10px] text-white/35">
                Official website · {BUSINESS_INFO.website}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQs;
