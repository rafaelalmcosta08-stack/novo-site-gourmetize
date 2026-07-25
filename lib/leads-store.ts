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

function notifyUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mub_leads_updated'))
    try {
      const channel = new BroadcastChannel('mub_leads_channel')
      channel.postMessage({ type: 'LEADS_UPDATED' })
      channel.close()
    } catch (e) {
      // BroadcastChannel not supported in some contexts
    }
  }
}

/**
 * Sync leads from Server API + Supabase directly to localStorage
 */
export async function syncLeadsFromSupabase(): Promise<LeadItem[]> {
  let localLeads = getStoredLeads()
  let apiLeads: LeadItem[] = []

  // 1. Fetch from Server API route
  try {
    const res = await fetch('/api/leads', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.leads)) {
        apiLeads = json.leads
      }
    }
  } catch (err) {
    console.warn('Erro ao buscar da API de leads:', err)
  }

  // 2. Fetch from Supabase if configured
  let supabaseLeads: LeadItem[] = []
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('timestamp', { ascending: false })

      if (!error && data && Array.isArray(data)) {
        supabaseLeads = data.map(mapSupabaseRowToLead)
      }
    } catch (err) {
      console.warn('Falha ao buscar do Supabase:', err)
    }
  }

  // 3. Merge all lead lists (local + api + supabase) by ID
  const mergedMap = new Map<string, LeadItem>()
  localLeads.forEach(item => mergedMap.set(item.id, item))
  apiLeads.forEach(item => mergedMap.set(item.id, item))
  supabaseLeads.forEach(item => mergedMap.set(item.id, item))

  const merged = Array.from(mergedMap.values()).sort((a, b) => b.timestamp - a.timestamp)

  // 4. Save merged back to localStorage and notify UI if count or content changed
  if (typeof window !== 'undefined') {
    const prevRaw = localStorage.getItem(STORAGE_KEY) || '[]'
    const newRaw = JSON.stringify(merged)
    if (prevRaw !== newRaw) {
      localStorage.setItem(STORAGE_KEY, newRaw)
      notifyUpdate()
    }
  }

  return merged
}

export async function saveLead(leadData: Omit<LeadItem, 'id' | 'timestamp' | 'data' | 'status' | 'crmStage'>): Promise<LeadItem> {
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
    dias: 0,
    origem: 'Orgânico / Site',
    tempoParadoDias: 0,
    desconto: 0,
    valorMensal: 0,
    motivoCancelamento: ''
  }

  // 1. Immediately update localStorage & notify UI
  const updated = [newLead, ...existing.filter(i => i.id !== newLead.id)]
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    notifyUpdate()
  }

  // 2. Save to Server API Route
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    })
  } catch (err) {
    console.error('Erro ao enviar lead para API server:', err)
  }

  // 3. Sync to Supabase in background
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const row = mapLeadToSupabaseRow(newLead)
      await supabase.from('leads').insert([row])
    } catch (err) {
      console.error('Erro na requisição Supabase:', err)
    }
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
    notifyUpdate()
  }

  // Update in API Route
  fetch('/api/leads', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: leadId, crmStage: newStage })
  }).catch(() => {})

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
    notifyUpdate()
  }

  // Delete from API Route
  fetch(`/api/leads?id=${leadId}`, { method: 'DELETE' }).catch(() => {})

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
    notifyUpdate()
  }

  // Reset API Route
  fetch('/api/leads', { method: 'DELETE' }).catch(() => {})

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
