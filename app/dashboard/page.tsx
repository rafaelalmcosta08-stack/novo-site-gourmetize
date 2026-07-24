"use client"
import { Users, TrendingUp, DollarSign, Store, Activity, ArrowUpRight, ArrowDownRight, FileText, PhoneCall, CheckCircle2 } from "lucide-react"

export default function DashboardOverview() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Visão Geral</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total de Leads (Mês)', value: '142', change: '+12%', up: true, icon: Users, color: 'blue' },
          { title: 'Taxa de Conversão', value: '18.5%', change: '+2.4%', up: true, icon: TrendingUp, color: 'green' },
          { title: 'Clientes Ativos', value: '3,240', change: '-1.2%', up: false, icon: Store, color: 'orange' },
          { title: 'MRR', value: 'R$ 142k', change: '+15%', up: true, icon: DollarSign, color: 'purple' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${kpi.color}-50`}>
                  <Icon className={`w-5 h-5 text-${kpi.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${kpi.up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-lg`}>
                  {kpi.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
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
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 font-medium text-gray-600 outline-none focus:ring-2 focus:ring-[#ff6b00]">
              <option>Este Mês</option>
              <option>Último Mês</option>
            </select>
          </div>
          
          <div className="space-y-4 pt-4">
            {[
              { label: 'Lead Recebido', count: 142, percentage: 100, color: 'bg-gray-100' },
              { label: 'Contato Feito', count: 110, percentage: 77, color: 'bg-blue-100' },
              { label: 'Proposta Enviada', count: 85, percentage: 60, color: 'bg-indigo-100' },
              { label: 'Negociação', count: 42, percentage: 30, color: 'bg-orange-200' },
              { label: 'Cliente Fechado', count: 26, percentage: 18, color: 'bg-[#ff6b00]' },
            ].map((stage, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-32 text-sm font-bold text-gray-700 shrink-0">{stage.label}</div>
                <div className="flex-1 h-8 bg-gray-50 rounded-r-xl overflow-hidden relative">
                  <div 
                    className={`h-full ${stage.color} rounded-r-xl transition-all duration-1000`} 
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-900 drop-shadow-sm">
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
            <button className="text-[#ff6b00] hover:text-[#e66000] text-sm font-bold">Ver tudo</button>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center z-10">
                  <FileText className="w-4 h-4 text-[#ff6b00]" />
                </div>
                <div className="w-px h-full bg-gray-200 my-1"></div>
              </div>
              <div className="pb-4 pt-1">
                <p className="text-sm font-bold text-gray-900 mb-0.5">Novo Formulário</p>
                <p className="text-sm text-gray-500">Pizzaria Donatello (Combo)</p>
                <span className="text-xs font-medium text-gray-400 mt-1 block">Há 10 min</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center z-10">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="w-px h-full bg-gray-200 my-1"></div>
              </div>
              <div className="pb-4 pt-1">
                <p className="text-sm font-bold text-gray-900 mb-0.5">Cliente Fechado</p>
                <p className="text-sm text-gray-500">Sabor & Cia assinou o contrato.</p>
                <span className="text-xs font-medium text-gray-400 mt-1 block">Há 1 hora</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center z-10">
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="pb-4 pt-1">
                <p className="text-sm font-bold text-gray-900 mb-0.5">Ligação Agendada</p>
                <p className="text-sm text-gray-500">Reunião com Hamburgueria do Zé.</p>
                <span className="text-xs font-medium text-gray-400 mt-1 block">Há 2 horas</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
