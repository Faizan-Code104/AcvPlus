import React, { useEffect, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Clock3,
  RotateCcw,
  ChevronDown,
  ArrowLeft,
  Loader2,
  ImageOff,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useCart } from "./CartContext";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/products`;
const SERVER_URL = API_BASE_URL;

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] =
    useState("");

  const [activeImage, setActiveImage] =
    useState(0);

  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [openSection, setOpenSection] =
    useState("description");

  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${SERVER_URL}${image}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        setProduct(null);
        setActiveImage(0);

        const response = await fetch(
          `${API_URL}/${id}`
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
              "Product not found."
          );
        }

        setProduct(data.product);
      } catch (error) {
        setErrorMessage(
          error?.message ||
            "Unable to load this product."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      Math.max(1, prev - 1)
    );
  };

  const buildCartItem = () => ({
    id: product._id || product.id,
    name: product.name,
    category: product.category,
    price: Number(product.price),
    image: getImageUrl(
      product.images?.[0]
    ),
    quantity,
  });

  const handleAddToCart = () => {
    if (!product) return;

    const cartProduct =
      buildCartItem();

    addToCart(cartProduct);
  };

  const handleBuyNow = () => {
    if (!product) return;

    const checkoutProduct =
      buildCartItem();

    addToCart(checkoutProduct);

    navigate("/cart");
  };

  const toggleSection = (section) => {
    setOpenSection((prev) =>
      prev === section ? "" : section
    );
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-paper px-4">
        <Loader2
          size={30}
          className="animate-spin text-ink"
        />

        <p className="text-sm font-medium text-ink/60">
          Loading product...
        </p>
      </section>
    );
  }

  /* ================= NOT FOUND / ERROR ================= */

  if (errorMessage || !product) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-paper px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center bg-[#F4F1EB] text-ink/40">
          <ShoppingBag size={26} />
        </div>

        <h1 className="font-display text-3xl text-ink">
          Product not found
        </h1>

        <p className="max-w-md text-sm leading-6 text-ink/60">
          {errorMessage ||
            "This product may have been removed or the link is incorrect."}
        </p>

        <Link
          to="/shop"
          className="mt-2 inline-flex items-center gap-2 bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition hover:bg-bottle-dark"
        >
          <ArrowLeft size={16} />

          Back to Shop
        </Link>
      </section>
    );
  }

  const images =
    product.images &&
    product.images.length > 0
      ? product.images
      : [];

  const currentImage =
    images[activeImage] ||
    images[0];

  const inStock =
    Number(product.stock) > 0;

  return (
    <section className="min-h-screen bg-paper">
      {/* Top Navigation */}

      <div className="border-b border-line bg-[#F4F1EB]">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Shop
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Gallery */}

          <div>
            {/* Main Image */}

            <div className="group relative aspect-square overflow-hidden bg-[#F4F1EB]">
              {currentImage ? (
                <img
                  src={getImageUrl(
                    currentImage
                  )}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-ink/20">
                  <ImageOff
                    size={40}
                  />
                </div>
              )}

              {product.isFeatured && (
                <div className="absolute left-5 top-5 bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-paper">
                  Featured
                </div>
              )}

              {/* Wishlist */}

              <button
                type="button"
                onClick={() =>
                  setIsWishlisted(
                    !isWishlisted
                  )
                }
                className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center bg-paper/95 backdrop-blur transition-all duration-300 hover:scale-105 ${
                  isWishlisted
                    ? "text-red-500"
                    : "text-ink/70"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {images.map(
                  (image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      onMouseEnter={() =>
                        setActiveImage(
                          index
                        )
                      }
                      onFocus={() =>
                        setActiveImage(
                          index
                        )
                      }
                      onClick={() =>
                        setActiveImage(
                          index
                        )
                      }
                      className={`group aspect-square overflow-hidden border-2 transition-all duration-300 ${
                        activeImage ===
                        index
                          ? "border-ink"
                          : "border-transparent hover:border-line"
                      }`}
                    >
                      <img
                        src={getImageUrl(
                          image
                        )}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Product Information */}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-bottle">
              {product.category}
            </p>

            <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              {product.name}
            </h1>

            {/* Price */}

            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-bold text-ink">
                $
                {Number(
                  product.price
                ).toFixed(2)}
              </span>
            </div>

            {/* Stock */}

           <p className="mt-3 text-xs font-bold">
  {inStock ? (
    <span className="text-emerald-600">
      In Stock
    </span>
  ) : (
    <span className="text-red-500">
      Out of Stock
    </span>
  )}
</p>

            {/* Description */}

            <p className="mt-7 text-sm leading-7 text-ink/60 sm:text-base">
              {product.description}
            </p>

            {/* Product Specifications */}
            <div className="mt-6 border-y border-line">
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-3 text-sm">
                <span className="font-bold text-ink">SKU</span>
                <span className="text-ink/60">{product.sku || "Not provided"}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-3 text-sm">
                <span className="font-bold text-ink">Material</span>
                <span className="text-ink/60">{product.material || "Not provided"}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm">
                <span className="font-bold text-ink">Weight</span>
                <span className="text-ink/60">{product.weight || "Not provided"}</span>
              </div>
            </div>

            <div className="my-8 h-px bg-line" />

            {/* Quantity + Add */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-14 items-center justify-between border border-line bg-[#F4F1EB] px-2 sm:w-36">
                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                  className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:bg-paper hover:text-ink"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <span className="text-sm font-bold text-ink">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                  className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:bg-paper hover:text-ink"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={
                  handleAddToCart
                }
                disabled={!inStock}
                className="flex h-14 flex-1 items-center justify-center gap-3 bg-ink px-6 text-xs font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:bg-bottle-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag
                  size={18}
                />

                {inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>
            </div>

            {/* Buy Now */}

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!inStock}
              className="mt-3 flex h-14 w-full items-center justify-center border-2 border-ink bg-paper text-xs font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy It Now
            </button>

            {/* Benefits */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="bg-[#F4F1EB] p-4">
                <Truck
                  size={20}
                  className="text-ink"
                />

                <p className="mt-3 text-xs font-bold text-ink">
                  Free Standard Shipping
                </p>

                <p className="mt-1 text-[10px] leading-4 text-ink/50">
                  Eligible U.S. orders
                </p>
              </div>

              <div className="bg-[#F4F1EB] p-4">
                <Clock3
                  size={20}
                  className="text-ink"
                />

                <p className="mt-3 text-xs font-bold text-ink">
                  1–2 Business-Day
                  Processing
                </p>

                <p className="mt-1 text-[10px] leading-4 text-ink/50">
                  Before shipment
                </p>
              </div>

              <div className="bg-[#F4F1EB] p-4">
                <RotateCcw
                  size={20}
                  className="text-ink"
                />

                <p className="mt-3 text-xs font-bold text-ink">
                  30-Day Returns
                </p>

                <p className="mt-1 text-[10px] leading-4 text-ink/50">
                  Eligible items
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Product Information Accordion */}

        <div className="mt-16 border-t border-line pt-10 lg:mt-24">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">

            {/* Sidebar */}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-bottle">
                Product Details
              </p>

              <h2 className="mt-3 font-display text-3xl text-ink">
                Everything you need
                to know.
              </h2>
            </div>

            {/* Accordion */}

            <div className="divide-y divide-line">

              {/* Description */}

              <div>
                <button
                  type="button"
                  onClick={() =>
                    toggleSection(
                      "description"
                    )
                  }
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-bold text-ink">
                    Description
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-ink/40 transition-transform duration-300 ${
                      openSection ===
                      "description"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openSection ===
                  "description" && (
                  <div className="pb-6 text-sm leading-7 text-ink/60">
                    <p>
                      {
                        product.description
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping */}

              <div>
                <button
                  type="button"
                  onClick={() =>
                    toggleSection(
                      "shipping"
                    )
                  }
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-bold text-ink">
                    Shipping & Returns
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-ink/40 transition-transform duration-300 ${
                      openSection ===
                      "shipping"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openSection ===
                  "shipping" && (
                  <div className="pb-6 text-sm leading-7 text-ink/60">
                    <p>
                      Orders are
                      processed within
                      1–2 business days.
                    </p>

                    <p className="mt-3">
                      Standard transit
                      time is generally
                      3–7 business days
                      after processing.
                    </p>

                    <p className="mt-3">
                      Free standard
                      shipping is
                      available on
                      eligible orders
                      within the
                      contiguous United
                      States.
                    </p>

                    <p className="mt-3">
                      Eligible products
                      may be returned
                      within 30 days of
                      confirmed delivery
                      in accordance with
                      our Return and
                      Refund Policy.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom CTA */}

        <div className="mt-16 bg-ink px-6 py-12 text-center text-paper sm:px-10 lg:mt-24 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-paper/60">
            Ziveline
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
            Carry your style.
            Wherever life takes
            you.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-paper/70">
            Discover more
            thoughtfully designed
            bags made for modern
            everyday life.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 bg-paper px-7 py-4 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-[#EFE9DE]"
          >
            Explore Collection

            <ShoppingBag
              size={17}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopDetails;