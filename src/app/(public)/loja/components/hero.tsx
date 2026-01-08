import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-35 py-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white">
      <div className="flex-1 flex flex-col gap-6 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-light leading-tight">
          <span className="text-(--color-roxo)">
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
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs md:max-w-sm">
          <img
            src="/hero-woman.png"
            alt="Mulher sorrindo, representando atendimento personalizado"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
