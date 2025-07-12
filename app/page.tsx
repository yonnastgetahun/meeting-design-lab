'use client'

import { useState } from 'react'
import Container from './components/Layout/Container'
import MobileNav from './components/Layout/MobileNav'
import ProgressBar from './components/UI/ProgressBar'
import AnswerCard from './components/UI/AnswerCard'
import SliderInput from './components/UI/SliderInput'
import DownloadGate from './components/EmailCapture/DownloadGate'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [sliderValue, setSliderValue] = useState(50)
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  return (
    <main className="min-h-screen bg-pulse-navy pb-24">
      <Container className="pt-8">
        <ProgressBar current={currentStep} total={14} />
        
        {!showEmailCapture ? (
          <>
            <div className="mt-8 mb-12">
              <h1 className="text-3xl font-bold font-inter mb-2">
                Meeting Design Lab
              </h1>
              <p className="text-pulse-mint">
                Component Test Page
              </p>
            </div>

            {/* Test components */}
            <div className="space-y-8">
              {/* Previous test components here */}
              
              {/* Test Email Capture Button */}
              <button
                onClick={() => setShowEmailCapture(true)}
                className="w-full py-4 px-6 rounded-xl font-inter font-semibold 
                         bg-gradient-to-r from-pulse-coral to-pink-500 text-white
                         active:scale-[0.98] transition-transform"
              >
                Test Email Capture
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8">
            <DownloadGate score={4.2} category="critical" />
          </div>
        )}
      </Container>

      {!showEmailCapture && (
        <MobileNav
          currentStep={currentStep}
          totalSteps={14}
          onNext={() => setCurrentStep(Math.min(currentStep + 1, 14))}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 1))}
          canGoNext={selectedAnswer !== null}
        />
      )}
    </main>
  )
}