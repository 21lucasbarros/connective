"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  color?: string | null;
  features?: string[];
};

type CartStore = {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: CartItem["id"]) => void;
  updateQty: (id: CartItem["id"], qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => {
        const state = get();
        const idx = state.cart.findIndex(
          (p) => String(p.id) === String(item.id),
        );

        if (idx >= 0) {
          const next = [...state.cart];
          next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty ?? 1) };
          set({ cart: next });
        } else {
          set({
            cart: [
              ...state.cart,
              { ...(item as CartItem), qty: item.qty ?? 1 },
            ],
          });
        }
      },

      removeItem: (id: CartItem["id"]) => {
        set((state) => ({
          cart: state.cart.filter((p) => String(p.id) !== String(id)),
        }));
      },

      updateQty: (id: CartItem["id"], qty: number) => {
        set((state) => {
          if (qty <= 0) {
            return {
              cart: state.cart.filter((p) => String(p.id) !== String(id)),
            };
          }
          return {
            cart: state.cart.map((p) =>
              String(p.id) === String(id) ? { ...p, qty } : p,
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      get total() {
        return get().cart.reduce((acc, it) => acc + it.price * it.qty, 0);
      },

      get itemCount() {
        return get().cart.reduce((acc, it) => acc + it.qty, 0);
      },
    }),
    {
      name: "connective_cart",
    },
  ),
);

// Hook compatível com o antigo
export function useCart() {
  const store = useCartStore();
  return {
    cart: store.cart,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQty: store.updateQty,
    clearCart: store.clearCart,
    total: store.total,
    itemCount: store.itemCount,
  };
}
