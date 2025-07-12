'use client'

import { useState } from 'react'
import Container from './components/Layout/Container'
import MobileNav from './components/Layout/MobileNav'
import ProgressBar from './components/UI/ProgressBar'
import AnswerCard from './components/UI/AnswerCard'
import SliderInput from './components/UI/SliderInput'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <main className="min-h-screen bg-pulse-navy pb-24">
      <Container className="pt-8">
        <ProgressBar current={currentStep} total={14} />
        
        <div className="mt-8 mb-12">
          <h1 className="text-3xl font-bold font-inter mb-2">
            Meeting Design Lab
          </h1>
          <p className="text-pulse-mint">
            Component Test Page
          </p>
        </div>

        {/* Test Answer Cards */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Answer Cards Test:</h2>
          {[
            { emoji: '😫', text: 'Drained and frustrated' },
            { emoji: '🤔', text: 'Unclear what was accomplished' },
            { emoji: '😐', text: 'Neutral - just another meeting' },
          ].map((option, index) => (
            <AnswerCard
              key={index}
              emoji={option.emoji}
              text={option.text}
              selected={selectedAnswer === index}
              onClick={() => setSelectedAnswer(index)}
              index={index}
            />
          ))}
        </div>

        {/* Test Slider */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Slider Test:</h2>
          <SliderInput
            value={sliderValue}
            onChange={setSliderValue}
            label="Participation Rate"
          />
        </div>
      </Container>

      <MobileNav
        currentStep={currentStep}
        totalSteps={14}
        onNext={() => setCurrentStep(Math.min(currentStep + 1, 14))}
        onBack={() => setCurrentStep(Math.max(currentStep - 1, 1))}
        canGoNext={selectedAnswer !== null}
      />
    </main>
  )
}