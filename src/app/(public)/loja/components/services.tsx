export default function Services() {
  const servicesItems = [
    {
      name: "Consultoria Express",
      description: "Sessão rápida para dúvidas e orientação estratégica.",
      price: "R$ 120,00",
      color: "var(--color-laranja)",
    },
    {
      name: "Diagnóstico de Instagram",
      description: "Análise do perfil e dicas para melhorar resultados.",
      price: "R$ 150,00",
      color: "var(--color-roxo)",
    },
    {
      name: "Ajuste de Bio",
      description: "Bio otimizada para atrair o público certo.",
      price: "R$ 60,00",
      color: "var(--color-verde)",
    },
    {
      name: "Identidade Visual Básica",
      description: "Logo simples, paleta de cores e tipografia.",
      price: "R$ 250,00",
      color: "var(--color-roxo)",
    },
  ];
  return (
    <section className="py-10 px-2 sm:px-4 md:px-8 lg:px-20 xl:px-32 2xl:px-64 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl md:text-3xl font-semibold mb-8 text-[#1a1a1a]">
        Nossos <span className="font-bold text-(--color-roxo)">Serviços</span>
      </h2>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 md:gap-8 xl:gap-12">
          {servicesItems.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white border border-gray-100 min-h-30 md:min-h-35 xl:min-h-40 w-full max-w-150"
            >
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
