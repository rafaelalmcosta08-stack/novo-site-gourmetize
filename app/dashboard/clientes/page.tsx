"use client"
import { Search, Filter, MoreHorizontal, Store, DollarSign, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ClientesPage() {
  const data = [
    { id: 1, restaurante: 'Sabor & Cia', plano: 'Combo', valor: 'R$ 350,00', data: '18/11/2024', status: 'Ativo' },
    { id: 2, restaurante: 'Cantina Bella', plano: 'SaaS Controle', valor: 'R$ 150,00', data: '10/10/2024', status: 'Ativo' },
    { id: 3, restaurante: 'Espetinho do João', plano: 'Cardápio Digital', valor: 'R$ 50,00', data: '05/09/2024', status: 'Atrasado' },
    { id: 4, restaurante: 'Padaria Central', plano: 'Combo', valor: 'R$ 350,00', data: '01/08/2024', status: 'Cancelado' },
  ]

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Ativo': return 'bg-green-50 text-green-700 border-green-200'
      case 'Atrasado': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'Cancelado': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Clientes</h2>
          <p className="text-sm text-gray-500 mt-1">Gerencie seus clientes com contratos fechados.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
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
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plano Contratado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Valor Mensal</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Início do Contrato</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Store className="w-4 h-4 text-[#ff6b00]" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{row.restaurante}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 font-medium">{row.plano}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                      {row.valor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {row.data}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/dashboard/crm/${row.id}`} className="inline-flex items-center gap-1.5 text-[#ff6b00] hover:text-[#e66000] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors font-bold">
                      Ver Detalhes
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
