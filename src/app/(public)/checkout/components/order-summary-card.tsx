"use client";
import type { ChangeEvent } from "react";
import type { CartItem } from "@/lib/cart";
import type { Coupon } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tag, ShoppingCart, Lock } from "lucide-react";

type Props = {
  cart: CartItem[];
  couponCode: string;
  setCouponCode: (v: string) => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  handleApplyCoupon: () => void;
  subtotal: number;
  discount: number;
  total: number;
};

export default function OrderSummaryCard({
  cart,
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponError,
  handleApplyCoupon,
  subtotal,
  discount,
  total,
}: Props) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Resumo do Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Carrinho vazio</p>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Qtd: {item.qty ?? 1}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      R$ {(item.price * (item.qty ?? 1)).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      R$ {item.price.toFixed(2)} cada
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="coupon" className="text-sm">
            Cupom de Desconto
          </Label>
          <div className="flex gap-2">
            <input
              id="coupon"
              placeholder="Digite o cupom"
              value={couponCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCouponCode(e.target.value)
              }
              disabled={!!appliedCoupon}
              className="input"
            />
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={!!appliedCoupon || !couponCode.trim()}
            >
              {appliedCoupon ? "Aplicado" : "Aplicar"}
            </Button>
          </div>
          {couponError && <p className="text-xs text-red-600">{couponError}</p>}
          {appliedCoupon && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Cupom "{appliedCoupon.code}" aplicado (
              {appliedCoupon.discount_type === "PERCENTAGE"
                ? `${appliedCoupon.discount_value}%`
                : `R$ ${Number(appliedCoupon.discount_value).toFixed(2)}`}
              )
            </p>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-sm text-green-600">
              <span>
                Desconto (
                {appliedCoupon.discount_type === "PERCENTAGE"
                  ? `${appliedCoupon.discount_value}%`
                  : `R$ ${Number(appliedCoupon.discount_value).toFixed(2)}`}
                )
              </span>
              <span>- R$ {discount.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold">Total</span>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#8338ec]">
                R$ {total.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                ou 12x de R$ {(total / 12).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full bg-[#8338ec] hover:bg-[#6d28d9] text-white h-12 text-lg">
          <Lock className="w-4 h-4 mr-2" />
          Finalizar Compra
        </Button>
        <p className="text-xs text-center text-gray-500">
          Ao finalizar, você concorda com nossos{" "}
          <a href="#" className="text-[#8338ec] hover:underline">
            Termos de Serviço
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
