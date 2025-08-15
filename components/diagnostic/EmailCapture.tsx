import React, { useState } from 'react'

interface EmailCaptureProps {
  title: string
  description: string
  score: number
  type: 'personal' | 'team'
  onSubmit: (email: string) => void
  existingEmail?: string | null
  onSkip?: () => void
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  title,
  description,
  score,
  type,
  onSubmit,
  existingEmail,
  onSkip
}) => {
  const [email, setEmail] = useState(existingEmail || '')
  const [isValid, setIsValid] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(validateEmail(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSubmit(email)
    }
  }

  // Get score-based messaging
  const getScoreMessage = () => {
    if (type === 'personal') {
      if (score >= 80) return "Great job! Let's maintain your momentum 🚀"
      if (score >= 60) return "You're doing okay, but there's room to improve 📈"
      if (score >= 40) return "Your productivity is at risk. Let's fix this 🔧"
      return "Critical: Your meeting culture needs immediate help 🚨"
    } else {
      if (score >= 80) return "Your team is high-performing! Let's keep it up 🏆"
      if (score >= 60) return "Good foundation, but optimization needed 🎯"
      if (score >= 40) return "Team velocity is compromised. Time to act 🚧"
      return "Warning: Your team is stuck in meeting quicksand ⚠️"
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-pulse-cream">
      {/* Header Section - 35% */}
      <div className="flex-shrink-0 px-4 pt-8 pb-4">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Score Message */}
        <div className="text-center mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">
            Your {type} score: <span className="font-bold text-lg">{score}%</span>
          </p>
          <p className="text-xs text-gray-600">
            {getScoreMessage()}
          </p>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-sm text-center text-gray-600">
          {description}
        </p>
      </div>

      {/* Form Section - 55% */}
      <div className="flex-1 px-4 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          {existingEmail && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-800">
                Using your email from personal assessment
              </p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-coral focus:border-transparent text-base"
              required
              autoComplete="email"
              autoFocus={!existingEmail}
            />
            {email && !isValid && (
              <p className="mt-1 text-xs text-red-600">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="text-xs text-center text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </div>
        </form>
      </div>

      {/* Action Buttons - 10% */}
      <div className="flex-shrink-0 px-4 pb-6 space-y-2">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`
            w-full py-3 rounded-lg font-semibold text-base transition-all
            ${isValid
              ? 'bg-pulse-coral text-white hover:bg-opacity-90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Get Your {type === 'personal' ? 'Action' : 'Team'} Plan
        </button>
        
        {onSkip && (
          <button
            onClick={onSkip}
            className="w-full py-2 text-sm text-gray-500 underline hover:text-gray-700"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}