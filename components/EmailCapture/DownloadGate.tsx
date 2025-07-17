'use client'

import { useState } from 'react'
import EmailForm from './EmailForm'

interface DownloadGateProps {
  score: number
  category: 'critical' | 'struggling' | 'good' | 'excellent'
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
      color: "from-green-500 to-green-600"
    },
    excellent: {
      title: "You're in the top tier!",
      subtitle: "Here's how to maintain excellence.",
      color: "from-green-600 to-pulse-mint"
    }
  }

  const message = categoryMessages[category] || categoryMessages.good

  if (!showForm && downloadUrl) {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold font-inter text-pulse-navy">Check Your Email!</h2>
        <p className="text-gray-600">
          Your Meeting Transformation Toolkit is on its way.
        </p>
        
        
        <a
          href={downloadUrl}
          className="inline-block py-4 px-8 rounded-xl font-inter font-semibold 
                     bg-gradient-to-r from-pulse-coral to-pink-500 text-white
                     active:scale-[0.98] transition-transform
                     shadow-lg shadow-pulse-coral/25"
        >
          Download Now
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-3xl font-dm-serif bg-gradient-to-r ${message.color} 
                        bg-clip-text text-transparent`}>
          {message.title}
        </h2>
        <p className="text-gray-600">{message.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-pulse-navy">Get Your Free Toolkit:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-pulse-coral">✓</span>
            Meeting design templates
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pulse-coral">✓</span>
            Facilitation cheat sheet
          </li>
          <li className="flex items-center gap-2">
            <span className="text-pulse-coral">✓</span>
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