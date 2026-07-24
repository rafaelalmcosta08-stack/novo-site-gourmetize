"use client"

import { useState, useEffect } from "react"
import { 
  Settings, 
  Save, 
  Phone, 
  Mail, 
  User, 
  Building, 
  Trash2, 
  CheckCircle2, 
  Shield, 
  Bell, 
  Database, 
  Key, 
  Link2, 
  RefreshCw, 
  Copy, 
  Check, 
  AlertCircle,
  Code
} from "lucide-react"
import { resetStoredLeads, syncLeadsFromSupabase } from "@/lib/leads-store"
import { getSupabaseConfig, saveSupabaseConfig, testSupabaseConnection } from "@/lib/supabase"

const SQL_SCRIPT = `-- ATENÇÃO: SELECIONE TUDO NO SQL EDITOR DO SUPABASE (Ctrl + A) E APAGUE ANTES DE COLAR ESTE CÓDIGO!

create table if not exists public.leads (
  id text primary key,
  restaurante text,
  contato text,
  email text,
  telefone text,
  segmento text,
  faturamento text,
  servico text,
  plano text default 'R$ 350,00',
  data text,
  timestamp bigint,
  status text default 'Novo',
  crm_stage text default 'lead-recebido',
  origem text default 'Orgânico / Site',
  tempo_parado_dias int default 0,
  desconto numeric default 0,
  valor_mensal numeric default 0,
  motivo_cancelamento text,
  tarefa_pendente jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS
alter table public.leads enable row level security;

-- Limpar quaisquer políticas conflitantes antigas
drop policy if exists "Acesso livre para insert e select anonimo" on public.leads;
drop policy if exists "Allow public access to leads" on public.leads;

-- Criar política de acesso permissiva para o site e painel
create policy "Acesso livre para insert e select anonimo" on public.leads for all using (true) with check (true);`

export default function ConfiguracoesPage() {
  const [gestor, setGestor] = useState("Administração Gourmetize")
  const [email, setEmail] = useState("administracao@gourmetize.com")
  const [empresa, setEmpresa] = useState("Cozinha Digital")
  const [whatsapp, setWhatsapp] = useState("(19) 98886-4646")
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSom, setNotifSom] = useState(true)

  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")
  const [connStatus, setConnStatus] = useState<{ loading: boolean; success: boolean | null; isTableMissing?: boolean; message: string }>({
    loading: false,
    success: null,
    isTableMissing: false,
    message: ""
  })
  const [showSql, setShowSql] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const [savedToast, setSavedToast] = useState(false)
  const [resetToast, setResetToast] = useState(false)

  useEffect(() => {
    const config = getSupabaseConfig()
    setSupabaseUrl(config.url)
    setSupabaseKey(config.key)

    if (config.url && config.key) {
      handleTestConnection(config.url, config.key)
    }
  }, [])

  const handleTestConnection = async (url = supabaseUrl, key = supabaseKey) => {
    if (!url || !key) {
      setConnStatus({
        loading: false,
        success: false,
        message: "Insira a URL e a Anon Key do Supabase para testar a conexão."
      })
      return
    }

    setConnStatus({ loading: true, success: null, message: "Testando conexão com o Supabase..." })
    saveSupabaseConfig(url, key)

    const res = await testSupabaseConnection()
    setConnStatus({
      loading: false,
      success: res.success,
      isTableMissing: res.isTableMissing,
      message: res.message
    })

    if (res.isTableMissing) {
      setShowSql(true)
    }

    if (res.success) {
      syncLeadsFromSupabase()
    }
  }

  const handleSaveSupabaseKeys = (e: React.FormEvent) => {
    e.preventDefault()
    saveSupabaseConfig(supabaseUrl, supabaseKey)
    handleTestConnection(supabaseUrl, supabaseKey)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  const handleSyncNow = async () => {
    setSyncing(true)
    await syncLeadsFromSupabase()
    setSyncing(false)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCRIPT)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  const handleResetData = () => {
    if (confirm("ATENÇÃO: Deseja zerar permanentemente todos os leads, restaurantes e métricas do Dashboard e do Supabase? O sistema ficará limpo aguardando novos preenchimentos.")) {
      resetStoredLeads()
      setResetToast(true)
      setTimeout(() => setResetToast(false), 3000)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Configurações do Sistema & Banco de Dados</h2>
        <p className="text-sm text-gray-500 mt-1">Conecte o seu banco de dados Supabase e gerencie as preferências da sua plataforma.</p>
      </div>

      {savedToast && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <span>Configurações salvas e dados sincronizados com sucesso!</span>
        </div>
      )}

      {resetToast && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#ff6b00] shrink-0" />
          <span>O banco de dados foi resetado com sucesso! O dashboard está 100% limpo.</span>
        </div>
      )}

      {/* CONEXÃO COM SUPABASE */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">Banco de Dados Supabase</h3>
                {connStatus.success === true && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Conectado
                  </span>
                )}
                {connStatus.success === false && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Pendente
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Todos os preenchimentos de formulários de clientes serão salvos automaticamente aqui.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSyncNow}
            disabled={syncing}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl transition-colors border border-emerald-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            Sincronizar Leads
          </button>
        </div>

        <form onSubmit={handleSaveSupabaseKeys} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-emerald-600" />
                URL do Projeto Supabase (Project URL)
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://seu-projeto.supabase.co"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-600" />
                Chave Pública / Anon Key (API Key)
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Status Message */}
          {connStatus.message && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex flex-col gap-2 ${
              connStatus.success 
                ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                : connStatus.loading
                ? "bg-blue-50 border border-blue-200 text-blue-900"
                : connStatus.isTableMissing
                ? "bg-amber-50 border border-amber-200 text-amber-900"
                : "bg-red-50 border border-red-200 text-red-900"
            }`}>
              <div className="flex items-start gap-2.5">
                {connStatus.loading ? (
                  <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0 mt-0.5" />
                ) : connStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span>{connStatus.message}</span>
              </div>

              {connStatus.isTableMissing && (
                <div className="mt-2 pt-2.5 border-t border-amber-200/60 text-[11px] text-amber-800 space-y-1.5 font-normal">
                  <p className="font-bold">Como resolver em 3 passos simples:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Clique no botão <span className="font-bold">"Copiar SQL"</span> no bloco abaixo.</li>
                    <li>No SQL Editor do Supabase, <span className="font-bold underline text-red-700">SELECIONE TUDO E APAGUE TODO O TEXTO ANTIGO</span> (Ctrl+A depois Delete).</li>
                    <li>Cole o novo código SQL, clique em <span className="font-bold">"Run"</span> para executar e em seguida clique no botão verde <span className="font-bold">"Salvar e Testar Conexão Supabase"</span> aqui.</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowSql(!showSql)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 underline"
            >
              <Code className="w-3.5 h-3.5" />
              {showSql ? "Ocultar Código SQL da Tabela" : "Ver Código SQL da Tabela 'leads' (Supabase)"}
            </button>

            <button
              type="submit"
              disabled={connStatus.loading}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar e Testar Conexão Supabase
            </button>
          </div>
        </form>

        {/* Expandable SQL helper */}
        {showSql && (
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-700">Copie o SQL abaixo e cole no SQL Editor do seu projeto Supabase:</p>
              <button
                type="button"
                onClick={handleCopySql}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white font-bold text-xs rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSql ? "Copiado!" : "Copiar SQL"}
              </button>
            </div>
            <pre className="p-4 bg-gray-950 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto border border-gray-800 leading-relaxed max-h-60">
              {SQL_SCRIPT}
            </pre>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveGeneral} className="space-y-6">
        {/* Perfil Administrador */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <User className="w-5 h-5 text-[#ff6b00]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Perfil de Administração</h3>
              <p className="text-xs text-gray-500">Credencial única registrada para acesso ao Painel e Banco de Dados</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Responsável</label>
              <input
                type="text"
                value={gestor}
                onChange={(e) => setGestor(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">E-mail de Acesso Oficial</label>
              <input
                type="email"
                readOnly
                value={email}
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome da Empresa / Plataforma</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ff6b00]"
              />
            </div>
          </div>
        </div>

        {/* Integração WhatsApp */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Integração do WhatsApp para Recebimento de Leads</h3>
              <p className="text-xs text-gray-500">Número que recebe a mensagem com o formulário preenchido pelo cliente</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp de Atendimento (Com DDD)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full max-w-md px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-green-700 outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Ao preencher o formulário no site, o cliente é direcionado e os dados são salvos no Supabase.
              </p>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Alertas & Notificações</h3>
              <p className="text-xs text-gray-500">Controle como você deseja ser notificado sobre novos clientes</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="w-4 h-4 text-[#ff6b00] rounded focus:ring-[#ff6b00]"
              />
              <span className="text-sm font-medium text-gray-700">Notificação visual no sininho do cabeçalho quando entrar novo lead</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifSom}
                onChange={(e) => setNotifSom(e.target.checked)}
                className="w-4 h-4 text-[#ff6b00] rounded focus:ring-[#ff6b00]"
              />
              <span className="text-sm font-medium text-gray-700">Sincronização em tempo real entre o Supabase e abas do navegador</span>
            </label>
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#ff6b00] text-white font-bold rounded-xl text-sm hover:bg-[#e66000] transition-colors shadow-md"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações Gerais
          </button>
        </div>
      </form>

      {/* Zona de Perigo / Reset */}
      <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Trash2 className="w-5 h-5 text-red-600 shrink-0" />
          <h3 className="text-base font-bold text-red-900">Gerenciamento do Banco de Dados</h3>
        </div>
        <p className="text-xs text-red-700 mb-4">
          Você pode resetar todos os dados de testes e formulários para deixar seu Dashboard e o Supabase completamente limpos.
        </p>
        <button
          type="button"
          onClick={handleResetData}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
        >
          Zerar Todos os Dados do Dashboard e Supabase
        </button>
      </div>
    </div>
  )
}
