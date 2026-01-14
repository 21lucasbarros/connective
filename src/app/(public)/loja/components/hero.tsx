"use client";

import { Button } from "@/components/ui/button";
import ColorBar from "../../../../components/color-bar";

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white overflow-hidden">
      <div className="flex-1 flex flex-col gap-5 max-w-full md:max-w-xl z-10 text-center md:text-left">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-light leading-tight relative wrap-break-word">
          <span className="--font-roboto text-(--color-roxo)">
            Serviços <span className="font-bold">criativos</span> que
          </span>
          <br />
          <span className="whitespace-nowrap">
            <span className="font-bold text-(--color-laranja)">
              conectam marcas
            </span>{" "}
            à sua essência
          </span>
        </h2>
        <p className="text-base md:text-lg text-zinc-700">
          Branding, identidade visual e estratégia com atendimento humano e
          personalizado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button
            className="bg-(--color-laranja) hover:bg-[#d94e2b] text-white text-base font-semibold px-8 py-6 rounded-md shadow transition-transform duration-200 hover:scale-105"
            type="button"
          >
            Contratar um serviço
          </Button>
          <Button
            className="bg-(--color-roxo) hover:bg-[#6c5fc7] text-white text-base font-semibold px-8 py-6 rounded-md shadow transition-transform duration-200 hover:scale-105"
            type="button"
          >
            Falar com a Connective
          </Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center z-0 relative w-full mt-6 md:mt-0">
        <div className="w-full max-w-65 xs:max-w-[300px] sm:max-w-xs md:max-w-sm relative">
          <img
            src="/assets/connective.jpg"
            alt="Ana Beatriz Salviano e Clara, fundadoras da Connective"
            className="w-full h-auto rounded-xl object-cover hero-img-mask"
          />
        </div>
      </div>
      <ColorBar blocks={15} />
    </section>
  );
}
