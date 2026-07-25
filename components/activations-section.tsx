"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { LayoutDashboard, Globe, QrCode } from "lucide-react"

const portfolioItems = [
  {
    icon: LayoutDashboard,
    title: "Painel do Gestor",
    description:
      "Controle financeiro, entregas e clientes em um só painel. Veja o Painel do Gestor funcionando com dados de exemplo.",
    cta: "Ver Demonstração",
  },
  {
    icon: Globe,
    title: "Landing Page para Restaurantes",
    description:
      "Uma página própria pra captar reserva e pedido direto, sem depender só de marketplace.",
    cta: "Ver Modelo",
  },
  {
    icon: QrCode,
    title: "Cardápio Digital",
    description:
      "Cardápio online com QR code, atualizado por você, sem custo de impressão.",
    cta: "Ver Exemplo",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function ActivationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="portfolio" className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block font-mono text-[#121212]/60 text-xs tracking-[0.25em] uppercase mb-2 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            PORTFÓLIO
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#121212] tracking-tighter max-w-4xl mx-auto leading-tight">
            Veja como funciona na prática, antes de contratar
          </h2>

          <div className="w-12 h-1 bg-[#AFFF00] mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="group bg-[#121212] rounded-2xl p-6 md:p-8 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]"
            >
              <motion.div
                className="absolute inset-0 bg-[#AFFF00]/0 group-hover:bg-[#AFFF00]"
                transition={{ duration: 0.4 }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-[#AFFF00] flex items-center justify-center mb-5 group-hover:bg-[#121212] transition-colors duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon className="w-6 h-6 text-[#121212] group-hover:text-[#AFFF00] transition-colors duration-300" />
                  </motion.div>

                  <h3 className="text-xl font-black text-white group-hover:text-[#121212] tracking-tight mb-3 transition-colors duration-300 leading-snug min-h-[56px] flex items-start">
                    {item.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-[#121212]/80 font-mono text-xs leading-relaxed mb-6 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                <motion.button
                  className="flex items-center gap-2 text-[#AFFF00] group-hover:text-[#121212] font-bold text-xs tracking-wide transition-colors duration-300 mt-auto pt-4 border-t border-white/10 group-hover:border-[#121212]/20"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {item.cta}
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

