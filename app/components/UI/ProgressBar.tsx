'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
  showLabel?: boolean
}

export default function ProgressBar({ current, total, showLabel = true }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full">
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pulse-coral to-pulse-mint"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <p className="text-center text-sm text-gray-400 mt-2 font-inter">
          {current} of {total}
        </p>
      )}
    </div>
  )
}