"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    question: "Quanto tempo leva pra ver resultado?",
    answer: "[RESPOSTA]",
  },
  {
    question: "Preciso ter uma equipe própria de marketing?",
    answer: "[RESPOSTA]",
  },
  {
    question: "Funciona pra restaurante que só trabalha com delivery, ou só salão também?",
    answer: "[RESPOSTA]",
  },
  {
    question: "O Painel do Gestor substitui o sistema que eu já uso?",
    answer: "[RESPOSTA]",
  },
  {
    question: "Tem contrato de fidelidade / tempo mínimo?",
    answer: "[RESPOSTA]",
  },
  {
    question: "Quanto custa?",
    answer: "[RESPOSTA]",
  },
]

export function SocialSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-20 bg-[#121212] overflow-hidden border-t border-white/5">
      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block font-mono text-[#FF6B35] text-xs tracking-[0.25em] uppercase mb-2 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            PERGUNTAS FREQUENTES
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Tire Suas Dúvidas
          </h2>

          <div className="w-12 h-1 bg-[#FF6B35] mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#FF6B35]/50"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-white text-base md:text-lg pr-2">
                    {item.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-[#FF6B35] text-white" : "bg-white/5 text-white/70"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-white/70 font-mono text-sm leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

