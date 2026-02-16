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
  const [isHovered, setIsHovered] = useState(false);

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
      await new Promise((resolve) => setTimeout(resolve, 700));
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full rounded-2xl overflow-hidden flex flex-col bg-white"
      style={{
        height: "100%",
        boxShadow: isHovered
          ? "0 25px 50px rgba(0,0,0,0.15)"
          : "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <motion.div
        className="relative h-40 w-full p-6 flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)`,
          }}
        />

        {/* Animated Background Pattern */}
        <motion.div
          className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          animate={{ y: isHovered ? -10 : 0, x: isHovered ? -10 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />

        <motion.div
          className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full opacity-15"
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          animate={{ y: isHovered ? 8 : 0, x: isHovered ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />

        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10"
        >
          <h3 className="text-2xl font-bold text-white leading-tight">
            {name}
          </h3>
        </motion.div>
      </motion.div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {description && (
            <motion.div
              className="mb-6 pb-6 border-b border-gray-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {description.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-700 leading-relaxed font-medium mb-1.5 line-clamp-4"
                >
                  {line.trim()}
                </p>
              ))}
            </motion.div>
          )}

          <motion.div
            className="mb-6"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
              A partir de
            </span>
            <div className="text-3xl font-black text-gray-900 mt-2 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
              {formatPrice()}
            </div>
          </motion.div>

          {features.length > 0 && (
            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.div
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Check
                        className="w-3 h-3 shrink-0"
                        style={{ color: color }}
                        strokeWidth={3}
                      />
                    </div>
                  </motion.div>
                  <span className="text-gray-700 leading-relaxed font-medium">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {is_custom ? (
          <motion.button
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 relative overflow-hidden group"
            style={{ backgroundColor: color }}
            onClick={handleRequestProposal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: "white" }}
            />
            <span className="relative">Solicite proposta</span>
          </motion.button>
        ) : (
          <motion.button
            className="relative w-full py-3.5 px-6 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 overflow-hidden group"
            style={{ backgroundColor: color }}
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: "white" }}
            />
            {loading ? (
              <span className="relative flex items-center gap-2">
                <motion.svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                </motion.svg>
                Adicionando...
              </span>
            ) : (
              <span className="relative">Contratar</span>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
