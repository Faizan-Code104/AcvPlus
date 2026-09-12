import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Heart,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "Ziveline LLC",
  address: "2125 Strawberry Rd, Pasadena, TX 77502",
  phoneDisplay: "+1 (832) 285-3511",
  phoneHref: "+18322853511",
  email: "info@Ziveline.com",
  businessDays: "Monday – Friday",
  supportHours: "9:00 AM – 5:00 PM CT",
};

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Thoughtful Design",
      description:
        "We focus on clean, practical designs created for everyday use.",
    },
    {
      icon: ShieldCheck,
      title: "Everyday Function",
      description:
        "Our product selection focuses on useful features, practical storage, and everyday convenience.",
    },
    {
      icon: Target,
      title: "Purposeful Details",
      description:
        "We value practical features such as useful compartments, comfortable carrying options, and functional layouts.",
    },
    {
      icon: Heart,
      title: "Designed for Everyday Life",
      description:
        "Our collection is selected with everyday routines, travel, work, and personal style in mind.",
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <img
          src="/ziveline-about.png"
          alt="Ziveline handbags collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-paper/60">
              Our Story
            </p>

            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl">
              More than a bag.
              <span className="block text-paper/60">
                Part of your everyday journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-paper/70 sm:text-base">
              Ziveline LLC operates Ziveline to offer women thoughtfully
              selected handbags that combine modern style with practical
              everyday functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden bg-line/40">
            <img
              src="/about.png"
              alt="Ziveline handbag for everyday use"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Why Ziveline?
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Designed around
              <span className="block text-ink/50">the way you live.</span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-7 text-ink/70 sm:text-base">
              <p>
                Ziveline focuses on handbags that balance modern style with
                practical features for everyday routines.
              </p>

              <p>
                Whether you're heading to work, meeting friends, shopping, or
                travelling, our goal is to offer bags that are practical and
                easy to style.
              </p>

              <p>
                We focus on useful layouts, versatile designs, and clear product
                information so customers can choose the bag that best suits
                their needs.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Modern Style",
                "Practical Features",
                "Everyday Use",
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-xs font-semibold text-ink"
                >
                  <Check size={15} className="text-bottle" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Our Mission
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Make everyday carrying
              <span className="block text-ink/50">simple and stylish.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">
              Our mission is to offer handbags that combine practical
              functionality with a modern look for everyday use.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">
              We aim to provide clear product information and a straightforward
              shopping experience so customers can shop with confidence.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark"
            >
              Explore Our Bags
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="bg-ink p-7 text-paper sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center bg-paper text-ink">
              <Layers3 size={24} />
            </div>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-paper/50">
              The Ziveline Approach
            </p>

            <blockquote className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
              Thoughtful style, practical features, and clear product
              information.
            </blockquote>

            <div className="mt-10 h-px bg-paper/10" />

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10">
                <Sparkles size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold">Selected with purpose</p>
                <p className="mt-1 text-xs text-paper/50">
                  Designed for everyday needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F4F1EB] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              What We Believe
            </p>

            <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Our values guide
              <span className="block text-ink/50">the Ziveline experience.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="border border-line bg-paper p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-ink text-paper">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-6 text-base font-bold text-ink">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-ink/60">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="border-t border-line px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-ink text-paper">
            <Users size={24} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-bottle">
            Discover Ziveline
          </p>

          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Find a bag for your everyday routine.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">
            Explore our collection of women's handbags and review each
            product's details, features, and specifications before placing your
            order.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/60">
            {BUSINESS_INFO.businessName} · {BUSINESS_INFO.address}
            <br />
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="transition-colors hover:text-ink"
            >
              {BUSINESS_INFO.email}
            </a>
            {" · "}
            <a
              href={`tel:${BUSINESS_INFO.phoneHref}`}
              className="transition-colors hover:text-ink"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <br />
            {BUSINESS_INFO.businessDays} · {BUSINESS_INFO.supportHours}
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark"
          >
            Shop Collection
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
