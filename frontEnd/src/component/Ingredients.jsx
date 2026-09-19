import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Loader2 } from "lucide-react";

import { API_BASE_URL } from "../config";

const Ingredients = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH SELECTED PRODUCT
  ========================================================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/products/${productId}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load product.");
        }

        const selectedProduct = data.product || data;

        setProduct(selectedProduct);
      } catch (error) {
        console.error("ACV Plus Ingredients Fetch Error:", error);

        setProduct(null);

        setError(error.message || "Unable to load ingredient information.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setLoading(false);
      setError("Product ID is missing.");
    }
  }, [productId]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F1F6FF] px-5">
        <div className="text-center">
          <Loader2 size={30} className="mx-auto animate-spin text-[#183A7A]" />

          <p className="mt-4 text-sm text-[#263B63]/60">
            Loading ingredients...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !product) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F1F6FF] px-5">
        <div className="w-full max-w-lg rounded-[24px] border border-[#D6E2F7] bg-white px-6 py-12 text-center">
          <ImageOff size={32} className="mx-auto text-[#183A7A]/40" />

          <p className="mt-5 text-sm text-[#263B63]/60">
            {error || "Ingredient information is unavailable."}
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#23458C] px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-[#315FBA]"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================================
     PRODUCT INFORMATION
  ========================================================= */

  const productIdValue = product._id || product.id;

  const productLink = `/product/${productIdValue}`;

  const ingredientImage =
    product.ingredientImage ||
    product.ingredientsImage ||
    product.supplementFactsImage ||
    "";

  /* =========================================================
     INGREDIENT PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F1F6FF] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[900px]">
        {/* ===================================================
            INGREDIENT IMAGE
        =================================================== */}

        <div className="overflow-hidden rounded-[24px] border border-[#D6E2F7] bg-white p-4 shadow-[0_15px_50px_rgba(16,40,93,0.06)] sm:p-6 lg:p-8">
          {ingredientImage ? (
            <img
              src={ingredientImage}
              alt={`${product.name} ingredients`}
              className="mx-auto h-auto w-full max-w-full object-contain"
            />
          ) : (
            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[18px] bg-[#F8FBFF] px-6 text-center">
              <ImageOff
                size={35}
                strokeWidth={1.4}
                className="text-[#183A7A]/30"
              />

              <p className="mt-4 text-sm text-[#263B63]/55">
                Ingredient image is not available for this product.
              </p>
            </div>
          )}
        </div>

        {/* ===================================================
            BACK TO SAME PRODUCT
        =================================================== */}

        <div className="mt-8 text-center">
          <Link
            to={productLink}
            className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#23458C] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#315FBA]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Your Product
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Ingredients;
