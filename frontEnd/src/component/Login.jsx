import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* =========================================================
   ACV PLUS LOGIN
========================================================= */

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =======================================================
     REDIRECT
  ======================================================= */

  const redirectTo =
    typeof location.state?.from === "string" ? location.state.from : "/";

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  /* =======================================================
     HANDLE CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
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

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    const loginValues = {
      email: formData.email.trim().toLowerCase(),

      password: formData.password,
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(loginValues),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setServerError(
          data?.message ||
            "Unable to sign in. Please check your email and password.",
        );

        return;
      }

      if (!data?.token || !data?.user) {
        setServerError("The server returned an incomplete login response.");

        return;
      }

      /* ===============================================
         ACV PLUS STORAGE
      =============================================== */

      localStorage.setItem("acvplus-token", data.token);

      localStorage.setItem("acvplus-user", JSON.stringify(data.user));

      setSuccessMessage("Welcome back. Redirecting...");

      setFormData({
        email: "",
        password: "",
        remember: false,
      });

      setTimeout(() => {
        navigate(redirectTo, {
          replace: true,
        });
      }, 700);
    } catch (error) {
      console.error("ACV Plus Login Error:", error);

      setServerError("Unable to connect right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     SHARED STYLES
  ======================================================= */

  const inputClass = (hasError) =>
    `min-h-[54px] w-full rounded-[14px] border bg-white py-3 pl-12 pr-4 text-[14px] text-[#10285D] outline-none transition-all duration-300 placeholder:text-[#263B63]/30 ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100/60"
        : "border-[#D6E2F7] hover:border-[#C5D7FF] focus:border-[#3569C8] focus:ring-4 focus:ring-[#3569C8]/[0.07]"
    }`;

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F1F6FF]">
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] -top-[220px] h-[560px] w-[560px] rounded-full border-[100px] border-[#E8F1FF]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[260px] -left-[230px] h-[600px] w-[600px] rounded-full border-[110px] border-[#E8F1FF]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-[17%] h-20 w-20 rounded-full bg-[#AFC8FF]/15 blur-xl"
      />

      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <header className="relative z-20 border-b border-[#D6E2F7]/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[74px] max-w-[1240px] items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* BRAND */}

          <Link
            to="/"
            aria-label="ACV Plus home"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183A7A] text-white shadow-[0_8px_22px_rgba(24,58,122,0.16)]">
              <Leaf size={18} strokeWidth={1.8} />
            </div>

            <div>
              <p className="font-serif text-[21px] font-semibold leading-none tracking-[-0.03em] text-[#10285D]">
                ACV Plus
              </p>

              <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                Everyday Wellness
              </p>
            </div>
          </Link>

          {/* HOME LINK */}

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#263B63]/55 transition-colors hover:text-[#183A7A]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* =================================================
          LOGIN AREA
      ================================================= */}

      <section className="relative z-10 flex min-h-[calc(100vh-74px)] items-center px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid overflow-hidden rounded-[34px] border border-[#D6E2F7] bg-white shadow-[0_30px_90px_rgba(16,40,93,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
            {/* =============================================
                WELLNESS PANEL
            ============================================= */}

            <div className="relative hidden overflow-hidden bg-[#E8F1FF] p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
              {/* DECORATION */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border-[55px] border-white/45"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[55px] border-[#AFC8FF]/20"
              />

              {/* TOP */}

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C5D7FF] bg-white/75 px-4 py-2 backdrop-blur">
                  <Sparkles size={13} className="text-[#3569C8]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#183A7A]">
                    Welcome Back
                  </span>
                </div>
              </div>

              {/* CENTER VISUAL */}

              <div className="relative z-10 py-12">
                <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#AFC8FF]/55" />

                  <div className="absolute inset-[28px] rounded-full border border-white" />

                  <div className="absolute inset-[58px] rounded-full bg-white shadow-[0_25px_60px_rgba(24,58,122,0.10)]" />

                  <div className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[#183A7A] text-white shadow-[0_20px_50px_rgba(24,58,122,0.22)]">
                    <Leaf size={44} strokeWidth={1.3} />
                  </div>

                  <div className="absolute right-1 top-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#3569C8] shadow-md">
                    <CheckCircle2 size={18} />
                  </div>

                  <div className="absolute bottom-6 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#3569C8] text-white shadow-md">
                    <ShieldCheck size={16} />
                  </div>
                </div>
              </div>

              {/* BOTTOM TEXT */}

              <div className="relative z-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                  Your ACV Plus Account
                </p>

                <h2 className="mt-4 max-w-[370px] font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#10285D] xl:text-[41px]">
                  Simple access to your wellness shopping.
                </h2>

                <p className="mt-5 max-w-[390px] text-[12px] leading-6 text-[#263B63]/60">
                  Sign in to access your account information and available order
                  details in one convenient place.
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#183A7A]">
                    <CheckCircle2 size={14} />
                  </div>

                  <span className="text-[11px] font-semibold text-[#263B63]/70">
                    Clear. Simple. Convenient.
                  </span>
                </div>
              </div>
            </div>

            {/* =============================================
                LOGIN FORM PANEL
            ============================================= */}

            <div className="flex items-center px-5 py-10 sm:px-10 sm:py-12 lg:px-14 xl:px-20 xl:py-16">
              <div className="mx-auto w-full max-w-[430px]">
                {/* MOBILE ICON */}

                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E8F1FF] text-[#183A7A] lg:hidden">
                  <Leaf size={23} strokeWidth={1.6} />
                </div>

                {/* HEADING */}

                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-7 bg-[#3569C8]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                      Account Access
                    </p>
                  </div>

                  <h1 className="mt-4 font-serif text-[39px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#10285D] sm:text-[46px]">
                    Welcome back.
                  </h1>

                  <p className="mt-4 text-[12px] leading-6 text-[#263B63]/55">
                    Enter your email and password to access your ACV Plus
                    account.
                  </p>
                </div>

                {/* =========================================
                    SERVER ERROR
                ========================================= */}

                {serverError && (
                  <div
                    role="alert"
                    className="mt-6 flex items-start gap-3 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3.5"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                    <p className="text-[11px] font-medium leading-5 text-red-600">
                      {serverError}
                    </p>
                  </div>
                )}

                {/* =========================================
                    SUCCESS
                ========================================= */}

                {successMessage && (
                  <div
                    role="status"
                    className="mt-6 flex items-start gap-3 rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3.5"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-[11px] font-medium leading-5 text-emerald-700">
                      {successMessage}
                    </p>
                  </div>
                )}

                {/* =========================================
                    LOGIN FORM
                ========================================= */}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 space-y-5"
                >
                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.07em] text-[#263B63]/65"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
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
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={inputClass(Boolean(errors.email))}
                      />
                    </div>

                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-1.5 text-[10px] font-medium text-red-500"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PASSWORD */}

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.07em] text-[#263B63]/65"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                        className={`${inputClass(
                          Boolean(errors.password),
                        )} pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[#263B63]/40 transition-colors hover:bg-[#F1F6FF] hover:text-[#183A7A]"
                      >
                        {showPassword ? (
                          <EyeOff size={17} aria-hidden="true" />
                        ) : (
                          <Eye size={17} aria-hidden="true" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p
                        id="password-error"
                        className="mt-1.5 text-[10px] font-medium text-red-500"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* REMEMBER */}

                  <div className="flex items-center justify-between">
                    <label className="flex min-h-10 cursor-pointer items-center gap-2.5">
                      <input
                        name="remember"
                        type="checkbox"
                        checked={formData.remember}
                        onChange={handleChange}
                        className="h-4 w-4 cursor-pointer accent-[#23458C]"
                      />

                      <span className="text-[11px] text-[#263B63]/60">
                        Remember me
                      </span>
                    </label>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#23458C] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.11em] text-white shadow-[0_12px_30px_rgba(35,69,140,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#315FBA] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                  >
                    {loading ? "Signing In..." : "Sign In"}

                    {!loading && (
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                {/* =========================================
                    CREATE ACCOUNT
                ========================================= */}

                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#D6E2F7]" />

                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.13em] text-[#263B63]/35">
                    New to ACV Plus?
                  </span>

                  <div className="h-px flex-1 bg-[#D6E2F7]" />
                </div>

                <Link
                  to="/signup"
                  className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-[#C5D7FF] bg-white px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-all duration-300 hover:border-[#3569C8] hover:bg-[#F1F6FF]"
                >
                  Create an Account
                </Link>

                {/* =========================================
                    GUEST CHECKOUT
                ========================================= */}

                <div className="mt-6 rounded-[14px] bg-[#F8FBFF] px-4 py-3.5 text-center">
                  <p className="text-[10px] leading-5 text-[#263B63]/50">
                    You can also continue as a guest when guest checkout is
                    available.
                  </p>
                </div>

                {/* =========================================
                    MOBILE FOOTER
                ========================================= */}

                <p className="mt-8 text-center text-[9px] text-[#263B63]/35 lg:hidden">
                  © {new Date().getFullYear()} ACV Plus. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
