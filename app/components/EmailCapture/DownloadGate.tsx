'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import EmailForm from './EmailForm'

interface DownloadGateProps {
  score: number
  category: 'critical' | 'struggling' | 'good'
}

export default function DownloadGate({ score, category }: DownloadGateProps) {
  const [showForm, setShowForm] = useState(true)
  const [downloadUrl, setDownloadUrl] = useState('')

  const handleSuccess = (url: string) => {
    setDownloadUrl(url)
    setShowForm(false)
  }

  const categoryMessages = {
    critical: {
      title: "Your meetings need urgent attention!",
      subtitle: "But don't worry - we've got the cure.",
      color: "from-red-500 to-pulse-coral"
    },
    struggling: {
      title: "Your meetings are underperforming",
      subtitle: "Quick fixes can transform your results.",
      color: "from-yellow-500 to-pulse-coral"
    },
    good: {
      title: "You're ahead of most teams!",
      subtitle: "Let's take you from good to exceptional.",
      color: "from-green-500 to-pulse-mint"
    }
  }

  const message = categoryMessages[category]

  if (!showForm && downloadUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold font-inter">Check Your Email!</h2>
        <p className="text-gray-300">
          Your Meeting Transformation Toolkit is on its way.
        </p>
        
          href={downloadUrl}
          className="inline-block py-4 px-8 rounded-xl font-inter font-semibold 
                     bg-gradient-to-r from-pulse-coral to-pink-500 text-white
                     active:scale-[0.98] transition-transform
                     shadow-lg shadow-pulse-coral/25"
        >
          Download Now
        </a>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-3xl font-bold font-inter bg-gradient-to-r ${message.color} 
                        bg-clip-text text-transparent`}>
          {message.title}
        </h2>
        <p className="text-gray-300">{message.subtitle}</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold">Get Your Free Toolkit:</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center gap-2">
            <span className="text-pulse-mint">✓</span>
            Meeting design templates
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pulse-mint">✓</span>
            Facilitation cheat sheet
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pulse-mint">✓</span>
            Quick-win strategies
          </li>
        </ul>
      </div>

      {showForm && (
        <EmailForm
          score={score}
          category={category}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  )
}