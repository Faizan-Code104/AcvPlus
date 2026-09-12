import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  ImageOff,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/products`;
const SERVER_URL = API_BASE_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

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

    return `${SERVER_URL}${image}`;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load products.");
        }

        const data = await response.json();

        if (!isMounted) {
          return;
        }

        setProducts(
          Array.isArray(data?.products)
            ? data.products
            : []
        );
      } catch {
        if (isMounted) {
          setProducts([]);
          setLoadError(
            "Products are temporarily unavailable. Please try again later."
          );
        }
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

  const latestProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const dateA = new Date(a?.createdAt || 0).getTime();
        const dateB = new Date(b?.createdAt || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 8);
  }, [products]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5EF] text-[#111]">

      {/* ========================================
          HERO BANNER
      ======================================== */}

      <section className="group relative mx-4 mt-4 h-[520px] overflow-hidden sm:mx-6 sm:mt-8 sm:h-[580px] lg:mx-8 lg:mt-10 lg:h-[620px]">

        <img
          src="/hero-banner.jpg"
          alt="Ziveline handbag collection"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1800ms] lg:group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative flex h-full items-center px-5 sm:px-10 md:px-16 lg:px-24">

          <div className="max-w-xl text-white">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-xs sm:tracking-[0.45em]">
              Ziveline Collection
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
              Carry Your Story
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/80 sm:mt-6 sm:text-base">
              Explore handbags designed for everyday use,
              practical organization, and modern style.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-[#B08D57] hover:text-white sm:mt-8 sm:px-9 sm:py-4 sm:text-xs"
            >
              Shop Collection

              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </Link>

          </div>

        </div>

      </section>

      {/* ========================================
          COLLECTION TITLE
      ======================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pb-12 sm:pt-20 lg:px-8">

        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50 sm:text-xs sm:tracking-[0.4em]">
          New Collection
        </p>

        <h2 className="mt-4 font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl md:text-5xl">
          Handbags For Everyday Style
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/60 sm:text-base">
          Discover a selection of handbags designed to
          complement different routines and occasions.
        </p>

      </section>

      {/* ========================================
          PRODUCTS
      ======================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">

        {loading ? (
          <div
            className="py-20 text-center text-sm text-black/50"
            role="status"
          >
            Loading products...
          </div>
        ) : loadError ? (
          <div className="border border-black/10 bg-white px-5 py-12 text-center">

            <p className="text-sm text-black/60">
              {loadError}
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Visit Shop

              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </Link>

          </div>
        ) : latestProducts.length === 0 ? (
          <div className="border border-black/10 bg-white px-5 py-12 text-center">

            <ShoppingBag
              size={30}
              className="mx-auto text-black/50"
              aria-hidden="true"
            />

            <h3 className="mt-4 font-serif text-2xl">
              Collection Coming Soon
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/55">
              Products are being prepared for this
              collection. Please check back soon.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">

            {latestProducts.map((product) => {
              const id = product?._id || product?.id;

              if (!id) {
                return null;
              }

              const mainImage = getImageUrl(
                product?.images?.[0]
              );

              const secondImage = getImageUrl(
                product?.images?.[1]
              );

              return (
                <Link
                  key={id}
                  to={`/shop/${id}`}
                  className="group min-w-0"
                >

                  {/* PRODUCT IMAGE */}

                  <div className="relative aspect-square overflow-hidden bg-white">

                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={
                          product?.name
                            ? `${product.name} handbag`
                            : "Ziveline handbag"
                        }
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 lg:group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white text-black/30">
                        <ImageOff
                          size={28}
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {secondImage && (
                      <img
                        src={secondImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 lg:block lg:group-hover:opacity-100"
                      />
                    )}

                    {/* DESKTOP HOVER */}

                    <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 translate-y-5 opacity-0 transition-all duration-300 lg:block lg:group-hover:translate-y-0 lg:group-hover:opacity-100">

                      <span className="flex whitespace-nowrap bg-black px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-white">
                        View Product
                      </span>

                    </div>

                  </div>

                  {/* PRODUCT DETAILS */}

                  <div className="mt-4 sm:mt-5">

                    {product?.category && (
                      <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-black/40 sm:text-[10px]">
                        {product.category}
                      </p>
                    )}

                    <h3 className="mt-1.5 line-clamp-2 text-xs font-semibold leading-5 text-black sm:text-sm sm:leading-6">
                      {product?.name || "Ziveline Handbag"}
                    </h3>

                    {Number.isFinite(
                      Number(product?.price)
                    ) && (
                      <p className="mt-2 text-xs font-medium text-black/60 sm:text-sm">
                        $
                        {Number(product.price).toFixed(2)}
                      </p>
                    )}

                  </div>

                </Link>
              );
            })}

          </div>
        )}

        {/* VIEW ALL */}

        {!loading &&
          !loadError &&
          latestProducts.length > 0 && (
            <div className="mt-12 text-center sm:mt-14">

              <Link
                to="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-black bg-transparent px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-black hover:text-white sm:px-9 sm:text-xs"
              >
                View All Products

                <ArrowRight
                  size={15}
                  aria-hidden="true"
                />
              </Link>

            </div>
          )}

      </section>

      {/* ========================================
          ABOUT ZIVELINE
      ======================================== */}

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B08D57] sm:text-xs sm:tracking-[0.5em]">
            About Ziveline
          </p>

          <h2 className="mt-5 font-serif text-3xl leading-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Designed For Everyday Moments
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/60 sm:mt-8 sm:text-base sm:leading-8">
            Ziveline offers handbags created with modern
            style and everyday usability in mind.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
            Our collections focus on thoughtful shapes,
            practical details, and versatile designs for
            different routines and occasions.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
            Review each product page for available
            information about materials, dimensions,
            features, and product specifications.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-black px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#B08D57] sm:mt-10 sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.3em]"
          >
            Discover Our Story

            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          </Link>

        </div>

      </section>

      {/* ========================================
          BRAND BLOCK
      ======================================== */}

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">

        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-black/10 bg-white sm:h-14 sm:w-14">

          <ShoppingBag
            size={22}
            aria-hidden="true"
          />

        </div>

        <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
          Modern Bags For Everyday Use
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
          Explore Ziveline handbags designed around
          practical functionality and contemporary style.
        </p>

        <Link
          to="/shop"
          className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-black underline underline-offset-8"
        >
          Explore Collection

          <ArrowRight
            size={15}
            aria-hidden="true"
          />
        </Link>

      </section>

    </div>
  );
};

export default Home;