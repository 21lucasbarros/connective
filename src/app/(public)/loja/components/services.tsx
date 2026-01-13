"use client";

import { useEffect, useState } from "react";
import ServicesCard from "./services-card";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

type ServicePublic = {
  id?: number | string;
  name: string;
  description?: string | null;
  price?: number | string | null;
  formatted_price?: string | null;
  color?: string | null;
  features?: string[];
};

// Paleta de cores da marca
const BRAND_COLORS = ["#fc5735", "#8338ec", "#43bccd", "#43bccd", "#fffcf9"];

// Função para atribuir cores ciclicamente
const assignColor = (index: number): string => {
  return BRAND_COLORS[index % BRAND_COLORS.length];
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
        let list = data?.services ?? data ?? [];

        // Atribui cores aos serviços que não possuem
        list = list.map((service: ServicePublic, index: number) => ({
          ...service,
          color: service.color || assignColor(index),
        }));

        if (mounted) setServices(list);
      } catch (e) {
        console.error("Erro ao carregar os serviços:", e);
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
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 2xl:px-64 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-semibold mb-12 text-center text-[#1a1a1a]">
          Nossos <span className="font-bold text-[#8338ec]">Serviços</span>
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <Spinner className="mx-auto w-12 h-12 text-[#8338ec]" />
            <p className="mt-4 text-gray-600">Carregando serviços...</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white"
                >
                  <div className="h-40 w-full p-6 flex flex-col justify-center relative">
                    <Skeleton className="h-8 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-4">
                        <Skeleton className="h-3 w-24" />
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          <Skeleton className="h-8 w-32 mt-2" />
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-6">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </div>

                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            Nenhum serviço disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServicesCard
                key={service.id ?? `${service.name}-${index}`}
                name={service.name}
                description={service.description}
                price={service.price}
                formatted_price={service.formatted_price}
                color={service.color || assignColor(index)}
                features={service.features}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
