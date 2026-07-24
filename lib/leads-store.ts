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
 * Maps Supabase row (snake_case or camelCase) to LeadItem
 */
function mapSupabaseRowToLead(row: any): LeadItem {
  return {
    id: row.id || `lead_${Date.now()}`,
    restaurante: row.restaurante || row.empresa || '',
    contato: row.contato || row.nome || '',
    email: row.email || '',
    telefone: row.telefone || '',
    segmento: row.segmento || '',
    faturamento: row.faturamento || '',
    servico: row.servico || '',
    data: row.data || new Date().toLocaleDateString('pt-BR'),
    timestamp: row.timestamp ? Number(row.timestamp) : Date.now(),
    status: row.status || 'Novo',
    plano: row.plano || 'R$ 350,00',
    dias: row.dias || 0,
    crmStage: row.crm_stage || row.crmStage || 'lead-recebido',
    origem: row.origem || 'Orgânico / Site',
    tempoParadoDias: row.tempo_parado_dias ?? row.tempoParadoDias ?? 0,
    desconto: row.desconto || 0,
    valorMensal: row.valor_mensal ?? row.valorMensal ?? 0,
    motivoCancelamento: row.motivo_cancelamento || row.motivoCancelamento || '',
    tarefaPendente: row.tarefa_pendente || row.tarefaPendente || undefined
  }
}

/**
 * Maps LeadItem to Supabase insert/upsert row
 */
function mapLeadToSupabaseRow(lead: LeadItem) {
  return {
    id: lead.id,
    restaurante: lead.restaurante,
    contato: lead.contato,
    email: lead.email,
    telefone: lead.telefone,
    segmento: lead.segmento,
    faturamento: lead.faturamento,
    servico: lead.servico,
    data: lead.data,
    timestamp: lead.timestamp,
    status: lead.status,
    plano: lead.plano,
    dias: lead.dias,
    crm_stage: lead.crmStage,
    origem: lead.origem,
    tempo_parado_dias: lead.tempoParadoDias,
    desconto: lead.desconto,
    valor_mensal: lead.valorMensal,
    motivo_cancelamento: lead.motivoCancelamento,
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
