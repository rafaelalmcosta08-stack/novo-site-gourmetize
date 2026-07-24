import { Home, PlusSquare, Workflow, CreditCard, Bot, Blocks, Lock, ChevronDown, ChevronsUpDown } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col pt-6 pb-4 px-4 sticky top-0">
      <div className="flex items-center mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#1b4b3e]">emitly</h1>
      </div>

      <button className="flex items-center justify-between w-full p-2 mb-6 rounded-xl hover:bg-gray-50 text-left transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-tight">My Workspace</span>
            <span className="text-xs text-gray-500 leading-tight">Free plan</span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      <nav className="flex-1 space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#e6f4d0] text-gray-900 font-semibold group">
          <Home className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
          <span className="text-sm">Overview</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
          <PlusSquare className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
          <span className="text-sm font-medium">Create campaign</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
          <Workflow className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
          <span className="text-sm font-medium">Automation</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
          <CreditCard className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
          <span className="text-sm font-medium">Subscriptions</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
          <Bot className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
          <span className="text-sm font-medium">AI Chatbot</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
          <Blocks className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
          <span className="text-sm font-medium">Integrations</span>
        </a>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <button className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" 
              alt="James Passaquindici" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 leading-tight">James Passaquindici</span>
              <span className="text-xs text-gray-500 leading-tight">jamespass@emi.com</span>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </aside>
  )
}
