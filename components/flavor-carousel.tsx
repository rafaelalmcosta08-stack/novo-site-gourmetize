"use client"

import type React from "react"

import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react"

const flavors = [
  {
    id: 1,
    badge: "DESIGN & ENGENHARIA",
    subtitle: "Método Exclusivo Gourmetize",
    name: "ENGENHARIA DE CARDÁPIO DE ALTA CONVERSÃO",
    fullCardImage: "https://res.cloudinary.com/epo1w9hl/image/upload/v1784942089/digital_menu_feature_section_iwr80m.png",
    fullCardImageMobile: "https://res.cloudinary.com/epo1w9hl/image/upload/v1784948490/digital_menu_feature_section_2_siou31.png",
    image: "/images/drink2.png",
    bgColor: "from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent",
    accentColor: "#f59e0b",
    features: [
      {
        title: "Design Gastronômico Desejável:",
        desc: "Apresentação visual com fotos de altíssimo impacto, descrições apetitosas e organização psicológica de itens."
      },
      {
        title: "Destaque nos Pratos de Maior Margem:",
        desc: "Posicionamento estratégico dos seus produtos \"Estrela\" para induzir a escolha dos pratos mais lucrativos para a cozinha."
      },
      {
        title: "Ancoragem e Venda Casada (Upsell):",
        desc: "Inclusão inteligente de adicionais, bebidas e sobremesas que aumentam o valor médio de cada pedido sem esforço."
      }
    ]
  },
  {
    id: 2,
    badge: "TRÁFEGO & ATRAÇÃO",
    subtitle: "Método Exclusivo Gourmetize",
    name: "GESTÃO DE TRÁFEGO PAGO PARA RESTAURANTES",
    fullCardImage: "https://res.cloudinary.com/epo1w9hl/image/upload/v1784948142/premium_management_hybrid_section_v2_2_rhu0ks.png",
    fullCardImageMobile: "https://res.cloudinary.com/epo1w9hl/image/upload/v1784948462/premium_management_hybrid_section_v2_3_doxlez.png",
    image: "/images/drink1.png",
    bgColor: "from-[#84cc16]/15 via-[#84cc16]/5 to-transparent",
    accentColor: "#84cc16",
    features: [
      {
        title: "Atração de Clientes Qualificados:",
        desc: "Anúncios geolocalizados no Instagram e Google direcionando clientes famintos para o seu restaurante."
      },
      {
        title: "Campanhas nos Horários de Pico:",
        desc: "Injeção estratégica de anúncios nos horários de almoço e jantar para alavancar os pedidos."
      },
      {
        title: "Métricas e Retorno Previsível:",
        desc: "Relatórios transparentes demonstrando exatamente quantas vendas e leads foram gerados."
      }
    ]
  },
  {
    id: 3,
    badge: "BRANDING & FOTOS",
    subtitle: "Método Exclusivo Gourmetize",
    name: "FOTOGRAFIA & POSICIONAMENTO DE MARCA",
    fullCardImage: "https://res.cloudinary.com/epo1w9hl/image/upload/v1784949278/whatsapp_sales_machine_desktop_section_gyade0.png",
    fullCardImageMobile: "https://res.cloudinary.com/epo1w9hl/image/upload/v1784949287/premium_management_hybrid_section_v2_4_y2ttzi.png",
    image: "/mystery-energy-drink-can-silhouette.jpg",
    bgColor: "from-[#00D4FF]/15 via-[#00D4FF]/5 to-transparent",
    accentColor: "#00D4FF",
    features: [
      {
        title: "Fotografia Gastronômica Desejável:",
        desc: "Sessões fotográficas com produção culinária focada em gerar desejo imediato."
      },
      {
        title: "Valorização da Marca:",
        desc: "Construção de autoridade visual para o seu restaurante se destacar da concorrência."
      },
      {
        title: "Acervo para Redes e iFood:",
        desc: "Material visual completo para uso em cardápios digitais, redes sociais e anúncios."
      }
    ]
  }
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
}

export function FlavorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])
  const currentFlavor = flavors[currentIndex]

  // Preload all slide images to prevent image loading white flash
  useEffect(() => {
    flavors.forEach((flavor) => {
      if (flavor.fullCardImage) {
        const img = new window.Image()
        img.src = flavor.fullCardImage
      }
      if (flavor.fullCardImageMobile) {
        const imgMobile = new window.Image()
        imgMobile.src = flavor.fullCardImageMobile
      }
    })
  }, [])

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(x * 3)
    rotateX.set(-y * 3)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    rotateX.set(0)
    rotateY.set(0)
    const newIndex = (currentIndex + newDirection + flavors.length) % flavors.length
    setCurrentIndex(newIndex)
    setPage([page + newDirection, newDirection])
  }

  const nextFlavor = () => paginate(1)
  const prevFlavor = () => paginate(-1)

  return (
    <section id="flavours" className="relative py-16 bg-white overflow-hidden">
      {/* Seamless background gradient cross-fade without unmounting */}
      {flavors.map((flavor, index) => (
        <div
          key={flavor.id}
          className={`absolute inset-0 bg-gradient-to-br ${flavor.bgColor} transition-opacity duration-500 ease-in-out pointer-events-none`}
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 max-w-5xl mx-auto px-4"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#121212] tracking-tighter leading-[1.02] text-center max-w-5xl mx-auto pt-2 pb-1">
            <motion.span
              className="inline-block pt-1 pb-1"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              SOLUÇÕES DE ALTO IMPACTO{" "}
            </motion.span>{" "}
            <motion.span
              className="inline-block text-[#AFFF00] pt-1 pb-1"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              PARA O SEU RESTAURANTE
            </motion.span>{" "}
            <motion.span
              className="inline-block pt-1 pb-1"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            >
              VENDER MAIS.
            </motion.span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={prevFlavor}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="relative w-full max-w-5xl lg:max-w-6xl min-h-[300px]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentFlavor.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <motion.div
                    className={`bg-[#0d1217] rounded-3xl border-2 border-[#121212]/10 shadow-xl overflow-hidden ${currentFlavor.fullCardImage ? "p-0" : "p-6 md:p-8"}`}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                  {currentFlavor.fullCardImage ? (
                    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0d1217]">
                      <picture className="block w-full">
                        {currentFlavor.fullCardImageMobile && (
                          <source
                            media="(max-width: 767px)"
                            srcSet={currentFlavor.fullCardImageMobile}
                          />
                        )}
                        <img
                          src={currentFlavor.fullCardImage}
                          alt={currentFlavor.name}
                          className="w-full h-auto object-cover rounded-3xl block min-h-[220px]"
                        />
                      </picture>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-12 gap-6 items-center bg-white p-6 md:p-8">
                      <motion.div
                        className="md:col-span-5 relative aspect-[3/4] flex items-center justify-center min-h-[220px]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Image
                          src={currentFlavor.image || "/placeholder.svg"}
                          alt={currentFlavor.name}
                          fill
                          className="object-contain"
                        />
                      </motion.div>

                      <div className="md:col-span-7 space-y-3.5">
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="bg-[#f59e0b] text-black font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                            {currentFlavor.badge}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#121212]/80 font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {currentFlavor.subtitle}
                          </span>
                        </div>

                        {/* Main Title */}
                        <motion.h3
                          className="text-2xl md:text-3xl font-black text-[#121212] tracking-tighter leading-tight"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        >
                          {currentFlavor.name}
                        </motion.h3>

                        {/* Dark Feature Boxes */}
                        <div className="space-y-2.5 pt-1">
                          {currentFlavor.features.map((feat, idx) => (
                            <motion.div
                              key={idx}
                              className="bg-[#121212] text-white p-3.5 md:p-4 rounded-xl border border-white/10 shadow-md flex items-start gap-3"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + idx * 0.08 }}
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-amber-500/90 bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-amber-500 stroke-[3]" />
                              </div>
                              <div className="text-xs md:text-[13px] leading-relaxed">
                                <span className="font-bold text-white mr-1.5">{feat.title}</span>
                                <span className="text-gray-300 font-normal">{feat.desc}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

            <motion.button
              onClick={nextFlavor}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex md:hidden justify-center gap-4 mt-6">
            <motion.button
              onClick={prevFlavor}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={nextFlavor}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {flavors.map((flavor, index) => (
              <motion.button
                key={flavor.id}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  rotateX.set(0)
                  rotateY.set(0)
                  setCurrentIndex(index)
                  setPage([index, newDirection])
                }}
                className="h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? flavor.accentColor : "#12121220",
                }}
                animate={{
                  width: index === currentIndex ? 28 : 10,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

