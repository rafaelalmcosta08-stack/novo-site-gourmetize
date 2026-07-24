"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Filter, 
  Users, 
  Store, 
  Settings, 
  MoreHorizontal
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path !== '/dashboard' && pathname.startsWith(path)) return true;
    return false;
  }

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    if (active) {
      return "flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#ff6b00]/10 text-[#ff6b00] font-semibold group transition-colors"
    }
    return "flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors group"
  }

  return (
    <aside className="w-64 bg-[#111111] flex flex-col pt-6 pb-4 px-4 sticky top-0 flex-shrink-0 h-screen">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center flex-shrink-0">
          <Store className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Cozinha Digital</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" className={getLinkClasses('/dashboard')}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link href="/dashboard/preenchimentos" className={getLinkClasses('/dashboard/preenchimentos')}>
          <FileText className="w-5 h-5" />
          <span className="text-sm">Preenchimentos</span>
        </Link>
        
        <div className="py-2 mt-4">
          <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Vendas</div>
          <Link href="/dashboard/crm" className={getLinkClasses('/dashboard/crm')}>
            <Filter className="w-5 h-5" />
            <span className="text-sm">CRM Funil</span>
          </Link>
          <Link href="/dashboard/clientes" className={getLinkClasses('/dashboard/clientes')}>
            <Users className="w-5 h-5" />
            <span className="text-sm">Clientes</span>
          </Link>
          <Link href="/dashboard/restaurantes" className={getLinkClasses('/dashboard/restaurantes')}>
            <Store className="w-5 h-5" />
            <span className="text-sm">Restaurantes</span>
          </Link>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors w-full group">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Configurações</span>
        </button>
        <button className="flex items-center justify-between w-full p-2 mt-2 rounded-xl hover:bg-white/10 transition-colors text-left group">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" 
              alt="Gestor" 
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white leading-tight">Rafael Costa</span>
              <span className="text-xs text-gray-400 leading-tight">rafael@gourmetize</span>
            </div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </aside>
  )
}
