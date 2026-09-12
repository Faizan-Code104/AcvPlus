import React from "react";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Truck,
  ChevronLeft,
  ImageOff,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();

  const handleQuantityChange = (id, action, currentQuantity) => {
    const newQuantity =
      action === "increase"
        ? currentQuantity + 1
        : Math.max(1, currentQuantity - 1);

    updateQuantity(id, newQuantity);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartSubtotal;
  const shipping = 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[80vh] bg-[#F4F1EB] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center border border-line bg-paper px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center bg-ink text-paper">
            <ShoppingBag size={34} strokeWidth={1.8} />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-bottle">
            Your Shopping Bag
          </p>

          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Your bag is empty
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-ink/60 sm:text-base">
            Looks like you haven't added anything to your bag yet. Explore our
            handbag collection and find a style that suits your everyday needs.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-bottle-dark"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F4F1EB] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/shop"
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          >
            <ChevronLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-bottle">
                Ziveline Store
              </p>

              <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
                Shopping Bag
              </h1>
            </div>

            <p className="text-sm font-medium text-ink/60">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-line bg-paper p-4 sm:p-5"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#F4F1EB] sm:h-36 sm:w-32">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ink/20">
                        <ImageOff size={22} />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
                          {item.category}
                        </p>

                        <h2 className="mt-1 text-base font-bold text-ink sm:text-lg">
                          {item.name}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center text-ink/40 transition-colors hover:text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                      {/* Quantity */}
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              "decrease",
                              item.quantity,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-ink/70 transition-colors hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-9 text-center text-sm font-bold text-ink">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              "increase",
                              item.quantity,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-ink/70 transition-colors hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-ink">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Free Shipping Notice */}
            {subtotal > 0 && (
              <div className="border border-line bg-paper p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-paper">
                    <Truck size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-ink">
                      Free shipping on this order
                    </p>
                    <p className="mt-1 text-xs text-ink/60">
                      All orders ship at no extra cost.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="bg-ink p-6 text-paper sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl">Order Summary</h2>
                <ShoppingBag size={20} className="text-paper/50" />
              </div>

              {/* Price Breakdown */}
              <div className="mt-8 space-y-4 border-t border-paper/10 pt-7">
                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Subtotal</span>
                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-paper/60">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-7 flex items-end justify-between border-t border-paper/10 pt-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/50">
                    Total
                  </p>
                  <p className="mt-1 text-xs text-paper/40">
                    Order total before checkout
                  </p>
                </div>

                <p className="font-display text-3xl">${total.toFixed(2)}</p>
              </div>

              {/* Checkout */}
              <Link
                to="/checkout"
                className="mt-8 flex w-full items-center justify-center gap-2 bg-paper px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-[#EFE9DE]"
              >
                Proceed to Checkout
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-4 border border-line bg-paper p-5 text-center">
              <p className="text-xs leading-6 text-ink/60">
                Review your order details before continuing to checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
