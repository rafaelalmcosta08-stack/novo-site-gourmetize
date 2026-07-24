"use client"
import { Search, Filter, MoreHorizontal, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function PreenchimentosPage() {
  const data = [
    { id: 1, restaurante: 'Pizzaria Donatello', contato: 'Marcos Silva', email: 'marcos@donatello.com', servico: 'Combo', data: '23/07/2026', status: 'Novo' },
    { id: 2, restaurante: 'Sushi Express', contato: 'Ana Lee', email: 'ana@sushiexpress.com', servico: 'Cardápio Digital', data: '22/07/2026', status: 'Já contatado' },
    { id: 3, restaurante: 'Burger King', contato: 'Carlos Dias', email: 'carlos@bk.com', servico: 'SaaS de Controle', data: '21/07/2026', status: 'Convertido em lead' },
    { id: 4, restaurante: 'Sabor & Cia', contato: 'João Silva', email: 'joao@saborecia.com.br', servico: 'Combo', data: '15/11/2024', status: 'Convertido em lead' },
  ]

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
          <p className="text-sm text-gray-500 mt-1">Gerencie os formulários recebidos do site institucional.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar formulário..." 
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
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Serviço de Interesse</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{row.restaurante}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{row.contato}</span>
                      <span className="text-xs text-gray-500">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 font-medium">{row.servico}</span>
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
                    <Link href={`/dashboard/crm/${row.id}`} className="inline-flex items-center gap-1.5 text-[#ff6b00] hover:text-[#e66000] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors font-bold">
                      Abrir no CRM
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
