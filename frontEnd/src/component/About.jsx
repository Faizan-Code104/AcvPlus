import React from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Target,
  Heart,
  PackageCheck,
  Leaf,
  CircleCheck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

/* =========================================================
   ACV PLUS BUSINESS INFORMATION
========================================================= */

const BUSINESS_INFO = {
  brandName: "ACV Plus",
  descriptor: "Sophia Strategic Travisions LLC",
  website: "acvplus.us",
  address: "4808 Fairmont Pkwy, Pasadena, TX 77505",
  email: "Support@acvplus.us",
  phoneDisplay: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
};

/* =========================================================
   ABOUT PAGE
========================================================= */

const About = () => {
  const values = [
    {
      icon: ShieldCheck,
      number: "01",
      title: "Clear Information",
      description:
        "We believe customers should have access to clear product details, directions, ingredients, and other available label information before making a purchase.",
    },
    {
      icon: Target,
      number: "02",
      title: "Thoughtful Selection",
      description:
        "Our store focuses on wellness products, dietary supplements, and related items selected for our online collection.",
    },
    {
      icon: Heart,
      number: "03",
      title: "Customer Focus",
      description:
        "We aim to make shopping straightforward with accessible product information, clear store policies, and responsive customer support.",
    },
    {
      icon: PackageCheck,
      number: "04",
      title: "Reliable Experience",
      description:
        "From browsing products to receiving an order, our goal is to provide a simple and dependable online shopping experience.",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#263B63]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F1F6FF]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-[210px] -top-[230px] h-[620px] w-[620px] rounded-full border-[100px] border-[#E5EEFC]" />

        <div className="pointer-events-none absolute -bottom-[190px] -left-[170px] h-[410px] w-[410px] rounded-full border-[65px] border-white/70" />

        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
          <div className="grid min-h-[560px] items-center gap-12 py-16 lg:grid-cols-[1.03fr_0.97fr] lg:py-20">
            {/* LEFT CONTENT */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#3569C8]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3569C8]">
                  About ACV Plus
                </p>
              </div>

              <h1 className="mt-6 max-w-[680px] font-serif text-[47px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#10285D] sm:text-[59px] lg:text-[70px]">
                Wellness made
                <span className="block text-[#3569C8]">easier to explore.</span>
              </h1>

              <p className="mt-7 max-w-[590px] text-[14px] leading-7 text-[#263B63]/70 sm:text-[15px]">
                ACV Plus is an online destination for wellness products, dietary
                supplements, and related items. Our goal is to provide a
                straightforward shopping experience supported by clear product
                information and accessible customer service.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 rounded-full bg-[#23458C] px-7 py-3.5 text-[11px] font-bold text-white transition-all hover:bg-[#315FBA]"
                >
                  Shop All Products
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-[#C5D7FF] bg-white px-7 py-3.5 text-[11px] font-bold text-[#183A7A] transition-all hover:border-[#3569C8]"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative hidden min-h-[430px] lg:block">
              <div className="absolute right-0 top-1/2 h-[390px] w-[390px] -translate-y-1/2 rounded-full border border-[#C5D7FF]" />

              <div className="absolute right-[45px] top-1/2 flex h-[300px] w-[300px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_30px_80px_rgba(16,40,93,0.08)]">
                <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-[#E8F1FF]">
                  <Leaf size={65} strokeWidth={1} className="text-[#183A7A]" />
                </div>
              </div>

              <div className="absolute bottom-[22px] left-[15px] w-[225px] rounded-[20px] bg-[#172D57] p-6 text-white shadow-[0_20px_50px_rgba(16,40,93,0.15)]">
                <Sparkles size={18} className="text-[#AFC8FF]" />

                <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC8FF]">
                  Our Approach
                </p>

                <p className="mt-2 font-serif text-[21px] leading-6">
                  Clear. Simple.
                  <br />
                  Customer focused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BRAND STRIP
      ===================================================== */}

      <section className="border-y border-[#D6E2F7] bg-white">
        <div className="mx-auto grid max-w-[1240px] sm:grid-cols-3">
          {[
            {
              title: "Wellness Focus",
              text: "Products for everyday wellness",
              icon: Leaf,
            },
            {
              title: "Clear Information",
              text: "Details to help you shop",
              icon: CircleCheck,
            },
            {
              title: "Customer Support",
              text: "Help when you need it",
              icon: Heart,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-6 py-6 lg:px-9 ${
                  index < 2
                    ? "border-b border-[#D6E2F7] sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                  <Icon size={18} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[12px] font-bold text-[#10285D]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] text-[#263B63]/55">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* VISUAL */}
          <div className="relative min-h-[430px] overflow-hidden rounded-t-[180px] bg-[#E8F1FF] sm:min-h-[520px]">
            <div className="absolute left-1/2 top-1/2 flex h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_25px_60px_rgba(16,40,93,0.07)] sm:h-[310px] sm:w-[310px]">
              <Leaf size={75} strokeWidth={0.9} className="text-[#183A7A]" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-[18px] bg-white/90 p-5 backdrop-blur-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                ACV Plus
              </p>

              <p className="mt-2 font-serif text-[20px] text-[#10285D]">
                A straightforward approach to online wellness shopping.
              </p>
            </div>
          </div>

          {/* STORY CONTENT */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
              Our Story
            </p>

            <h2 className="mt-4 max-w-[570px] font-serif text-[38px] font-semibold leading-[1.07] tracking-[-0.035em] text-[#10285D] sm:text-[48px]">
              A simpler way to
              <span className="block text-[#3569C8]">shop for wellness.</span>
            </h2>

            <div className="mt-7 max-w-[590px] space-y-5 text-[14px] leading-7 text-[#263B63]/68">
              <p>
                ACV Plus was created to provide customers with an
                easy-to-navigate online store for wellness products, dietary
                supplements, and related items.
              </p>

              <p>
                We believe the shopping experience should be clear and
                straightforward. That means providing useful product
                information, transparent store policies, and accessible support
                when customers have questions.
              </p>

              <p>
                As our collection develops, our focus remains on making it
                easier for customers to review available product details and
                make their own informed purchasing decisions.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Clear product information",
                "Straightforward policies",
                "Secure website experience",
                "Accessible customer support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-[#D6E2F7] py-3"
                >
                  <Check
                    size={15}
                    strokeWidth={2}
                    className="shrink-0 text-[#3569C8]"
                  />

                  <span className="text-[12px] font-semibold text-[#10285D]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
      ===================================================== */}

      <section className="bg-[#F1F6FF] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid overflow-hidden rounded-[30px] bg-white lg:grid-cols-[1.05fr_0.95fr]">
            {/* MISSION CONTENT */}
            <div className="p-8 sm:p-10 lg:p-14">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <Target size={19} strokeWidth={1.5} />
              </div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Our Mission
              </p>

              <h2 className="mt-4 max-w-[520px] font-serif text-[35px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#10285D] sm:text-[43px]">
                Make online wellness shopping clear and convenient.
              </h2>

              <p className="mt-6 max-w-[570px] text-[14px] leading-7 text-[#263B63]/65">
                Our mission is to provide a straightforward e-commerce
                experience where customers can browse wellness products, review
                available product information, understand our policies, and
                receive support when needed.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#23458C] px-7 py-3.5 text-[11px] font-bold text-white transition-colors hover:bg-[#315FBA]"
              >
                Explore Products
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* MISSION QUOTE */}
            <div className="relative overflow-hidden bg-[#172D57] p-8 text-white sm:p-10 lg:p-14">
              <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full border-[50px] border-white/[0.04]" />

              <div className="relative">
                <Sparkles
                  size={24}
                  strokeWidth={1.3}
                  className="text-[#AFC8FF]"
                />

                <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                  The ACV Plus Approach
                </p>

                <blockquote className="mt-5 max-w-[430px] font-serif text-[30px] leading-[1.2] sm:text-[36px]">
                  Clear information.
                  <br />
                  Simple shopping.
                  <br />
                  Helpful support.
                </blockquote>

                <div className="mt-10 h-px bg-white/10" />

                <div className="mt-7 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#AFC8FF]">
                    <Leaf size={17} />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold">
                      Wellness-focused shopping
                    </p>

                    <p className="mt-1 text-[10px] text-white/45">
                      Built around clarity and convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                What Matters To Us
              </p>

              <h2 className="mt-4 font-serif text-[37px] font-semibold leading-[1.07] tracking-[-0.035em] text-[#10285D] sm:text-[45px]">
                The principles
                <span className="block text-[#3569C8]">behind ACV Plus.</span>
              </h2>
            </div>

            <p className="max-w-[500px] text-[13px] leading-7 text-[#263B63]/60 lg:ml-auto">
              Our approach is centered around a clear, practical, and
              customer-friendly shopping experience.
            </p>
          </div>

          <div className="mt-12 grid border-t border-[#C5D7FF] sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className={`group relative min-h-[300px] border-b border-[#C5D7FF] p-6 transition-colors hover:bg-[#F1F6FF] lg:border-b-0 lg:p-7 ${
                    index < values.length - 1 ? "sm:border-r" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <span className="font-serif text-[22px] text-[#AFC8FF]">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-12 text-[15px] font-bold text-[#10285D]">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-[12px] leading-6 text-[#263B63]/58">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SHOP CTA
      ===================================================== */}

      <section className="bg-[#F1F6FF] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Discover ACV Plus
              </p>

              <h2 className="mt-4 max-w-[650px] font-serif text-[38px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#10285D] sm:text-[47px]">
                Explore our wellness
                <span className="block text-[#3569C8]">collection.</span>
              </h2>

              <p className="mt-6 max-w-[590px] text-[14px] leading-7 text-[#263B63]/65">
                Browse all available ACV Plus products and review the product
                details, ingredients, directions, warnings, and other available
                information before placing your order.
              </p>

              <Link
                to="/shop"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#23458C] px-7 py-3.5 text-[11px] font-bold text-white transition-colors hover:bg-[#315FBA]"
              >
                Shop All Products
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="rounded-[26px] bg-white p-7 shadow-[0_20px_60px_rgba(16,40,93,0.05)] sm:p-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                ACV Plus
              </p>

              <p className="mt-3 font-serif text-[25px] leading-tight text-[#10285D]">
                Questions before you shop?
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#263B63]/55">
                Visit our FAQ center or contact our support team for assistance.
              </p>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/faqs"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#183A7A]"
                >
                  View FAQs
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS / CONTACT
      ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[30px] bg-[#172D57] text-white">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT */}
            <div className="relative overflow-hidden border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border-[55px] border-white/[0.04]" />

              <div className="relative">
                <Leaf size={28} strokeWidth={1.3} className="text-[#AFC8FF]" />

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#AFC8FF]">
                  About Our Store
                </p>

                <h2 className="mt-3 font-serif text-[35px] font-semibold leading-tight sm:text-[40px]">
                  ACV Plus
                </h2>

                <p className="mt-5 max-w-[390px] text-[13px] leading-7 text-white/62">
                  An online store focused on wellness products, dietary
                  supplements, and related items.
                </p>

                <Link
                  to="/contact"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[11px] font-bold text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
                >
                  Contact Us
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                Business Information
              </p>

              <div className="mt-7">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-5 border-t border-white/10 py-5"
                >
                  <Mail
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#AFC8FF]"
                  />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                      Email
                    </p>

                    <p className="mt-1 text-[13px] font-semibold">
                      {BUSINESS_INFO.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="flex items-center gap-5 border-t border-white/10 py-5"
                >
                  <Phone
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#AFC8FF]"
                  />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                      Phone
                    </p>

                    <p className="mt-1 text-[13px] font-semibold">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-5 border-y border-white/10 py-5">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#AFC8FF]"
                  />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                      Address
                    </p>

                    <p className="mt-1 text-[13px] font-semibold leading-6">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-l-2 border-[#AFC8FF] pl-4">
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                  Descriptor
                </p>

                <p className="mt-1 text-[12px] font-semibold text-white/85">
                  {BUSINESS_INFO.descriptor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
