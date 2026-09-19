import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import { API_BASE_URL } from "../config";

/* =========================================================
   ACV PLUS — SIGN UP
========================================================= */

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =======================================================
     HANDLE CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms =
        "You must accept the Terms & Conditions and Privacy Policy";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to create your account. Please try again.",
        );
      }

      setSuccessMessage(
        "Your ACV Plus account has been created successfully. Redirecting to sign in...",
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });

      window.setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setServerError(
        error?.message || "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* DECORATIVE BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[220px] -top-[240px] h-[520px] w-[520px] rounded-full border-[95px] border-[#E8F1FF]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[270px] -right-[220px] h-[560px] w-[560px] rounded-full border-[100px] border-[#E8F1FF]"
      />

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <header className="relative z-20 border-b border-[#D6E2F7] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-5 px-5 sm:px-6 lg:px-8">
          {/* BRAND */}

          <Link
            to="/"
            aria-label="ACV Plus home"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183A7A] text-white shadow-[0_8px_24px_rgba(24,58,122,0.15)]">
              <Leaf size={17} strokeWidth={1.8} />
            </div>

            <div>
              <p className="font-serif text-[22px] font-semibold leading-none tracking-[-0.035em] text-[#10285D]">
                ACV Plus
              </p>

              <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                Everyday Wellness
              </p>
            </div>
          </Link>

          {/* BACK HOME */}

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#263B63]/50 transition-colors hover:text-[#183A7A]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">Back to Home</span>

            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* =================================================
          SIGNUP AREA
      ================================================= */}

      <section className="relative z-10 px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1080px]">
          <div className="overflow-hidden rounded-[30px] border border-[#D6E2F7] bg-white shadow-[0_30px_80px_rgba(16,40,93,0.08)]">
            <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
              {/* ===========================================
                  LEFT WELLNESS PANEL
              =========================================== */}

              <aside className="relative hidden min-h-[720px] overflow-hidden bg-[#E8F1FF] p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
                {/* DECORATION */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border-[55px] border-white/65"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full border-[55px] border-[#C5D7FF]/50"
                />

                {/* TOP */}

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183A7A] text-white shadow-[0_14px_35px_rgba(24,58,122,0.18)]">
                    <Leaf size={20} strokeWidth={1.7} />
                  </div>

                  <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.21em] text-[#3569C8]">
                    ACV Plus Account
                  </p>

                  <h1 className="mt-4 max-w-[390px] font-serif text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#10285D] xl:text-[48px]">
                    Your wellness
                    <span className="block text-[#3569C8]">
                      shopping, simplified.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-[370px] text-[11px] leading-6 text-[#263B63]/55">
                    Create your ACV Plus account for a simple way to access your
                    shopping experience and account information.
                  </p>
                </div>

                {/* BENEFITS */}

                <div className="relative space-y-3">
                  <SignupBenefit
                    icon={CheckCircle2}
                    title="Simple Account Access"
                    text="Sign in whenever you need to access your account."
                  />

                  <SignupBenefit
                    icon={ShieldCheck}
                    title="Account Security"
                    text="Your password is used to protect access to your account."
                  />

                  <SignupBenefit
                    icon={Sparkles}
                    title="ACV Plus Experience"
                    text="A clean and convenient way to shop our products."
                  />
                </div>

                {/* BOTTOM */}

                <div className="relative flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#263B63]/35">
                  <ShieldCheck size={12} />
                  ACV Plus
                </div>
              </aside>

              {/* ===========================================
                  FORM
              =========================================== */}

              <div className="px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-12 xl:px-14">
                <div className="mx-auto max-w-[470px]">
                  {/* MOBILE BRAND MESSAGE */}

                  <div className="mb-7 flex items-center gap-3 rounded-[18px] bg-[#E8F1FF] p-4 lg:hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#183A7A] text-white">
                      <Leaf size={16} />
                    </div>

                    <div>
                      <p className="font-serif text-[17px] font-semibold text-[#10285D]">
                        Welcome to ACV Plus
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#263B63]/45">
                        Create your account below.
                      </p>
                    </div>
                  </div>

                  {/* FORM HEADING */}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-px w-7 bg-[#3569C8]" />

                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                        Create Account
                      </p>
                    </div>

                    <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.04em] text-[#10285D] sm:text-[40px]">
                      Join ACV Plus
                    </h2>

                    <p className="mt-3 max-w-[420px] text-[10px] leading-6 text-[#263B63]/50">
                      Enter your information below to create your ACV Plus
                      account.
                    </p>
                  </div>

                  {/* =======================================
                      SERVER ERROR
                  ======================================= */}

                  {serverError && (
                    <div
                      role="alert"
                      className="mt-6 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3.5 text-[10px] font-semibold leading-5 text-red-600"
                    >
                      {serverError}
                    </div>
                  )}

                  {/* =======================================
                      SUCCESS
                  ======================================= */}

                  {successMessage && (
                    <div
                      role="status"
                      className="mt-6 flex items-start gap-3 rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3.5"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <p className="text-[10px] font-semibold leading-5 text-emerald-700">
                        {successMessage}
                      </p>
                    </div>
                  )}

                  {/* =======================================
                      FORM
                  ======================================= */}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-7 space-y-5"
                  >
                    {/* FULL NAME */}

                    <FormField label="Full Name" error={errors.name}>
                      <User
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        maxLength={80}
                        disabled={isSubmitting}
                        className={getInputClass(errors.name, false)}
                      />
                    </FormField>

                    {/* EMAIL */}

                    <FormField label="Email Address" error={errors.email}>
                      <Mail
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        maxLength={120}
                        disabled={isSubmitting}
                        className={getInputClass(errors.email, false)}
                      />
                    </FormField>

                    {/* PASSWORD */}

                    <FormField label="Password" error={errors.password}>
                      <LockKeyhole
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        className={getInputClass(errors.password, true)}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        disabled={isSubmitting}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#263B63]/35 transition-colors hover:bg-[#E8F1FF] hover:text-[#183A7A] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </FormField>

                    {/* CONFIRM PASSWORD */}

                    <FormField
                      label="Confirm Password"
                      error={errors.confirmPassword}
                    >
                      <LockKeyhole
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        className={getInputClass(errors.confirmPassword, true)}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((current) => !current)
                        }
                        disabled={isSubmitting}
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#263B63]/35 transition-colors hover:bg-[#E8F1FF] hover:text-[#183A7A] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </FormField>

                    {/* =====================================
                        TERMS
                    ===================================== */}

                    <div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-[16px] border border-[#D6E2F7] bg-[#FAFCFF] p-4">
                        <input
                          name="terms"
                          type="checkbox"
                          checked={formData.terms}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#183A7A]"
                        />

                        <span className="text-[10px] leading-5 text-[#263B63]/55">
                          I agree to the{" "}
                          <Link
                            to="/terms-and-conditions"
                            className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-3"
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy-policy"
                            className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-3"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>

                      {errors.terms && (
                        <p className="mt-2 text-[9px] font-semibold text-red-500">
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* =====================================
                        SUBMIT
                    ===================================== */}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#23458C] px-6 text-[9px] font-bold uppercase tracking-[0.11em] text-white shadow-[0_12px_30px_rgba(35,69,140,0.15)] transition-all hover:bg-[#315FBA] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                  </form>

                  {/* =======================================
                      SIGN IN
                  ======================================= */}

                  <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#D6E2F7]" />

                    <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.13em] text-[#263B63]/30">
                      Already have an account?
                    </span>

                    <div className="h-px flex-1 bg-[#D6E2F7]" />
                  </div>

                  <Link
                    to="/login"
                    className="group flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-[#C5D7FF] bg-white px-6 text-[9px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-all hover:border-[#3569C8] hover:bg-[#E8F1FF]"
                  >
                    Sign In
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  {/* PRIVACY NOTE */}

                  <div className="mt-7 flex items-start justify-center gap-2">
                    <ShieldCheck
                      size={13}
                      className="mt-0.5 shrink-0 text-[#3569C8]"
                    />

                    <p className="max-w-[360px] text-center text-[8px] leading-4 text-[#263B63]/35">
                      By creating an ACV Plus account, you agree to our Terms &
                      Conditions and acknowledge our Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   FORM FIELD
========================================================= */

const FormField = ({ label, error, children }) => {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-bold text-[#10285D]">
        {label}
      </label>

      <div className="relative">{children}</div>

      {error && (
        <p className="mt-2 text-[9px] font-semibold text-red-500">{error}</p>
      )}
    </div>
  );
};

/* =========================================================
   INPUT STYLE
========================================================= */

const getInputClass = (error, hasRightButton = false) => {
  return `min-h-[52px] w-full rounded-[15px] border bg-[#FAFCFF] py-3 pl-11 ${
    hasRightButton ? "pr-12" : "pr-4"
  } text-[11px] font-medium text-[#10285D] outline-none transition-all placeholder:text-[#263B63]/30 focus:bg-white focus:ring-4 focus:ring-[#3569C8]/[0.05] disabled:cursor-not-allowed disabled:opacity-60 ${
    error
      ? "border-red-300 focus:border-red-400"
      : "border-[#D6E2F7] focus:border-[#3569C8]"
  }`;
};

/* =========================================================
   SIGNUP BENEFIT
========================================================= */

const SignupBenefit = ({ icon: Icon, title, text }) => {
  return (
    <div className="flex items-start gap-3 rounded-[18px] border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#183A7A] shadow-sm">
        <Icon size={15} strokeWidth={1.7} />
      </div>

      <div>
        <p className="text-[10px] font-bold text-[#10285D]">{title}</p>

        <p className="mt-1 text-[8px] leading-4 text-[#263B63]/45">{text}</p>
      </div>
    </div>
  );
};

export default Signup;
