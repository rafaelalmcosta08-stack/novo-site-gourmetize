"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Filter, 
  Users, 
  Store, 
  Settings, 
  MoreHorizontal,
  LogOut,
  User,
  ShieldCheck,
  Globe
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    setShowProfileMenu(false)
    localStorage.setItem("mub_auth_authenticated", "false")
    window.location.href = "/"
  }

  return (
    <aside className="w-64 bg-[#111111] flex flex-col pt-6 pb-4 px-4 sticky top-0 flex-shrink-0 h-screen z-30">
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

      <div className="mt-auto pt-4 border-t border-white/10 space-y-1 relative" ref={menuRef}>
        <Link href="/dashboard/configuracoes" className={getLinkClasses('/dashboard/configuracoes')}>
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Configurações</span>
        </Link>

        {/* Floating Menu Popover */}
        {showProfileMenu && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-[#1c1c1c] border border-white/15 rounded-2xl p-2 shadow-2xl z-50 text-white animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ff6b00]" />
                <span className="text-xs font-bold text-gray-300">Sessão Ativa</span>
              </div>
              <p className="text-xs font-semibold text-white mt-1">Administração Gourmetize</p>
              <p className="text-[11px] text-gray-400 truncate">administracao@gourmetize.com</p>
            </div>

            <div className="py-1">
              <Link 
                href="/" 
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <Globe className="w-4 h-4 text-[#ff6b00]" />
                Voltar para o Site
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/15 rounded-xl transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                Sair da Conta
              </button>
            </div>
          </div>
        )}

        {/* Profile Button */}
        <button
          type="button"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`flex items-center justify-between w-full p-2 mt-2 rounded-xl transition-all text-left group ${
            showProfileMenu ? "bg-white/15 ring-1 ring-white/20" : "hover:bg-white/10"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" 
              alt="Gestor" 
              className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white leading-tight truncate">Administração</span>
              <span className="text-xs text-gray-400 leading-tight truncate">administracao@gourmetize.com</span>
            </div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors shrink-0 ml-1" />
        </button>
      </div>
    </aside>
  )
}

