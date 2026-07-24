"use client"
import { Search, Filter, Store, Building2, MapPin, Briefcase } from "lucide-react"

export default function RestaurantesPage() {
  const data = [
    { id: 1, nome: 'Sabor & Cia', segmento: 'Hamburgueria', cidade: 'São Paulo, SP', porte: 'Médio', status: 'Cliente' },
    { id: 2, nome: 'Pizzaria Donatello', segmento: 'Pizzaria', cidade: 'Rio de Janeiro, RJ', porte: 'Pequeno', status: 'Lead' },
    { id: 3, nome: 'Sushi Express', segmento: 'Culinária Japonesa', cidade: 'Curitiba, PR', porte: 'Grande', status: 'Lead' },
    { id: 4, nome: 'Cantina Bella', segmento: 'Culinária Italiana', cidade: 'Belo Horizonte, MG', porte: 'Médio', status: 'Cliente' },
    { id: 5, nome: 'Burger King Centro', segmento: 'Fast Food', cidade: 'São Paulo, SP', porte: 'Grande', status: 'Lead' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Restaurantes</h2>
          <p className="text-sm text-gray-500 mt-1">Todas as empresas cadastradas (leads e clientes).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar restaurante..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 rounded-xl px-4 py-2 transition-colors font-bold shadow-sm bg-white">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                  <Store className="w-6 h-6 text-gray-400 group-hover:text-[#ff6b00] transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#ff6b00] transition-colors">{item.nome}</h3>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${item.status === 'Cliente' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Building2 className="w-4 h-4 text-gray-400" />
                {item.segmento}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                {item.cidade}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Briefcase className="w-4 h-4 text-gray-400" />
                Porte {item.porte}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
