'use client'

import { useState } from 'react'
import Container from './components/Layout/Container'
import MobileNav from './components/Layout/MobileNav'
import ProgressBar from './components/UI/ProgressBar'
import AnswerCard from './components/UI/AnswerCard'
import SliderInput from './components/UI/SliderInput'
import DownloadGate from './components/EmailCapture/DownloadGate'
import BrandColors from './components/UI/BrandColors'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [sliderValue, setSliderValue] = useState(50)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [showBrandGuide, setShowBrandGuide] = useState(false)

  return (
    <main className="min-h-screen bg-pulse-navy pb-24">
      <Container className="pt-8">
        <ProgressBar current={currentStep} total={14} />
        
        {showBrandGuide ? (
          <div className="mt-8">
            <button
              onClick={() => setShowBrandGuide(false)}
              className="mb-4 text-pulse-coral hover:text-pulse-orange"
            >
              ← Back to Test
            </button>
            <BrandColors />
          </div>
        ) : !showEmailCapture ? (
          <>
            <div className="mt-8 mb-12">
              <h1 className="text-3xl font-dm-serif mb-2 text-gradient">
                Meeting Design Lab
              </h1>
              <p className="text-pulse-mint font-ibm-plex">
                Component Test Page
              </p>
            </div>

            <div className="space-y-8">
              {/* Test Answer Cards */}
              <div className="space-y-4">
                <h2 className="text-xl font-ibm-plex font-semibold">Answer Cards</h2>
                <AnswerCard
                  text="This is a selected answer"
                  value={1}
                  selected={true}
                  onClick={() => {}}
                />
                <AnswerCard
                  text="This is an unselected answer"
                  value={2}
                  selected={false}
                  onClick={() => {}}
                />
              </div>

              {/* Test Slider */}
              <div>
                <h2 className="text-xl font-ibm-plex font-semibold mb-4">Slider Input</h2>
                <SliderInput
                  value={sliderValue}
                  onChange={setSliderValue}
                  min={0}
                  max={100}
                  label="Test Slider"
                />
              </div>

              {/* Test Buttons */}
              <div className="space-y-4">
                <h2 className="text-xl font-ibm-plex font-semibold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary">
                    Primary Button
                  </button>
                  <button className="btn-secondary">
                    Secondary Button
                  </button>
                </div>
              </div>

              {/* Test Actions */}
              <div className="space-y-4 pt-8 border-t border-gray-800">
                <button
                  onClick={() => setShowBrandGuide(true)}
                  className="w-full py-4 px-6 rounded-xl font-inter font-semibold 
                           bg-pulse-mint text-pulse-navy
                           active:scale-[0.98] transition-transform"
                >
                  View Brand Style Guide
                </button>
                
                <button
                  onClick={() => setShowEmailCapture(true)}
                  className="w-full py-4 px-6 rounded-xl font-inter font-semibold 
                           bg-gradient-to-r from-pulse-coral to-pink-500 text-white
                           active:scale-[0.98] transition-transform
                           shadow-lg shadow-pulse-coral/25"
                >
                  Test Email Capture
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8">
            <DownloadGate score={4.2} category="critical" />
          </div>
        )}
      </Container>

      {!showEmailCapture && !showBrandGuide && (
        <MobileNav
          currentStep={currentStep}
          totalSteps={14}
          onNext={() => setCurrentStep(Math.min(currentStep + 1, 14))}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 1))}
          canGoNext={true}
        />
      )}
    </main>
  )
}