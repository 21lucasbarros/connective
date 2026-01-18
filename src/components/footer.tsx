"use client";

import { Instagram, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fffcf9] border-t border-[#43bccd]/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-10">
          {/* Sobre */}
          <div>
            <h2 className="font-roboto text-3xl font-bold text-purple-600 mb-4">
              Connective
            </h2>
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              Criatividade que une, transforma e da resultado!
            </p>
            <Button
              asChild
              className="bg-[#fc5735] hover:bg-[#fc5735]/90 text-white"
            >
              <a
                href="https://www.instagram.com/connective.ag/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Siga no Instagram
              </a>
            </Button>
          </div>

          {/* Navegação e Contato */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[#fc5735] font-semibold mb-3 text-sm uppercase tracking-wider">
                Navegação
              </h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-700 hover:text-[#fc5735] transition-colors text-sm"
                >
                  Início
                </Link>
                <Link
                  href="/loja"
                  className="block text-gray-700 hover:text-[#fc5735] transition-colors text-sm"
                >
                  Loja
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-[#fc5735] font-semibold mb-3 text-sm uppercase tracking-wider">
                Contato
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:connective.socialmedia@gmail.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#fc5735] transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 text-[#ffba08] group-hover:text-[#fc5735] transition-colors" />
                  connective.socialmedia@gmail.com
                </a>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <MapPin className="w-4 h-4 text-[#43bccd]" />
                  Itanhaém, São Paulo
                </div>
              </div>
            </div>
          </div>

          {/* Horário */}
          <div>
            <h3 className="text-[#fc5735] font-semibold mb-3 text-sm uppercase tracking-wider">
              Horário de Atendimento
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#43bccd] mt-1 shrink-0" />
                <div>
                  <p className="text-gray-700 text-sm font-medium">
                    Segunda a Sexta
                  </p>
                  <p className="text-gray-500 text-sm">9h às 18h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#43bccd] mt-1 shrink-0" />
                <div>
                  <p className="text-gray-700 text-sm font-medium">Sábado</p>
                  <p className="text-gray-500 text-sm">9h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6 bg-linear-to-r from-[#fc5735]/30 via-[#8338ec]/30 to-[#43bccd]/30" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© {currentYear} Connective. Todos os direitos reservados.</p>
          <p>
            Feito por{" "}
            <a
              href="https://vpotech.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-roboto text-[#8338ec] hover:text-[#fc5735] font-semibold transition-colors"
            >
              VPO Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
