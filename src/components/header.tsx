"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartSideBar from "@/app/(public)/loja/components/cart-side-bar";
import ColorBar from "@/app/(public)/loja/components/color-bar";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Loja", href: "/loja" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-25 py-5 w-full relative">
      <div className="flex-1 min-w-37.5">
        <h1 className="font-bold text-3xl text-(--color-roxo)">Connective</h1>
      </div>
      <nav className="flex-1 flex justify-center">
        <ul className="flex flex-row gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-base font-medium text-[#1a1a1a] hover:text-(--color-roxo) hover:underline underline-offset-4 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1 flex justify-end items-center gap-4">
        <div className="flex items-center gap-4">
          <CartSideBar />
          <div className="border-r h-6 mx-2 self-center" />
          <Button
            type="button"
            variant="ghost"
            aria-label="Usuário"
            onClick={() => (window.location.href = "/sign-in")}
          >
            <User className="text-(--color-roxo) w-10 h-10" size={40} />
          </Button>
        </div>
      </div>
      <ColorBar blocks={15} />
    </header>
  );
}
