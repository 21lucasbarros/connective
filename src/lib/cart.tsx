"use client";

export { useCart, useCartStore } from "./cart-store";
export type { CartItem } from "./cart-store";

// CartProvider para compatibilidade com providers
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default CartProvider;
