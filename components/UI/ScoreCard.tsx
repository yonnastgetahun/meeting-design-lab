// components/UI/ScoreCard.tsx
import React from 'react'

interface ScoreCardProps {
  score: number
  type: 'personal' | 'team'
  description?: string
}

export function ScoreCard({ score, type, description }: ScoreCardProps) {
  const getStatusColor = (score: number) => {
    if (score >= 75) return 'bg-green-50 text-green-600 border-green-200'
    if (score >= 50) return 'bg-yellow-50 text-yellow-600 border-yellow-200'
    if (score >= 25) return 'bg-orange-50 text-orange-600 border-orange-200'
    return 'bg-red-50 text-red-600 border-red-200'
  }

  return (
    <div className={`rounded-lg p-4 mb-4 text-center border ${getStatusColor(score)}`}>
      <div className="text-4xl font-bold mb-1">{score}%</div>
      <p className="text-xs text-gray-600 mb-2">
        {type === 'personal' ? 'Current Performance' : 'Current Velocity'}
      </p>
      {description && (
        <p className="text-sm font-medium">
          {description}
        </p>
      )}
    </div>
  )
}

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
