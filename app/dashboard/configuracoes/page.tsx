"use client"

import { useState } from "react"
import { Settings, Save, Phone, Mail, User, Building, Trash2, CheckCircle2, Shield, Bell } from "lucide-react"
import { resetStoredLeads } from "@/lib/leads-store"

export default function ConfiguracoesPage() {
  const [gestor, setGestor] = useState("Rafael Costa")
  const [email, setEmail] = useState("rafael@gourmetize.com")
  const [empresa, setEmpresa] = useState("Cozinha Digital")
  const [whatsapp, setWhatsapp] = useState("(19) 98886-4646")
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSom, setNotifSom] = useState(true)
  
  const [savedToast, setSavedToast] = useState(false)
  const [resetToast, setResetToast] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  const handleResetData = () => {
    if (confirm("ATENÇÃO: Deseja zerar permanentemente todos os leads, restaurantes e métricas do Dashboard? O sistema ficará limpo aguardando novos preenchimentos.")) {
      resetStoredLeads()
      setResetToast(true)
      setTimeout(() => setResetToast(false), 3000)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Configurações do Sistema</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie suas preferências de perfil, integrações e dados do aplicativo.</p>
      </div>

      {savedToast && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <span>Configurações salvas com sucesso!</span>
        </div>
      )}

      {resetToast && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#ff6b00] shrink-0" />
          <span>O banco de dados foi resetado com sucesso! O dashboard está 100% limpo.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Perfil */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <User className="w-5 h-5 text-[#ff6b00]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Perfil & Responsável</h3>
              <p className="text-xs text-gray-500">Dados da conta de gestão do sistema</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Gestor</label>
              <input
                type="text"
                value={gestor}
                onChange={(e) => setGestor(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">E-mail de Login</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome da Empresa / Plataforma</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
              />
            </div>
          </div>
        </div>

        {/* Integração WhatsApp */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Integração do WhatsApp para Recebimento de Leads</h3>
              <p className="text-xs text-gray-500">Número que recebe a mensagem com o formulário preenchido pelo cliente</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp de Atendimento (Com DDD)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full max-w-md px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-green-700 outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Ao preencher o formulário de análise no site, o cliente é direcionado automaticamente para o WhatsApp com esta chave.
              </p>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Alertas & Notificações</h3>
              <p className="text-xs text-gray-500">Controle como você deseja ser notificado sobre novos clientes</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="w-4 h-4 text-[#ff6b00] rounded focus:ring-[#ff6b00]"
              />
              <span className="text-sm font-medium text-gray-700">Notificação visual no sininho do cabeçalho quando entrar novo lead</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifSom}
                onChange={(e) => setNotifSom(e.target.checked)}
                className="w-4 h-4 text-[#ff6b00] rounded focus:ring-[#ff6b00]"
              />
              <span className="text-sm font-medium text-gray-700">Sincronização em tempo real entre abas do navegador</span>
            </label>
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#ff6b00] text-white font-bold rounded-xl text-sm hover:bg-[#e66000] transition-colors shadow-md"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </form>

      {/* Zona de Perigo / Reset */}
      <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Trash2 className="w-5 h-5 text-red-600 shrink-0" />
          <h3 className="text-base font-bold text-red-900">Gerenciamento do Banco de Dados</h3>
        </div>
        <p className="text-xs text-red-700 mb-4">
          Você pode resetar todos os dados de testes e formulários para deixar seu Dashboard completamente limpo zerado.
        </p>
        <button
          type="button"
          onClick={handleResetData}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
        >
          Zerar Todos os Dados do Dashboard
        </button>
      </div>
    </div>
  )
}
