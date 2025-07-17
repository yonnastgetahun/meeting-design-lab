// ===== FILE 5: components/diagnostic/EmailCapture.tsx =====
import React from 'react'
import EmailForm from '@/components/EmailCapture/EmailForm'

interface EmailCaptureProps {
  title: string
  description: string
  score: number
  type: 'personal' | 'team'
  onSubmit: (email: string) => void
  onSkip?: () => void
}

export function EmailCapture({ title, description, score, type, onSubmit, onSkip }: EmailCaptureProps) {
  // Map scores to your existing categories
  const getCategory = (score: number): 'critical' | 'struggling' | 'good' | 'excellent' => {
    if (score < 25) return 'critical'
    if (score < 50) return 'struggling'
    if (score < 75) return 'good'
    return 'excellent'
  }

  const handleSuccess = (downloadUrl: string) => {
    // You can handle the download URL here
    console.log('Download URL:', downloadUrl)
    // Call the parent onSubmit to continue the flow
    onSubmit('success') // We don't need the actual email since EmailForm handles it
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <EmailForm 
          score={score}
          category={getCategory(score)}
          onSuccess={handleSuccess}
        />

        {onSkip && (
          <button
            onClick={onSkip}
            className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Skip to Team Questions →
          </button>
        )}
      </div>
    </div>
  )
}