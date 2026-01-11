"use client";

import { useEffect, useState } from "react";

type ServicePublic = {
  id?: number | string;
  name: string;
  description?: string | null;
  price?: number | string | null;
  formatted_price?: string | null;
  color?: string | null;
};

export default function Services() {
  const [services, setServices] = useState<ServicePublic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        const list = data?.services ?? data ?? [];
        if (mounted) setServices(list);
      } catch (e) {
        console.error("Deu erro para carregar os servicos:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchServices();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-10 px-2 sm:px-4 md:px-8 lg:px-20 xl:px-32 2xl:px-64 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl md:text-3xl font-semibold mb-8 text-[#1a1a1a]">
        Nossos <span className="font-bold text-(--color-roxo)">Serviços</span>
      </h2>

      <div>
        {loading ? (
          <p className="text-sm text-[#666]">Carregando serviços...</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-[#666]">Nenhum serviço disponível.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 md:gap-8 xl:gap-12">
            {services.map((item: any) => (
              <div
                key={item.id ?? item.name}
                className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white border border-gray-100 min-h-30 md:min-h-35 xl:min-h-40 w-full max-w-150"
              >
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: item.color ?? "transparent" }}
                />
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#666] mt-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <span className="text-xl font-bold">
                      {item.price !== undefined && item.price !== null
                        ? typeof item.price === "number"
                          ? item.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : !isNaN(Number(item.price))
                          ? Number(item.price).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : item.formatted_price ?? ""
                        : item.formatted_price ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
