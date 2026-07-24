"use client"

import { useState, useEffect } from "react"
import { Store, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [email, setEmail] = useState("administracao@gourmetize.com")
  const [password, setPassword] = useState("tFT6%yi2rq&F5@t")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check local storage for session status
    const authStatus = localStorage.getItem("mub_auth_authenticated")
    if (authStatus === "false") {
      setIsAuthenticated(false)
    } else {
      // Default to true if not explicitly logged out
      setIsAuthenticated(true)
      if (authStatus === null) {
        localStorage.setItem("mub_auth_authenticated", "true")
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase()
      const cleanPass = password.trim()

      if (cleanEmail === "administracao@gourmetize.com" && cleanPass === "tFT6%yi2rq&F5@t") {
        localStorage.setItem("mub_auth_authenticated", "true")
        setIsAuthenticated(true)
      } else {
        setError("E-mail ou senha incorretos. Utilize as credenciais de administração registradas.")
      }
      setIsLoading(false)
    }, 400)
  }

  // Loading state during hydratation
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Render Login view if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b00]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md bg-[#161616] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#ff6b00] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ff6b00]/20">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Cozinha Digital</h1>
            <p className="text-xs text-gray-400 mt-1.5">Painel de Gestão e Vendas de Restaurantes</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                E-mail do Gestor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#222222] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#222222] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#ff6b00] hover:bg-[#e66000] active:scale-[0.99] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-[#ff6b00]/25 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Entrar no Painel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs font-bold text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              ← Voltar para o Site Principal
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
