"use client"
import { Users, TrendingUp, DollarSign, Store, Activity, ArrowUpRight, ArrowDownRight, FileText, PhoneCall, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { getStoredLeads, LeadItem } from "@/lib/leads-store"
import Link from "next/link"

export default function DashboardOverview() {
  const [leads, setLeads] = useState<LeadItem[]>([])

  const loadData = () => {
    setLeads(getStoredLeads())
  }

  useEffect(() => {
    loadData()
    const handleUpdate = () => loadData()
    window.addEventListener("mub_leads_updated", handleUpdate)
    return () => window.removeEventListener("mub_leads_updated", handleUpdate)
  }, [])

  const totalLeadsCount = leads.length
  const fechadosCount = leads.filter(l => l.crmStage === 'cliente-fechado' || l.status === 'Convertido em lead').length
  const negociacaoCount = leads.filter(l => l.crmStage === 'negociacao').length
  const propostaCount = leads.filter(l => l.crmStage === 'proposta-enviada').length
  const contatoCount = leads.filter(l => l.crmStage === 'contato-feito').length
  const recebidoCount = leads.filter(l => !l.crmStage || l.crmStage === 'lead-recebido').length

  const conversionRate = totalLeadsCount > 0 ? ((fechadosCount / totalLeadsCount) * 100).toFixed(1) : '0.0'
  const recentSubmissions = leads.slice(0, 5)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Visão Geral</h2>
          <p className="text-sm text-gray-500 mt-1">Acompanhe as métricas e preenchimentos em tempo real.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total de Leads', value: String(totalLeadsCount), change: totalLeadsCount > 0 ? '+100%' : '0%', up: true, icon: Users, color: 'blue' },
          { title: 'Taxa de Conversão', value: `${conversionRate}%`, change: '0%', up: true, icon: TrendingUp, color: 'green' },
          { title: 'Clientes Fechados', value: String(fechadosCount), change: '0%', up: true, icon: Store, color: 'orange' },
          { title: 'Formulários Recebidos', value: String(totalLeadsCount), change: totalLeadsCount > 0 ? 'Novo' : '0', up: true, icon: DollarSign, color: 'purple' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-orange-50`}>
                  <Icon className={`w-5 h-5 text-[#ff6b00]`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg`}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">{kpi.title}</h3>
              <p className="text-2xl font-extrabold text-gray-900">{kpi.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Funnel Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-gray-900">Funil de Vendas</h3>
            <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg">
              {totalLeadsCount} no total
            </span>
          </div>
          
          <div className="space-y-4 pt-2">
            {[
              { label: 'Lead Recebido', count: recebidoCount, percentage: totalLeadsCount > 0 ? Math.round((recebidoCount / totalLeadsCount) * 100) : 0, color: 'bg-gray-200' },
              { label: 'Contato Feito', count: contatoCount, percentage: totalLeadsCount > 0 ? Math.round((contatoCount / totalLeadsCount) * 100) : 0, color: 'bg-blue-200' },
              { label: 'Proposta Enviada', count: propostaCount, percentage: totalLeadsCount > 0 ? Math.round((propostaCount / totalLeadsCount) * 100) : 0, color: 'bg-indigo-200' },
              { label: 'Negociação', count: negociacaoCount, percentage: totalLeadsCount > 0 ? Math.round((negociacaoCount / totalLeadsCount) * 100) : 0, color: 'bg-orange-200' },
              { label: 'Cliente Fechado', count: fechadosCount, percentage: totalLeadsCount > 0 ? Math.round((fechadosCount / totalLeadsCount) * 100) : 0, color: 'bg-[#ff6b00]' },
            ].map((stage, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-32 text-sm font-bold text-gray-700 shrink-0">{stage.label}</div>
                <div className="flex-1 h-8 bg-gray-50 rounded-r-xl overflow-hidden relative border border-gray-100">
                  <div 
                    className={`h-full ${stage.color} rounded-r-xl transition-all duration-700`} 
                    style={{ width: `${Math.max(stage.percentage, stage.count > 0 ? 8 : 0)}%` }}
                  ></div>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-900">
                    {stage.count} ({stage.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-gray-900">Atividade Recente</h3>
            <Link href="/dashboard/preenchimentos" className="text-[#ff6b00] hover:text-[#e66000] text-sm font-bold">Ver tudo</Link>
          </div>

          <div className="space-y-5">
            {recentSubmissions.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">
                Nenhum preenchimento recebido ainda.<br />
                Envie uma solicitação no formulário do site para visualizá-la aqui.
              </div>
            ) : (
              recentSubmissions.map((lead, idx) => (
                <div key={lead.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center z-10 shrink-0">
                      <FileText className="w-4 h-4 text-[#ff6b00]" />
                    </div>
                    {idx < recentSubmissions.length - 1 && (
                      <div className="w-px h-full bg-gray-100 my-1"></div>
                    )}
                  </div>
                  <div className="pb-1 pt-0.5">
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{lead.restaurante}</p>
                    <p className="text-xs text-gray-600 font-medium">{lead.contato} • {lead.segmento || lead.servico}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{lead.data} • {lead.telefone}</p>
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
