"use client";

import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";

type ServiceCardProps = {
  name: string;
  description?: string | null;
  price?: number | string | null;
  formatted_price?: string | null;
  color: string;
  features?: string[];
};

export default function ServicesCard({
  name,
  description,
  price,
  formatted_price,
  color,
  features = [],
}: ServiceCardProps) {
  const { addItem } = useCart();

  const parseNumericPrice = () => {
    if (price === undefined || price === null) return 0;
    if (typeof price === "number") return price;
    const n = Number(
      String(price)
        .replace(/[^0-9.,-]/g, "")
        .replace(/,/g, ".")
    );
    return isNaN(n) ? 0 : n;
  };

  const handleAdd = () => {
    const numeric = parseNumericPrice();
    addItem({ id: name, name, price: numeric, color, features });
  };
  const formatPrice = () => {
    if (price !== undefined && price !== null) {
      if (typeof price === "number") {
        return price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
      if (!isNaN(Number(price))) {
        return Number(price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      }
    }
    return formatted_price ?? "";
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white hover:shadow-xl transition-shadow duration-300">
      <div
        className="h-40 w-full p-6 flex flex-col justify-center relative"
        style={{ backgroundColor: color }}
      >
        <h3 className="text-xl font-bold text-white leading-tight z-10">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-white/90 mt-2 leading-snug z-10">
            {description}
          </p>
        )}
        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="70" cy="70" r="30" fill="white" />
            <rect x="50" y="60" width="20" height="30" fill="white" />
          </svg>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <span className="text-xs text-gray-500 uppercase">A partir de</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {formatPrice()}
            </div>
          </div>

          {features.length > 0 && (
            <ul className="space-y-2.5 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: color }}
                    strokeWidth={2.5}
                  />
                  <span className="text-gray-700 leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="w-full py-3.5 px-6 rounded-lg font-bold text-white text-base transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: color }}
          onClick={handleAdd}
        >
          Contratar
        </button>
      </div>
    </div>
  );
}
