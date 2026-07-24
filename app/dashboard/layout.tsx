import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardAuthGuard } from "@/components/dashboard-auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardAuthGuard>
      <div className="flex h-screen w-full overflow-hidden bg-[#f8f9fa] font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden bg-[#f8f9fa]">
          <Header />
          <main className="flex-1 overflow-y-auto min-h-0 relative" data-lenis-prevent>
            {children}
          </main>
        </div>
      </div>
    </DashboardAuthGuard>
  )
}
