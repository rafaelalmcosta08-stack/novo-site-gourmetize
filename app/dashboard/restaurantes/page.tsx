"use client"
import { Search, Filter, Store, Building2, MapPin, Briefcase, Phone, Mail, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { getStoredLeads, LeadItem } from "@/lib/leads-store"
import Link from "next/link"

export default function RestaurantesPage() {
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

  const filtered = leads.filter((item) => {
    const term = searchTerm.toLowerCase()
    return (
      item.restaurante.toLowerCase().includes(term) ||
      item.contato.toLowerCase().includes(term) ||
      item.segmento.toLowerCase().includes(term) ||
      (item.email && item.email.toLowerCase().includes(term))
    )
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Restaurantes</h2>
          <p className="text-sm text-gray-500 mt-1">Todas as empresas cadastradas pelo formulário ou CRM ({leads.length}).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar restaurante..." 
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

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
          <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">Nenhum restaurante cadastrado</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-6">
            Quando os clientes preencherem o formulário de solicitação no site, os restaurantes aparecerão automaticamente nesta lista.
          </p>
          <Link 
            href="/#analise" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff6b00] text-white font-bold rounded-xl text-sm hover:bg-[#e66000] transition-colors"
          >
            Ir para o Formulário no Site
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isCliente = item.crmStage === 'cliente-fechado' || item.status === 'Convertido em lead'
            return (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-[#ff6b00] group-hover:border-[#ff6b00] transition-colors">
                      <Store className="w-6 h-6 text-[#ff6b00] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#ff6b00] transition-colors">{item.restaurante}</h3>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${isCliente ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#ff6b00]'}`}>
                        {isCliente ? 'Cliente Fechado' : 'Lead'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Segmento: {item.segmento || item.servico || 'Restaurante'}</span>
                  </div>
                  {item.contato && (
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                      <span className="font-bold text-gray-400">Contato:</span>
                      <span>{item.contato}</span>
                    </div>
                  )}
                  {item.telefone && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.telefone}</span>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 truncate">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </div>
                  )}
                  {item.faturamento && (
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>Faturamento: {item.faturamento}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400 pt-1">
                    <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                    <span>Cadastrado em {item.data}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
