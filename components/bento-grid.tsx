"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const partnerLogos = [
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952732/attachment_50036846-removebg-preview_-_Copia_pfriq0.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952733/bnmbn-removebg-preview_sfpjaj.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952733/bcvb-removebg-preview_ev3ane.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952734/cfghf-removebg-preview_tmpcaj.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952735/fullsize_2011_10_18_00_WDL-Logo-7724_4067_041531279_1177354161-removebg-preview_mzz35y.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952734/%C3%A7kl%C3%A7k-removebg-preview_te5uxl.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952732/bnmbn-removebg-preview_-_Copia_ixhx8c.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952735/tdr-removebg-preview_wm2s99.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952735/l%C3%A7k-removebg-preview_z3adyw.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952736/vmvmv-removebg-preview_xjuzrm.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952735/l%C3%A7_l%C3%A7-removebg-preview_cpmp9i.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952735/mbnmb-removebg-preview_lbphdu.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952735/images-removebg-preview_uqyogh.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952737/zxcz-removebg-preview_vldkyq.png",
  "https://res.cloudinary.com/epo1w9hl/image/upload/v1784952737/ytryr-removebg-preview_uxcbqr.png",
]

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="formula" className="relative py-16 bg-[#121212] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#121212]" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 px-6"
        >
          <motion.span
            className="inline-block font-mono text-[#AFFF00] text-[10px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
          >
            GOURMETIZE
          </motion.span>

          <div className="overflow-hidden mt-2">
            <motion.h2
              className="text-3xl md:text-4xl font-black text-white tracking-tight"
              initial={{ y: 60 }}
              animate={isInView ? { y: 0 } : { y: 60 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
            >
              Clientes Parceiros
            </motion.h2>
          </div>

          {/* Animated underline */}
          <motion.div
            className="h-[2px] w-12 bg-[#AFFF00] mx-auto mt-3 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </motion.div>

        {/* Marquee Row */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left & Right subtle edge fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#121212] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#121212] to-transparent z-20 pointer-events-none" />

          {/* Infinite Track */}
          <motion.div
            className="flex gap-4 sm:gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            }}
          >
            {[...partnerLogos, ...partnerLogos].map((logoUrl, index) => (
              <div
                key={index}
                className="w-52 sm:w-64 md:w-72 h-32 sm:h-40 md:h-44 flex-shrink-0 bg-white rounded-2xl p-3 border border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden group"
              >
                <img
                  src={logoUrl}
                  alt={`Cliente Parceiro ${(index % partnerLogos.length) + 1}`}
                  className="max-h-full max-w-full object-contain p-1 select-none group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

