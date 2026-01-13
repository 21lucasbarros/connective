"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  color?: string | null;
  features?: string[];
};

type CartContextValue = {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: CartItem["id"]) => void;
  updateQty: (id: CartItem["id"], qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const STORAGE_KEY = "connective_cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addItem = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => String(p.id) === String(item.id));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty ?? 1) };
        return next;
      }
      return [...prev, { ...(item as CartItem), qty: item.qty ?? 1 }];
    });
  };

  const removeItem = (id: CartItem["id"]) => {
    setCart((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const updateQty = (id: CartItem["id"], qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => String(p.id) !== String(id));
      return prev.map((p) => (String(p.id) === String(id) ? { ...p, qty } : p));
    });
  };

  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0);
    const itemCount = cart.reduce((acc, it) => acc + it.qty, 0);
    return { total, itemCount };
  }, [cart]);

  const value: CartContextValue = {
    cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    total: totals.total,
    itemCount: totals.itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export default CartProvider;
