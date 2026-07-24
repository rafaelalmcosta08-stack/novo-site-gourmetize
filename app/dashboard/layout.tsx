import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f9fa] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8f9fa]">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
