'use client'

interface ProgressBarProps {
  current: number
  total: number
  label?: string
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
      <div className="flex justify-between text-sm mb-3">
        <span className="text-pulse-navy font-medium">
          {label || `Question ${current} of ${total}`}
        </span>
        <span className="text-pulse-coral font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pulse-coral to-pulse-orange rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
        </div>
      </div>
      {/* Progress milestone indicators */}
      <div className="flex justify-between mt-2">
        <div className="text-xs text-gray-500">Start</div>
        <div className="text-xs text-gray-500">Halfway</div>
        <div className="text-xs text-gray-500">Complete</div>
      </div>
    </div>
  )
}