"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import CartSideBar from "./cart-side-bar";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import ColorBar from "./color-bar";
import Link from "next/link";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/loja" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          <div className="shrink-0">
            <a href="/" className="flex items-center">
              <h1 className="font-roboto font-bold text-2xl md:text-3xl text-(--color-roxo)">
                Connective
              </h1>
            </a>
          </div>

          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-medium text-gray-800 hover:text-(--color-roxo) hover:underline underline-offset-4 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <CartSideBar />
            <div className="hidden md:block border-r h-6 mx-2" />
            <UserMenu />

            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block text-base font-medium text-gray-800 hover:text-(--color-roxo) transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <ColorBar blocks={15} />
    </header>
  );
}
