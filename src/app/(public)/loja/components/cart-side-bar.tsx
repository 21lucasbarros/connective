"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockCart = [
  { id: 1, name: "Camiseta Connective", price: 79.9, qty: 1 },
  { id: 2, name: "Caneca Roxa", price: 39.9, qty: 2 },
];

export default function CartSideBar() {
  const total = mockCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const itemCount = mockCart.reduce((acc, item) => acc + item.qty, 0);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Carrinho"
          className="relative cursor-pointer"
        >
          <ShoppingCart className="text-(--color-roxo) w-12 h-12" size={48} />
          <Badge className="absolute -top-2 -right-2 bg-(--color-roxo) text-white text-xs font-bold w-5 h-5 flex items-center justify-center p-0">
            {itemCount}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-87.5 p-6 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mb-4">
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col gap-4">
          {mockCart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-zinc-500">Qtd: {item.qty}</div>
              </div>
              <div className="font-semibold text-(--color-roxo)">
                R$ {item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-6">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-(--color-roxo)">R$ {total.toFixed(2)}</span>
            </div>
            <Button className="bg-(--color-roxo) text-white w-full mt-2">
              Finalizar compra
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
