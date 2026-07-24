"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  FileText, 
  Filter, 
  Users, 
  Store, 
  Settings, 
  ChevronLeft, 
  Bell, 
  HelpCircle, 
  Plus, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Check,
  Search,
  MoreHorizontal,
  PhoneCall,
  Calendar,
  Building2,
  MapPin,
  Briefcase
} from "lucide-react"

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#ff6b00] rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Cozinha Digital</h1>
          </div>
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Acesse sua conta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue="gestor@gourmetize.com"
                    className="block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-2.5 border focus:ring-[#ff6b00] focus:border-[#ff6b00] transition-colors outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    defaultValue="password123"
                    className="block w-full pl-10 sm:text-sm border-gray-200 rounded-xl py-2.5 border focus:ring-[#ff6b00] focus:border-[#ff6b00] transition-colors outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#ff6b00] focus:ring-[#ff6b00] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#ff6b00] hover:text-[#e66000] transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#ff6b00] hover:bg-[#e66000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b00] transition-colors cursor-pointer items-center">
                  Entrar no Painel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f9fa] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111111] flex flex-col pt-6 pb-4 px-4 sticky top-0 flex-shrink-0">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Cozinha Digital</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors group">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors group">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Preenchimentos</span>
          </a>
          
          <div className="py-2">
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Vendas</div>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#ff6b00]/10 text-[#ff6b00] font-semibold group">
              <Filter className="w-5 h-5" />
              <span className="text-sm">CRM Funil</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors group">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Clientes</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors group">
              <Store className="w-5 h-5" />
              <span className="text-sm font-medium">Restaurantes</span>
            </a>
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors group">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Configurações</span>
          </a>
          <button className="flex items-center justify-between w-full p-2 mt-2 rounded-xl hover:bg-white/10 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" 
                alt="Gestor" 
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Rafael Costa</span>
                <span className="text-xs text-gray-400 leading-tight">rafael@gourmetize</span>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </aside>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8f9fa]">
        
        {/* HEADER */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <ChevronLeft className="w-4 h-4" />
              Detalhes do Lead
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#ff6b00] hover:bg-[#e66000] transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* CONTENT AREA - SPLIT LEFT (Main) / RIGHT (Sidebar) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* CENTER MAIN PANEL */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-8 max-w-5xl mx-auto">
              
              {/* Title & Tabs */}
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Restaurante Sabor & Cia — Contrato Cardápio Digital</h2>
                
                <div className="flex items-center gap-6 border-b border-gray-200">
                  <button className="pb-3 text-sm font-bold text-[#ff6b00] border-b-2 border-[#ff6b00] px-1">
                    Visão Geral
                  </button>
                  <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-900 px-1 transition-colors">
                    Tarefas
                  </button>
                  <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-900 px-1 transition-colors">
                    Notas
                  </button>
                </div>
              </div>

              {/* Funnel Stages */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-gray-900">Estágios</h3>
                  <button className="px-4 py-2 bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Avançar Estágio
                  </button>
                </div>
                
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                  
                  {/* Stages */}
                  {[
                    { label: "Lead Recebido", status: "completed" },
                    { label: "Contato Feito", status: "completed" },
                    { label: "Proposta Enviada", status: "completed" },
                    { label: "Negociação", status: "current" },
                    { label: "Cliente Fechado", status: "upcoming" }
                  ].map((stage, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                      {stage.status === 'completed' && (
                        <div className="w-6 h-6 rounded-full bg-[#111111] flex items-center justify-center text-white ring-4 ring-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {stage.status === 'current' && (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-[#ff6b00] flex items-center justify-center ring-4 ring-white">
                          <div className="w-2 h-2 rounded-full bg-[#ff6b00]"></div>
                        </div>
                      )}
                      {stage.status === 'upcoming' && (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white">
                        </div>
                      )}
                      <span className={`text-xs font-semibold ${stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>
                        {stage.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details & Financials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Detalhes do Cliente */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-5">Detalhes do Cliente</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">ID do Lead</span>
                      <span className="text-sm font-medium text-gray-900">LD-001</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Segmento</span>
                      <span className="text-sm font-medium text-gray-900">Hamburgueria</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Data Prevista</span>
                      <span className="text-sm font-medium text-gray-900">05/12/2024</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Probabilidade</span>
                      <span className="text-sm font-bold text-[#ff6b00]">70%</span>
                    </div>
                  </div>
                </div>

                {/* Financeiro */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-5">Financeiro</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Valor Contratado</span>
                      <span className="text-sm font-medium text-gray-900">R$ 350,00/mês</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Desconto</span>
                      <span className="text-sm font-medium text-gray-900">10%</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Plano/Serviço</span>
                      <span className="text-sm font-medium text-gray-900">Combo (Cardápio + Controle)</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Valor Concorrente</span>
                      <span className="text-sm font-medium text-gray-900 line-through text-gray-400">R$ 400,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-gray-900">Atividade</h3>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors font-medium">
                      <Calendar className="w-4 h-4" />
                      Filtrar Data
                    </button>
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Buscar atividade..." 
                        className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors w-48"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Timeline Item 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center z-10">
                        <FileText className="w-4 h-4 text-[#ff6b00]" />
                      </div>
                      <div className="w-px h-full bg-gray-200 my-1"></div>
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Formulário de Interesse preenchido</p>
                      <p className="text-sm text-gray-500">O cliente entrou pelo site e preencheu o formulário para o Combo.</p>
                      <span className="text-xs font-medium text-gray-400 mt-2 block">15 Nov, 2024 às 10:00</span>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center z-10">
                        <PhoneCall className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="w-px h-full bg-gray-200 my-1"></div>
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Ligação de Descoberta realizada</p>
                      <p className="text-sm text-gray-500">Rafael conversou com João Silva para entender as necessidades da hamburgueria.</p>
                      <span className="text-xs font-medium text-gray-400 mt-2 block">16 Nov, 2024 às 14:30</span>
                    </div>
                  </div>

                   {/* Timeline Item 3 */}
                   <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center z-10">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Proposta Comercial enviada</p>
                      <p className="text-sm text-gray-500">Proposta enviada por e-mail com 10% de desconto no primeiro semestre.</p>
                      <span className="text-xs font-medium text-gray-400 mt-2 block">18 Nov, 2024 às 09:15</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </main>

          {/* RIGHT PANEL - Contacts & Company */}
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
            <div className="p-6">
              
              {/* Contatos Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contatos</h3>
                  <button className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Primary Contact */}
                  <div className="border border-orange-200 bg-orange-50/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-[#ff6b00] uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded-full">Contato Principal</span>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" 
                        alt="João Silva" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">João Silva</h4>
                        <p className="text-xs text-gray-500 font-medium">Proprietário</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        joao@saborecia.com.br
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
                        (11) 98765-4321
                      </div>
                    </div>
                  </div>

                  {/* Decision Maker */}
                  <div className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full">Resp. Decisão</span>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
                        alt="Maria Souza" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Maria Souza</h4>
                        <p className="text-xs text-gray-500 font-medium">Gerente Geral</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        maria@saborecia.com.br
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
                        (11) 91234-5678
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empresa Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Empresa</h3>
                  <button className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 text-[#ff6b00]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Sabor & Cia</h4>
                      <p className="text-xs font-medium text-gray-500">Restaurante / Fast Food</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                        <Building2 className="w-3.5 h-3.5" /> Segmento
                      </span>
                      <span className="text-sm font-medium text-gray-900">Hamburgueria</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                        <MapPin className="w-3.5 h-3.5" /> Localização
                      </span>
                      <span className="text-sm font-medium text-gray-900">São Paulo, SP</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                        <Briefcase className="w-3.5 h-3.5" /> Porte
                      </span>
                      <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        Médio (15-50 func.)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
