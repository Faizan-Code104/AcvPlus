import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   ACV PLUS CART CONTEXT
========================================================= */

const CartContext = createContext(null);

const CART_STORAGE_KEY = "acvplus-cart";

/* =========================================================
   HELPERS
========================================================= */

const getProductId = (product) => {
  return product?.id || product?._id || null;
};

const normalizeQuantity = (quantity, fallback = 1) => {
  const parsedQuantity = Number(quantity);

  if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
    return fallback;
  }

  return Math.max(1, Math.floor(parsedQuantity));
};

const normalizeCartItem = (item) => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const productId = getProductId(item);

  if (!productId) {
    return null;
  }

  return {
    ...item,
    id: productId,
    quantity: normalizeQuantity(item.quantity),
  };
};

/* =========================================================
   CART PROVIDER
========================================================= */

export const CartProvider = ({ children }) => {
  /* =======================================================
     CART STATE
  ======================================================= */

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart.map(normalizeCartItem).filter(Boolean);
    } catch (error) {
      console.error("ACV Plus cart load error:", error);

      return [];
    }
  });

  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("ACV Plus cart storage error:", error);
    }
  }, [cartItems]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (product) => {
    if (!product) {
      return;
    }

    const productId = getProductId(product);

    if (!productId) {
      console.error("ACV Plus: Cannot add product without an ID.");

      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => String(getProductId(item)) === String(productId),
      );

      if (existingItem) {
        return currentItems.map((item) => {
          if (String(getProductId(item)) === String(productId)) {
            return {
              ...item,
              id: productId,
              quantity: normalizeQuantity(item.quantity) + 1,
            };
          }

          return item;
        });
      }

      return [
        ...currentItems,
        {
          ...product,
          id: productId,
          quantity: 1,
        },
      ];
    });
  };

  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const removeFromCart = (productId) => {
    if (!productId) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => String(getProductId(item)) !== String(productId),
      ),
    );
  };

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (productId, quantity) => {
    if (!productId) {
      return;
    }

    const parsedQuantity = Number(quantity);

    /*
      Quantity 0 or below removes the item.
    */

    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const safeQuantity = Math.max(1, Math.floor(parsedQuantity));

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        String(getProductId(item)) === String(productId)
          ? {
              ...item,
              quantity: safeQuantity,
            }
          : item,
      ),
    );
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
  };

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + normalizeQuantity(item.quantity, 0),
      0,
    );
  }, [cartItems]);

  /* =======================================================
     CART SUBTOTAL
  ======================================================= */

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price || 0);

      const quantity = normalizeQuantity(item.quantity, 0);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cartItems, cartCount, cartSubtotal],
  );

  /* =======================================================
     PROVIDER
  ======================================================= */

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* =========================================================
   USE CART HOOK
========================================================= */

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export default CartContext;
