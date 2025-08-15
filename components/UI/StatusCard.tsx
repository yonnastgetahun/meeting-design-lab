// components/UI/StatusCard.tsx (Enhanced)
import React from 'react'

interface StatusCardProps {
  emoji: string
  title: string
  subtitle: string
  score: number
}

export function StatusCard({ emoji, title, subtitle, score }: StatusCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-3">{emoji}</span>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}