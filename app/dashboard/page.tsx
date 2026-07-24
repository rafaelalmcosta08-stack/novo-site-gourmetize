"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { CampaignChart } from "@/components/dashboard/campaign-chart"
import { ScheduleCampaign } from "@/components/dashboard/schedule-campaign"
import { Plus, ArrowRight, Mail, Lock } from "lucide-react"

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a href="#" className="font-medium text-[#1b4b3e] hover:text-[#12362c]">
              start your 14-day free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue="jamespass@emi.com"
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-[#1b4b3e] focus:border-[#1b4b3e]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    defaultValue="password123"
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-[#1b4b3e] focus:border-[#1b4b3e]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#1b4b3e] focus:ring-[#1b4b3e] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#1b4b3e] hover:text-[#12362c]">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1b4b3e] hover:bg-[#12362c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b4b3e] transition-colors cursor-pointer">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f4f6]">
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
