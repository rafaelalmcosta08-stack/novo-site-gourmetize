import { ChevronLeft, ChevronRight, MoreVertical, LayoutGrid, Zap, MessageSquare } from "lucide-react"

export function ScheduleCampaign() {
  const days = [
    { day: "Mon", date: "15" },
    { day: "Tue", date: "16" },
    { day: "Wed", date: "17" },
    { day: "Thu", date: "18" },
    { day: "Fri", date: "19", active: true },
    { day: "Sat", date: "20" },
    { day: "Sun", date: "21" },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Schedule Campaign</h2>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-900">September 2024</span>
        <div className="flex items-center gap-1">
          <button className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 px-1">
        {days.map((d) => (
          <div key={d.date} className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-gray-500">{d.day}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              d.active ? 'bg-purple-50 text-purple-600' : 'text-gray-900 hover:bg-gray-50 cursor-pointer'
            }`}>
              {d.date}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-3">Today</h3>
          <div className="bg-[#fde047] bg-opacity-40 rounded-xl p-3 flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white bg-opacity-60 flex items-center justify-center flex-shrink-0">
                <LayoutGrid className="w-5 h-5 text-yellow-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 mb-0.5">Element of Design Test</span>
                <span className="text-xs font-medium text-gray-600">10:00 - 11:00 AM</span>
              </div>
            </div>
            <button className="p-1 text-yellow-800 hover:bg-white hover:bg-opacity-30 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-3">Sat, Sep 20</h3>
          <div className="bg-[#fbcfe8] bg-opacity-40 rounded-xl p-3 flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white bg-opacity-60 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-pink-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 mb-0.5">Design Principle Test</span>
                <span className="text-xs font-medium text-gray-600">10:00 - 11:00 AM</span>
              </div>
            </div>
            <button className="p-1 text-pink-800 hover:bg-white hover:bg-opacity-30 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <button className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#1b4b3e] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#12362c] transition-colors z-20 border-4 border-gray-50">
        <MessageSquare className="w-5 h-5" fill="currentColor" />
      </button>
    </div>
  )
}
