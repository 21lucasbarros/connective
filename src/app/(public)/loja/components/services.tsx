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
              className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white border border-gray-100 min-h-[340px] md:min-h-[370px] xl:min-h-[400px] w-full max-w-full"
            >
              <div
                className="flex flex-col md:flex-row items-start justify-between p-4 md:p-6 gap-2 md:gap-0"
                style={{ background: item.color }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 truncate">
                    {item.name}
                  </h3>
                  <p className="text-white text-sm sm:text-base opacity-90 mb-0 truncate">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-white p-4 md:p-6">
                <div className="mb-4">
                  <div className="text-left">
                    <span className="block text-gray-400 text-xs sm:text-sm line-through mb-1">
                      A partir de
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a]">
                      {item.price}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-left">
                    <li className="flex items-center gap-2 text-gray-700 text-xs sm:text-base">
                      <span
                        className="text-lg sm:text-xl"
                        style={{ color: item.color }}
                      >
                        ✔
                      </span>
                      Atendimento personalizado
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-xs sm:text-base">
                      <span
                        className="text-lg sm:text-xl"
                        style={{ color: item.color }}
                      >
                        ✔
                      </span>
                      Resultado prático e rápido
                    </li>
                  </ul>
                </div>
                <button
                  className="w-full py-2 sm:py-3 rounded-lg font-bold text-white text-base sm:text-lg mt-2 transition-transform duration-200 hover:scale-105"
                  style={{ background: item.color }}
                >
                  Contratar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
