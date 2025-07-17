'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackEmailCapture } from '@/lib/analytics'

interface EmailFormProps {
  score: number
  category: 'critical' | 'struggling' | 'good' | 'excellent'
  onSuccess: (downloadUrl: string) => void
}

export default function EmailForm({ score, category, onSuccess }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/convertkit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          score,
          category,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Track successful email capture
      trackEmailCapture(score)

      // Call success callback with download URL
      onSuccess(data.downloadUrl)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 
                     text-pulse-navy placeholder-gray-400 focus:outline-none focus:border-pulse-coral
                     focus:ring-2 focus:ring-pulse-coral/20 transition-all"
          placeholder="Enter your first name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 
                     text-pulse-navy placeholder-gray-400 focus:outline-none focus:border-pulse-coral
                     focus:ring-2 focus:ring-pulse-coral/20 transition-all"
          placeholder="your@email.com"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-xl font-inter font-semibold 
                   bg-gradient-to-r from-pulse-coral to-pink-500 text-white
                   disabled:opacity-50 disabled:cursor-not-allowed
                   active:scale-[0.98] transition-transform
                   shadow-lg shadow-pulse-coral/25"
      >
        {isLoading ? 'Processing...' : 'Get Your Free Toolkit'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.form>
  )
}