"use client"

import { ChevronLeft, Bell, HelpCircle, Plus, X, Store, User, Phone, Mail, CheckCircle2, FileText, ExternalLink } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { getStoredLeads, saveLead, formatSegmento, LeadItem } from "@/lib/leads-store"
import Link from "next/link"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const [leads, setLeads] = useState<LeadItem[]>([])
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  // Form State for + button
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    email: "",
    telefone: "",
    segmento: "pizzaria",
    faturamento: "50 mil até 80 mil"
  })
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const notifRef = useRef<HTMLDivElement>(null)

  const loadLeads = () => {
    const data = getStoredLeads()
    setLeads(data)
    if (data.length > 0) {
      setHasUnread(true)
    }
  }

  useEffect(() => {
    loadLeads()
    const handleUpdate = () => loadLeads()
    window.addEventListener("mub_leads_updated", handleUpdate)
    return () => window.removeEventListener("mub_leads_updated", handleUpdate)
  }, [])

  // Close notifications on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.empresa || !formData.nome || !formData.telefone) return

    saveLead({
      restaurante: formData.empresa,
      contato: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      segmento: formatSegmento(formData.segmento),
      faturamento: formData.faturamento,
      servico: 'Cadastro Manual'
    })

    setFormData({
      empresa: "",
      nome: "",
      email: "",
      telefone: "",
      segmento: "pizzaria",
      faturamento: "50 mil até 80 mil"
    })
    setIsAddModalOpen(false)
    setToastMsg("Lead cadastrado com sucesso e adicionado ao CRM!")
    setTimeout(() => setToastMsg(null), 4000)
  }

  const isLeadDetail = pathname.startsWith('/dashboard/crm/') && pathname !== '/dashboard/crm'
  
  return (
    <>
      <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0 z-10 shadow-sm relative">
        <div className="flex items-center gap-4">
          {isLeadDetail && (
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 relative" ref={notifRef}>
          {/* Bell Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                setHasUnread(false)
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200 relative"
              title="Notificações"
            >
              <Bell className="w-4 h-4" />
              {hasUnread && leads.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ff6b00] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#ff6b00]" />
                    <h4 className="font-bold text-gray-900 text-sm">Notificações</h4>
                  </div>
                  <span className="text-xs font-bold bg-orange-50 text-[#ff6b00] px-2 py-0.5 rounded-full">
                    {leads.length} novas
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 my-2">
                  {leads.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      Nenhuma notificação por enquanto.
                    </div>
                  ) : (
                    leads.slice(0, 6).map((item) => (
                      <Link
                        key={item.id}
                        href="/dashboard/preenchimentos"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="p-3 hover:bg-gray-50 rounded-xl transition-colors block group"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-[#ff6b00]">
                            {item.restaurante}
                          </p>
                          <span className="text-[10px] text-gray-400">{item.data}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Novo formulário preenchido por <strong className="text-gray-700">{item.contato}</strong> ({item.telefone})
                        </p>
                      </Link>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100 text-center">
                  <Link
                    href="/dashboard/preenchimentos"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-xs font-bold text-[#ff6b00] hover:underline"
                  >
                    Ver todos os preenchimentos →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200"
            title="Ajuda & Instruções"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Plus Button */}
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#ff6b00] hover:bg-[#e66000] transition-colors shadow-sm"
            title="Adicionar Novo Lead Manualmente"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800 text-sm font-medium animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#ff6b00]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Como funciona o Sistema?</h3>
                <p className="text-xs text-gray-500">Central de Captação e Integração com WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="text-gray-900 font-bold block mb-1">1. Formulário no Site</strong>
                <p className="text-xs">
                  Quando um restaurante preenche o formulário no site, os dados são automaticamente salvos e redirecionados para o WhatsApp da equipe: <span className="font-bold text-green-600">(19) 98886-4646</span>.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="text-gray-900 font-bold block mb-1">2. Atualização Automática no Dashboard</strong>
                <p className="text-xs">
                  Todas as solicitações caem diretamente na aba <strong>Preenchimentos</strong>, na <strong>Visão Geral</strong> e na lista de <strong>Restaurantes</strong>.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <strong className="text-gray-900 font-bold block mb-1">3. Gestão de CRM e Clientes</strong>
                <p className="text-xs">
                  Arraste os cards no <strong>CRM Funil</strong> conforme avança na negociação. Quando jogado em <strong>&quot;Cliente Fechado&quot;</strong>, o restaurante vira cliente ativo!
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsHelpOpen(false)}
              className="mt-6 w-full py-3 bg-[#ff6b00] text-white font-bold rounded-xl hover:bg-[#e66000] transition-colors text-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Add Lead Modal (+) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Plus className="w-5 h-5 text-[#ff6b00]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Novo Lead / Restaurante</h3>
                <p className="text-xs text-gray-500">Cadastre uma nova solicitação manualmente</p>
              </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Restaurante / Empresa *</label>
                <div className="relative">
                  <Store className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pizzaria Bella Italia"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Contato *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Telefone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="(19) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="contato@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Segmento</label>
                  <select
                    value={formData.segmento}
                    onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
                  >
                    <option value="pizzaria">Pizzaria</option>
                    <option value="hamburgueria">Hamburgueria</option>
                    <option value="japones">Restaurante Japonês</option>
                    <option value="brasileira">Comida Brasileira</option>
                    <option value="cafeteria">Cafeteria</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Faturamento</label>
                  <select
                    value={formData.faturamento}
                    onChange={(e) => setFormData({ ...formData, faturamento: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
                  >
                    <option value="Até 30 mil">Até 30 mil</option>
                    <option value="30 mil até 50 mil">30 mil até 50 mil</option>
                    <option value="50 mil até 80 mil">50 mil até 80 mil</option>
                    <option value="80 mil até 100 mil">80 mil até 100 mil</option>
                    <option value="Acima de 100 mil">Acima de 100 mil</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#ff6b00] text-white font-bold rounded-xl hover:bg-[#e66000] transition-colors text-sm shadow-md"
                >
                  Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

