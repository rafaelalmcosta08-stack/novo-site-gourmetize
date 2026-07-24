"use client"

import { MoreVertical, ArrowUp } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, ReferenceLine, Cell } from "recharts"

const data = [
  { name: "Jan", value: 40, label: "78%" },
  { name: "Feb", value: 30, label: "34%" },
  { name: "Mar", value: 65, label: "67%", isActive: true },
  { name: "Apr", value: 25, label: "28%" },
  { name: "May", value: 35, label: "39%" },
  { name: "Jun", value: 45, label: "80%" },
]

const renderCustomLabel = (props: any) => {
  const { viewBox } = props
  return (
    <g>
      <rect x={viewBox.x} y={viewBox.y - 12} width={60} height={24} fill="#1b4b3e" rx={4} />
      <text x={viewBox.x + 30} y={viewBox.y + 4} fill="#ffffff" textAnchor="middle" fontSize={10} fontWeight="bold">
        Avg $150k
      </text>
    </g>
  )
}

export function CampaignChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-900">Campaign Performance</h2>
        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-end justify-between mb-1">
        <div className="text-3xl font-bold text-gray-900">$24,747.01</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">
            <ArrowUp className="w-3 h-3" />
            12%
          </div>
          <span className="text-xs font-medium text-gray-500">vs last month</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-8">29 Sept, 2024</p>

      <div className="flex-1 min-h-[200px] mt-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: 30, bottom: 0 }} barSize={40}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <ReferenceLine 
              y={39} 
              stroke="#d1d5db" 
              strokeDasharray="3 3" 
              label={renderCustomLabel}
            />
            <Bar dataKey="value" radius={[6, 6, 6, 6]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isActive ? '#ff7a59' : '#f3f4f6'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Custom Labels overlay */}
        <div className="absolute inset-0 pointer-events-none flex justify-around items-end pb-10 pl-[30px]">
          {data.map((d, i) => (
            <div 
              key={i} 
              className={`text-xs font-semibold mb-[-20px] transition-all duration-300 transform -translate-y-full ${d.isActive ? 'text-gray-800' : 'text-gray-500'}`}
              style={{ bottom: `${(d.value / 65) * 100}%` }}
            >
              {d.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
