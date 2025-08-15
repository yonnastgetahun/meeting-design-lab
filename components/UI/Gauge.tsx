// components/UI/Gauge.tsx
import React from 'react'

interface GaugeProps {
  value: number // 0-100
  benchmark: number // 0-100
  label: string
  size?: 'small' | 'medium' | 'large'
  colorScheme?: 'default' | 'inverse'
}

export function Gauge({ 
  value, 
  benchmark, 
  label, 
  size = 'medium',
  colorScheme = 'default' 
}: GaugeProps) {
  // Size configurations with mobile considerations
  const sizes = {
    small: { width: 120, height: 120, strokeWidth: 8, fontSize: '1.5rem' },
    medium: { width: 160, height: 160, strokeWidth: 10, fontSize: '2rem' },
    large: { width: 200, height: 200, strokeWidth: 12, fontSize: '2.5rem' }
  }

  const config = sizes[size]
  const radius = (config.width - config.strokeWidth) / 2
  const circumference = radius * Math.PI // Half circle

  // Calculate stroke dash array for the value
  const valueOffset = circumference - (value / 100) * circumference

  // Calculate angle for benchmark marker
  const benchmarkAngle = (benchmark / 100) * 180 - 90

  // Color based on performance
  const getColor = () => {
    if (colorScheme === 'inverse') {
      // Lower is better (like burnout risk)
      if (value <= 30) return '#10B981' // green
      if (value <= 50) return '#F59E0B' // yellow
      if (value <= 70) return '#FB923C' // orange
      return '#EF4444' // red
    } else {
      // Higher is better (like efficiency)
      if (value >= benchmark) return '#10B981' // green
      if (value >= benchmark - 15) return '#F59E0B' // yellow
      if (value >= benchmark - 30) return '#FB923C' // orange
      return '#EF4444' // red
    }
  }

  const color = getColor()

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative inline-block" style={{ width: config.width, height: config.height / 2 + 20 }}>
        <svg
          width={config.width}
          height={config.height}
          viewBox={`0 0 ${config.width} ${config.height}`}
          className="transform -rotate-90"
          style={{ maxWidth: '100%', height: 'auto' }}
        >
          {/* Background arc */}
          <path
            d={`M ${config.strokeWidth / 2} ${config.height / 2} 
                A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.height / 2}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />

          {/* Value arc */}
          <path
            d={`M ${config.strokeWidth / 2} ${config.height / 2} 
                A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.height / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={valueOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Benchmark marker */}
          <g transform={`translate(${config.width / 2}, ${config.height / 2})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={-radius + config.strokeWidth / 2}
              stroke="#6B7280"
              strokeWidth="2"
              transform={`rotate(${benchmarkAngle + 90})`}
              strokeDasharray="4 2"
            />
          </g>
        </svg>

        {/* Value display */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingTop: config.height / 4 }}
        >
          <div className="text-center">
            <div 
              className="font-bold leading-none"
              style={{ fontSize: config.fontSize, color }}
            >
              {value}
            </div>
            <div className="text-gray-500 text-sm">
              vs {benchmark}
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-2">
        <div className="font-medium text-gray-700">{label}</div>
      </div>
    </div>
  )
}

// Comparison Gauge Set Component
interface ComparisonGaugesProps {
  yourScore: number
  topPerformerScore: number
  metrics: {
    label: string
    value: number
    benchmark: number
    inverse?: boolean
  }[]
}

export function ComparisonGauges({ yourScore, topPerformerScore, metrics }: ComparisonGaugesProps) {
  return (
    <div className="space-y-8">
      {/* Main Score Comparison */}
      <div className="flex justify-center">
        <Gauge 
          value={yourScore} 
          benchmark={topPerformerScore} 
          label="Overall Score"
          size="large"
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Gauge
            key={index}
            value={metric.value}
            benchmark={metric.benchmark}
            label={metric.label}
            size="small"
            colorScheme={metric.inverse ? 'inverse' : 'default'}
          />
        ))}
      </div>
    </div>
  )
}