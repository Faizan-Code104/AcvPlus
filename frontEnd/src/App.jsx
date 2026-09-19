import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { CartProvider } from "./component/CartContext";
import ScrollToTop from "./component/ScrollToTop";
import AdminRoute from "./component/AdminRoute";

/* ==================== USER COMPONENTS ==================== */

import Layout from "./component/Layout";
import Home from "./component/Home";
import Shop from "./component/Shop";
import Ingredients from "./component/Ingredients";
import Contact from "./component/Contact";
import About from "./component/About";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Cart from "./component/Cart";
import ShopDetails from "./component/ShopDetails";
import Checkout from "./component/Checkout";
import OrderTracking from "./component/OrderTracking";

/* ==================== POLICY COMPONENTS ==================== */

import ShippingPolicy from "./component/ShippingPolicy";
import ReturnPolicy from "./component/ReturnPolicy";
import PrivacyPolicy from "./component/PrivacyPolicy";
import FAQs from "./component/FAQs";
import TermsAndConditions from "./component/TermsAndConditions";
import PaymentPolicy from "./component/PaymentPolicy";
import OrderCancellationPolicy from "./component/OrderCancellationPolicy";
import CookiePolicy from "./component/CookiePolicy";

/* ==================== ADMIN COMPONENTS ==================== */

import AdminLayout from "./component/Admin/AdminLayout";
import Dashboard from "./component/Admin/Dashboard";
import Products from "./component/Admin/Products";
import Orders from "./component/Admin/Orders";
import Users from "./component/Admin/Users";

/* =========================================================
   APP
========================================================= */

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <CartProvider>
        <Routes>
          {/* ==================== AUTH ==================== */}

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* ==================== HOME ==================== */}

          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* ==================== SHOP ALL ==================== */}

          <Route
            path="/shop"
            element={
              <Layout>
                <Shop />
              </Layout>
            }
          />

          {/* ==================== PRODUCT DETAILS ==================== */}

          <Route
            path="/shop/:id"
            element={
              <Layout>
                <ShopDetails />
              </Layout>
            }
          />

          {/* ==================== INGREDIENTS ==================== */}

          <Route
            path="/ingredients/:productId"
            element={
              <Layout>
                <Ingredients />
              </Layout>
            }
          />

          {/* ==================== ABOUT ==================== */}

          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          {/* ==================== CONTACT ==================== */}

          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* ==================== CART ==================== */}

          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />

          {/* ==================== CHECKOUT ==================== */}

          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />

          {/* ==================== ORDER TRACKING ==================== */}

          <Route
            path="/track-order"
            element={
              <Layout>
                <OrderTracking />
              </Layout>
            }
          />

          {/* ==================== SHIPPING POLICY ==================== */}

          <Route
            path="/shipping-policy"
            element={
              <Layout>
                <ShippingPolicy />
              </Layout>
            }
          />

          {/* ==================== RETURN POLICY ==================== */}

          <Route
            path="/return-policy"
            element={
              <Layout>
                <ReturnPolicy />
              </Layout>
            }
          />

          {/* ==================== PRIVACY POLICY ==================== */}

          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />

          {/* ==================== PAYMENT POLICY ==================== */}

          <Route
            path="/payment-policy"
            element={
              <Layout>
                <PaymentPolicy />
              </Layout>
            }
          />

          {/* ==================== CANCELLATION POLICY ==================== */}

          <Route
            path="/order-cancellation-policy"
            element={
              <Layout>
                <OrderCancellationPolicy />
              </Layout>
            }
          />

          {/* ==================== COOKIE POLICY ==================== */}

          <Route
            path="/cookie-policy"
            element={
              <Layout>
                <CookiePolicy />
              </Layout>
            }
          />

          {/* ==================== FAQS ==================== */}

          <Route
            path="/faqs"
            element={
              <Layout>
                <FAQs />
              </Layout>
            }
          />

          {/* ==================== TERMS ==================== */}

          <Route
            path="/terms-and-conditions"
            element={
              <Layout>
                <TermsAndConditions />
              </Layout>
            }
          />

          {/* ==================== ADMIN DASHBOARD ==================== */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* ==================== ADMIN PRODUCTS ==================== */}

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Products />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* ==================== ADMIN ORDERS ==================== */}

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Orders />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* ==================== ADMIN USERS ==================== */}

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Users />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* ==================== 404 PAGE ==================== */}

          <Route
            path="*"
            element={
              <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F1F6FF] px-5 py-16">
                <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full border-[70px] border-[#E8F1FF]" />

                <div className="pointer-events-none absolute -bottom-40 -left-40 h-[430px] w-[430px] rounded-full border-[80px] border-[#E8F1FF]" />

                <div className="relative w-full max-w-[720px] overflow-hidden rounded-[32px] border border-[#D6E2F7] bg-white px-6 py-14 text-center shadow-[0_25px_70px_rgba(16,40,93,0.06)] sm:px-10 sm:py-16">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-[#3569C8]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#3569C8]">
                      ACV Plus
                    </p>

                    <span className="h-px w-8 bg-[#3569C8]" />
                  </div>

                  <h1 className="mt-7 font-serif text-[80px] font-semibold leading-none tracking-[-0.06em] text-[#10285D] sm:text-[105px]">
                    404
                  </h1>

                  <h2 className="mt-4 font-serif text-[28px] font-semibold text-[#10285D] sm:text-[34px]">
                    Page not found.
                  </h2>

                  <p className="mx-auto mt-4 max-w-[470px] text-[12px] leading-6 text-[#263B63]/55">
                    The page you're looking for may have moved, been removed, or
                    the address may be incorrect.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      to="/"
                      className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#23458C] px-7 py-3 text-[11px] font-bold text-white transition-colors hover:bg-[#315FBA]"
                    >
                      Back to Home
                    </Link>

                    <Link
                      to="/shop"
                      className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#C5D7FF] bg-white px-7 py-3 text-[11px] font-bold text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
                    >
                      Shop All Products
                    </Link>
                  </div>
                </div>
              </main>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
