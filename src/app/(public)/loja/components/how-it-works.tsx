"use client";

import { Calendar, MessageSquareText, HeadsetIcon } from "lucide-react";

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
  return (
    <section className="py-10 px-2 sm:px-4 md:px-8 lg:px-20 xl:px-32 2xl:px-64 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-semibold mb-12 text-[#1a1a1a]">
        Como <span className="font-bold text-[#8338ec]">Funciona</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start">
        {steps.map((step, index) => {
          const bgColors = [
            "var(--color-laranja)",
            "var(--color-roxo)",
            "var(--color-verde)",
          ];
          const bgColor = bgColors[index % bgColors.length];
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center md:items-center md:text-center mb-0 bg-[#fffcf9] shadow-md rounded-xl p-6 min-h-55 min-w-65 w-full"
            >
              <div
                className="flex items-center justify-center w-12 h-12 mb-4 md:mb-0 md:mr-6 rounded-full"
                style={{ background: bgColor }}
              >
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 max-w-md mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
