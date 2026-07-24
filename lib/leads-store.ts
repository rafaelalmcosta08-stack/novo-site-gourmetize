export interface TarefaItem {
  id: string
  descricao: string
  vencimento: string
  atrasado: boolean
  concluida?: boolean
}

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
  origem?: 'Instagram Ads' | 'Google Ads' | 'Indicação' | 'Orgânico / Site' | 'Outros'
  tempoParadoDias?: number
  desconto?: number
  valorMensal?: number
  motivoCancelamento?: string
  tarefaPendente?: TarefaItem
}

const STORAGE_KEY = 'mub_dashboard_leads_v3_real'

export const DEFAULT_LEADS: LeadItem[] = [
  {
    id: 'lead_def_1',
    restaurante: 'Pizzaria Napoli',
    contato: 'Marcos Vinicius',
    email: 'marcos@napolipizza.com.br',
    telefone: '(19) 99182-7364',
    segmento: 'Pizzaria',
    faturamento: '80 mil até 100 mil',
    servico: 'Combo Gestão Completa',
    plano: 'R$ 450,00',
    valorMensal: 450,
    data: '12/07/2026',
    timestamp: Date.now() - 1000000000,
    status: 'Convertido em lead',
    crmStage: 'cliente-fechado',
    origem: 'Instagram Ads',
    tempoParadoDias: 0
  },
  {
    id: 'lead_def_2',
    restaurante: 'Sabor & Arte Resto',
    contato: 'Camila Rocha',
    email: 'camila@saborarte.com.br',
    telefone: '(19) 98234-5511',
    segmento: 'Comida Brasileira',
    faturamento: '100 mil até 150 mil',
    servico: 'Combo Premium',
    plano: 'R$ 650,00',
    valorMensal: 650,
    data: '15/07/2026',
    timestamp: Date.now() - 800000000,
    status: 'Convertido em lead',
    crmStage: 'cliente-fechado',
    origem: 'Indicação',
    tempoParadoDias: 0
  },
  {
    id: 'lead_def_3',
    restaurante: 'Burger House Gourmet',
    contato: 'Lucas Andrade',
    email: 'lucas@burgerhouse.com',
    telefone: '(19) 97711-2233',
    segmento: 'Hamburgueria',
    faturamento: '50 mil até 80 mil',
    servico: 'SaaS de Controle',
    plano: 'R$ 350,00',
    valorMensal: 350,
    desconto: 50,
    data: '18/07/2026',
    timestamp: Date.now() - 500000000,
    status: 'Já contatado',
    crmStage: 'negociacao',
    origem: 'Google Ads',
    tempoParadoDias: 8,
    tarefaPendente: {
      id: 't1',
      descricao: 'Enviar minuta de contrato com R$ 50 de desconto aprovado',
      vencimento: 'Hoje',
      atrasado: false
    }
  },
  {
    id: 'lead_def_4',
    restaurante: 'Yuki Sushi Bar',
    contato: 'Hiroshi Tanaka',
    email: 'hiroshi@yukisushi.com.br',
    telefone: '(11) 99882-1144',
    segmento: 'Restaurante Japonês',
    faturamento: '150 mil até 250 mil',
    servico: 'Cardápio Digital + SaaS',
    plano: 'R$ 800,00',
    valorMensal: 800,
    desconto: 100,
    data: '10/07/2026',
    timestamp: Date.now() - 1200000000,
    status: 'Já contatado',
    crmStage: 'proposta-enviada',
    origem: 'Instagram Ads',
    tempoParadoDias: 12,
    tarefaPendente: {
      id: 't2',
      descricao: 'Cobrar resposta sobre a proposta comercial do plano Pro',
      vencimento: 'Ontem',
      atrasado: true
    }
  },
  {
    id: 'lead_def_5',
    restaurante: 'Café & Aroma',
    contato: 'Juliana Martins',
    email: 'juliana@cafearoma.com.br',
    telefone: '(19) 99345-6789',
    segmento: 'Cafeteria',
    faturamento: '30 mil até 50 mil',
    servico: 'Cardápio Digital',
    plano: 'R$ 250,00',
    valorMensal: 250,
    data: '14/07/2026',
    timestamp: Date.now() - 900000000,
    status: 'Novo',
    crmStage: 'contato-feito',
    origem: 'Orgânico / Site',
    tempoParadoDias: 9,
    tarefaPendente: {
      id: 't3',
      descricao: 'Agendar reunião online para apresentação do módulo de comandas',
      vencimento: 'Amanhã',
      atrasado: false
    }
  },
  {
    id: 'lead_def_6',
    restaurante: 'Cantina Bella Pasta',
    contato: 'Giovanni Rossi',
    email: 'giovanni@bellapasta.com',
    telefone: '(11) 98123-4567',
    segmento: 'Italiano / Massas',
    faturamento: '80 mil até 100 mil',
    servico: 'Análise de Cardápio',
    plano: 'R$ 350,00',
    valorMensal: 350,
    data: '22/07/2026',
    timestamp: Date.now() - 100000000,
    status: 'Novo',
    crmStage: 'lead-recebido',
    origem: 'Instagram Ads',
    tempoParadoDias: 2
  },
  {
    id: 'lead_def_7',
    restaurante: 'Bistrô Parisiense',
    contato: 'Renan Dupont',
    email: 'renan@bistroparis.com',
    telefone: '(19) 98877-6655',
    segmento: 'Outros',
    faturamento: '50 mil até 80 mil',
    servico: 'Cardápio Digital',
    plano: 'R$ 350,00',
    valorMensal: 350,
    data: '05/07/2026',
    timestamp: Date.now() - 1500000000,
    status: 'Novo',
    crmStage: 'cancelado',
    motivoCancelamento: 'Troca de sistema para solução legada de PDV local',
    origem: 'Outros',
    tempoParadoDias: 0
  }
]

export function getStoredLeads(): LeadItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADS))
      return DEFAULT_LEADS
    }
    const parsed: LeadItem[] = JSON.parse(raw)
    // Filter out artificial legacy test leads if any remain
    const cleanLeads = parsed.filter(item => 
      item.id !== '1' && 
      item.id !== '2' && 
      item.id !== '3' && 
      item.id !== '4' && 
      item.restaurante !== 'Pizzaria Donatello' &&
      item.restaurante !== 'Sabor & Cia' &&
      item.restaurante !== 'Sushi Express' &&
      item.restaurante !== 'Burger King Centro' &&
      item.restaurante !== 'Cantina Bella'
    )
    if (cleanLeads.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanLeads))
    }
    return cleanLeads
  } catch (e) {
    return DEFAULT_LEADS
  }
}

export function deleteLead(leadId: string): void {
  const existing = getStoredLeads()
  const updated = existing.filter(item => item.id !== leadId)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('mub_leads_updated'))
  }
}

export function resetStoredLeads(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    window.dispatchEvent(new Event('mub_leads_updated'))
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
