import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { CampaignChart } from "@/components/dashboard/campaign-chart"
import { ScheduleCampaign } from "@/components/dashboard/schedule-campaign"
import { Plus } from "lucide-react"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f4f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, Let's dive into your personalized setup guide.</p>
              </div>
              <button className="flex items-center gap-2 bg-[#1b4b3e] hover:bg-[#12362c] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Create campaigns
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col gap-6">
                <PerformanceMetrics />
                <div className="flex-1 min-h-[300px]">
                  <CampaignChart />
                </div>
              </div>
              <div className="lg:col-span-1">
                <ScheduleCampaign />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
