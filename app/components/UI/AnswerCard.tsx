'use client'

import { motion } from 'framer-motion'

interface AnswerCardProps {
  emoji?: string
  text: string
  selected: boolean
  onClick: () => void
  index: number
}

export default function AnswerCard({ emoji, text, selected, onClick, index }: AnswerCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`
        w-full p-6 rounded-2xl border-2 transition-all duration-200
        flex items-center gap-4 text-left
        ${selected 
          ? 'bg-gradient-to-r from-pulse-coral to-pink-500 border-transparent text-white' 
          : 'bg-gray-900 border-gray-800 text-gray-100 hover:border-gray-700'
        }
        active:scale-[0.98]
      `}
    >
      {emoji && (
        <span className="text-3xl flex-shrink-0">{emoji}</span>
      )}
      <span className={`font-inter text-lg ${selected ? 'font-semibold' : ''}`}>
        {text}
      </span>
    </motion.button>
  )
}