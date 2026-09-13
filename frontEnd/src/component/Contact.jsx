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
    <section className="min-h-screen overflow-x-hidden bg-[#F4F1EB]">

      {/* HERO */}
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
              returns, or anything Ziveline? Send us a message or
              contact our support team directly.
            </p>

          </div>
        </div>
      </div>

      {/* CONTACT CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

          {/* CONTACT INFORMATION */}
          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Contact Information
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Contact Ziveline
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-ink/60">
              Our support team is available during normal business hours.
              For general questions, order assistance, or product support,
              please contact us using the information below.
            </p>

            <div className="mt-8 grid gap-5">

              {/* EMAIL */}
              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                  <Mail size={20} aria-hidden="true" />
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
                    We usually respond within 24 hours during business days.
                  </p>

                </div>

              </div>

              {/* PHONE */}
              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                  <Phone size={20} aria-hidden="true" />
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
              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                  <MapPin size={20} aria-hidden="true" />
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

              {/* HOURS */}
              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-6">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink text-paper">
                  <Clock3 size={20} aria-hidden="true" />
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

          </div>

          {/* CONTACT FORM */}
          <div className="border border-line bg-paper p-6 sm:p-8 lg:p-10">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Send A Message
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink">
              How can we help?
            </h2>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              Complete the form below and our support team will review your
              message.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/60"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={80}
                  required
                  autoComplete="name"
                  className="min-h-12 w-full border border-line bg-[#F9F7F3] px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                  placeholder="Your name"
                />

              </div>

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/60"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={120}
                  required
                  autoComplete="email"
                  className="min-h-12 w-full border border-line bg-[#F9F7F3] px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                  placeholder="you@example.com"
                />

              </div>

              <div>

                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/60"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={120}
                  required
                  className="min-h-12 w-full border border-line bg-[#F9F7F3] px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
                  placeholder="How can we help?"
                />

              </div>

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/60"
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
                  className="w-full resize-y border border-line bg-[#F9F7F3] px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-ink"
                  placeholder="Enter your message"
                />

              </div>

              {successMessage && (
                <div
                  role="status"
                  className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />

                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />

                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} aria-hidden="true" />

                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* BOTTOM CTA */}
      <div className="border-t border-line bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="mx-auto max-w-7xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
            Ziveline
          </p>

          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Carry Your Style.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ink/60">
            Designed for everyday use with practical details and modern style.
          </p>

        </div>

      </div>

    </section>
  );
};

export default Contact;