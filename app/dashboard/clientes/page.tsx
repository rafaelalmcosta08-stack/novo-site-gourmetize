"use client"
import { Search, Filter, Store, Calendar, ExternalLink, Phone, Mail, UserCheck } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getStoredLeads, LeadItem } from "@/lib/leads-store"

export default function ClientesPage() {
  const [leads, setLeads] = useState<LeadItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const loadData = () => {
    setLeads(getStoredLeads())
  }

  useEffect(() => {
    loadData()
    const handleUpdate = () => loadData()
    window.addEventListener("mub_leads_updated", handleUpdate)
    return () => window.removeEventListener("mub_leads_updated", handleUpdate)
  }, [])

  // Filter leads that are in 'cliente-fechado' stage or status 'Convertido em lead'
  const clientes = leads.filter(l => l.crmStage === 'cliente-fechado' || l.status === 'Convertido em lead')

  const filteredClientes = clientes.filter((row) => {
    const term = searchTerm.toLowerCase()
    return (
      row.restaurante.toLowerCase().includes(term) ||
      row.contato.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term) ||
      (row.telefone && row.telefone.includes(term))
    )
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Clientes</h2>
          <p className="text-sm text-gray-500 mt-1">Gerencie seus clientes com contratos fechados ({clientes.length}).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 rounded-xl px-4 py-2 transition-colors font-bold shadow-sm bg-white">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredClientes.length === 0 ? (
          <div className="p-12 text-center">
            <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">Nenhum cliente fechado ainda</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-6">
              Arraste os cards de leads para a coluna <strong>&quot;Cliente Fechado&quot;</strong> no CRM para convertê-los automaticamente em clientes ativos aqui.
            </p>
            <Link 
              href="/dashboard/crm" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff6b00] text-white font-bold rounded-xl text-sm hover:bg-[#e66000] transition-colors"
            >
              Ver Funil do CRM
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Restaurante</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contato / WhatsApp</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plano / Serviço</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data do Fechamento</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClientes.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Store className="w-4 h-4 text-green-700" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-900 block">{row.restaurante}</span>
                          <span className="text-xs text-gray-400 font-medium">{row.segmento}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{row.contato}</span>
                        {row.telefone && (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {row.telefone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-800 font-semibold">{row.plano || row.servico || 'Análise Gratuita'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {row.data}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                        Ativo
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/crm`} className="inline-flex items-center gap-1.5 text-[#ff6b00] hover:text-[#e66000] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors font-bold">
                        Ver no CRM
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
