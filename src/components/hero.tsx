import ColorBar from "@/app/(public)/loja/components/color-bar";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-10xl mx-auto px-6">
        <div className="max-w-6xl flex flex-col gap-6 text-left px-35">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#1a1a1a]">
            <span className="text-[#8338ec] font-bold">Connective</span> é uma
            agência criativa especialista em{" "}
            <span className="text-[#fc5735]">branding</span>,{" "}
            <span className="text-[#fc5735]">identidade visual</span> e{" "}
            <span className="text-[#fc5735]">estratégia digital</span>.
          </h1>
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
            Acreditamos que marcas fortes não nascem por acaso. Elas são
            construídas com intenção, clareza e direção estratégica. Por isso,
            cada projeto da Connective começa entendendo a essência da marca,
            seu momento e seus objetivos, para então transformar isso em
            comunicação visual e posicionamento consistente no digital.
          </p>
          <Button
            className="w-fit bg-[#fc5735] hover:bg-[#d94e2b] text-white text-base font-semibold px-8 py-6 rouded-md shadow transition-transform duration-200 hover:scale-105"
            type="button"
          >
            Quero crescer minha empresa no digital
          </Button>
        </div>
      </div>
      <ColorBar blocks={15} />
    </section>
  );
}
