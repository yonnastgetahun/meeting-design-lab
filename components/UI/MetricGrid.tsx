// components/UI/MetricGrid.tsx
import React from 'react'

interface MetricGridProps {
  metrics: Array<{
    value: number | string
    label: string
    color: string
  }>
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map(({ value, label, color }, index) => (
        <div 
          key={index} 
          className={`rounded-lg p-3 text-center border ${color}`}
        >
          <div className="text-xl font-bold mb-1">{value}</div>
          <div className="text-xs text-gray-600 leading-tight">{label}</div>
        </div>
      ))}
    </div>
  )
}
