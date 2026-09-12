import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowDownUp,
  ChevronDown,
  ImageOff,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { useCart } from "../component/CartContext";
import { API_BASE_URL } from "../config";

const Shop = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [activeCategory, setActiveCategory] =
    useState(categoryFromUrl || "All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showFilters, setShowFilters] =
    useState(false);

  /* =========================================
     FETCH PRODUCTS
  ========================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch(
          `${API_BASE_URL}/api/products`
        );

        let data = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load products."
          );
        }

        if (!isMounted) return;

        setProducts(
          Array.isArray(data?.products)
            ? data.products
            : []
        );
      } catch (error) {
        if (!isMounted) return;

        setFetchError(
          error?.message ||
            "Unable to load products. Please try again."
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

  /* =========================================
     SYNC CATEGORY WITH URL
  ========================================= */

  useEffect(() => {
    setActiveCategory(
      categoryFromUrl || "All"
    );
  }, [categoryFromUrl]);

  /* =========================================
     CATEGORIES
  ========================================= */

  const categories = useMemo(() => {
    const databaseCategories = products
      .map((product) => product?.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set(databaseCategories),
    ];
  }, [products]);

  /* =========================================
     IMAGE URL
  ========================================= */

  const getImageUrl = (image) => {
    if (
      !image ||
      typeof image !== "string"
    ) {
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

  /* =========================================
     PRICE
  ========================================= */

  const formatPrice = (price) => {
    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "$0.00";
    }

    return `$${value.toFixed(2)}`;
  };

  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = (product) => {
    if (
      !product ||
      Number(product.stock) <= 0
    ) {
      return;
    }

    addToCart({
      ...product,
      id: product._id,
      image: getImageUrl(
        product.images?.[0]
      ),
    });
  };

  /* =========================================
     FILTER / SEARCH / SORT
  ========================================= */

  const filteredProducts = useMemo(() => {
    const search = searchQuery
      .trim()
      .toLowerCase();

    let result = products.filter(
      (product) => {
        const category =
          product?.category
            ?.toString()
            .toLowerCase() || "";

        const name =
          product?.name
            ?.toString()
            .toLowerCase() || "";

        const description =
          product?.description
            ?.toString()
            .toLowerCase() || "";

        const matchesCategory =
          activeCategory === "All" ||
          category ===
            activeCategory.toLowerCase();

        const matchesSearch =
          !search ||
          name.includes(search) ||
          category.includes(search) ||
          description.includes(search);

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) =>
          Number(a?.price || 0) -
          Number(b?.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) =>
          Number(b?.price || 0) -
          Number(a?.price || 0)
      );
    }

    if (sortBy === "name-az") {
      result = [...result].sort(
        (a, b) =>
          (a?.name || "").localeCompare(
            b?.name || ""
          )
      );
    }

    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => {
          const dateA = new Date(
            a?.createdAt || 0
          ).getTime();

          const dateB = new Date(
            b?.createdAt || 0
          ).getTime();

          return dateB - dateA;
        }
      );
    }

    return result;
  }, [
    products,
    activeCategory,
    searchQuery,
    sortBy,
  ]);

  /* =========================================
     CATEGORY CHANGE
  ========================================= */

  const handleCategoryChange = (
    category
  ) => {
    setActiveCategory(category);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">

      {/* =========================================
          SHOP HERO
      ========================================= */}

      <section className="bg-ink px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold uppercase tracking-[0.22em] text-paper/60 sm:tracking-[0.25em]">
            Ziveline Collection
          </p>

          <div className="mt-4 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

            <div className="max-w-3xl">

              <h1 className="font-display text-4xl leading-[1.08] text-paper sm:text-5xl lg:text-6xl">
                Find your
                <span className="block text-paper/60">
                  everyday carry.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-paper/70 sm:mt-6 sm:text-base">
                Explore handbags designed for
                everyday use, practical
                organization, and modern style.
              </p>

            </div>

            <div className="flex items-center gap-3 text-paper">

              <ShoppingBag
                size={22}
                aria-hidden="true"
              />

              <span className="text-sm font-medium">
                {products.length}{" "}
                {products.length === 1
                  ? "Product"
                  : "Products"}
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          CONTROLS
      ========================================= */}

      <section className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">

        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* DESKTOP CATEGORIES */}

            <div className="hidden max-w-full items-center gap-2 overflow-x-auto lg:flex">

              {categories.map(
                (category) => {
                  const selected =
                    activeCategory.toLowerCase() ===
                    category.toLowerCase();

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          category
                        )
                      }
                      aria-pressed={selected}
                      className={`min-h-11 whitespace-nowrap border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                        selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line bg-paper text-ink/60 hover:border-ink hover:text-ink"
                      }`}
                    >
                      {category}
                    </button>
                  );
                }
              )}

            </div>

            {/* SEARCH / SORT */}

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

              <div className="relative min-w-0 flex-1 sm:min-w-[240px] lg:w-72">

                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                />

                <label
                  htmlFor="shop-search"
                  className="sr-only"
                >
                  Search products
                </label>

                <input
                  id="shop-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search products..."
                  className="min-h-12 w-full border border-line bg-[#F4F1EB] py-3 pl-11 pr-11 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink focus:bg-paper sm:text-sm"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery("")
                    }
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-ink/40 transition-colors hover:text-ink"
                  >
                    <X
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                )}

              </div>

              <div className="relative sm:min-w-[190px]">

                <ArrowDownUp
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/50"
                />

                <label
                  htmlFor="shop-sort"
                  className="sr-only"
                >
                  Sort products
                </label>

                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value
                    )
                  }
                  className="min-h-12 w-full appearance-none border border-line bg-paper py-3 pl-9 pr-9 text-xs font-semibold text-ink outline-none transition-colors hover:border-ink focus:border-ink"
                >
                  <option value="newest">
                    Newest
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="name-az">
                    Name: A to Z
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
                />

              </div>

            </div>

            {/* MOBILE CATEGORY BUTTON */}

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (previous) => !previous
                )
              }
              aria-expanded={showFilters}
              aria-controls="mobile-shop-categories"
              className="flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-5 text-xs font-semibold uppercase tracking-wide text-paper lg:hidden"
            >
              <SlidersHorizontal
                size={16}
                aria-hidden="true"
              />

              Categories
            </button>

          </div>

          {/* MOBILE CATEGORIES */}

          {showFilters && (
            <div
              id="mobile-shop-categories"
              className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4 lg:hidden"
            >
              {categories.map(
                (category) => {
                  const selected =
                    activeCategory.toLowerCase() ===
                    category.toLowerCase();

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          category
                        )
                      }
                      aria-pressed={selected}
                      className={`min-h-11 border px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
                        selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line bg-paper text-ink/60"
                      }`}
                    >
                      {category}
                    </button>
                  );
                }
              )}
            </div>
          )}

        </div>
      </section>

      {/* =========================================
          PRODUCTS
      ========================================= */}

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        <div className="mx-auto max-w-7xl">

          {/* RESULT HEADER */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">

            <p
              className="text-sm text-ink/60"
              aria-live="polite"
            >
              Showing{" "}
              <span className="font-bold text-ink">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>

            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setActiveCategory("All")
                }
                className="min-h-11 px-2 text-xs font-semibold text-ink/60 underline underline-offset-4 hover:text-ink"
              >
                Clear category
              </button>
            )}

          </div>

          {/* LOADING */}

          {loading && (
            <div
              className="flex min-h-[350px] items-center justify-center"
              role="status"
            >
              <div className="text-center">

                <div
                  className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-line border-t-ink"
                  aria-hidden="true"
                />

                <p className="mt-5 text-sm font-medium text-ink/60">
                  Loading products...
                </p>

              </div>
            </div>
          )}

          {/* ERROR */}

          {!loading && fetchError && (
            <div
              role="alert"
              className="border border-red-200 bg-red-50 px-5 py-14 text-center sm:px-6 sm:py-16"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center bg-red-100 text-red-600">
                <X
                  size={25}
                  aria-hidden="true"
                />
              </div>

              <h2 className="mt-6 font-display text-3xl text-ink">
                Unable to load products
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
                {fetchError}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-6 min-h-12 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark"
              >
                Try Again
              </button>

            </div>
          )}

          {/* PRODUCT GRID */}

          {!loading &&
            !fetchError &&
            filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredProducts.map(
                  (product) => {
                    const productId =
                      product?._id;

                    const image =
                      getImageUrl(
                        product?.images?.[0]
                      );

                    const stock =
                      Number(
                        product?.stock || 0
                      );

                    const outOfStock =
                      stock <= 0 ||
                      product?.status ===
                        "Out of Stock";

                    return (
                      <article
                        key={productId}
                        className="group min-w-0"
                      >

                        {/* PRODUCT IMAGE */}

                        <div className="relative aspect-square overflow-hidden bg-[#F4F1EB]">

                          <Link
                            to={`/shop/${productId}`}
                            aria-label={`View ${product?.name || "product"}`}
                            className="block h-full w-full"
                          >

                            {image ? (
                              <img
                                src={image}
                                alt={
                                  product?.name ||
                                  "Ziveline handbag"
                                }
                                loading="lazy"
                                className="h-full w-full object-cover object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-ink/25">
                                <ImageOff
                                  size={30}
                                  aria-hidden="true"
                                />
                              </div>
                            )}

                          </Link>

                          {/* STATUS BADGE */}

                          {product?.status &&
                            product.status !==
                              "Active" && (
                              <div
                                className={`absolute left-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                  outOfStock
                                    ? "bg-red-600 text-white"
                                    : "bg-[#F4F1EB] text-ink"
                                }`}
                              >
                                {
                                  product.status
                                }
                              </div>
                            )}

                        </div>

                        {/* PRODUCT INFO */}

                        <div className="mt-4 min-w-0">

                          {product?.category && (
                            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-ink/40">
                              {
                                product.category
                              }
                            </p>
                          )}

                          <Link
                            to={`/shop/${productId}`}
                            className="block"
                          >
                            <h2 className="mt-1 line-clamp-2 break-words text-sm font-bold leading-5 text-ink transition-colors hover:text-ink/65">
                              {product?.name ||
                                "Product"}
                            </h2>
                          </Link>

                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">

                            <span className="text-sm font-bold text-ink">
                              {formatPrice(
                                product?.price
                              )}
                            </span>

                            <span className="text-xs font-medium text-ink/45">
                              {outOfStock
                                ? "Out of Stock"
                                : "In Stock"}
                            </span>

                          </div>

                          {/* ADD TO CART - ALWAYS ACCESSIBLE */}

                          <button
                            type="button"
                            disabled={outOfStock}
                            onClick={() =>
                              handleAddToCart(
                                product
                              )
                            }
                            className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-colors ${
                              outOfStock
                                ? "cursor-not-allowed bg-ink/40"
                                : "bg-ink hover:bg-bottle-dark"
                            }`}
                          >
                            <ShoppingBag
                              size={16}
                              aria-hidden="true"
                            />

                            {outOfStock
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </button>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>
            )}

          {/* NO PRODUCTS */}

          {!loading &&
            !fetchError &&
            filteredProducts.length === 0 && (
              <div className="border border-line bg-[#F4F1EB] px-5 py-16 text-center sm:px-6 sm:py-20">

                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-ink text-paper">
                  <Search
                    size={25}
                    aria-hidden="true"
                  />
                </div>

                <h2 className="mt-6 font-display text-3xl text-ink">
                  No products found
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/60">
                  We couldn't find a product
                  matching your search or selected
                  category. Try another keyword or
                  browse all products.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(
                      "All"
                    );
                  }}
                  className="mt-6 min-h-12 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark"
                >
                  View All Products
                </button>

              </div>
            )}

        </div>
      </section>

      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">

        <div className="mx-auto max-w-7xl bg-ink px-5 py-12 text-center sm:px-12 sm:py-14 lg:py-20">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-paper sm:text-4xl lg:text-5xl">
            Find a bag for your everyday routine.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-paper/70">
            Explore available styles and review
            each product page for its current
            details and specifications.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Shop;