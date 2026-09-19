import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  ImageOff,
  Leaf,
  Loader2,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/products`;

/* =========================================================
   ACV PLUS — HOME
   Premium Wellness Editorial Design
========================================================= */

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (image) => {
    if (!image || typeof image !== "string") {
      return "";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch(API_URL);

        let data = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(data?.message || "Unable to load products.");
        }

        if (!isMounted) return;

        setProducts(
          Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data)
              ? data
              : [],
        );
      } catch (error) {
        if (!isMounted) return;

        setProducts([]);

        setLoadError(
          error?.message || "Products are temporarily unavailable.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =======================================================
     FEATURED PRODUCTS
  ======================================================= */

  const featuredProducts = useMemo(() => {
    const featured = products.filter(
      (product) => product?.isFeatured === true,
    );

    const source =
      featured.length > 0
        ? featured
        : [...products].sort((a, b) => {
            const dateA = new Date(
              a?.createdAt || 0,
            ).getTime();

            const dateB = new Date(
              b?.createdAt || 0,
            ).getTime();

            return dateB - dateA;
          });

    return source.slice(0, 4);
  }, [products]);

  /* =======================================================
     HERO IMAGE
  ======================================================= */

  /*
    This image is controlled directly
    from the frontend.

    Put your hero image here:

    public/images/acvplus-hero.png
  */
 const heroImage = "/acvplus-hero.png";

  /* =======================================================
     PRICE
  ======================================================= */

  const formatPrice = (price) => {
    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "";
    }

    return `$${value.toFixed(2)}`;
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-white px-5 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[32px] bg-[#E8F1FF]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[180px] -top-[190px] h-[520px] w-[520px] rounded-full border-[95px] border-white/45"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[240px] left-[24%] h-[460px] w-[460px] rounded-full border-[85px] border-[#C5D7FF]/30"
            />

            <div className="relative grid min-h-[610px] lg:grid-cols-[0.93fr_1.07fr]">
              {/* HERO COPY */}

              <div className="relative z-10 flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14 xl:px-16">
                <div className="max-w-[560px]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#C5D7FF] bg-white/75 px-4 py-2 backdrop-blur-sm">
                    <Leaf
                      size={12}
                      className="text-[#3569C8]"
                    />

                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                      Everyday Wellness
                    </span>
                  </div>

                  <h1 className="mt-7 font-serif text-[45px] font-semibold leading-[1.01] tracking-[-0.048em] text-[#10285D] sm:text-[58px] lg:text-[64px] xl:text-[70px]">
                    Wellness that
                    <span className="block text-[#3569C8]">
                      fits your day.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-[500px] text-[12px] leading-7 text-[#263B63]/60 sm:text-[13px]">
                    Explore ACV Plus products with clear
                    product information, ingredients,
                    directions and details available in one
                    simple shopping experience.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/shop"
                      className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#23458C] px-8 text-[9px] font-bold uppercase tracking-[0.11em] text-white shadow-[0_14px_35px_rgba(35,69,140,0.17)] transition-all hover:bg-[#315FBA]"
                    >
                      Shop All

                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      to="/about"
                      className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#C5D7FF] bg-white/70 px-8 text-[9px] font-bold uppercase tracking-[0.11em] text-[#183A7A] transition-colors hover:bg-white"
                    >
                      Our Story
                    </Link>
                  </div>

                  <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                    <MiniTrust text="Clear product details" />
                    <MiniTrust text="U.S. shipping" />
                    <MiniTrust text="14-day eligible returns" />
                  </div>
                </div>
              </div>

              {/* HERO VISUAL */}

              <div className="relative min-h-[450px] overflow-hidden lg:min-h-full">
                <div className="absolute bottom-0 right-0 top-0 w-[82%] rounded-l-[180px] bg-[#172D57] sm:w-[76%] lg:w-[82%]" />

                <div className="absolute bottom-[7%] right-[7%] top-[7%] w-[74%] rounded-l-[160px] border border-white/10" />

                <div className="absolute inset-0 flex items-center justify-center px-7 py-10 sm:px-12 lg:justify-end lg:px-14 xl:px-20">
                  <div className="relative flex aspect-square w-full max-w-[420px] items-center justify-center">
                    <div className="absolute inset-[4%] rounded-full bg-white/[0.06]" />

                    <div className="absolute inset-[14%] rounded-full border border-white/10" />

                    <img
                      src={heroImage}
                      alt="ACV Plus wellness"
                      className="relative z-10 h-[82%] w-[82%] object-contain drop-shadow-[0_28px_35px_rgba(0,0,0,0.22)]"
                    />
                  </div>
                </div>

                <div className="absolute right-6 top-6 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white backdrop-blur-md sm:flex">
                  <Sparkles
                    size={12}
                    className="text-[#AFC8FF]"
                  />

                  <span className="text-[8px] font-bold uppercase tracking-[0.17em]">
                    ACV Plus
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          TRUST STRIP
      ================================================= */}

      <section className="border-y border-[#D6E2F7] bg-white px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem
            icon={PackageCheck}
            title="Clear Product Details"
            text="Review information before ordering"
          />

          <TrustItem
            icon={Clock3}
            title="1–3 Business Days"
            text="Order processing"
            border
          />

          <TrustItem
            icon={Truck}
            title="5–10 Business Days"
            text="Estimated delivery"
            border
          />

          <TrustItem
            icon={RotateCcw}
            title="14-Day Returns"
            text="For eligible products"
            border
          />
        </div>
      </section>

      {/* =================================================
          PRODUCT INTRO
      ================================================= */}

      <section className="px-5 pb-11 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#3569C8]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#3569C8]">
                  The ACV Plus Edit
                </p>
              </div>

              <h2 className="mt-5 max-w-[680px] font-serif text-[38px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#10285D] sm:text-[47px] lg:text-[54px]">
                Everyday wellness,
                <span className="text-[#3569C8]">
                  {" "}
                  thoughtfully presented.
                </span>
              </h2>
            </div>

            <div className="lg:pb-1">
              <p className="max-w-[500px] text-[11px] leading-7 text-[#263B63]/52">
                Discover our selected products and open each
                product page for its available ingredients,
                directions, warnings and specifications.
              </p>

              <Link
                to="/shop"
                className="group mt-5 inline-flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#183A7A]"
              >
                Browse Complete Collection

                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          IMPROVED PRODUCT SHOWCASE
      ================================================= */}

      <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          {loading && (
            <div className="flex min-h-[500px] items-center justify-center rounded-[32px] border border-[#D6E2F7] bg-white">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF]">
                  <Loader2
                    size={22}
                    className="animate-spin text-[#3569C8]"
                  />
                </div>

                <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.16em] text-[#263B63]/35">
                  Loading Collection
                </p>
              </div>
            </div>
          )}

          {!loading && loadError && (
            <div className="rounded-[30px] border border-[#D6E2F7] bg-white px-6 py-16 text-center">
              <ShoppingBag
                size={24}
                className="mx-auto text-[#3569C8]"
              />

              <h3 className="mt-5 font-serif text-[26px] font-semibold text-[#10285D]">
                Products are unavailable
              </h3>

              <p className="mx-auto mt-3 max-w-[420px] text-[10px] leading-6 text-[#263B63]/50">
                {loadError}
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#23458C] px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-white"
              >
                Visit Shop
                <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {!loading &&
            !loadError &&
            featuredProducts.length === 0 && (
              <div className="rounded-[30px] border border-[#D6E2F7] bg-white px-6 py-16 text-center">
                <Leaf
                  size={25}
                  className="mx-auto text-[#3569C8]"
                />

                <h3 className="mt-5 font-serif text-[26px] font-semibold text-[#10285D]">
                  Products Coming Soon
                </h3>

                <p className="mx-auto mt-3 max-w-[420px] text-[10px] leading-6 text-[#263B63]/50">
                  ACV Plus products are being prepared. Please
                  check back soon.
                </p>
              </div>
            )}

          {!loading &&
            !loadError &&
            featuredProducts.length > 0 && (
              <>
                {/* PRODUCT GRID */}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {featuredProducts.map(
                    (product, index) => {
                      const productId =
                        product?._id || product?.id;

                      if (!productId) {
                        return null;
                      }

                      const image = getImageUrl(
                        product?.images?.[0],
                      );

                      const secondImage = getImageUrl(
                        product?.images?.[1],
                      );

                      const stock = Number(
                        product?.stock || 0,
                      );

                      const outOfStock =
                        stock <= 0 ||
                        product?.status ===
                          "Out of Stock";

                      const price = formatPrice(
                        product?.price,
                      );

                      return (
                        <article
                          key={productId}
                          className="group relative flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#D6E2F7] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#AFC8FF] hover:shadow-[0_25px_65px_rgba(16,40,93,0.10)]"
                        >
                          {/* PRODUCT IMAGE */}

                          <Link
                            to={`/shop/${productId}`}
                            className="relative block aspect-[1/1.08] overflow-hidden bg-[#F7FAFF]"
                          >
                            <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                              {product?.isFeatured && (
                                <span className="rounded-full bg-[#183A7A] px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.13em] text-white">
                                  Featured
                                </span>
                              )}
                            </div>

                            <span
                              className={`absolute right-4 top-4 z-20 rounded-full border px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.1em] backdrop-blur ${
                                outOfStock
                                  ? "border-red-100 bg-red-50/95 text-red-600"
                                  : "border-[#D6E2F7] bg-white/90 text-[#3569C8]"
                              }`}
                            >
                              {outOfStock
                                ? "Out of Stock"
                                : "In Stock"}
                            </span>

                            {/* DECORATIVE BACKDROP */}

                            <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8F1FF]/70 transition-transform duration-700 group-hover:scale-105" />

                            <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C5D7FF]/60" />

                            {image ? (
                              <>
                                <img
                                  src={image}
                                  alt={
                                    product?.name ||
                                    "ACV Plus product"
                                  }
                                  loading="lazy"
                                  className="absolute inset-0 z-10 h-full w-full object-contain p-7 transition-all duration-700 group-hover:scale-[1.05]"
                                />

                                {secondImage && (
                                  <img
                                    src={secondImage}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="absolute inset-0 z-10 hidden h-full w-full object-contain p-7 opacity-0 transition-all duration-500 group-hover:opacity-100 lg:block"
                                  />
                                )}
                              </>
                            ) : (
                              <div className="absolute inset-0 z-10 flex items-center justify-center text-[#183A7A]/20">
                                <ImageOff size={30} />
                              </div>
                            )}

                            {/* NUMBER */}

                            <span className="absolute bottom-4 left-4 z-20 font-serif text-[11px] font-semibold text-[#183A7A]/35">
                              0{index + 1}
                            </span>

                            {/* ARROW */}

                            <div className="absolute bottom-4 right-4 z-20 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#172D57] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                              <ArrowRight size={14} />
                            </div>
                          </Link>

                          {/* PRODUCT COPY */}

                          <div className="flex flex-1 flex-col p-5 sm:p-6">
                            <div className="flex items-center gap-2">
                              <Leaf
                                size={10}
                                className="text-[#3569C8]"
                              />

                              <span className="text-[7px] font-bold uppercase tracking-[0.17em] text-[#3569C8]">
                                ACV Plus
                              </span>
                            </div>

                            <Link
                              to={`/shop/${productId}`}
                            >
                              <h3 className="mt-3 line-clamp-2 font-serif text-[19px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#10285D] transition-colors group-hover:text-[#3569C8]">
                                {product?.name ||
                                  "ACV Plus Product"}
                              </h3>
                            </Link>

                            {product?.description && (
                              <p className="mt-3 line-clamp-2 text-[9px] leading-5 text-[#263B63]/42">
                                {product.description}
                              </p>
                            )}

                            <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#D6E2F7] pt-4">
                              <div>
                                <span className="block text-[7px] font-bold uppercase tracking-[0.14em] text-[#263B63]/28">
                                  Price
                                </span>

                                <span className="mt-1 block font-serif text-[21px] font-semibold text-[#183A7A]">
                                  {price ||
                                    "View Details"}
                                </span>
                              </div>

                              <Link
                                to={`/shop/${productId}`}
                                aria-label={`View ${
                                  product?.name ||
                                  "product"
                                }`}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5D7FF] text-[#183A7A] transition-all duration-300 hover:border-[#183A7A] hover:bg-[#183A7A] hover:text-white"
                              >
                                <ChevronRight
                                  size={15}
                                />
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>

                {/* PRODUCT FOOTER */}

                <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-[#D6E2F7] bg-white px-6 py-6 sm:flex-row sm:px-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                      <ShoppingBag size={17} />
                    </div>

                    <div>
                      <p className="font-serif text-[16px] font-semibold text-[#10285D]">
                        Explore the complete ACV Plus
                        collection
                      </p>

                      <p className="mt-1 text-[8px] text-[#263B63]/40">
                        All products are available together
                        in Shop All.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className="group inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full bg-[#23458C] px-7 text-[8px] font-bold uppercase tracking-[0.11em] text-white transition-colors hover:bg-[#315FBA] sm:w-auto"
                  >
                    Shop All Products

                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </>
            )}
        </div>
      </section>

      {/* =================================================
          BRAND STORY
      ================================================= */}

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid overflow-hidden rounded-[32px] bg-[#172D57] lg:grid-cols-[0.92fr_1.08fr]">
            {/* VISUAL */}

            <div className="relative min-h-[430px] overflow-hidden bg-[#183A7A] sm:min-h-[500px]">
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full border-[60px] border-white/[0.04]" />

              <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full border-[70px] border-white/[0.05]" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative flex h-[290px] w-[290px] items-center justify-center rounded-full border border-white/10 sm:h-[340px] sm:w-[340px]">
                  <div className="absolute inset-[30px] rounded-full bg-white/[0.05]" />

                  <div className="relative flex h-[130px] w-[130px] items-center justify-center rounded-full bg-white text-[#183A7A] shadow-[0_25px_60px_rgba(0,0,0,0.16)]">
                    <Leaf
                      size={48}
                      strokeWidth={1.2}
                    />
                  </div>

                  <div className="absolute bottom-3 right-2 rounded-[17px] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                    <p className="text-[7px] font-bold uppercase tracking-[0.17em] text-[#AFC8FF]">
                      Our Approach
                    </p>

                    <p className="mt-1 font-serif text-[14px] font-semibold text-white">
                      Clear & Simple
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* COPY */}

            <div className="relative flex items-center px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div className="max-w-[560px]">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={12}
                    className="text-[#AFC8FF]"
                  />

                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                    About ACV Plus
                  </p>
                </div>

                <h2 className="mt-5 font-serif text-[35px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[43px]">
                  Wellness shopping
                  <span className="block text-[#AFC8FF]">
                    with clarity in mind.
                  </span>
                </h2>

                <p className="mt-6 text-[11px] leading-7 text-white/55">
                  ACV Plus is focused on providing a
                  straightforward shopping experience with
                  clear product information and easy access
                  to important product details.
                </p>

                <p className="mt-4 text-[11px] leading-7 text-white/55">
                  Review the available ingredients,
                  directions, warnings and specifications on
                  each individual product page before
                  purchasing.
                </p>

                <div className="mt-7 space-y-3">
                  <StoryPoint text="Clear product information" />
                  <StoryPoint text="Simple shopping experience" />
                  <StoryPoint text="Accessible customer support" />
                </div>

                <Link
                  to="/about"
                  className="group mt-8 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-white px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-[#183A7A] transition-colors hover:bg-[#E8F1FF]"
                >
                  Discover Our Story

                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          WHY CHOOSE ACV PLUS
      ================================================= */}

      <section className="relative overflow-hidden bg-[#F1F6FF] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[220px] top-[80px] h-[500px] w-[500px] rounded-full border-[90px] border-[#E8F1FF]"
        />

        <div className="relative mx-auto max-w-[1200px]">
          {/* SECTION HEADER */}

          <div className="mx-auto max-w-[720px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5D7FF] bg-white px-4 py-2">
              <ShieldCheck
                size={12}
                className="text-[#3569C8]"
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Why Choose ACV Plus
              </span>
            </div>

            <h2 className="mt-6 font-serif text-[38px] font-semibold leading-[1.07] tracking-[-0.04em] text-[#10285D] sm:text-[48px] lg:text-[53px]">
              Designed around a
              <span className="block text-[#3569C8]">
                clearer shopping experience.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[590px] text-[11px] leading-7 text-[#263B63]/50">
              From product discovery to reviewing important
              information, our store is structured to keep
              the experience straightforward and easy to
              understand.
            </p>
          </div>

          {/* FEATURE COMPOSITION */}

          <div className="mt-14 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            {/* FEATURED LARGE CARD */}

            <div className="relative min-h-[520px] overflow-hidden rounded-[30px] bg-[#172D57] p-7 text-white sm:p-9 lg:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-28 -top-28 h-[330px] w-[330px] rounded-full border-[62px] border-white/[0.04]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full border-[65px] border-white/[0.035]"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#183A7A]">
                    <Leaf
                      size={19}
                      strokeWidth={1.7}
                    />
                  </div>

                  <span className="font-serif text-[42px] font-semibold leading-none text-white/[0.08]">
                    01
                  </span>
                </div>

                <div className="mt-auto pt-20">
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                    Product Transparency
                  </p>

                  <h3 className="mt-4 max-w-[430px] font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.035em]">
                    Important product details, easy to find.
                  </h3>

                  <p className="mt-5 max-w-[440px] text-[10px] leading-6 text-white/50">
                    Each product page can present its
                    available description, ingredients,
                    directions, warnings and specifications
                    in one organized place.
                  </p>

                  <Link
                    to="/shop"
                    className="group mt-7 inline-flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.12em] text-white"
                  >
                    Explore Products

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-[#183A7A]">
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT FEATURES */}

            <div className="grid gap-5 sm:grid-cols-2">
              <PremiumWhyCard
                number="02"
                icon={ShoppingBag}
                title="Simple to Browse"
                text="All ACV Plus products are available through Shop All, without unnecessary category navigation."
              />

              <PremiumWhyCard
                number="03"
                icon={PackageCheck}
                title="Order Information"
                text="Access order-related details and review the store policies available throughout the website."
              />

              <PremiumWhyCard
                number="04"
                icon={Truck}
                title="U.S. Delivery"
                text="Orders are processed in 1–3 business days with estimated delivery generally within 5–10 business days."
              />

              <PremiumWhyCard
                number="05"
                icon={RotateCcw}
                title="Eligible Returns"
                text="Eligible items may be returned within 14 days of delivery according to our Return & Refund Policy."
              />
            </div>
          </div>

          {/* BOTTOM POLICY STRIP */}

          <div className="mt-5 grid overflow-hidden rounded-[24px] border border-[#D6E2F7] bg-white md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4 px-6 py-6 sm:px-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <ShieldCheck size={17} />
              </div>

              <div>
                <p className="font-serif text-[17px] font-semibold text-[#10285D]">
                  Clear policies before you order.
                </p>

                <p className="mt-1.5 max-w-[650px] text-[9px] leading-5 text-[#263B63]/45">
                  Shipping, returns, privacy and other store
                  policies are available for review before
                  completing a purchase.
                </p>
              </div>
            </div>

            <div className="border-t border-[#D6E2F7] px-6 py-5 md:border-l md:border-t-0 md:px-8">
              <Link
                to="/shipping-policy"
                className="group inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.11em] text-[#183A7A]"
              >
                Review Shipping

                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-[#E8F1FF] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[55px] border-white/60"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[690px]">
              <div className="flex items-center gap-2">
                <Leaf
                  size={13}
                  className="text-[#3569C8]"
                />

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                  Explore ACV Plus
                </p>
              </div>

              <h2 className="mt-4 font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#10285D] sm:text-[42px]">
                Find the product that fits your routine.
              </h2>

              <p className="mt-4 max-w-[610px] text-[11px] leading-6 text-[#263B63]/50">
                Browse the complete ACV Plus collection and
                open any product to review its current
                information before ordering.
              </p>
            </div>

            <Link
              to="/shop"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#23458C] px-8 text-[9px] font-bold uppercase tracking-[0.11em] text-white shadow-[0_12px_30px_rgba(35,69,140,0.14)] transition-colors hover:bg-[#315FBA] sm:w-auto"
            >
              Shop All Products

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
   MINI TRUST
========================================================= */

const MiniTrust = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#183A7A]">
        <Check size={10} strokeWidth={2.2} />
      </div>

      <span className="text-[8px] font-semibold text-[#263B63]/45">
        {text}
      </span>
    </div>
  );
};

/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({
  icon: Icon,
  title,
  text,
  border = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 py-5 sm:px-5 ${
        border
          ? "border-t border-[#D6E2F7] sm:border-l sm:border-t-0"
          : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
        <Icon
          size={16}
          strokeWidth={1.7}
        />
      </div>

      <div>
        <p className="text-[9px] font-bold text-[#10285D]">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-[#263B63]/40">
          {text}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   STORY POINT
========================================================= */

const StoryPoint = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#AFC8FF]">
        <Check
          size={12}
          strokeWidth={2}
        />
      </div>

      <span className="text-[9px] font-semibold text-white/65">
        {text}
      </span>
    </div>
  );
};

/* =========================================================
   PREMIUM WHY CARD
========================================================= */

const PremiumWhyCard = ({
  number,
  icon: Icon,
  title,
  text,
}) => {
  return (
    <article className="group relative min-h-[250px] overflow-hidden rounded-[26px] border border-[#D6E2F7] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#AFC8FF] hover:shadow-[0_20px_50px_rgba(16,40,93,0.07)] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[#F1F6FF] transition-transform duration-500 group-hover:scale-125"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A] transition-all duration-300 group-hover:bg-[#183A7A] group-hover:text-white">
            <Icon
              size={17}
              strokeWidth={1.7}
            />
          </div>

          <span className="font-serif text-[27px] font-semibold text-[#D6E2F7]">
            {number}
          </span>
        </div>

        <div className="mt-auto pt-10">
          <h3 className="font-serif text-[21px] font-semibold tracking-[-0.02em] text-[#10285D]">
            {title}
          </h3>

          <p className="mt-3 max-w-[310px] text-[9px] leading-5 text-[#263B63]/45">
            {text}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Home;