import { MoreVertical, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function PerformanceMetrics() {
  const metrics = [
    { label: "Delivered", value: "42,642.1", change: "+0.02%", isPositive: true },
    { label: "Opened", value: "26,843", change: "-0.02%", isPositive: false },
    { label: "Clicked", value: "525,753", change: "+0.02%", isPositive: true },
    { label: "Subscribe", value: "425", change: "+0.02%", isPositive: true },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Performance Over Time</h2>
          <p className="text-sm text-gray-500">29 Sept, 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
            <span className="flex gap-0.5">
              <span className="w-1 h-3 bg-gray-400 rounded-full"></span>
              <span className="w-1 h-2 bg-gray-400 rounded-full mt-1"></span>
            </span>
            Short
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 divide-x divide-gray-100">
        {metrics.map((metric, i) => (
          <div key={metric.label} className={`flex flex-col ${i !== 0 ? 'pl-6' : ''}`}>
            <span className="text-sm font-medium text-gray-500 mb-2">{metric.label}</span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${
                metric.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {metric.change}
                {metric.isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
