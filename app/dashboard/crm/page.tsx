"use client"
import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, Clock, DollarSign, User } from "lucide-react"
import Link from "next/link"

type CardType = {
  id: string;
  restaurante: string;
  plano: string;
  contato: string;
  dias: number;
}

type StagesType = {
  [key: string]: {
    title: string;
    cards: CardType[];
  }
}

export default function CRMFunilPage() {
  const [stages, setStages] = useState<StagesType>({
    "lead-recebido": {
      title: "Lead Recebido",
      cards: [
        { id: "1", restaurante: "Pizzaria Donatello", plano: "R$ 350,00", contato: "Marcos Silva", dias: 2 },
        { id: "2", restaurante: "Temaki Express", plano: "R$ 150,00", contato: "Julio M", dias: 1 },
      ]
    },
    "contato-feito": {
      title: "Contato Feito",
      cards: [
        { id: "3", restaurante: "Sushi da Praça", plano: "R$ 350,00", contato: "Ana Lee", dias: 4 },
      ]
    },
    "proposta-enviada": {
      title: "Proposta Enviada",
      cards: [
        { id: "4", restaurante: "Burger King Centro", plano: "R$ 800,00", contato: "Carlos Dias", dias: 5 },
      ]
    },
    "negociacao": {
      title: "Negociação",
      cards: [
        { id: "5", restaurante: "Sabor & Cia", plano: "R$ 350,00", contato: "João Silva", dias: 7 },
      ]
    },
    "cliente-fechado": {
      title: "Cliente Fechado",
      cards: [
        { id: "6", restaurante: "Cantina Bella", plano: "R$ 350,00", contato: "Giuseppe", dias: 0 },
      ]
    }
  });

  const [draggedItem, setDraggedItem] = useState<{ id: string, sourceCol: string } | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string, sourceCol: string) => {
    setDraggedItem({ id, sourceCol });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCol: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.sourceCol === targetCol) return;

    const sourceColumn = stages[draggedItem.sourceCol];
    const targetColumn = stages[targetCol];
    const itemToMove = sourceColumn.cards.find(c => c.id === draggedItem.id);

    if (!itemToMove) return;

    setStages({
      ...stages,
      [draggedItem.sourceCol]: {
        ...sourceColumn,
        cards: sourceColumn.cards.filter(c => c.id !== draggedItem.id)
      },
      [targetCol]: {
        ...targetColumn,
        cards: [...targetColumn.cards, itemToMove]
      }
    });

    setDraggedItem(null);
  };

  return (
    <div className="p-8 h-full flex flex-col min-w-[1200px] xl:min-w-0">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">CRM Funil</h2>
          <p className="text-sm text-gray-500 mt-1">Acompanhe e movimente as oportunidades de negócio.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar lead..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 rounded-xl px-4 py-2 transition-colors font-bold shadow-sm bg-white">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button className="flex items-center gap-2 text-sm text-white bg-[#ff6b00] hover:bg-[#e66000] rounded-xl px-4 py-2 transition-colors font-bold shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start">
        {Object.entries(stages).map(([colId, col]) => (
          <div 
            key={colId} 
            className="flex-1 min-w-[280px] bg-gray-100/50 rounded-2xl p-4 border border-gray-200 flex flex-col max-h-full"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colId)}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{col.title}</h3>
              <span className="bg-white text-gray-500 text-xs font-bold px-2 py-1 rounded-lg shadow-sm border border-gray-200">{col.cards.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {col.cards.map(card => (
                <div 
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id, colId)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-orange-300 hover:shadow-md transition-all group"
                >
                  <Link href={`/dashboard/crm/${card.id}`} className="block">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-[#ff6b00] transition-colors">{card.restaurante}</h4>
                      <button className="text-gray-400 hover:text-gray-900" onClick={e => e.preventDefault()}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                        {card.plano}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        {card.contato}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <Clock className="w-3.5 h-3.5" />
                        {card.dias} dias
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
