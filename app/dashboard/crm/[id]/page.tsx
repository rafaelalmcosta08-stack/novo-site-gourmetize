"use client"
import { useState } from "react"
import { 
  FileText, 
  Store, 
  CheckCircle2, 
  Check,
  Search,
  MoreHorizontal,
  PhoneCall,
  Calendar,
  Building2,
  MapPin,
  Briefcase,
  Mail,
  Plus,
  Clock,
  Trash2
} from "lucide-react"

export default function LeadDetailsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'notes'>('overview')

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* CENTER MAIN PANEL */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto">
          
          {/* Title & Tabs */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Restaurante Sabor & Cia — Contrato Cardápio Digital</h2>
            
            <div className="flex items-center gap-6 border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-bold px-1 transition-colors ${activeTab === 'overview' ? 'text-[#ff6b00] border-b-2 border-[#ff6b00]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Visão Geral
              </button>
              <button 
                onClick={() => setActiveTab('tasks')}
                className={`pb-3 text-sm font-bold px-1 transition-colors ${activeTab === 'tasks' ? 'text-[#ff6b00] border-b-2 border-[#ff6b00]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Tarefas
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`pb-3 text-sm font-bold px-1 transition-colors ${activeTab === 'notes' ? 'text-[#ff6b00] border-b-2 border-[#ff6b00]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Notas
              </button>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Funnel Stages */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-gray-900">Estágios</h3>
                  <button className="px-4 py-2 bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Avançar Estágio
                  </button>
                </div>
                
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                  
                  {[
                    { label: "Lead Recebido", status: "completed" },
                    { label: "Contato Feito", status: "completed" },
                    { label: "Proposta Enviada", status: "completed" },
                    { label: "Negociação", status: "current" },
                    { label: "Cliente Fechado", status: "upcoming" }
                  ].map((stage, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                      {stage.status === 'completed' && (
                        <div className="w-6 h-6 rounded-full bg-[#111111] flex items-center justify-center text-white ring-4 ring-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {stage.status === 'current' && (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-[#ff6b00] flex items-center justify-center ring-4 ring-white">
                          <div className="w-2 h-2 rounded-full bg-[#ff6b00]"></div>
                        </div>
                      )}
                      {stage.status === 'upcoming' && (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white">
                        </div>
                      )}
                      <span className={`text-xs font-semibold ${stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>
                        {stage.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details & Financials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-5">Detalhes do Cliente</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">ID do Lead</span>
                      <span className="text-sm font-medium text-gray-900">LD-001</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Segmento</span>
                      <span className="text-sm font-medium text-gray-900">Hamburgueria</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Data Prevista</span>
                      <span className="text-sm font-medium text-gray-900">05/12/2024</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Probabilidade</span>
                      <span className="text-sm font-bold text-[#ff6b00]">70%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-5">Financeiro</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Valor Contratado</span>
                      <span className="text-sm font-medium text-gray-900">R$ 350,00/mês</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Desconto</span>
                      <span className="text-sm font-medium text-gray-900">10%</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Plano/Serviço</span>
                      <span className="text-sm font-medium text-gray-900">Combo (Cardápio + Controle)</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wider">Valor Concorrente</span>
                      <span className="text-sm font-medium text-gray-900 line-through text-gray-400">R$ 400,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-gray-900">Atividade</h3>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors font-medium">
                      <Calendar className="w-4 h-4" />
                      Filtrar Data
                    </button>
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Buscar atividade..." 
                        className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors w-48"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center z-10">
                        <FileText className="w-4 h-4 text-[#ff6b00]" />
                      </div>
                      <div className="w-px h-full bg-gray-200 my-1"></div>
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Formulário de Interesse preenchido</p>
                      <p className="text-sm text-gray-500">O cliente entrou pelo site e preencheu o formulário para o Combo.</p>
                      <span className="text-xs font-medium text-gray-400 mt-2 block">15 Nov, 2024 às 10:00</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center z-10">
                        <PhoneCall className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="w-px h-full bg-gray-200 my-1"></div>
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Ligação de Descoberta realizada</p>
                      <p className="text-sm text-gray-500">Rafael conversou com João Silva para entender as necessidades da hamburgueria.</p>
                      <span className="text-xs font-medium text-gray-400 mt-2 block">16 Nov, 2024 às 14:30</span>
                    </div>
                  </div>

                   <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center z-10">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Proposta Comercial enviada</p>
                      <p className="text-sm text-gray-500">Proposta enviada por e-mail com 10% de desconto no primeiro semestre.</p>
                      <span className="text-xs font-medium text-gray-400 mt-2 block">18 Nov, 2024 às 09:15</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tasks' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-900">Tarefas</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
                  Nova Tarefa
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Ligar para confirmar reunião', assignee: 'Rafael Costa', due: 'Hoje', done: false },
                  { title: 'Enviar modelo de contrato', assignee: 'Rafael Costa', due: 'Amanhã', done: false },
                  { title: 'Qualificar o lead (BANT)', assignee: 'Rafael Costa', due: 'Ontem', done: true },
                ].map((task, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${task.done ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        defaultChecked={task.done} 
                        className="w-5 h-5 rounded border-gray-300 text-[#ff6b00] focus:ring-[#ff6b00]"
                      />
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${task.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                            <Store className="w-3.5 h-3.5" /> {task.assignee}
                          </span>
                          <span className={`flex items-center gap-1 text-xs font-bold ${task.done ? 'text-gray-400' : task.due === 'Ontem' ? 'text-red-600' : 'text-[#ff6b00]'}`}>
                            <Clock className="w-3.5 h-3.5" /> {task.due}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-6">Notas</h3>
              
              <div className="mb-8">
                <textarea 
                  rows={4}
                  placeholder="Adicione uma observação sobre o lead..."
                  className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors resize-none"
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button className="px-5 py-2 bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Salvar Nota
                  </button>
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#ff6b00] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">Rafael Costa</h4>
                      <time className="text-xs font-medium text-gray-400">Ontem, 16:45</time>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Cliente pediu para revermos o valor da implantação do cardápio digital. Argumentei sobre o suporte incluso e ele pareceu receptivo. Ligar novamente na sexta-feira.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">Rafael Costa</h4>
                      <time className="text-xs font-medium text-gray-400">14 Nov, 10:12</time>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Lead entrou pelo formulário de contato do site. Procurando solução urgente porque o sistema atual vive caindo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RIGHT PANEL - Contacts & Company */}
      <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contatos</h3>
              <button className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border border-orange-200 bg-orange-50/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#ff6b00] uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded-full">Contato Principal</span>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" 
                    alt="João Silva" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">João Silva</h4>
                    <p className="text-xs text-gray-500 font-medium">Proprietário</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    joao@saborecia.com.br
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
                    (11) 98765-4321
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full">Resp. Decisão</span>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
                    alt="Maria Souza" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Maria Souza</h4>
                    <p className="text-xs text-gray-500 font-medium">Gerente Geral</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    maria@saborecia.com.br
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
                    (11) 91234-5678
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Empresa</h3>
              <button className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Store className="w-5 h-5 text-[#ff6b00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Sabor & Cia</h4>
                  <p className="text-xs font-medium text-gray-500">Restaurante / Fast Food</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                    <Building2 className="w-3.5 h-3.5" /> Segmento
                  </span>
                  <span className="text-sm font-medium text-gray-900">Hamburgueria</span>
                </div>
                <div>
                  <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                    <MapPin className="w-3.5 h-3.5" /> Localização
                  </span>
                  <span className="text-sm font-medium text-gray-900">São Paulo, SP</span>
                </div>
                <div>
                  <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                    <Briefcase className="w-3.5 h-3.5" /> Porte
                  </span>
                  <span className="inline-block text-xs font-bold text-[#ff6b00] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                    Médio (15-50 func.)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
