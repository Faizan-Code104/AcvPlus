import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  CheckCircle2,
  AlertCircle,
  Headphones,
  ShieldCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const BUSINESS_INFO = {
  businessName: "ACV Plus",
  descriptor: "Sophia Strategic Travisions LLC",
  email: "Support@acvplus.us",
  phoneDisplay: "+1 (888) 944-6546",
  phoneHref: "+18889446546",
  addressLine1: "4808 Fairmont Pkwy",
  addressLine2: "Pasadena, TX 77505",
  country: "United States",
  hours: "Monday – Friday",
  time: "9:00 AM – 5:00 PM CT",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setSuccessMessage(
        "Your message has been sent successfully. Our support team will get back to you as soon as possible."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);

      setErrorMessage(
        "We were unable to send your message. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#172D57]">
        <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#3569C8]/20 blur-3xl" />
        <div className="absolute -bottom-52 right-0 h-[500px] w-[500px] rounded-full bg-[#AFC8FF]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#AFC8FF]/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C5D7FF]">
                <MessageCircle size={15} />
                Contact ACV Plus
              </div>

              <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                We&apos;re Here to
                <span className="block text-[#AFC8FF]">Help You.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Have a question about an ACV Plus product, your order,
                shipping, returns, or general support? Our team is ready to
                assist you.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#172D57] transition hover:bg-[#E8F1FF]"
                >
                  <Mail size={17} />
                  Email Support
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneHref}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone size={17} />
                  Call Us
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-end">
              <div className="relative flex h-[310px] w-[310px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <div className="absolute inset-8 rounded-full border border-[#AFC8FF]/15" />

                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-2xl">
                  <Headphones
                    size={70}
                    strokeWidth={1.4}
                    className="text-[#23458C]"
                  />
                </div>

                <div className="absolute right-1 top-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3569C8] text-white shadow-xl">
                  <MessageCircle size={25} />
                </div>

                <div className="absolute bottom-7 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#AFC8FF] text-[#172D57] shadow-xl">
                  <ShieldCheck size={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT STRIP */}
      <section className="border-b border-[#D6E2F7] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#D6E2F7] px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          <SupportItem
            icon={Mail}
            title="Email Support"
            text="Direct assistance from our team"
          />

          <SupportItem
            icon={Clock3}
            title="Business Hours"
            text="Monday – Friday"
          />

          <SupportItem
            icon={ShieldCheck}
            title="Customer Care"
            text="Order & product assistance"
          />
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="relative py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                <Sparkles size={15} />
                Contact Information
              </div>

              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#10285D] sm:text-4xl">
                Get in touch with
                <span className="block">ACV Plus</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#263B63]/70">
                Whether you need assistance with an order or have a question
                about our products, you can reach our support team using the
                contact information below.
              </p>

              <div className="mt-9 grid gap-4">
                <ContactCard
                  icon={Mail}
                  label="Email"
                  content={
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="break-all font-semibold text-[#10285D] transition hover:text-[#3569C8]"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  }
                  description="For orders, products, returns, and general support."
                />

                <ContactCard
                  icon={Phone}
                  label="Phone"
                  content={
                    <a
                      href={`tel:${BUSINESS_INFO.phoneHref}`}
                      className="font-semibold text-[#10285D] transition hover:text-[#3569C8]"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  }
                  description={`${BUSINESS_INFO.hours} · ${BUSINESS_INFO.time}`}
                />

                <ContactCard
                  icon={MapPin}
                  label="Business Location"
                  content={
                    <span className="font-semibold text-[#10285D]">
                      {BUSINESS_INFO.addressLine1}
                      <br />
                      {BUSINESS_INFO.addressLine2}
                    </span>
                  }
                  description={BUSINESS_INFO.country}
                />

                <ContactCard
                  icon={Clock3}
                  label="Working Hours"
                  content={
                    <span className="font-semibold text-[#10285D]">
                      {BUSINESS_INFO.hours}
                    </span>
                  }
                  description={BUSINESS_INFO.time}
                />
              </div>

              <div className="mt-6 rounded-3xl border border-[#C5D7FF] bg-[#E8F1FF] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3569C8]">
                  Business Descriptor
                </p>

                <p className="mt-2 text-sm font-semibold text-[#10285D]">
                  Descriptor: {BUSINESS_INFO.descriptor}
                </p>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-[32px] border border-[#D6E2F7] bg-white p-5 shadow-[0_20px_60px_rgba(16,40,93,0.08)] sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                <Send size={15} />
                Send A Message
              </div>

              <h2 className="mt-4 font-serif text-3xl font-semibold text-[#10285D]">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#263B63]/65">
                Fill out the form and send your message directly to our
                support team.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Your Name"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={80}
                  />

                  <Field
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={120}
                  />
                </div>

                <Field
                  label="Subject"
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  maxLength={120}
                />

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#263B63]/65"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={2000}
                    required
                    rows={7}
                    className="w-full resize-y rounded-2xl border border-[#D6E2F7] bg-[#FAFCFF] px-4 py-3.5 text-sm leading-6 text-[#263B63] outline-none transition placeholder:text-[#263B63]/35 focus:border-[#3569C8] focus:bg-white focus:ring-4 focus:ring-[#3569C8]/10"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {successMessage && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{successMessage}</span>
                  </div>
                )}

                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                  >
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#23458C] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(35,69,140,0.22)] transition duration-300 hover:bg-[#315FBA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5"
                  />

                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="text-center text-xs leading-5 text-[#263B63]/50">
                  By submitting this form, you&apos;re contacting the ACV Plus
                  customer support team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#172D57] px-6 py-12 text-center sm:px-10 sm:py-14">
          <div className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#3569C8]/20 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#AFC8FF]/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#AFC8FF]">
              <LeafIcon />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
              ACV Plus
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
              Support for your ACV Plus experience.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">
              Questions about your order or our products? Reach out and our
              support team will be happy to assist.
            </p>

            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#172D57] transition hover:bg-[#E8F1FF]"
            >
              <Mail size={17} />
              {BUSINESS_INFO.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

const Field = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  maxLength,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#263B63]/65"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required
        className="min-h-12 w-full rounded-2xl border border-[#D6E2F7] bg-[#FAFCFF] px-4 py-3 text-sm text-[#263B63] outline-none transition placeholder:text-[#263B63]/35 focus:border-[#3569C8] focus:bg-white focus:ring-4 focus:ring-[#3569C8]/10"
      />
    </div>
  );
};

const ContactCard = ({
  icon: Icon,
  label,
  content,
  description,
}) => {
  return (
    <div className="group flex min-w-0 items-start gap-4 rounded-3xl border border-[#D6E2F7] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#AFC8FF] hover:shadow-[0_12px_35px_rgba(16,40,93,0.07)] sm:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F1FF] text-[#23458C] transition group-hover:bg-[#23458C] group-hover:text-white">
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#263B63]/45">
          {label}
        </p>

        <div className="mt-1.5 text-sm">{content}</div>

        <p className="mt-2 text-xs leading-5 text-[#263B63]/55">
          {description}
        </p>
      </div>
    </div>
  );
};

const SupportItem = ({ icon: Icon, title, text }) => {
  return (
    <div className="flex items-center justify-center gap-3 px-4 py-5 sm:py-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#23458C]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-sm font-semibold text-[#10285D]">{title}</p>
        <p className="mt-0.5 text-xs text-[#263B63]/55">{text}</p>
      </div>
    </div>
  );
};

const LeafIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M19.5 4.5C13.5 4.7 8.3 7.2 6.1 11.4C4.8 13.9 5.2 16.5 6.7 18.2C8.4 19.7 11 20.1 13.5 18.8C17.7 16.6 20.2 11.4 20.4 5.4C20.4 4.9 20 4.5 19.5 4.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 20C7.2 15.7 11.1 12.3 16.2 9.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export default Contact;