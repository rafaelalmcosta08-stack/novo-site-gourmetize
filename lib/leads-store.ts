export interface LeadItem {
  id: string
  restaurante: string
  contato: string
  email: string
  telefone: string
  segmento: string
  faturamento: string
  servico: string
  data: string
  timestamp: number
  status: 'Novo' | 'Já contatado' | 'Convertido em lead'
  plano?: string
  dias?: number
  crmStage?: string
}

const STORAGE_KEY = 'mub_dashboard_leads'

export const DEFAULT_LEADS: LeadItem[] = [
  {
    id: '1',
    restaurante: 'Pizzaria Donatello',
    contato: 'Marcos Silva',
    email: 'marcos@donatello.com',
    telefone: '(11) 98765-4321',
    segmento: 'Pizzarias',
    faturamento: '80 mil até 100 mil',
    servico: 'Combo',
    data: '23/07/2026',
    timestamp: Date.now() - 600000,
    status: 'Novo',
    plano: 'R$ 350,00',
    dias: 2,
    crmStage: 'lead-recebido'
  },
  {
    id: '2',
    restaurante: 'Sushi Express',
    contato: 'Ana Lee',
    email: 'ana@sushiexpress.com',
    telefone: '(11) 91234-5678',
    segmento: 'Restaurante japonês',
    faturamento: '50 mil até 80 mil',
    servico: 'Cardápio Digital',
    data: '22/07/2026',
    timestamp: Date.now() - 86400000,
    status: 'Já contatado',
    plano: 'R$ 150,00',
    dias: 1,
    crmStage: 'contato-feito'
  },
  {
    id: '3',
    restaurante: 'Burger King Centro',
    contato: 'Carlos Dias',
    email: 'carlos@bk.com',
    telefone: '(11) 97777-8888',
    segmento: 'Hamburguerias',
    faturamento: '250 mil até 400 mil',
    servico: 'SaaS de Controle',
    data: '21/07/2026',
    timestamp: Date.now() - 172800000,
    status: 'Convertido em lead',
    plano: 'R$ 800,00',
    dias: 5,
    crmStage: 'proposta-enviada'
  },
  {
    id: '4',
    restaurante: 'Sabor & Cia',
    contato: 'João Silva',
    email: 'joao@saborecia.com.br',
    telefone: '(11) 96666-5555',
    segmento: 'Restaurante comida brasileira',
    faturamento: '100 mil até 150 mil',
    servico: 'Combo',
    data: '15/11/2024',
    timestamp: Date.now() - 259200000,
    status: 'Convertido em lead',
    plano: 'R$ 350,00',
    dias: 7,
    crmStage: 'negociacao'
  }
]

export function getStoredLeads(): LeadItem[] {
  if (typeof window === 'undefined') return DEFAULT_LEADS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADS))
      return DEFAULT_LEADS
    }
    return JSON.parse(raw)
  } catch (e) {
    return DEFAULT_LEADS
  }
}

export function saveLead(leadData: Omit<LeadItem, 'id' | 'timestamp' | 'data' | 'status' | 'crmStage'>): LeadItem {
  const existing = getStoredLeads()
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const todayStr = `${day}/${month}/${year}`
  
  const newLead: LeadItem = {
    ...leadData,
    id: 'lead_' + Date.now(),
    timestamp: Date.now(),
    data: todayStr,
    status: 'Novo',
    crmStage: 'lead-recebido',
    plano: 'R$ 350,00',
    dias: 0
  }

  const updated = [newLead, ...existing]
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('mub_leads_updated'))
  }
  return newLead
}

export function updateLeadStage(leadId: string, newStage: string) {
  const existing = getStoredLeads()
  const updated = existing.map(item => {
    if (item.id === leadId) {
      return { ...item, crmStage: newStage }
    }
    return item
  })
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('mub_leads_updated'))
  }
}

export function formatSegmento(segmento: string): string {
  const map: Record<string, string> = {
    pizzaria: 'Pizzaria',
    hamburgueria: 'Hamburgueria',
    brasileira: 'Comida Brasileira',
    churrascaria: 'Churrascaria',
    japones: 'Restaurante Japonês',
    italiano: 'Italiano / Massas',
    arabe: 'Comida Árabe',
    acai: 'Açaí / Sorveteria',
    cafeteria: 'Cafeteria',
    doceria: 'Doceria',
    gastrobar: 'Gastrobar',
    outros: 'Outros'
  }
  return map[segmento.toLowerCase()] || segmento
}
