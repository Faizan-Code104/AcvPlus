import React, { useEffect, useMemo, useState } from "react";

import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronDown,
  ImageOff,
  Leaf,
  Loader2,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../component/CartContext";
import { API_BASE_URL } from "../config";

/* =========================================================
   ACV PLUS — SHOP ALL
========================================================= */

const Shop = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [addedProductId, setAddedProductId] = useState(null);

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch(`${API_BASE_URL}/api/products`);

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

        setFetchError(
          error?.message || "Unable to load products. Please try again.",
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
     PRICE
  ======================================================= */

  const formatPrice = (price) => {
    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "$0.00";
    }

    return `$${value.toFixed(2)}`;
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = (product) => {
    if (!product || Number(product.stock) <= 0) {
      return;
    }

    const productId = product?._id || product?.id;

    addToCart({
      ...product,
      id: productId,
      image: getImageUrl(product?.images?.[0]),
    });

    setAddedProductId(productId);

    window.setTimeout(() => {
      setAddedProductId((current) => (current === productId ? null : current));
    }, 1600);
  };

  /* =======================================================
     SEARCH + SORT
  ======================================================= */

  const filteredProducts = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    let result = products.filter((product) => {
      const name = product?.name?.toString().toLowerCase() || "";

      const description = product?.description?.toString().toLowerCase() || "";

      const ingredients = product?.ingredients?.toString().toLowerCase() || "";

      const sku = product?.sku?.toString().toLowerCase() || "";

      return (
        !search ||
        name.includes(search) ||
        description.includes(search) ||
        ingredients.includes(search) ||
        sku.includes(search)
      );
    });

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => Number(a?.price || 0) - Number(b?.price || 0),
      );
    }

    if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => Number(b?.price || 0) - Number(a?.price || 0),
      );
    }

    if (sortBy === "name-az") {
      result = [...result].sort((a, b) =>
        (a?.name || "").localeCompare(b?.name || ""),
      );
    }

    if (sortBy === "newest") {
      result = [...result].sort((a, b) => {
        const dateA = new Date(a?.createdAt || 0).getTime();

        const dateB = new Date(b?.createdAt || 0).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [products, searchQuery, sortBy]);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F1F6FF] text-[#263B63]">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#172D57] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* DECORATION */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 h-[500px] w-[500px] rounded-full border-[90px] border-white/[0.035]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 left-[12%] h-[420px] w-[420px] rounded-full border-[80px] border-[#3569C8]/10"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_350px]">
            {/* HERO COPY */}

            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                <Leaf size={13} className="text-[#AFC8FF]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AFC8FF]">
                  ACV Plus Wellness
                </span>
              </div>

              <h1 className="mt-7 max-w-[760px] font-serif text-[44px] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[68px]">
                Wellness made
                <span className="block text-[#AFC8FF]">simple.</span>
              </h1>

              <p className="mt-6 max-w-[650px] text-[13px] leading-7 text-white/55 sm:text-[14px]">
                Explore the complete ACV Plus collection and review each
                product's information, ingredients, directions, and
                specifications before adding it to your routine.
              </p>
            </div>

            {/* HERO SIDE */}

            <div className="rounded-[25px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#183A7A]">
                  <ShoppingBag size={18} strokeWidth={1.7} />
                </div>

                <span className="font-serif text-[34px] font-semibold text-white">
                  {products.length}
                </span>
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC8FF]">
                Shop All
              </p>

              <h2 className="mt-2 font-serif text-[22px] font-semibold text-white">
                {products.length === 1
                  ? "1 product available"
                  : `${products.length} products available`}
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-white/45">
                No categories to navigate. Browse the complete ACV Plus product
                collection in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          TRUST STRIP
      ================================================= */}

      <section className="border-b border-[#D6E2F7] bg-white px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] sm:grid-cols-3">
          <TrustItem
            icon={PackageCheck}
            title="Product Information"
            text="Details available on each product page"
          />

          <TrustItem
            icon={ShieldCheck}
            title="Shop With Confidence"
            text="Clear store and support information"
            border
          />

          <TrustItem
            icon={Leaf}
            title="ACV Plus"
            text="Wellness products for everyday routines"
            border
          />
        </div>
      </section>

      {/* =================================================
          SEARCH + SORT
      ================================================= */}

      <section className="sticky top-0 z-30 border-b border-[#D6E2F7] bg-white/95 px-5 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* SEARCH */}

            <div className="relative w-full sm:max-w-[460px]">
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
              />

              <label htmlFor="shop-search" className="sr-only">
                Search products
              </label>

              <input
                id="shop-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search ACV Plus products..."
                className="min-h-[50px] w-full rounded-full border border-[#D6E2F7] bg-[#F1F6FF] py-3 pl-11 pr-11 text-[12px] font-medium text-[#10285D] outline-none transition-all placeholder:text-[#263B63]/35 focus:border-[#3569C8] focus:bg-white focus:ring-4 focus:ring-[#3569C8]/[0.06]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#263B63]/40 transition-colors hover:bg-white hover:text-[#10285D]"
                >
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* SORT */}

            <div className="relative w-full sm:w-[220px]">
              <ArrowDownUp
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
              />

              <label htmlFor="shop-sort" className="sr-only">
                Sort products
              </label>

              <select
                id="shop-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="min-h-[50px] w-full appearance-none rounded-full border border-[#D6E2F7] bg-white py-3 pl-11 pr-10 text-[10px] font-bold uppercase tracking-[0.08em] text-[#10285D] outline-none transition-colors hover:border-[#AFC8FF] focus:border-[#3569C8]"
              >
                <option value="newest">Newest</option>

                <option value="price-low">Price: Low to High</option>

                <option value="price-high">Price: High to Low</option>

                <option value="name-az">Name: A to Z</option>
              </select>

              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#263B63]/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          {/* HEADING */}

          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                Shop All
              </p>

              <h2 className="mt-2 font-serif text-[31px] font-semibold tracking-[-0.035em] text-[#10285D] sm:text-[38px]">
                Our products
              </h2>
            </div>

            {!loading && !fetchError && (
              <p
                className="text-[10px] font-medium text-[#263B63]/45"
                aria-live="polite"
              >
                Showing{" "}
                <span className="font-bold text-[#10285D]">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            )}
          </div>

          {/* =============================================
              LOADING
          ============================================= */}

          {loading && (
            <div
              className="flex min-h-[420px] items-center justify-center rounded-[26px] border border-[#D6E2F7] bg-white"
              role="status"
            >
              <div className="text-center">
                <Loader2
                  size={32}
                  className="mx-auto animate-spin text-[#3569C8]"
                />

                <p className="mt-5 text-[11px] font-semibold text-[#263B63]/50">
                  Loading ACV Plus products...
                </p>
              </div>
            </div>
          )}

          {/* =============================================
              ERROR
          ============================================= */}

          {!loading && fetchError && (
            <div
              role="alert"
              className="rounded-[26px] border border-red-200 bg-white px-6 py-16 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <X size={22} />
              </div>

              <h2 className="mt-6 font-serif text-[29px] font-semibold text-[#10285D]">
                Unable to load products
              </h2>

              <p className="mx-auto mt-3 max-w-[450px] text-[11px] leading-6 text-[#263B63]/55">
                {fetchError}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#23458C] px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#315FBA]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* =============================================
              PRODUCT GRID
          ============================================= */}

          {!loading && !fetchError && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const productId = product?._id || product?.id;

                const image = getImageUrl(product?.images?.[0]);

                const stock = Number(product?.stock || 0);

                const outOfStock =
                  stock <= 0 || product?.status === "Out of Stock";

                const lowStock =
                  !outOfStock &&
                  (product?.status === "Low Stock" || stock <= 5);

                const justAdded = addedProductId === productId;

                return (
                  <article
                    key={productId}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-[#FAFCFF] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5D7FF] hover:shadow-[0_18px_45px_rgba(16,40,93,0.07)]"
                  >
                    {/* PRODUCT IMAGE */}

                    <div className="relative aspect-square overflow-hidden bg-[#F1F6FF]">
                      <Link
                        to={`/shop/${productId}`}
                        aria-label={`View ${product?.name || "product"}`}
                        className="block h-full w-full"
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={product?.name || "ACV Plus product"}
                            loading="lazy"
                            className="h-full w-full object-contain p-5 transition-transform duration-500 motion-safe:group-hover:scale-[1.035]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#183A7A]/25">
                            <ImageOff size={29} aria-hidden="true" />
                          </div>
                        )}
                      </Link>

                      {/* STATUS */}

                      {outOfStock ? (
                        <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white">
                          Out of Stock
                        </span>
                      ) : lowStock ? (
                        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#183A7A] shadow-sm">
                          Low Stock
                        </span>
                      ) : (
                        <span className="absolute left-4 top-4 rounded-full border border-[#D6E2F7] bg-white/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#3569C8] backdrop-blur">
                          Available
                        </span>
                      )}
                    </div>

                    {/* PRODUCT INFO */}

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2">
                        <Leaf size={11} className="text-[#3569C8]" />

                        <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                          ACV Plus
                        </span>
                      </div>

                      <Link to={`/shop/${productId}`} className="block">
                        <h3 className="mt-3 line-clamp-2 min-h-[48px] break-words font-serif text-[19px] font-semibold leading-6 text-[#10285D] transition-colors group-hover:text-[#3569C8]">
                          {product?.name || "Product"}
                        </h3>
                      </Link>

                      {product?.description && (
                        <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#263B63]/45">
                          {product.description}
                        </p>
                      )}

                      <div className="mt-auto pt-5">
                        <div className="flex items-center justify-between gap-3 border-t border-[#D6E2F7] pt-4">
                          <div>
                            <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-[#263B63]/35">
                              Price
                            </p>

                            <span className="mt-1 block font-serif text-[21px] font-semibold text-[#10285D]">
                              {formatPrice(product?.price)}
                            </span>
                          </div>

                          <span
                            className={`text-[9px] font-semibold ${
                              outOfStock ? "text-red-500" : "text-[#3569C8]"
                            }`}
                          >
                            {outOfStock ? "Unavailable" : "In Stock"}
                          </span>
                        </div>

                        {/* ADD TO CART */}

                        <button
                          type="button"
                          disabled={outOfStock}
                          onClick={() => handleAddToCart(product)}
                          className={`mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-4 text-[9px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                            outOfStock
                              ? "cursor-not-allowed bg-[#D6E2F7] text-[#263B63]/40"
                              : justAdded
                                ? "bg-[#E8F1FF] text-[#183A7A]"
                                : "bg-[#23458C] text-white hover:bg-[#315FBA]"
                          }`}
                        >
                          {justAdded ? (
                            <>
                              <Check size={14} />
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={14} />

                              {outOfStock ? "Out of Stock" : "Add to Cart"}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* =============================================
              NO RESULTS
          ============================================= */}

          {!loading && !fetchError && filteredProducts.length === 0 && (
            <div className="rounded-[28px] border border-[#D6E2F7] bg-white px-6 py-16 text-center sm:py-20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
                <Search size={22} />
              </div>

              <h2 className="mt-6 font-serif text-[30px] font-semibold text-[#10285D]">
                No products found
              </h2>

              <p className="mx-auto mt-3 max-w-[440px] text-[11px] leading-6 text-[#263B63]/50">
                We couldn't find a product matching your search. Try a different
                keyword or return to the complete collection.
              </p>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#23458C] px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#315FBA]"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          BOTTOM EDITORIAL SECTION
      ================================================= */}

      <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[#E8F1FF] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[55px] border-white/50"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[680px]">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[#3569C8]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3569C8]">
                  Explore ACV Plus
                </p>
              </div>

              <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight tracking-[-0.035em] text-[#10285D] sm:text-[40px]">
                Review the details before choosing your product.
              </h2>

              <p className="mt-4 max-w-[600px] text-[11px] leading-6 text-[#263B63]/50">
                Open any product to review its available product information,
                ingredients, directions, warnings, and other details provided
                for that item.
              </p>
            </div>

            <Link
              to="/faqs"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full bg-[#183A7A] px-7 text-[9px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#315FBA] sm:w-auto"
            >
              Visit FAQs
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
   TRUST ITEM
========================================================= */

const TrustItem = ({ icon: Icon, title, text, border = false }) => {
  return (
    <div
      className={`flex items-center gap-3 py-5 sm:px-5 ${
        border ? "border-t border-[#D6E2F7] sm:border-l sm:border-t-0" : ""
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#183A7A]">
        <Icon size={15} strokeWidth={1.7} />
      </div>

      <div>
        <p className="text-[9px] font-bold text-[#10285D]">{title}</p>

        <p className="mt-0.5 text-[8px] leading-4 text-[#263B63]/40">{text}</p>
      </div>
    </div>
  );
};

export default Shop;
