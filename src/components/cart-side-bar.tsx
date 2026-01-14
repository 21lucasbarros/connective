"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function CartSideBar() {
  const { cart, total, itemCount, updateQty, removeItem } = useCart();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Carrinho"
          className="relative hover:bg-gray-100 transition-colors rounded-lg p-2"
        >
          <ShoppingCart className="text-[#8338ec] w-5 h-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-[#fc5735] text-white text-xs font-medium min-w-5 h-5 flex items-center justify-center px-1.5 rounded-full">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-100 p-0 flex flex-col bg-white"
      >
        <SheetHeader className="px-6 pt-8 pb-6 border-b">
          <SheetTitle className="text-2xl font-semibold text-[#8338ec]">
            Carrinho
          </SheetTitle>
          {itemCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? "item" : "itens"}
            </p>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-400 text-sm">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      R$ {item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 border border-[#8338ec]/20 rounded-lg">
                        <button
                          aria-label={`Diminuir ${item.name}`}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="p-2 hover:bg-[#8338ec]/5 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-[#8338ec]" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          aria-label={`Aumentar ${item.name}`}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="p-2 hover:bg-[#8338ec]/5 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#8338ec]" />
                        </button>
                      </div>

                      <button
                        aria-label={`Remover ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-[#fc5735]/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-[#fc5735]" />
                      </button>
                    </div>
                  </div>

                  <div className="font-medium text-gray-900">
                    R$ {(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="px-6 py-6 border-t bg-gray-50">
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-semibold text-gray-900">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                className="bg-[#8338ec] hover:bg-[#6b2fd0] text-white w-full h-11 rounded-lg font-medium transition-colors"
              >
                Finalizar compra
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
