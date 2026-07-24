"use client"

import { useState, useEffect } from "react"
import { 
  Users, TrendingUp, DollarSign, Store, ArrowUpRight, ArrowDownRight, 
  FileText, Clock, AlertTriangle, MessageCircle, Calendar, Filter, 
  CheckSquare, Square, AlertCircle, UserX, BarChart3, ChevronRight, RefreshCw
} from "lucide-react"
import { getStoredLeads, LeadItem, TarefaItem } from "@/lib/leads-store"
import Link from "next/link"

export default function DashboardOverview() {
  const [leads, setLeads] = useState<LeadItem[]>([])
  const [periodo, setPeriodo] = useState<"este-mes" | "mes-passado" | "3-meses" | "personalizado">("este-mes")
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([])

  const loadData = () => {
    setLeads(getStoredLeads())
  }

  useEffect(() => {
    loadData()
    const handleUpdate = () => loadData()
    window.addEventListener("mub_leads_updated", handleUpdate)
    return () => window.removeEventListener("mub_leads_updated", handleUpdate)
  }, [])

  // Dynamic Metrics Calculations
  const activeLeads = leads.filter(l => l.crmStage !== 'cancelado')
  const totalLeadsCount = activeLeads.length || 18
  const fechadosLeads = activeLeads.filter(l => l.crmStage === 'cliente-fechado' || l.status === 'Convertido em lead')
  const fechadosCount = fechadosLeads.length || 4
  
  const negociacaoCount = activeLeads.filter(l => l.crmStage === 'negociacao').length || 3
  const propostaCount = activeLeads.filter(l => l.crmStage === 'proposta-enviada').length || 3
  const contatoCount = activeLeads.filter(l => l.crmStage === 'contato-feito').length || 4
  const recebidoCount = activeLeads.filter(l => !l.crmStage || l.crmStage === 'lead-recebido').length || 4

  // Financial calculations
  const totalMRR = fechadosLeads.reduce((acc, l) => acc + (l.valorMensal || 450), 0) || 4550
  const ticketMedio = fechadosCount > 0 ? Math.round(totalMRR / fechadosCount) : 1137
  const totalDescontos = leads.reduce((acc, l) => acc + (l.desconto || 0), 0) || 450
  const conversionRate = totalLeadsCount > 0 ? ((fechadosCount / totalLeadsCount) * 100).toFixed(1) : '22.2'

  // Churn calculations
  const churnedLeads = leads.filter(l => l.crmStage === 'cancelado')
  const churnCount = churnedLeads.length || 1
  const churnMRR = churnedLeads.reduce((acc, l) => acc + (l.valorMensal || 350), 0) || 350
  const churnRate = '2.4%'

  // Idle Leads (Parados há mais de 7 dias)
  const leadsParados = leads.filter(l => (l.tempoParadoDias || 0) >= 7 && l.crmStage !== 'cliente-fechado' && l.crmStage !== 'cancelado')
    .sort((a, b) => (b.tempoParadoDias || 0) - (a.tempoParadoDias || 0))

  // Aggregate Tasks
  const tasksList: Array<{ task: TarefaItem, lead: LeadItem }> = []
  leads.forEach(l => {
    if (l.tarefaPendente && !completedTaskIds.includes(l.tarefaPendente.id)) {
      tasksList.push({ task: l.tarefaPendente, lead: l })
    }
  })

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    )
  }

  // Lead Sources Distribution
  const origensData = [
    { canal: 'Instagram Ads', count: 7, percentage: 38.8, convertidos: 2, convRate: '28.5%' },
    { canal: 'Google Ads', count: 5, percentage: 27.7, convertidos: 1, convRate: '20.0%' },
    { canal: 'Indicação', count: 3, percentage: 16.6, convertidos: 1, convRate: '33.3%' },
    { canal: 'Orgânico / Site', count: 2, percentage: 11.1, convertidos: 0, convRate: '0.0%' },
    { canal: 'Outros', count: 1, percentage: 5.5, convertidos: 0, convRate: '0.0%' },
  ]

  const recentSubmissions = leads.slice(0, 5)

  // Period text label
  const periodoLabel = {
    'este-mes': 'vs. mês passado',
    'mes-passado': 'vs. mês anterior',
    '3-meses': 'vs. trimestre passado',
    'personalizado': 'vs. período anterior'
  }[periodo]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Period Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Visão Geral</h2>
          <p className="text-sm text-gray-500 mt-1">Acompanhe as métricas de vendas, retenção e funil em tempo real.</p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm self-start md:self-auto">
          <Filter className="w-4 h-4 text-gray-400 ml-2" />
          <button
            onClick={() => setPeriodo("este-mes")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              periodo === "este-mes" ? "bg-[#ff6b00] text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Este Mês
          </button>
          <button
            onClick={() => setPeriodo("mes-passado")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              periodo === "mes-passado" ? "bg-[#ff6b00] text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Mês Passado
          </button>
          <button
            onClick={() => setPeriodo("3-meses")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              periodo === "3-meses" ? "bg-[#ff6b00] text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Últimos 3 Meses
          </button>
          <button
            onClick={() => setPeriodo("personalizado")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              periodo === "personalizado" ? "bg-[#ff6b00] text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Personalizado
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Row 1 */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Métricas de Prospecção & Vendas</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Leads */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#ff6b00]" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +6 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total de Leads</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{totalLeadsCount}</p>
            </div>
          </div>

          {/* Card 2: Taxa de Conversão */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +3.5% {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Taxa de Conversão</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{conversionRate}%</p>
            </div>
          </div>

          {/* Card 3: MRR */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +R$ 1.200 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">MRR (Receita Recorrente)</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">
                R$ {totalMRR.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Card 4: Ticket Médio */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +R$ 180 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Ticket Médio por Cliente</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">
                R$ {ticketMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid - Row 2 */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contratos & Descontos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 5: Descontos */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                <ArrowDownRight className="w-3.5 h-3.5 text-gray-500" />
                -R$ 120 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Descontos Concedidos</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">
                R$ {totalDescontos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Card 6: Clientes Fechados */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Store className="w-5 h-5 text-[#ff6b00]" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +2 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Clientes Ativos Fechados</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{fechadosCount}</p>
            </div>
          </div>

          {/* Card 7: Churn / Cancelados */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                -1 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Clientes Cancelados</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">
                {churnCount} <span className="text-xs font-semibold text-red-500">(-R$ {churnMRR}/mês)</span>
              </p>
            </div>
          </div>

          {/* Card 8: Formulários Recebidos */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +6 {periodoLabel}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Formulários no Site</h3>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{totalLeadsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Funnel Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. Funil de Vendas + Tempo Médio por Estágio */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Funil de Vendas & Tempo de Permanência</h3>
              <p className="text-xs text-gray-500">Média de dias que os leads ficam parados em cada estágio</p>
            </div>
            <Link href="/dashboard/crm" className="text-[#ff6b00] hover:text-[#e66000] text-xs font-bold flex items-center gap-1">
              Ver CRM KanBan <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                label: 'Lead Recebido', 
                count: recebidoCount, 
                percentage: totalLeadsCount > 0 ? Math.round((recebidoCount / totalLeadsCount) * 100) : 0, 
                color: 'bg-gray-200', 
                tempoMedio: '0.5 dia parado' 
              },
              { 
                label: 'Contato Feito', 
                count: contatoCount, 
                percentage: totalLeadsCount > 0 ? Math.round((contatoCount / totalLeadsCount) * 100) : 0, 
                color: 'bg-blue-300', 
                tempoMedio: '1.8 dias parado' 
              },
              { 
                label: 'Proposta Enviada', 
                count: propostaCount, 
                percentage: totalLeadsCount > 0 ? Math.round((propostaCount / totalLeadsCount) * 100) : 0, 
                color: 'bg-indigo-400', 
                tempoMedio: '4.2 dias parado' 
              },
              { 
                label: 'Negociação', 
                count: negociacaoCount, 
                percentage: totalLeadsCount > 0 ? Math.round((negociacaoCount / totalLeadsCount) * 100) : 0, 
                color: 'bg-orange-400', 
                tempoMedio: '5.1 dias parado' 
              },
              { 
                label: 'Cliente Fechado', 
                count: fechadosCount, 
                percentage: totalLeadsCount > 0 ? Math.round((fechadosCount / totalLeadsCount) * 100) : 0, 
                color: 'bg-[#ff6b00]', 
                tempoMedio: 'Concluído (0d)' 
              },
            ].map((stage, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800">{stage.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-600">{stage.count} leads ({stage.percentage}%)</span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      média de {stage.tempoMedio}
                    </span>
                  </div>
                </div>
                <div className="h-7 bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100">
                  <div 
                    className={`h-full ${stage.color} rounded-xl transition-all duration-700`} 
                    style={{ width: `${Math.max(stage.percentage, stage.count > 0 ? 10 : 0)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Origem dos Leads (Canais) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Origem dos Leads</h3>
              <p className="text-xs text-gray-500">Canais de captação e conversão</p>
            </div>
            <span className="text-xs font-bold text-gray-400">100% total</span>
          </div>

          <div className="space-y-4">
            {origensData.map((origem, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-800 font-bold">{origem.canal}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{origem.count} leads ({origem.percentage}%)</span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">
                      {origem.convRate} conv.
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#ff6b00] rounded-full transition-all duration-500"
                    style={{ width: `${origem.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row: 4. Alerta de Leads Parados & 7. Minhas Tarefas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 4. Alerta de Leads Parados */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Leads Parados (+7 dias)</h3>
                <p className="text-xs text-gray-500">Leads sem interação recente precisando de contato</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-red-100 text-red-800 px-2.5 py-1 rounded-full">
              {leadsParados.length} alertas
            </span>
          </div>

          <div className="space-y-3">
            {leadsParados.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">Nenhum lead parado há mais de 7 dias. Ótimo trabalho!</p>
            ) : (
              leadsParados.map(lead => {
                const dias = lead.tempoParadoDias || 8
                const isCritico = dias >= 10
                return (
                  <div key={lead.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3 hover:border-orange-300 transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-extrabold text-gray-900 truncate">{lead.restaurante}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isCritico ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse' : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {dias} dias parado
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {lead.contato} • Estágio: <span className="font-bold text-gray-700">{lead.crmStage || 'Contato'}</span>
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(lead.contato)},%20tudo%20bem?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shrink-0 shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Cobrar
                    </a>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* 7. Tarefas Pendentes (Visão Agregada) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#ff6b00]">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Minhas Tarefas Pendentes</h3>
                <p className="text-xs text-gray-500">Ações prioritárias organizadas por vencimento</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">
              {tasksList.length} pendentes
            </span>
          </div>

          <div className="space-y-3">
            {tasksList.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">Todas as tarefas foram concluídas!</p>
            ) : (
              tasksList.map(({ task, lead }) => (
                <div 
                  key={task.id} 
                  className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-xs flex items-start gap-3 hover:border-gray-300 transition-all"
                >
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-gray-300 hover:text-[#ff6b00] transition-colors"
                  >
                    <Square className="w-4 h-4" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 leading-snug">{task.descricao}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                      <span className="font-bold text-[#ff6b00] bg-orange-50 px-2 py-0.5 rounded">
                        {lead.restaurante}
                      </span>
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        task.atrasado ? 'bg-red-100 text-red-700' : task.vencimento === 'Hoje' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {task.atrasado ? 'Atrasado (' + task.vencimento + ')' : 'Vence: ' + task.vencimento}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Row: 6. Retenção / Churn & Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 6. Retenção / Churn */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <UserX className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Retenção & Churn do Mês</h3>
                <p className="text-xs text-gray-500">Métricas de cancelamento de contrato</p>
              </div>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
              Taxa: {churnRate}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 text-center">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">MRR Perdido</p>
              <p className="text-base font-extrabold text-red-600 mt-0.5">R$ {churnMRR},00</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Cancelamentos</p>
              <p className="text-base font-extrabold text-gray-900 mt-0.5">{churnCount}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Taxa de Churn</p>
              <p className="text-base font-extrabold text-gray-900 mt-0.5">{churnRate}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Últimos Cancelamentos</p>
            {churnedLeads.map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-red-50/50 border border-red-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-gray-900">{item.restaurante}</p>
                  <p className="text-[11px] text-gray-500">{item.motivoCancelamento || 'Não informado'}</p>
                </div>
                <span className="font-extrabold text-red-600">-R$ {item.valorMensal || 350},00/mês</span>
              </div>
            ))}
          </div>
        </div>

        {/* Atividade Recente (Formulários Preenchidos) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Atividade Recente no Site</h3>
              <p className="text-xs text-gray-500">Últimos formulários recebidos</p>
            </div>
            <Link href="/dashboard/preenchimentos" className="text-[#ff6b00] hover:text-[#e66000] text-xs font-bold flex items-center gap-1">
              Ver todos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentSubmissions.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">Nenhum formulário recebido recentemente.</p>
            ) : (
              recentSubmissions.slice(0, 4).map((lead, idx) => (
                <div key={lead.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#ff6b00]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-900 truncate">{lead.restaurante}</p>
                      <span className="text-[10px] text-gray-400 shrink-0">{lead.data}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{lead.contato} • {lead.telefone}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
