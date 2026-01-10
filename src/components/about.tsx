"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-16 px-6 bg-linear-to-b from-pink-50 to-white w-full">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Quem está por trás da{" "}
          <span className="text-purple-700">Connective</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* BEATRIZ SALVIANO */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-64 bg-linear-to-br from-orange-100 to-orange-50 flex items-center justify-center">
              <motion.div
                className="w-48 h-48 bg-orange-400 rounded-full flex items-center justify-center text-white text-6xl font-bold"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                AB
              </motion.div>
            </div>
            <div className="p-6">
              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Ana Beatriz
              </motion.h3>
              <motion.p
                className="text-purple-600 font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CEO e Fundadora
              </motion.p>
            </div>
          </motion.div>

          {/* CLARA */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="h-64 bg-linear-to-br from-purple-100 to-purple-50 flex items-center justify-center">
              <motion.div
                className="w-48 h-48 bg-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                C
              </motion.div>
            </div>
            <div className="p-6">
              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Clara
              </motion.h3>
              <motion.p
                className="text-purple-600 font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CEO e Fundadora
              </motion.p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-gray-700 space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-lg leading-relaxed">
            A Connective é liderada por{" "}
            <span className="font-semibold">Ana Beatriz e Clara</span>, CEOs e
            fundadoras da agência. Com olhar estratégico, sensibilidade criativa
            e experiência prática no mercado digital, as CEOs da Connective unem
            branding, marketing e direção criativa para construir marcas
            autênticas, bem posicionadas e preparadas para crescer de forma
            estruturada.
          </p>

          <p className="text-lg leading-relaxed">
            Mais do que executar projetos, a liderança da Connective acredita em{" "}
            <span className="font-semibold">
              relacionamento, estratégia e construção conjunta
            </span>
            , acompanhando cada cliente de forma próxima e personalizada.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
        </motion.div>
      </div>
    </section>
  );
}
