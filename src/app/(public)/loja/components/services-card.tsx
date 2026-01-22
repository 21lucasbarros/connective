"use client";

import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { motion } from "framer-motion";

type ServiceCardProps = {
  name: string;
  description?: string | null;
  price?: number | string | null;
  formatted_price?: string | null;
  color: string;
  features?: string[];
  is_custom?: boolean;
};

export default function ServicesCard({
  name,
  description,
  price,
  formatted_price,
  color,
  features = [],
  is_custom,
}: ServiceCardProps) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const parseNumericPrice = () => {
    if (price === undefined || price === null) return 0;
    if (typeof price === "number") return price;
    const n = Number(
      String(price)
        .replace(/[^0-9.,-]/g, "")
        .replace(/,/g, "."),
    );
    return isNaN(n) ? 0 : n;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const numeric = parseNumericPrice();
      await new Promise((resolve) => setTimeout(resolve, 700)); // Simula delay
      addItem({ id: name, name, price: numeric, color, features });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestProposal = () => {
    const to = "connective.socialmedia@gmail.com";
    const subject = `Solicitação de proposta personalizada - ${name}`;
    const body = `Olá Connective,%0D%0A%0D%0AGostaria de solicitar uma proposta personalizada para o serviço: ${name}.%0D%0A%0D%0APor favor, me retornem com mais detalhes e orçamento.%0D%0A%0D%0AObrigado!`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
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
      </motion.div>

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

        {is_custom ? (
          <motion.button
            className="w-full py-3.5 px-6 rounded-lg font-bold text-white text-base transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: color }}
            onClick={handleRequestProposal}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            Solicite uma proposta personalizada
          </motion.button>
        ) : (
          <motion.button
            className="w-full py-3.5 px-6 rounded-lg font-bold text-white text-base transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: color }}
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Carregando...
              </span>
            ) : (
              "Contratar"
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
