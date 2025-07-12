'use client'

import { motion } from 'framer-motion'

interface AnswerCardProps {
  text: string
  value: number | string
  selected: boolean
  onClick: () => void
}

export default function AnswerCard({ text, value, selected, onClick }: AnswerCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${selected 
          ? 'border-pulse-coral bg-pulse-coral/10 shadow-lg shadow-pulse-coral/20' 
          : 'border-gray-700 hover:border-pulse-coral/50 hover:shadow-md'
        }
      `}
    >
      <p className="text-lg font-medium">{text}</p>
    </motion.div>
  )
}