"use client";

import { Calendar, MessageSquareText, HeadsetIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      title: "Escolha um serviço",
      description:
        "Navegue pela nossa loja e selecione o serviço que melhor atende às suas necessidades.",
    },
    {
      icon: MessageSquareText,
      title: "Finalize a contratação",
      description:
        "Revise o resumo do pedido e finalize a contratação no carrinho.",
    },
    {
      icon: HeadsetIcon,
      title: "Nossa equipe entra em contato para alinhar e iniciar",
      description:
        "Até 24h entraremos em contato para alinhar os próximos passos.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  };
  return (
    <section className="py-10 px-2 sm:px-4 md:px-8 lg:px-20 xl:px-32 2xl:px-64 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-semibold mb-12 text-[#1a1a1a]">
        Como{" "}
        <span className="--font-roboto font-bold text-[#8338ec]">Funciona</span>
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => {
          const bgColors = [
            "var(--color-laranja)",
            "var(--color-roxo)",
            "var(--color-verde)",
          ];
          const bgColor = bgColors[index % bgColors.length];
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center md:items-center md:text-center mb-0 bg-[#fffcf9] shadow-md rounded-xl p-6 min-h-55 min-w-65 w-full"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 mb-4 md:mb-0 md:mr-6 rounded-full"
                style={{ background: bgColor }}
                variants={iconVariants}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 max-w-md mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
