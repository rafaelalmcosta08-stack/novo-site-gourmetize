"use client"
import { Search, Filter, ExternalLink, Phone } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getStoredLeads, LeadItem } from "@/lib/leads-store"

export default function PreenchimentosPage() {
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

  const filteredLeads = leads.filter((item) => {
    const term = searchTerm.toLowerCase()
    return (
      item.restaurante.toLowerCase().includes(term) ||
      item.contato.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.segmento.toLowerCase().includes(term) ||
      (item.telefone && item.telefone.includes(term))
    )
  })

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Novo': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Já contatado': return 'bg-orange-50 text-[#ff6b00] border-orange-200'
      case 'Convertido em lead': return 'bg-green-50 text-green-700 border-green-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Preenchimentos</h2>
          <p className="text-sm text-gray-500 mt-1">Gerencie os formulários recebidos do site institucional ({leads.length} recebidos).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar formulário..." 
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Restaurante</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contato / WhatsApp</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Segmento / Serviço</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    Nenhum formulário encontrado.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{row.restaurante}</span>
                        {row.faturamento && (
                          <span className="text-xs text-gray-400 font-medium">Fat: {row.faturamento}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{row.contato}</span>
                        <span className="text-xs text-gray-500">{row.email}</span>
                        {row.telefone && (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {row.telefone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 font-medium">{row.segmento || row.servico}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 font-medium">{row.data}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/crm`} className="inline-flex items-center gap-1.5 text-[#ff6b00] hover:text-[#e66000] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors font-bold">
                        Abrir no CRM
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
