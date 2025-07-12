'use client'

interface SliderInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
}

export default function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true
}: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
          {showValue && <span className="text-sm font-medium text-pulse-coral">{value}</span>}
        </div>
      )}
      <div className="relative w-full h-8 flex items-center">
        <div className="absolute w-full h-2 bg-gray-700 rounded-full" />
        <div 
          className="absolute h-2 bg-gradient-to-r from-pulse-coral to-pulse-orange rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-6 h-6 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform hover:shadow-pulse-coral/30"
          style={{ left: `${percentage}%`, top: '50%' }}
        />
      </div>
    </div>
  )
}