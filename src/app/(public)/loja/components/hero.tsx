"use client";

import { Button } from "@/components/ui/button";
import ColorBar from "../../../../components/color-bar";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const imageVariant = {
  hidden: { scale: 1.1, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2 },
  },
};

const decorVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 0.6,
    scale: 1,
    transition: { duration: 1.5 },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen md:min-h-175 lg:min-h-187.5 xl:min-h-200 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 md:py-16 lg:py-20 xl:py-24 flex flex-col md:flex-row md:items-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] lg:w-[50%] xl:w-[48%] hidden md:block">
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(249,250,251,0.04) 35%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(249,250,251,0.03) 100%)",
            }}
          />

          <div
            className="absolute left-0 w-12 sm:w-14 md:w-16 lg:w-20 pointer-events-none"
            style={{
              zIndex: 0,
              top: 0,
              bottom: 64,
              background:
                "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 100%)",
            }}
          />

          <motion.img
            src="/assets/connective.jpg"
            alt="Ana Beatriz Salviano e Clara, fundadoras da Connective"
            className="w-full h-full object-cover object-center scale-105 md:scale-100"
            variants={imageVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          />

          <motion.div
            className="absolute top-20 right-20 w-32 h-32 md:w-40 md:h-40 bg-purple-300/10 rounded-full blur-3xl"
            variants={decorVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          />

          <motion.div
            className="absolute bottom-32 right-10 w-40 h-40 md:w-56 md:h-56 bg-orange-300/10 rounded-full blur-3xl"
            variants={decorVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          />
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto md:mb-0 mb-8">
        <motion.div
          className="flex flex-col gap-4 md:gap-6 max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.15] relative">
            <motion.span className="block text-[#8338ec]" variants={fadeUp}>
              Criatividade que une, transforma e dá resultado.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-xl text-gray-600 leading-relaxed max-w-lg"
            variants={fadeUp}
          >
            Branding, identidade visual e estratégia com atendimento humano e
            personalizado.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 md:mt-4"
            variants={fadeUp}
          >
            <Button
              className="group bg-orange-500 hover:bg-orange-600 text-white text-sm md:text-base font-semibold px-6 md:px-8 py-5 md:py-6 rounded-lg shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1"
              type="button"
            >
              Contratar um serviço
              <svg
                className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>

            <Button
              className="group bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base font-semibold px-6 md:px-8 py-5 md:py-6 rounded-lg shadow-lg shadow-purple-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/40 hover:-translate-y-1"
              type="button"
            >
              Falar com a Connective
              <svg
                className="inline-block ml-2 w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-600"
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Atendimento personalizado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Resultados comprovados</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="block md:hidden w-full relative z-20"
        variants={imageVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
          <motion.img
            src="/assets/connective.jpg"
            alt="Ana Beatriz Salviano e Clara, fundadoras da Connective"
            className="w-full h-112.5 sm:h-125 object-cover object-center"
          />

          <div className="absolute right-4 bottom-4 z-30">
            <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Fundadoras da Connective
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Ana Beatriz Salviano & Clara Torres
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hidden lg:block absolute bottom-20 xl:bottom-24 right-8 xl:right-12 z-20"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 xl:px-5 py-3 xl:py-4 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 xl:w-3 xl:h-3 bg-green-500 rounded-full animate-pulse" />
            <div>
              <p className="text-xs xl:text-sm font-semibold text-gray-800">
                Fundadoras da Connective
              </p>
              <p className="text-[10px] xl:text-xs text-gray-500">
                Ana Beatriz Salviano & Clara Torres
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <ColorBar blocks={15} />
    </section>
  );
}
