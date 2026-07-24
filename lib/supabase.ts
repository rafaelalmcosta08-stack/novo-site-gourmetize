import { createClient, SupabaseClient } from '@supabase/supabase-js'

export interface SupabaseConfig {
  url: string
  key: string
}

export function getSupabaseConfig(): SupabaseConfig {
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('mub_supabase_url') || ''
    const localKey = localStorage.getItem('mub_supabase_key') || ''
    if (localUrl && localKey) {
      return { url: localUrl, key: localKey }
    }
  }

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  return { url: envUrl, key: envKey }
}

export function saveSupabaseConfig(url: string, key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mub_supabase_url', url.trim())
    localStorage.setItem('mub_supabase_key', key.trim())
    // Dispatch event to notify listeners
    window.dispatchEvent(new Event('mub_supabase_config_changed'))
  }
}

let cachedClient: SupabaseClient | null = null
let cachedUrl = ''
let cachedKey = ''

export function getSupabaseClient(): SupabaseClient | null {
  const { url, key } = getSupabaseConfig()

  if (!url || !key) {
    return null
  }

  if (cachedClient && cachedUrl === url && cachedKey === key) {
    return cachedClient
  }

  try {
    cachedUrl = url
    cachedKey = key
    cachedClient = createClient(url, key)
    return cachedClient
  } catch (error) {
    console.error('Erro ao inicializar cliente do Supabase:', error)
    return null
  }
}

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { 
      success: false, 
      message: 'Chaves do Supabase não configuradas. Insira a URL e a Anon Key no painel.' 
    }
  }

  try {
    const { data, error } = await supabase.from('leads').select('id').limit(1)
    if (error) {
      if (error.code === '42P01') {
        return {
          success: false,
          message: 'Conectado ao Supabase, mas a tabela "leads" ainda não foi criada. Crie a tabela executando o SQL fornecido abaixo.'
        }
      }
      return {
        success: false,
        message: `Erro na conexão com Supabase: ${error.message}`
      }
    }
    return {
      success: true,
      message: 'Conexão com o Supabase estabelecida e testada com sucesso!'
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Falha ao conectar: ${err.message || 'Erro desconhecido'}`
    }
  }
}
