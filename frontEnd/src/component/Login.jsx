import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    typeof location.state?.from === "string"
      ? location.state.from
      : "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
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

    if (!formData.email.trim()) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    const loginValues = {
      email: formData.email
        .trim()
        .toLowerCase(),
      password: formData.password,
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            loginValues
          ),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setServerError(
          data?.message ||
            "Unable to sign in. Please check your details and try again."
        );

        return;
      }

      if (!data?.token || !data?.user) {
        setServerError(
          "The server returned an incomplete login response."
        );

        return;
      }

      localStorage.setItem(
        "Ziveline-token",
        data.token
      );

      localStorage.setItem(
        "Ziveline-user",
        JSON.stringify(data.user)
      );

      setSuccessMessage(
        "Login successful. Redirecting..."
      );

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
    } catch {
      setServerError(
        "Unable to connect right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================
            LEFT SIDE
            IMAGE REMOVED - TEXT RETAINED
        ===================================== */}

        <div className="relative hidden overflow-hidden bg-ink lg:flex">

          {/* Decorative background only */}

          <div
            className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full border border-paper/5"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-paper/5"
            aria-hidden="true"
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* BRAND */}

            <Link
              to="/"
              aria-label="Ziveline home"
              className="w-fit font-display text-3xl text-paper"
            >
              Ziveline
            </Link>

            {/* TEXT */}

            <div className="max-w-xl text-paper">

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-paper/60">
                Welcome Back
              </p>

              <h1 className="font-display text-5xl leading-[1.1] xl:text-6xl">

                Carry your style.

                <br />

                <span className="text-paper/60">
                  Continue your journey.
                </span>

              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-paper/70">
                Sign in to access your
                Ziveline account, view your
                account information, and
                check available order details.
              </p>

              <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-paper">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-paper/20 bg-paper/10">

                  <Check
                    size={16}
                    aria-hidden="true"
                  />

                </div>

                <span>
                  Designed for everyday use.
                </span>

              </div>

            </div>

            <p className="text-xs font-medium text-paper/50">
              © {new Date().getFullYear()}{" "}
              Ziveline. All rights reserved.
            </p>

          </div>

        </div>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 lg:min-h-0 lg:px-12">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}

            <div className="mb-8 lg:hidden">

              <Link
                to="/"
                aria-label="Ziveline home"
                className="font-display text-3xl text-ink"
              >
                Ziveline
              </Link>

            </div>

            {/* HEADING */}

            <div className="mb-8">

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-bottle">
                Sign In
              </p>

              <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                Welcome back
              </h1>

              <p className="mt-3 text-sm leading-6 text-ink/60">
                Sign in to your Ziveline
                account to continue.
              </p>

            </div>

            {/* SERVER ERROR */}

            {serverError && (
              <div
                role="alert"
                className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600"
              >
                {serverError}
              </div>
            )}

            {/* SUCCESS */}

            {successMessage && (
              <div
                role="status"
                className="mb-5 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-700"
              >
                {successMessage}
              </div>
            )}

            {/* =====================================
                LOGIN FORM
            ===================================== */}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

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
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={
                      Boolean(errors.email)
                    }
                    aria-describedby={
                      errors.email
                        ? "email-error"
                        : undefined
                    }
                    className={`min-h-12 w-full border bg-[#F4F1EB] py-3 pl-11 pr-4 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:bg-paper sm:text-sm ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                </div>

                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  >
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
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      formData.password
                    }
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={
                      Boolean(
                        errors.password
                      )
                    }
                    aria-describedby={
                      errors.password
                        ? "password-error"
                        : undefined
                    }
                    className={`min-h-12 w-full border bg-[#F4F1EB] py-3 pl-11 pr-12 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:bg-paper sm:text-sm ${
                      errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-line focus:border-ink"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ink/40 transition-colors hover:text-ink"
                  >

                    {showPassword ? (
                      <EyeOff
                        size={18}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={18}
                        aria-hidden="true"
                      />
                    )}

                  </button>

                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  >
                    {errors.password}
                  </p>
                )}

              </div>

              {/* REMEMBER */}

              <div className="flex items-center">

                <label className="flex min-h-11 cursor-pointer items-center gap-2">

                  <input
                    name="remember"
                    type="checkbox"
                    checked={
                      formData.remember
                    }
                    onChange={handleChange}
                    className="h-4 w-4 accent-bottle"
                  />

                  <span className="text-sm text-ink/60">
                    Remember me
                  </span>

                </label>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors duration-300 hover:bg-bottle-dark disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Signing In..."
                  : "Sign In"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>

            {/* =====================================
                CREATE ACCOUNT
            ===================================== */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-line" />

              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-ink/40 sm:text-xs">
                New to Ziveline?
              </span>

              <div className="h-px flex-1 bg-line" />

            </div>

            <Link
              to="/signup"
              className="flex min-h-12 w-full items-center justify-center border border-line bg-paper px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink"
            >
              Create Account
            </Link>

            {/* GUEST CHECKOUT CLARIFICATION */}

            <p className="mt-6 text-center text-xs leading-5 text-ink/45">
              An account is not required to
              continue as a guest during checkout.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;