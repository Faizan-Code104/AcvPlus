import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ImageOff,
  Leaf,
  Loader2,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useCart } from "./CartContext";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/products`;

/* =========================================================
   ACV PLUS — PRODUCT DETAILS
========================================================= */

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openSection, setOpenSection] = useState("description");

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (image) => {
    if (!image || typeof image !== "string") {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  /* =======================================================
     FETCH PRODUCT
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        setProduct(null);
        setActiveImage(0);
        setQuantity(1);

        const response = await fetch(`${API_URL}/${id}`);

        let data = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data?.message || "Product not found.",
          );
        }

        if (!isMounted) return;

        const receivedProduct = data?.product || data;

        if (!receivedProduct) {
          throw new Error("Product not found.");
        }

        setProduct(receivedProduct);
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error?.message ||
            "Unable to load this product.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
      setErrorMessage("Product not found.");
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  /* =======================================================
     QUANTITY
  ======================================================= */

  const stockQuantity = Number(product?.stock || 0);

  const inStock =
    stockQuantity > 0 &&
    product?.status !== "Out of Stock";

  const increaseQuantity = () => {
    if (!inStock) return;

    setQuantity((previous) => {
      if (
        stockQuantity > 0 &&
        previous >= stockQuantity
      ) {
        return previous;
      }

      return previous + 1;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1),
    );
  };

  /* =======================================================
     CART ITEM
  ======================================================= */

  const buildCartItem = () => ({
    id: product?._id || product?.id,
    name: product?.name,
    price: Number(product?.price || 0),
    image: getImageUrl(product?.images?.[0]),
    quantity,
    stock: stockQuantity,
    sku: product?.sku || "",
  });

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = () => {
    if (!product || !inStock) return;

    addToCart(buildCartItem());

    setAddedToCart(true);

    window.setTimeout(() => {
      setAddedToCart(false);
    }, 1600);
  };

  /* =======================================================
     BUY NOW
  ======================================================= */

  const handleBuyNow = () => {
    if (!product || !inStock) return;

    addToCart(buildCartItem());

    navigate("/cart");
  };

  /* =======================================================
     ACCORDION
  ======================================================= */

  const toggleSection = (section) => {
    setOpenSection((previous) =>
      previous === section ? "" : section,
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F1F6FF] px-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D6E2F7] bg-white shadow-[0_12px_35px_rgba(16,40,93,0.06)]">
          <Loader2
            size={25}
            className="animate-spin text-[#3569C8]"
          />
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#263B63]/45">
          Loading Product
        </p>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (errorMessage || !product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F1F6FF] px-5 py-16">
        <div className="w-full max-w-[580px] rounded-[28px] border border-[#D6E2F7] bg-white px-6 py-12 text-center shadow-[0_18px_50px_rgba(16,40,93,0.05)] sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
            <ShoppingBag size={21} />
          </div>

          <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
            ACV Plus
          </p>

          <h1 className="mt-3 font-serif text-[31px] font-semibold tracking-[-0.03em] text-[#10285D]">
            Product not found
          </h1>

          <p className="mx-auto mt-4 max-w-[400px] text-[11px] leading-6 text-[#263B63]/50">
            {errorMessage ||
              "This product may no longer be available or the product link may be incorrect."}
          </p>

          <Link
            to="/shop"
            className="group mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#23458C] px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#315FBA]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  /* =======================================================
     PRODUCT VALUES
  ======================================================= */

  const images =
    Array.isArray(product?.images) &&
    product.images.length > 0
      ? product.images
      : [];

  const currentImage =
    images[activeImage] || images[0];

  const productId =
    product?._id || product?.id || id;

  const lowStock =
    inStock &&
    (product?.status === "Low Stock" ||
      stockQuantity <= 5);

  const price = Number(product?.price);

  const formattedPrice = Number.isFinite(price)
    ? `$${price.toFixed(2)}`
    : "$0.00";

  const ingredientImage =
    product?.ingredientImage || "";

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <section className="border-b border-[#D6E2F7] bg-white px-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[64px] max-w-[1200px] items-center justify-between gap-4">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#263B63]/55 transition-colors hover:text-[#183A7A]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Shop All
          </Link>

          <div className="flex items-center gap-2">
            <Leaf
              size={13}
              className="text-[#3569C8]"
            />

            <span className="text-[8px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
              ACV Plus
            </span>
          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCT HERO
      ================================================= */}

      <section className="px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
            {/* =============================================
                PRODUCT GALLERY
            ============================================= */}

            <div>
              {/* MAIN PRODUCT IMAGE */}

              <div className="relative overflow-hidden rounded-[28px] border border-[#D6E2F7] bg-white">
                <div className="relative aspect-square">
                  {currentImage ? (
                    <img
                      src={getImageUrl(currentImage)}
                      alt={
                        product?.name ||
                        "ACV Plus product"
                      }
                      className="h-full w-full object-contain p-7 transition-transform duration-700 sm:p-10 lg:p-12"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#FAFCFF] text-[#183A7A]/20">
                      <ImageOff size={40} />
                    </div>
                  )}

                  {/* FEATURED */}

                  {product?.isFeatured && (
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#183A7A] px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                      <Sparkles size={11} />
                      Featured
                    </div>
                  )}

                  {/* STOCK BADGE */}

                  <div
                    className={`absolute right-5 top-5 rounded-full border px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.1em] backdrop-blur ${
                      !inStock
                        ? "border-red-200 bg-red-50/95 text-red-600"
                        : lowStock
                          ? "border-[#C5D7FF] bg-white/95 text-[#183A7A]"
                          : "border-[#D6E2F7] bg-white/95 text-[#3569C8]"
                    }`}
                  >
                    {!inStock
                      ? "Out of Stock"
                      : lowStock
                        ? "Low Stock"
                        : "In Stock"}
                  </div>
                </div>
              </div>

              {/* THUMBNAILS */}

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      onClick={() =>
                        setActiveImage(index)
                      }
                      onFocus={() =>
                        setActiveImage(index)
                      }
                      aria-label={`View product image ${
                        index + 1
                      }`}
                      className={`aspect-square overflow-hidden rounded-[16px] border bg-white p-2 transition-all ${
                        activeImage === index
                          ? "border-[#3569C8] ring-4 ring-[#3569C8]/[0.06]"
                          : "border-[#D6E2F7] hover:border-[#AFC8FF]"
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* =============================================
                  INGREDIENT IMAGE
              ============================================= */}

              {ingredientImage && (
                <div className="mt-6 overflow-hidden rounded-[28px] border border-[#D6E2F7] bg-white shadow-[0_16px_45px_rgba(16,40,93,0.04)]">
                  {/* INGREDIENT HEADER */}

                  <div className="flex items-center justify-between gap-4 border-b border-[#D6E2F7] px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                        <Leaf
                          size={16}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                          Product Information
                        </p>

                        <h3 className="mt-1 font-serif text-[19px] font-semibold text-[#10285D]">
                          Ingredients
                        </h3>
                      </div>
                    </div>

                    <span className="hidden rounded-full border border-[#D6E2F7] bg-[#F1F6FF] px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.12em] text-[#183A7A] sm:inline-flex">
                      Label
                    </span>
                  </div>

                  {/* INGREDIENT LABEL */}

                  <div className="bg-[#FAFCFF] p-4 sm:p-5">
                    <div className="overflow-hidden rounded-[20px] border border-[#D6E2F7] bg-white">
                      <img
                        src={getImageUrl(
                          ingredientImage,
                        )}
                        alt={`${
                          product?.name ||
                          "ACV Plus product"
                        } ingredients`}
                        loading="lazy"
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =============================================
                PRODUCT INFORMATION
            ============================================= */}

            <div className="lg:py-4">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-8 bg-[#3569C8]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                  ACV Plus Wellness
                </p>
              </div>

              <h1 className="mt-5 max-w-[590px] font-serif text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#10285D] sm:text-[48px] lg:text-[52px]">
                {product.name}
              </h1>

              {/* PRICE + STOCK */}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="font-serif text-[30px] font-semibold text-[#183A7A]">
                  {formattedPrice}
                </span>

                <span className="h-5 w-px bg-[#D6E2F7]" />

                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      inStock
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                  />

                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.1em] ${
                      inStock
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {inStock
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}

              {product?.description && (
                <p className="mt-7 max-w-[620px] text-[12px] leading-7 text-[#263B63]/60">
                  {product.description}
                </p>
              )}

              {/* PRODUCT SPECS */}

              <div className="mt-8 overflow-hidden rounded-[20px] border border-[#D6E2F7] bg-white">
                {product?.sku && (
                  <ProductSpec
                    label="SKU"
                    value={product.sku}
                  />
                )}

                {product?.weight && (
                  <ProductSpec
                    label="Weight"
                    value={product.weight}
                    last
                  />
                )}
              </div>

              {/* ===========================================
                  QUANTITY
              =========================================== */}

              <div className="mt-8">
                <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.16em] text-[#263B63]/45">
                  Quantity
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-[54px] items-center justify-between rounded-full border border-[#D6E2F7] bg-white px-2 sm:w-[150px]">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[#263B63]/55 transition-colors hover:bg-[#E8F1FF] hover:text-[#183A7A] disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="text-[12px] font-bold text-[#10285D]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={
                        !inStock ||
                        (stockQuantity > 0 &&
                          quantity >= stockQuantity)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[#263B63]/55 transition-colors hover:bg-[#E8F1FF] hover:text-[#183A7A] disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`flex min-h-[54px] flex-1 items-center justify-center gap-2.5 rounded-full px-7 text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${
                      !inStock
                        ? "cursor-not-allowed bg-[#D6E2F7] text-[#263B63]/40"
                        : addedToCart
                          ? "bg-[#E8F1FF] text-[#183A7A]"
                          : "bg-[#23458C] text-white hover:bg-[#315FBA]"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={15} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />

                        {inStock
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </>
                    )}
                  </button>
                </div>

                {/* BUY NOW */}

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className="mt-3 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#183A7A] bg-white px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-all hover:bg-[#183A7A] hover:text-white disabled:cursor-not-allowed disabled:border-[#D6E2F7] disabled:bg-[#F1F6FF] disabled:text-[#263B63]/35"
                >
                  Buy It Now
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* ===========================================
                  STORE INFO
              =========================================== */}

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <BenefitCard
                  icon={Clock3}
                  title="1–3 Business Days"
                  text="Order processing"
                />

                <BenefitCard
                  icon={Truck}
                  title="5–10 Business Days"
                  text="Estimated delivery"
                />

                <BenefitCard
                  icon={RotateCcw}
                  title="14-Day Returns"
                  text="Eligible products"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCT INFORMATION
      ================================================= */}

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 lg:grid-cols-[310px_1fr] lg:gap-16">
            {/* LEFT */}

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <PackageCheck
                  size={19}
                  strokeWidth={1.7}
                />
              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Product Information
              </p>

              <h2 className="mt-3 font-serif text-[32px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#10285D]">
                Details for your product.
              </h2>

              <p className="mt-4 text-[11px] leading-6 text-[#263B63]/50">
                Review the available product information
                before purchasing or using this item.
              </p>
            </div>

            {/* ACCORDION */}

            <div className="overflow-hidden rounded-[24px] border border-[#D6E2F7]">
              {/* DESCRIPTION */}

              <AccordionItem
                title="Description"
                name="description"
                openSection={openSection}
                toggleSection={toggleSection}
              >
                <p>
                  {product?.description ||
                    "No additional description is available for this product."}
                </p>
              </AccordionItem>

              {/* SHIPPING */}

              <AccordionItem
                title="Shipping & Returns"
                name="shipping"
                openSection={openSection}
                toggleSection={toggleSection}
                last
              >
                <p>
                  Orders are generally processed within
                  1–3 business days.
                </p>

                <p className="mt-3">
                  Estimated delivery is generally 5–10
                  business days. Delivery times are
                  estimates and may vary due to carrier or
                  other circumstances.
                </p>

                <p className="mt-3">
                  ACV Plus currently ships within the
                  United States. Any applicable shipping
                  charges are shown during checkout.
                </p>

                <p className="mt-3">
                  Eligible products may be returned within
                  14 days of delivery in accordance with
                  our Return & Refund Policy.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/shipping-policy"
                    className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4"
                  >
                    Shipping Policy
                  </Link>

                  <Link
                    to="/return-policy"
                    className="font-bold text-[#183A7A] underline decoration-[#AFC8FF] underline-offset-4"
                  >
                    Return & Refund Policy
                  </Link>
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          INFORMATION NOTICE
      ================================================= */}

      <section className="px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-5 rounded-[26px] border border-[#D6E2F7] bg-[#E8F1FF] p-6 sm:p-8 md:grid-cols-[50px_1fr]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#183A7A]">
              <ShieldCheck
                size={18}
                strokeWidth={1.7}
              />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#3569C8]">
                Product Information
              </p>

              <h3 className="mt-2 font-serif text-[22px] font-semibold text-[#10285D]">
                Please review the product information
                carefully.
              </h3>

              <p className="mt-3 max-w-[800px] text-[10px] leading-6 text-[#263B63]/50">
                Review the information shown on the product
                and ingredient label before use. Product
                information on this website is provided for
                general informational purposes and is not a
                substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[#172D57] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[55px] border-white/[0.04]"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[680px]">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={13}
                  className="text-[#AFC8FF]"
                />

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                  ACV Plus
                </p>
              </div>

              <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight tracking-[-0.035em] sm:text-[40px]">
                Explore more from ACV Plus.
              </h2>

              <p className="mt-4 max-w-[600px] text-[11px] leading-6 text-white/50">
                Browse our complete product collection and
                review each product page for its current
                details and information.
              </p>
            </div>

            <Link
              to="/shop"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full bg-white px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-colors hover:bg-[#E8F1FF] sm:w-auto"
            >
              Shop All

              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   PRODUCT SPEC
========================================================= */

const ProductSpec = ({
  label,
  value,
  last = false,
}) => {
  return (
    <div
      className={`grid grid-cols-[120px_1fr] gap-4 px-5 py-3.5 text-[10px] ${
        last
          ? ""
          : "border-b border-[#D6E2F7]"
      }`}
    >
      <span className="font-bold text-[#10285D]">
        {label}
      </span>

      <span className="break-words text-[#263B63]/55">
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   BENEFIT CARD
========================================================= */

const BenefitCard = ({
  icon: Icon,
  title,
  text,
}) => {
  return (
    <div className="rounded-[18px] border border-[#D6E2F7] bg-white p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
        <Icon
          size={15}
          strokeWidth={1.7}
        />
      </div>

      <p className="mt-4 text-[9px] font-bold leading-4 text-[#10285D]">
        {title}
      </p>

      <p className="mt-1 text-[8px] leading-4 text-[#263B63]/40">
        {text}
      </p>
    </div>
  );
};

/* =========================================================
   ACCORDION ITEM
========================================================= */

const AccordionItem = ({
  title,
  name,
  openSection,
  toggleSection,
  children,
  last = false,
}) => {
  const isOpen = openSection === name;

  return (
    <div
      className={
        last
          ? ""
          : "border-b border-[#D6E2F7]"
      }
    >
      <button
        type="button"
        onClick={() => toggleSection(name)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 bg-white px-5 py-5 text-left transition-colors hover:bg-[#FAFCFF] sm:px-6"
      >
        <span className="font-serif text-[17px] font-semibold text-[#10285D]">
          {title}
        </span>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen
              ? "bg-[#183A7A] text-white"
              : "bg-[#E8F1FF] text-[#183A7A]"
          }`}
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="bg-white px-5 pb-6 text-[11px] leading-7 text-[#263B63]/60 sm:px-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default ShopDetails;