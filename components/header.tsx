import { Search, Gift, Bell, ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 px-8 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex-1 max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="block w-full pl-10 pr-12 py-2 border-none rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-[#1b4b3e] focus:bg-white transition-colors outline-none"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-xs font-medium border border-gray-200 rounded px-1.5 py-0.5">⌘ K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Gift className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" 
            alt="James Passaquindici" 
            className="w-7 h-7 rounded-full object-cover"
          />
          <div className="flex flex-col text-left mr-1">
            <span className="text-sm font-semibold text-gray-900 leading-tight">James Passaquindici</span>
            <span className="text-xs text-gray-500 leading-tight">ID: 4827682</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  )
}
