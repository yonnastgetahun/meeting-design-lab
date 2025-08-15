import React from 'react'
import { colors } from '@/lib/designSystem'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  status?: 'critical' | 'warning' | 'caution' | 'good'
  description?: string
  icon?: React.ReactNode
}

export function MetricCard({ 
  label, 
  value, 
  unit, 
  status = 'good',
  description,
  icon
}: MetricCardProps) {
  const statusColors = {
    critical: colors.critical,
    warning: colors.warning,
    caution: colors.caution,
    good: colors.good
  }
  
  const bgColors = {
    critical: 'bg-red-50',
    warning: 'bg-yellow-50',
    caution: 'bg-orange-50',
    good: 'bg-green-50'
  }
  
  return (
    <div className={`rounded-xl p-4 ${bgColors[status]} border border-white/50 shadow-sm`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-500">{icon}</div>}
          <h4 className="text-sm font-medium text-gray-700">{label}</h4>
        </div>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span 
          className="text-2xl font-bold"
          style={{ color: statusColors[status] }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm text-gray-600">{unit}</span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-600 mt-2">{description}</p>
      )}
      
      {/* Visual indicator bar */}
      <div className="mt-3 h-1 bg-white/50 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            backgroundColor: statusColors[status],
            width: typeof value === 'number' ? `${Math.min(value, 100)}%` : '100%'
          }}
        />
      </div>
    </div>
  )
}