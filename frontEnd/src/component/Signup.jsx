import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Loader2,
} from "lucide-react";

import { API_BASE_URL } from "../config";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
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
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to create your account. Please try again."
        );
      }

      setSuccessMessage(
        "Your account has been created successfully. Redirecting to sign in..."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setServerError(
        error.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden bg-ink lg:flex">

          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=85"
            alt="Ziveline bags"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-ink/65" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <span className="font-display text-3xl text-paper">
              Ziveline
            </span>

            <div className="max-w-xl text-paper">

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-paper/60">
                Welcome to Ziveline
              </p>

              <h1 className="font-display text-5xl leading-[1.1] xl:text-6xl">
                Carry your style.
                <br />

                <span className="text-paper/60">
                  Own your journey.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-paper/70">
                Discover thoughtfully designed bags made for modern
                everyday living, travel, work, and everything in
                between.
              </p>

              <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-paper">

                <div className="flex h-9 w-9 items-center justify-center border border-paper/20 bg-paper/10">
                  <Check size={16} />
                </div>

                Practical design for everyday use.

              </div>

            </div>

            <p className="text-xs font-medium text-paper/50">
              © 2026 Ziveline LLC. All rights reserved.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

          <div className="w-full max-w-md">

            <div className="mb-8 lg:hidden">
              <span className="font-display text-3xl text-ink">
                Ziveline
              </span>
            </div>

            <div className="mb-8">

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-bottle">
                Create Account
              </p>

              <h2 className="font-display text-4xl text-ink">
                Join Ziveline
              </h2>

              <p className="mt-3 text-sm leading-6 text-ink/60">
                Create your account to manage your Ziveline shopping
                experience.
              </p>

            </div>

            {/* SERVER ERROR */}
            {serverError && (
              <div
                role="alert"
                className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {serverError}
              </div>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <div
                role="status"
                className="mb-5 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
              >
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold text-ink/70"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                    aria-hidden="true"
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
                    className={`w-full border bg-[#F4F1EB] py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:bg-paper disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                </div>

                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
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
                    maxLength={120}
                    disabled={isSubmitting}
                    className={`w-full border bg-[#F4F1EB] py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:bg-paper disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PASSWORD */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold text-ink/70"
                >
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                    aria-hidden="true"
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
                    className={`w-full border bg-[#F4F1EB] py-3.5 pl-11 pr-12 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:bg-paper disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    disabled={isSubmitting}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password}
                  </p>
                )}

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-bold text-ink/70"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                    aria-hidden="true"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    className={`w-full border bg-[#F4F1EB] py-3.5 pl-11 pr-12 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:bg-paper disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    disabled={isSubmitting}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}

              </div>

              {/* TERMS */}
              <div>

                <label className="flex cursor-pointer items-start gap-3">

                  <input
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 accent-bottle"
                  />

                  <span className="text-sm leading-6 text-ink/60">

                    I agree to the{" "}

                    <Link
                      to="/terms-and-conditions"
                      className="font-semibold text-ink hover:underline"
                    >
                      Terms & Conditions
                    </Link>

                    {" "}and{" "}

                    <Link
                      to="/privacy-policy"
                      className="font-semibold text-ink hover:underline"
                    >
                      Privacy Policy
                    </Link>

                    .

                  </span>

                </label>

                {errors.terms && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.terms}
                  </p>
                )}

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 bg-ink px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-line" />

              <span className="text-xs font-medium uppercase tracking-wider text-ink/40">
                Already a member?
              </span>

              <div className="h-px flex-1 bg-line" />
            </div>

            <Link
              to="/login"
              className="flex w-full items-center justify-center border border-line bg-paper px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-ink"
            >
              Sign In
            </Link>

            <p className="mt-7 text-center text-xs leading-5 text-ink/40">
              By creating an account, you agree to Ziveline&apos;s
              Terms & Conditions and Privacy Policy.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;