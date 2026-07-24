"use client"

import { ChevronLeft, Bell, HelpCircle, Plus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const isLeadDetail = pathname.startsWith('/dashboard/crm/') && pathname !== '/dashboard/crm'
  
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        {isLeadDetail && (
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200">
          <Bell className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#ff6b00] hover:bg-[#e66000] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
