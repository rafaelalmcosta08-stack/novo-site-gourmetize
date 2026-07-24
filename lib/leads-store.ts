import { getSupabaseClient } from "./supabase"

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

const STORAGE_KEY = 'mub_dashboard_leads_v4_clean_zero'

export const DEFAULT_LEADS: LeadItem[] = []

export function getStoredLeads(): LeadItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      return []
    }
    const parsed: LeadItem[] = JSON.parse(raw)
    return parsed
  } catch (e) {
    return []
  }
}

/**
 * Sanitizes input string to prevent XSS and HTML injection
 */
function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return ''
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Maps Supabase row (snake_case or camelCase) to LeadItem with sanitization
 */
function mapSupabaseRowToLead(row: any): LeadItem {
  return {
    id: sanitizeInput(row.id || `lead_${Date.now()}`),
    restaurante: sanitizeInput(row.restaurante || row.empresa || ''),
    contato: sanitizeInput(row.contato || row.nome || ''),
    email: sanitizeInput(row.email || ''),
    telefone: sanitizeInput(row.telefone || ''),
    segmento: sanitizeInput(row.segmento || ''),
    faturamento: sanitizeInput(row.faturamento || ''),
    servico: sanitizeInput(row.servico || ''),
    data: sanitizeInput(row.data || new Date().toLocaleDateString('pt-BR')),
    timestamp: row.timestamp ? Number(row.timestamp) : Date.now(),
    status: (['Novo', 'Já contatado', 'Convertido em lead'].includes(row.status) ? row.status : 'Novo') as any,
    plano: sanitizeInput(row.plano || 'R$ 350,00'),
    dias: Number(row.dias || 0),
    crmStage: sanitizeInput(row.crm_stage || row.crmStage || 'lead-recebido'),
    origem: (['Instagram Ads', 'Google Ads', 'Indicação', 'Orgânico / Site', 'Outros'].includes(row.origem) ? row.origem : 'Orgânico / Site') as any,
    tempoParadoDias: Number(row.tempo_parado_dias ?? row.tempoParadoDias ?? 0),
    desconto: Number(row.desconto || 0),
    valorMensal: Number(row.valor_mensal ?? row.valorMensal ?? 0),
    motivoCancelamento: sanitizeInput(row.motivo_cancelamento || row.motivoCancelamento || ''),
    tarefaPendente: row.tarefa_pendente || row.tarefaPendente || undefined
  }
}

/**
 * Maps LeadItem to Supabase insert/upsert row
 */
function mapLeadToSupabaseRow(lead: LeadItem) {
  return {
    id: lead.id,
    restaurante: sanitizeInput(lead.restaurante),
    contato: sanitizeInput(lead.contato),
    email: sanitizeInput(lead.email),
    telefone: sanitizeInput(lead.telefone),
    segmento: sanitizeInput(lead.segmento),
    faturamento: sanitizeInput(lead.faturamento),
    servico: sanitizeInput(lead.servico),
    data: sanitizeInput(lead.data),
    timestamp: lead.timestamp,
    status: lead.status,
    plano: sanitizeInput(lead.plano || 'R$ 350,00'),
    dias: lead.dias,
    crm_stage: sanitizeInput(lead.crmStage || 'lead-recebido'),
    origem: lead.origem,
    tempo_parado_dias: lead.tempoParadoDias,
    desconto: lead.desconto,
    valor_mensal: lead.valorMensal,
    motivo_cancelamento: sanitizeInput(lead.motivoCancelamento || ''),
    tarefa_pendente: lead.tarefaPendente ? lead.tarefaPendente : null
  }
}

/**
 * Sync leads from Supabase directly to localStorage and trigger re-render
 */
export async function syncLeadsFromSupabase(): Promise<LeadItem[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return getStoredLeads()
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.warn('Erro ao buscar leads do Supabase:', error.message)
      return getStoredLeads()
    }

    if (data && Array.isArray(data)) {
      const remoteLeads = data.map(mapSupabaseRowToLead)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteLeads))
        window.dispatchEvent(new Event('mub_leads_updated'))
      }
      return remoteLeads
    }
  } catch (err) {
    console.warn('Falha na sincronização com Supabase:', err)
  }

  return getStoredLeads()
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

  // Sync to Supabase in background
  const supabase = getSupabaseClient()
  if (supabase) {
    supabase
      .from('leads')
      .insert([mapLeadToSupabaseRow(newLead)])
      .then(({ error }) => {
        if (error) {
          console.error('Erro ao salvar lead no Supabase:', error.message)
        } else {
          console.log('Lead salvo com sucesso no Supabase!')
        }
      })
      .catch(err => console.error('Erro na requisição Supabase:', err))
  }

  return newLead
}

export function updateLeadStage(leadId: string, newStage: string) {
  const existing = getStoredLeads()
  let targetLead: LeadItem | null = null
  const updated = existing.map(item => {
    if (item.id === leadId) {
      targetLead = { ...item, crmStage: newStage }
      return targetLead
    }
    return item
  })

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('mub_leads_updated'))
  }

  // Update in Supabase
  const supabase = getSupabaseClient()
  if (supabase && targetLead) {
    supabase
      .from('leads')
      .update({ crm_stage: newStage })
      .eq('id', leadId)
      .then(({ error }) => {
        if (error) console.error('Erro ao atualizar estágio no Supabase:', error.message)
      })
      .catch(err => console.error('Erro no Supabase:', err))
  }
}

export function deleteLead(leadId: string): void {
  const existing = getStoredLeads()
  const updated = existing.filter(item => item.id !== leadId)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('mub_leads_updated'))
  }

  // Delete from Supabase
  const supabase = getSupabaseClient()
  if (supabase) {
    supabase
      .from('leads')
      .delete()
      .eq('id', leadId)
      .then(({ error }) => {
        if (error) console.error('Erro ao excluir lead no Supabase:', error.message)
      })
      .catch(err => console.error('Erro no Supabase:', err))
  }
}

export function resetStoredLeads(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    window.dispatchEvent(new Event('mub_leads_updated'))
  }

  // Reset/Delete all in Supabase
  const supabase = getSupabaseClient()
  if (supabase) {
    supabase
      .from('leads')
      .delete()
      .neq('id', '0') // deletes all
      .then(({ error }) => {
        if (error) console.error('Erro ao resetar tabela no Supabase:', error.message)
      })
      .catch(err => console.error('Erro no Supabase:', err))
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
