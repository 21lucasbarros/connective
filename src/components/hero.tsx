"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import ColorBar from "@/app/(public)/loja/components/color-bar";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20 relative">
      <div className="max-w-7xl mx-auto pl-4 pr-6 md:pl-6 md:pr-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex flex-col gap-6 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-semibold leading-tight text-[#1a1a1a]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#8338ec] font-bold">Connective</span> é uma
              agência criativa especialista em{" "}
              <span className="text-[#fc5735]">branding</span>,{" "}
              <span className="text-[#fc5735]">identidade visual</span> e{" "}
              <span className="text-[#fc5735]">estratégia digital</span>.
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-zinc-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Acreditamos que marcas fortes não nascem por acaso. Elas são
              construídas com intenção, clareza e direção estratégica. Por isso,
              cada projeto da Connective começa entendendo a essência da marca,
              seu momento e seus objetivos, para então transformar isso em
              comunicação visual e posicionamento consistente no digital.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                className="w-fit bg-[#fc5735] hover:bg-[#d94e2b] text-white text-base font-semibold px-8 py-6 rounded-md shadow transition-transform duration-200 hover:scale-105"
                type="button"
              >
                Quero crescer minha empresa no digital
              </Button>
            </motion.div>
          </motion.div>

          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full h-125">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute top-0 right-0 bg-linear-to-br from-[#fc5735] to-[#d94e2b] p-6 rounded-2xl shadow-2xl w-64 transform rotate-3 hover:rotate-0 transition-transform duration-300"
              >
                <Sparkles className="w-8 h-8 text-white mb-3" />
                <h3 className="text-white font-bold text-2xl mb-2">+150</h3>
                <p className="text-white/90 text-sm">
                  Projetos entregues com excelência
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute top-32 left-0 bg-linear-to-br from-[#8338ec] to-[#6a28cc] p-6 rounded-2xl shadow-2xl w-64 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              >
                <Zap className="w-8 h-8 text-white mb-3" />
                <h3 className="text-white font-bold text-2xl mb-2">100%</h3>
                <p className="text-white/90 text-sm">
                  Foco em resultados mensuráveis
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute bottom-0 right-8 bg-linear-to-br from-[#43bccd] to-[#2a8ba0] p-6 rounded-2xl shadow-2xl w-64 transform rotate-2 hover:rotate-0 transition-transform duration-300"
              >
                <Target className="w-8 h-8 text-white mb-3" />
                <h3 className="text-white font-bold text-2xl mb-2">360°</h3>
                <p className="text-white/90 text-sm">
                  Estratégia completa para sua marca
                </p>
              </motion.div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#ffbe0b]/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/3 right-0 w-48 h-48 bg-[#06ffa5]/10 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      <ColorBar blocks={15} />
    </section>
  );
}
