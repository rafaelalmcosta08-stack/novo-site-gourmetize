"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle2, ShieldCheck, AlertTriangle, Sparkles, Check } from "lucide-react"
import { useState, useRef } from "react"
import { saveLead, formatSegmento } from "@/lib/leads-store"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const formItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function LeadFormSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    segmento: "",
    faturamento: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [formAlert, setFormAlert] = useState<string | null>(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const validate = (data = formData) => {
    const newErrors: Record<string, string> = {}

    if (!data.nome.trim()) {
      newErrors.nome = "Por favor, informe o seu nome."
    }

    if (!data.email.trim()) {
      newErrors.email = "Por favor, informe seu e-mail."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Inclua um '@' e domínio válido no e-mail (ex: nome@empresa.com)."
    }

    const unformattedPhone = data.telefone.replace(/\D/g, "")
    if (!data.telefone.trim()) {
      newErrors.telefone = "Por favor, informe seu WhatsApp."
    } else if (unformattedPhone.length < 10) {
      newErrors.telefone = "Informe um número com DDD completo (ex: (11) 99999-8888)."
    }

    if (!data.empresa.trim()) {
      newErrors.empresa = "Informe o nome do seu restaurante ou empresa."
    }

    if (!data.segmento) {
      newErrors.segmento = "Selecione o segmento do seu restaurante."
    }

    if (!data.faturamento) {
      newErrors.faturamento = "Selecione o faturamento mensal atual."
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setFormAlert("Por favor, preencha todos os campos obrigatórios em destaque.")
      return
    }

    setErrors({})
    setFormAlert(null)
    setSubmittedSuccess(true)

    // Save submission to Dashboard store & Supabase
    await saveLead({
      restaurante: formData.empresa,
      contato: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      segmento: formatSegmento(formData.segmento),
      faturamento: formData.faturamento,
      servico: formatSegmento(formData.segmento) || 'Análise Gratuita',
    })

    const whatsappMessage = `Olá! Vim pelo site e gostaria de receber uma análise gratuita.

📌 *Dados da Solicitação:*
• *Nome:* ${formData.nome}
• *E-mail:* ${formData.email}
• *Telefone:* ${formData.telefone}
• *Empresa/Restaurante:* ${formData.empresa}
• *Segmento:* ${formData.segmento}
• *Faturamento Atual:* ${formData.faturamento}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/5519988864646?text=${encodedMessage}`

    // Open WhatsApp in a new tab / redirect
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank")
    }
  }

  return (
    <section id="formulario" ref={ref} className="relative py-24 bg-[#121212] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="inline-block bg-[#AFFF00] text-[#121212] px-3 py-1 rounded-sm font-bold text-sm tracking-wider uppercase">
                Aviso
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                NÃO SAIA AGORA!<br />
                FALTAM <span className="text-[#AFFF00]">POUCOS SEGUNDOS</span> PARA SEU RESTAURANTE MUDAR.
              </motion.h2>
            </div>

            <div className="space-y-6 pt-4">
              {/* Step 1 */}
              <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#AFFF00] text-[#121212] flex items-center justify-center font-bold text-xl shrink-0">
                    1
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Complete o formulário</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Forneça suas informações no formulário ao lado. Garantimos a segurança total de seus dados. Serão usados apenas para contato oficial da Assessoria Gourmetize.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#AFFF00] text-[#121212] flex items-center justify-center font-bold text-xl shrink-0">
                    2
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Receba uma ligação personalizada</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Em um prazo de até <span className="text-[#AFFF00] font-bold">5 minutos</span> em horário comercial, um dos nossos especialistas em marketing gastronômico entrará em contato diretamente para agendar a reunião mais importante com você.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4 text-sm text-white/40 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#AFFF00]" />
                Dados 100% Protegidos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#AFFF00]" />
                Sem Compromisso
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="bg-[#1a1a1a] rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl relative">
              <motion.div variants={formItemVariants} className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Solicitar Análise Gratuita</h3>
                <p className="text-white/50 text-sm">
                  Descubra como multiplicar o faturamento do seu restaurante
                </p>
              </motion.div>

              {submittedSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#AFFF00]/10 border-2 border-[#AFFF00] rounded-2xl p-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-[#AFFF00] text-[#121212] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#AFFF00]/20">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Solicitação Enviada!</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Recebemos seus dados com sucesso! Você está sendo redirecionado para o nosso WhatsApp.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/5519988864646?text=${encodeURIComponent(
                        `Olá! Vim pelo site e gostaria de receber uma análise gratuita.\n\n📌 *Dados da Solicitação:*\n• *Nome:* ${formData.nome}\n• *E-mail:* ${formData.email}\n• *Telefone:* ${formData.telefone}\n• *Empresa/Restaurante:* ${formData.empresa}\n• *Segmento:* ${formData.segmento}\n• *Faturamento:* ${formData.faturamento}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors text-sm flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Abrir WhatsApp Agora</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmittedSuccess(false)
                        setFormData({ nome: "", email: "", telefone: "", empresa: "", segmento: "", faturamento: "" })
                      }}
                      className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm"
                    >
                      Enviar nova solicitação
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* General Alert Banner */}
                  <AnimatePresence>
                    {formAlert && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="bg-[#AFFF00]/10 border border-[#AFFF00]/40 rounded-xl p-4 flex items-center gap-3 text-sm text-[#AFFF00]"
                      >
                        <AlertTriangle className="w-5 h-5 shrink-0 text-[#AFFF00]" />
                        <span className="font-medium">{formAlert}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Nome */}
                  <motion.div variants={formItemVariants} className="space-y-1.5">
                    <label htmlFor="nome" className="text-sm font-medium text-white/80 flex items-center justify-between">
                      <span>Seu nome <span className="text-[#AFFF00]">*</span></span>
                    </label>
                    <input
                      type="text"
                      id="nome"
                      placeholder="Ex: Carlos Silva"
                      value={formData.nome}
                      onChange={(e) => {
                        const capitalized = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                        setFormData({ ...formData, nome: capitalized });
                        if (errors.nome) setErrors((prev) => ({ ...prev, nome: "" }));
                      }}
                      className={`w-full bg-[#242424] border ${errors.nome ? "border-[#AFFF00] ring-2 ring-[#AFFF00]/30" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#AFFF00]/50 focus:border-[#AFFF00] transition-all text-sm`}
                    />
                    <AnimatePresence>
                      {errors.nome && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-xs text-[#AFFF00] bg-[#AFFF00]/10 border border-[#AFFF00]/30 px-3 py-1.5 rounded-lg mt-1 font-medium"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.nome}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={formItemVariants} className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                      Seu melhor e-mail <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="carlos@restaurante.com.br"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={`w-full bg-[#242424] border ${errors.email ? "border-[#AFFF00] ring-2 ring-[#AFFF00]/30" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#AFFF00]/50 focus:border-[#AFFF00] transition-all text-sm`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-xs text-[#AFFF00] bg-[#AFFF00]/10 border border-[#AFFF00]/30 px-3 py-1.5 rounded-lg mt-1 font-medium"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Telefone */}
                  <motion.div variants={formItemVariants} className="space-y-1.5">
                    <label htmlFor="telefone" className="text-sm font-medium text-white/80">
                      Telefone (WhatsApp) <span className="text-[#AFFF00]">*</span>
                    </label>
                    <div className="relative flex">
                      <div className={`bg-[#2a2a2a] border ${errors.telefone ? "border-[#AFFF00]" : "border-white/10"} border-r-0 rounded-l-xl px-4 py-3.5 flex items-center justify-center text-sm text-white/50 shrink-0`}>
                        BR +55
                      </div>
                      <input
                        type="tel"
                        id="telefone"
                        placeholder="(11) 99999-8888"
                        value={formData.telefone}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 11) value = value.slice(0, 11);
                          let formatted = value;
                          if (value.length > 2) {
                            if (value.length > 7) {
                              formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                            } else if (value.length > 6) {
                              formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}${value.length > 6 ? '-' + value.slice(7) : ''}`;
                            } else {
                              formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                            }
                          } else if (value.length > 0) {
                            formatted = `(${value}`;
                          }
                          setFormData({ ...formData, telefone: formatted });
                          if (errors.telefone) setErrors((prev) => ({ ...prev, telefone: "" }));
                        }}
                        maxLength={15}
                        className={`w-full bg-[#242424] border ${errors.telefone ? "border-[#AFFF00] ring-2 ring-[#AFFF00]/30" : "border-white/10"} rounded-r-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#AFFF00]/50 focus:border-[#AFFF00] transition-all text-sm`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.telefone && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-xs text-[#AFFF00] bg-[#AFFF00]/10 border border-[#AFFF00]/30 px-3 py-1.5 rounded-lg mt-1 font-medium"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.telefone}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Empresa */}
                  <motion.div variants={formItemVariants} className="space-y-1.5">
                    <label htmlFor="empresa" className="text-sm font-medium text-white/80">
                      Nome da empresa / Restaurante <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      placeholder="Ex: Bella Napoli Pizzaria"
                      value={formData.empresa}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val.length > 0) {
                          val = val.charAt(0).toUpperCase() + val.slice(1);
                        }
                        setFormData({ ...formData, empresa: val });
                        if (errors.empresa) setErrors((prev) => ({ ...prev, empresa: "" }));
                      }}
                      className={`w-full bg-[#242424] border ${errors.empresa ? "border-[#AFFF00] ring-2 ring-[#AFFF00]/30" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#AFFF00]/50 focus:border-[#AFFF00] transition-all text-sm`}
                    />
                    <AnimatePresence>
                      {errors.empresa && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-xs text-[#AFFF00] bg-[#AFFF00]/10 border border-[#AFFF00]/30 px-3 py-1.5 rounded-lg mt-1 font-medium"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.empresa}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Segmento */}
                  <motion.div variants={formItemVariants} className="space-y-1.5">
                    <label htmlFor="segmento" className="text-sm font-medium text-white/80">
                      Selecionar segmento <span className="text-[#AFFF00]">*</span>
                    </label>
                    <select
                      id="segmento"
                      value={formData.segmento}
                      onChange={(e) => {
                        setFormData({ ...formData, segmento: e.target.value });
                        if (errors.segmento) setErrors((prev) => ({ ...prev, segmento: "" }));
                      }}
                      className={`w-full bg-[#242424] border ${errors.segmento ? "border-[#AFFF00] ring-2 ring-[#AFFF00]/30" : "border-white/10"} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#AFFF00]/50 focus:border-[#AFFF00] transition-all text-sm appearance-none`}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23ffffff\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
                    >
                      <option value="" disabled>Selecionar</option>
                      <option value="pizzaria">Pizzarias</option>
                      <option value="hamburgueria">Hamburguerias</option>
                      <option value="brasileira">Restaurante comida brasileira</option>
                      <option value="churrascaria">Churrascaria steakhouse</option>
                      <option value="japones">Restaurante japonês</option>
                      <option value="italiano">Restaurante massas italiano</option>
                      <option value="arabe">Restaurante comida árabe</option>
                      <option value="acai">Açaí / sorveteria</option>
                      <option value="cafeteria">Cafeteria</option>
                      <option value="doceria">Doceria</option>
                      <option value="gastrobar">Gastrobar</option>
                      <option value="outros">Outros</option>
                    </select>
                    <AnimatePresence>
                      {errors.segmento && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-xs text-[#AFFF00] bg-[#AFFF00]/10 border border-[#AFFF00]/30 px-3 py-1.5 rounded-lg mt-1 font-medium"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.segmento}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Faturamento */}
                  <motion.div variants={formItemVariants} className="space-y-1.5">
                    <label htmlFor="faturamento" className="text-sm font-medium text-white/80">
                      Coloque seu faturamento atual <span className="text-[#AFFF00]">*</span>
                    </label>
                    <select
                      id="faturamento"
                      value={formData.faturamento}
                      onChange={(e) => {
                        setFormData({ ...formData, faturamento: e.target.value });
                        if (errors.faturamento) setErrors((prev) => ({ ...prev, faturamento: "" }));
                      }}
                      className={`w-full bg-[#242424] border ${errors.faturamento ? "border-[#AFFF00] ring-2 ring-[#AFFF00]/30" : "border-white/10"} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#AFFF00]/50 focus:border-[#AFFF00] transition-all text-sm appearance-none`}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23ffffff\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
                    >
                      <option value="" disabled>Selecionar</option>
                      <option value="ate-30k">Até 30 mil</option>
                      <option value="30k-50k">30 mil até 50 mil</option>
                      <option value="50k-80k">50 mil até 80 mil</option>
                      <option value="80k-100k">80 mil até 100 mil</option>
                      <option value="100k-150k">100 mil até 150 mil</option>
                      <option value="150k-250k">150 mil até 250 mil</option>
                      <option value="250k-400k">250 mil até 400 mil</option>
                      <option value="400k-600k">400 mil até 600 mil</option>
                      <option value="600k-1m">600 mil até 1 milhão</option>
                      <option value="mais-1m">Mais de 1 milhão</option>
                    </select>
                    <AnimatePresence>
                      {errors.faturamento && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-xs text-[#AFFF00] bg-[#AFFF00]/10 border border-[#AFFF00]/30 px-3 py-1.5 rounded-lg mt-1 font-medium"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.faturamento}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={formItemVariants} className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      type="submit"
                      className="w-full bg-[#AFFF00] hover:bg-[#9ee600] text-[#121212] font-bold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-[#AFFF00]/10"
                    >
                      Receber mais informações
                      <svg 
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </motion.div>
                  
                  <motion.div variants={formItemVariants} className="text-center pt-2">
                    <p className="text-xs text-white/30 flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Seus dados estão seguros e não enviamos spam.
                    </p>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

