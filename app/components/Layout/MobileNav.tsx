'use client'

import { useState } from 'react'
import { trackEvent } from '@/app/lib/analytics'

interface MobileNavProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  canGoNext: boolean
  nextLabel?: string
}

export default function MobileNav({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack, 
  canGoNext,
  nextLabel = 'Next'
}: MobileNavProps) {
  const handleNext = () => {
    trackEvent('diagnostic_next_step', { step: currentStep })
    onNext()
  }

  const handleBack = () => {
    trackEvent('diagnostic_back_step', { step: currentStep })
    onBack()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-pulse-navy border-t border-gray-800 px-4 pb-6 pt-4">
      <div className="max-w-lg mx-auto flex gap-3">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="flex-1 py-4 px-6 rounded-xl font-inter font-semibold text-gray-400 bg-gray-800 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     active:scale-95 transition-transform"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="flex-1 py-4 px-6 rounded-xl font-inter font-semibold text-pulse-navy 
                     bg-gradient-to-r from-pulse-coral to-pink-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     active:scale-95 transition-transform
                     shadow-lg shadow-pulse-coral/25"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}