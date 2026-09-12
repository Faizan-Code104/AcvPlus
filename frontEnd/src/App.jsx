import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { CartProvider } from "./component/CartContext";
import ScrollToTop from "./component/ScrollToTop";
import AdminRoute from "./component/AdminRoute";

// User Components
import Layout from "./component/Layout";
import Home from "./component/Home";
import Shop from "./component/Shop";
import Category from "./component/Category";
import Contact from "./component/Contact";
import About from "./component/About";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Cart from "./component/Cart";
import ShopDetails from "./component/ShopDetails";
import Checkout from "./component/Checkout";
import OrderTracking from "./component/OrderTracking";
import ShippingPolicy from "./component/ShippingPolicy";
import ReturnPolicy from "./component/ReturnPolicy";
import PrivacyPolicy from "./component/PrivacyPolicy";
import FAQs from "./component/FAQs";
import TermsAndConditions from "./component/TermsAndConditions";

// New Policy Pages
import PaymentPolicy from "./component/PaymentPolicy";
import OrderCancellationPolicy from "./component/OrderCancellationPolicy";
import CookiePolicy from "./component/CookiePolicy";

// Admin Components
import AdminLayout from "./component/Admin/AdminLayout";
import Dashboard from "./component/Admin/Dashboard";
import Products from "./component/Admin/Products";
import Orders from "./component/Admin/Orders";
import Users from "./component/Admin/Users";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <CartProvider>
        <Routes>
          {/* ==================== AUTH ROUTES ==================== */}

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* ==================== MAIN WEBSITE ==================== */}

          {/* Home */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* Shop */}
          <Route
            path="/shop"
            element={
              <Layout>
                <Shop />
              </Layout>
            }
          />

          {/* Product Details */}
          <Route
            path="/shop/:id"
            element={
              <Layout>
                <ShopDetails />
              </Layout>
            }
          />

          {/* Categories */}
          <Route
            path="/categories"
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />

          {/* About */}
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />

          {/* Order Tracking */}
          <Route
            path="/track-order"
            element={
              <Layout>
                <OrderTracking />
              </Layout>
            }
          />

          {/* ==================== POLICY PAGES ==================== */}

          {/* Shipping Policy */}
          <Route
            path="/shipping-policy"
            element={
              <Layout>
                <ShippingPolicy />
              </Layout>
            }
          />

          {/* Return & Refund Policy */}
          <Route
            path="/return-policy"
            element={
              <Layout>
                <ReturnPolicy />
              </Layout>
            }
          />

          {/* Privacy Policy */}
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />

          {/* Payment Policy */}
          <Route
            path="/payment-policy"
            element={
              <Layout>
                <PaymentPolicy />
              </Layout>
            }
          />

          {/* Order Cancellation Policy */}
          <Route
            path="/order-cancellation-policy"
            element={
              <Layout>
                <OrderCancellationPolicy />
              </Layout>
            }
          />

          {/* Cookie Policy */}
          <Route
            path="/cookie-policy"
            element={
              <Layout>
                <CookiePolicy />
              </Layout>
            }
          />

          {/* FAQs */}
          <Route
            path="/faqs"
            element={
              <Layout>
                <FAQs />
              </Layout>
            }
          />

          {/* Terms & Conditions */}
          <Route
            path="/terms-and-conditions"
            element={
              <Layout>
                <TermsAndConditions />
              </Layout>
            }
          />

          {/* ==================== ADMIN ROUTES ==================== */}

          {/* Admin Dashboard */}
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

          {/* Admin Dashboard - Alternative URL */}
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

          {/* Admin Products */}
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

          {/* Admin Orders */}
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

          {/* Admin Users */}
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

          {/* ==================== 404 ==================== */}

          <Route
            path="*"
            element={
              <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                    Ziveline
                  </p>

                  <h1 className="mt-3 text-7xl font-black tracking-tight text-slate-950">
                    404
                  </h1>

                  <p className="mt-3 text-slate-500">
                    The page you're looking for doesn't exist.
                  </p>

                  <Link
                    to="/"
                    className="mt-7 inline-flex rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;