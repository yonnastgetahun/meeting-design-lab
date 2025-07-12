'use client'

interface MobileNavProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  canGoNext: boolean
}

export default function MobileNav({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  canGoNext
}: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-xl font-medium bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>

        <span className="text-sm text-gray-400">
          {currentStep} / {totalSteps}
        </span>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`px-8 py-3 rounded-xl font-medium transition-all ${
            canGoNext
              ? 'bg-gradient-to-r from-pulse-coral to-pink-500 text-white shadow-lg shadow-pulse-coral/25 active:scale-[0.98]'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}