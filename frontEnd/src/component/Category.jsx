import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Luggage,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryConfig = [
    {
      id: 1,
      name: "Shoulder Bags",
      description:
        "Versatile shoulder bags selected for everyday use, with practical carrying options and easy-to-style designs.",
      image: "/Shoulder Bags.png",
      icon: ShoppingBag,
    },
    {
      id: 2,
      name: "Handbags",
      description:
        "Everyday handbags selected to combine practical storage with modern, easy-to-style silhouettes.",
      image: "/Handbags.png",
      icon: BriefcaseBusiness,
    },
    {
      id: 3,
      name: "Tote Bags",
      description:
        "Roomy tote bags suited to everyday routines, work essentials, shopping, and daily carrying needs.",
      image: "/Tote Bags.png",
      icon: Luggage,
    },
    {
      id: 4,
      name: "Crossbody Bags",
      description:
        "Compact crossbody bags designed for hands-free carrying and convenient everyday use.",
      image: "/Crossbody Bags.png",
      icon: Sparkles,
    },
    
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/api/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        setProducts(
          Array.isArray(data.products) ? data.products : []
        );
      } catch (error) {
        console.error(
          "Category Products Fetch Error:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return categoryConfig.map((category) => ({
      ...category,

      products: products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          category.name.toLowerCase()
      ).length,
    }));
  }, [products]);

  const createShopLink = (categoryName) => {
    return `/shop?category=${encodeURIComponent(
      categoryName
    )}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* ================= HERO ================= */}

      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/60 sm:tracking-[0.25em]">
              Ziveline Categories
            </p>

            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl">
              Find your

              <span className="block text-paper/60">
                perfect carry.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-paper/70 sm:text-base">
              Explore our handbag categories and find a
              style that suits your everyday needs and
              personal preferences.
            </p>
          </div>
        </div>
      </section>

      {/* ============== CATEGORY INTRO ============== */}

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bottle">
              Explore Collections
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">
              Shop by category
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-ink/60">
            Browse Ziveline handbag categories and compare
            available styles, features, and product details.
          </p>
        </div>
      </section>

      {/* ================= LOADING ================= */}

      {loading && (
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="inline-flex items-center gap-3 border border-line px-5 py-3 text-sm font-medium text-ink/70">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-ink" />

              Loading categories...
            </div>
          </div>
        </section>
      )}

      {/* ============== CATEGORY GRID ============== */}

      {!loading && (
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.id}
                  to={createShopLink(category.name)}
                  className="group relative aspect-[4/5] w-full overflow-hidden bg-ink"
                >
                  {/* CATEGORY IMAGE */}

                  <img
                    src={category.image}
                    alt={`${category.name} collection`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* DARK OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent transition-all duration-500 group-hover:via-ink/55" />

                  {/* ICON */}

                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center border border-paper/20 bg-ink/25 text-paper backdrop-blur-md sm:left-6 sm:top-6 sm:h-12 sm:w-12">
                    <Icon size={20} />
                  </div>

                  {/* TOP ARROW */}

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition-all duration-500 group-hover:rotate-45 sm:right-6 sm:top-6 sm:h-11 sm:w-11">
                    <ArrowUpRight size={18} />
                  </div>

                  {/* CONTENT */}

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
                    <div className="flex items-center gap-2">
                      <span className="h-px w-8 bg-paper/50" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/70">
                        {category.products}{" "}
                        {category.products === 1
                          ? "Product"
                          : "Products"}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-3xl text-paper sm:text-4xl">
                      {category.name}
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-paper/75">
                      {category.description}
                    </p>

                    <div className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-paper sm:mt-6">
                      Explore Collection

                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* =========== QUICK CATEGORY NAVIGATION =========== */}

      <section className="border-y border-line bg-[#F4F1EB] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bottle sm:tracking-[0.2em]">
              Looking For Something Specific?
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">
              Explore all products
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={createShopLink(category.name)}
                className="group inline-flex min-h-11 items-center gap-2 border border-line bg-paper px-4 py-3 text-xs font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper sm:px-5 sm:text-sm"
              >
                {category.name}

                <span className="text-xs font-medium text-ink/50 group-hover:text-paper/60">
                  ({category.products})
                </span>

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND CTA ================= */}

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-ink text-paper">
            <ShoppingBag size={23} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-bottle">
            Ziveline
          </p>

          <h2 className="mt-4 font-display text-3xl text-ink sm:text-5xl">
            Explore the Ziveline collection.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/60 sm:text-base">
            Explore Ziveline handbag categories and review
            the available styles, features, and product
            details to find an option that suits your needs.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark"
          >
            Shop All Bags

            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Category;