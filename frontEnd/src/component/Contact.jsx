import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
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

  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setPrepared(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject =
        "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setPrepared(false);
      return;
    }

    setErrors({});
    setPrepared(true);

    const subject = encodeURIComponent(
      `[Ziveline Contact] ${formData.subject.trim()}`
    );

    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}
Email: ${formData.email.trim()}

Message:
${formData.message.trim()}`
    );

    window.location.href =
      `mailto:${BUSINESS_INFO.email}` +
      `?subject=${subject}&body=${body}`;
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
              Let&apos;s talk about
              <span className="block text-paper/60">
                your next journey.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-paper/70 sm:text-base">
              Have a question about your order, our products,
              or anything Ziveline? Our team is here to help.
            </p>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

          {/* CONTACT INFORMATION */}

          <div className="min-w-0">

            <div className="mb-8">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
                Contact Information
              </p>

              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-ink/60">
                Whether you need help choosing a bag or have a
                question about an existing order, feel free to
                reach out.
              </p>

            </div>

            <div className="space-y-4">

              {/* EMAIL */}

              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-5">

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

                  <p className="mt-1 text-sm text-ink/50">
                    We usually reply within 24 hours.
                  </p>

                </div>

              </div>

              {/* PHONE */}

              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-5">

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

                  <p className="mt-1 text-sm text-ink/50">
                    {BUSINESS_INFO.hours},{" "}
                    {BUSINESS_INFO.time}
                  </p>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-5">

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

                  <p className="mt-1 text-sm leading-6 text-ink/50">
                    {BUSINESS_INFO.addressLine1}
                    <br />
                    {BUSINESS_INFO.addressLine2}
                    <br />
                    {BUSINESS_INFO.country}
                  </p>

                </div>

              </div>

              {/* WORKING HOURS */}

              <div className="flex min-w-0 items-start gap-4 border border-line bg-paper p-5">

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

                  <p className="mt-1 text-sm text-ink/50">
                    {BUSINESS_INFO.time}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* CONTACT FORM */}

          <div className="min-w-0">

            <div className="mb-8">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
                Send A Message
              </p>

              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-6 text-ink/60">
                Fill out the form below to prepare an email
                to our support address.
              </p>

            </div>

            {/* PREPARED MESSAGE */}

            {prepared && (
              <div className="mb-6 flex items-start gap-3 border border-line bg-paper p-4 text-ink">

                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />

                <div>

                  <p className="text-sm font-bold">
                    Your email is ready.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/60">
                    Your device&apos;s email application should
                    open with the message prepared for{" "}
                    {BUSINESS_INFO.email}.
                  </p>

                </div>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              {/* NAME + EMAIL */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-ink/70"
                  >
                    Your Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                      aria-hidden="true"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      className={`min-h-12 w-full border bg-paper pl-11 pr-4 text-base text-ink outline-none transition-all placeholder:text-ink/40 sm:text-sm ${
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-line focus:border-ink"
                      }`}
                    />

                  </div>

                  {errors.name && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold text-ink/70"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                      aria-hidden="true"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`min-h-12 w-full border bg-paper pl-11 pr-4 text-base text-ink outline-none transition-all placeholder:text-ink/40 sm:text-sm ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-line focus:border-ink"
                      }`}
                    />

                  </div>

                  {errors.email && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}

                </div>

              </div>

              {/* SUBJECT */}

              <div>

                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs font-bold text-ink/70"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={`min-h-12 w-full border bg-paper px-4 text-base text-ink outline-none transition-all placeholder:text-ink/40 sm:text-sm ${
                    errors.subject
                      ? "border-red-400 focus:border-red-500"
                      : "border-line focus:border-ink"
                  }`}
                />

                {errors.subject && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.subject}
                  </p>
                )}

              </div>

              {/* MESSAGE */}

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold text-ink/70"
                >
                  Message
                </label>

                <div className="relative">

                  <MessageSquare
                    size={18}
                    className="pointer-events-none absolute left-4 top-4 text-ink/40"
                    aria-hidden="true"
                  />

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="6"
                    className={`w-full resize-y border bg-paper py-3 pl-11 pr-4 text-base text-ink outline-none transition-all placeholder:text-ink/40 sm:text-sm ${
                      errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                </div>

                {errors.message && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.message}
                  </p>
                )}

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="group flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark"
              >
                Prepare Email

                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <p className="text-xs leading-5 text-ink/45">
                This temporary setup opens your email
                application. A direct website-to-email
                contact form can be connected to the
                backend later.
              </p>

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
            Designed for everyday use with practical details
            and modern style.
          </p>

        </div>

      </div>

    </section>
  );
};

export default Contact;