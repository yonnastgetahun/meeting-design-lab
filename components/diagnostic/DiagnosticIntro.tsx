// ===== FILE 1: components/diagnostic/DiagnosticIntro.tsx ===== --- IGNORE ---
import React from 'react'

interface DiagnosticIntroProps {
  title: string
  hook: string
  onStart: () => void
  isTeamPart?: boolean
}

export function DiagnosticIntro({ title, hook, onStart, isTeamPart }: DiagnosticIntroProps) {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">{hook}</h1>
      <p className="text-xl text-gray-600 mb-8">
        {isTeamPart 
          ? "Let's evaluate how your team collaborates and makes decisions together."
          : "Discover your personal productivity loss and burnout risk in just 2 minutes."
        }
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Start {title}
      </button>
    </div>
  )
}