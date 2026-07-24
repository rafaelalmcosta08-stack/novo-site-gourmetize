"use client"
import { useState, useEffect } from "react"
import { Search, Filter, Plus, MoreHorizontal, Clock, DollarSign, User, Phone, Tag } from "lucide-react"
import Link from "next/link"
import { getStoredLeads, updateLeadStage, LeadItem } from "@/lib/leads-store"

type StagesType = {
  [key: string]: {
    title: string;
    cards: LeadItem[];
  }
}

export default function CRMFunilPage() {
  const [stages, setStages] = useState<StagesType>({
    "lead-recebido": { title: "Lead Recebido", cards: [] },
    "contato-feito": { title: "Contato Feito", cards: [] },
    "proposta-enviada": { title: "Proposta Enviada", cards: [] },
    "negociacao": { title: "Negociação", cards: [] },
    "cliente-fechado": { title: "Cliente Fechado", cards: [] }
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [draggedItem, setDraggedItem] = useState<{ id: string, sourceCol: string } | null>(null)

  const loadData = () => {
    const leads = getStoredLeads()
    const newStages: StagesType = {
      "lead-recebido": { title: "Lead Recebido", cards: [] },
      "contato-feito": { title: "Contato Feito", cards: [] },
      "proposta-enviada": { title: "Proposta Enviada", cards: [] },
      "negociacao": { title: "Negociação", cards: [] },
      "cliente-fechado": { title: "Cliente Fechado", cards: [] }
    }

    leads.forEach((item) => {
      const stageKey = item.crmStage && newStages[item.crmStage] ? item.crmStage : "lead-recebido"
      newStages[stageKey].cards.push(item)
    })

    setStages(newStages)
  }

  useEffect(() => {
    loadData()
    const handleUpdate = () => loadData()
    window.addEventListener("mub_leads_updated", handleUpdate)
    return () => window.removeEventListener("mub_leads_updated", handleUpdate)
  }, [])

  const handleDragStart = (e: React.DragEvent, id: string, sourceCol: string) => {
    setDraggedItem({ id, sourceCol })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetCol: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.sourceCol === targetCol) return

    updateLeadStage(draggedItem.id, targetCol)
    setDraggedItem(null)
  }

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

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start">
        {Object.entries(stages).map(([colId, col]) => {
          const filteredCards = col.cards.filter((c) => {
            const term = searchTerm.toLowerCase()
            return (
              c.restaurante.toLowerCase().includes(term) ||
              c.contato.toLowerCase().includes(term) ||
              c.email.toLowerCase().includes(term) ||
              (c.telefone && c.telefone.includes(term))
            )
          })

          return (
            <div 
              key={colId} 
              className="flex-1 min-w-[280px] bg-gray-100/50 rounded-2xl p-4 border border-gray-200 flex flex-col max-h-full"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, colId)}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{col.title}</h3>
                <span className="bg-white text-gray-500 text-xs font-bold px-2 py-1 rounded-lg shadow-sm border border-gray-200">{filteredCards.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[150px]">
                {filteredCards.map(card => (
                  <div 
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id, colId)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-orange-300 hover:shadow-md transition-all group"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-[#ff6b00] transition-colors">{card.restaurante}</h4>
                        <button className="text-gray-400 hover:text-gray-900" onClick={e => e.preventDefault()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-1.5 mt-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                          <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{card.contato}</span>
                        </div>
                        {card.telefone && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span>{card.telefone}</span>
                          </div>
                        )}
                        {card.segmento && (
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                            <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{card.segmento}</span>
                          </div>
                        )}
                        {card.plano && (
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 pt-0.5">
                            <DollarSign className="w-3.5 h-3.5 text-[#ff6b00] shrink-0" />
                            {card.plano}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          <Clock className="w-3.5 h-3.5" />
                          {card.data}
                        </div>
                        {card.status && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wide bg-orange-50 text-[#ff6b00] px-2 py-0.5 rounded-full border border-orange-200">
                            {card.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
