'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { diagnosticQuestions, calculateCategoryScores } from '@/app/lib/questions'
import ProgressBar from '../UI/ProgressBar'
import AnswerCard from '../UI/AnswerCard'
import SliderInput from '../UI/SliderInput'
import MobileNav from '../Layout/MobileNav'

interface DiagnosticFlowProps {
  onComplete: (scores: any, answers: Map<number, number>) => void
}

export default function DiagnosticFlow({ onComplete }: DiagnosticFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<number, number>>(new Map())
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  const currentQuestion = diagnosticQuestions[currentQuestionIndex]
  const totalQuestions = diagnosticQuestions.length

  // Load selected value when question changes
  useEffect(() => {
    const savedAnswer = answers.get(currentQuestion.id)
    setSelectedValue(savedAnswer !== undefined ? savedAnswer : null)
  }, [currentQuestionIndex, currentQuestion.id, answers])

  const handleAnswer = (value: number) => {
    setSelectedValue(value)
    const newAnswers = new Map(answers)
    newAnswers.set(currentQuestion.id, value)
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (selectedValue !== null) {
      // Save answer is already done in handleAnswer
      
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // Calculate final scores and complete
        const scores = calculateCategoryScores(answers)
        onComplete(scores, answers)
      }
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const canGoNext = selectedValue !== null

  return (
    <div className="min-h-screen bg-pulse-cream pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={totalQuestions} 
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-ibm-plex font-semibold mb-2 text-pulse-navy">
                {currentQuestion.text}
              </h2>
              {currentQuestion.subtext && (
                <p className="text-gray-600">{currentQuestion.subtext}</p>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <>
                  {currentQuestion.options.map((option) => (
                    <AnswerCard
                      key={option.value}
                      text={option.text}
                      value={option.value}
                      selected={selectedValue === option.value}
                      onClick={() => handleAnswer(option.value)}
                    />
                  ))}
                </>
              )}

              {currentQuestion.type === 'yes-no' && currentQuestion.options && (
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`p-6 rounded-xl border-2 text-center transition-all
                        ${selectedValue === option.value
                          ? 'border-pulse-coral bg-pulse-coral/10 shadow-md'
                          : 'border-gray-200 bg-white hover:border-pulse-coral/50 hover:shadow-sm'
                        }`}
                    >
                      <p className="text-xl font-medium text-pulse-navy">{option.text}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'slider' && currentQuestion.sliderConfig && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <SliderInput
                    value={selectedValue || currentQuestion.sliderConfig.min}
                    onChange={handleAnswer}
                    min={currentQuestion.sliderConfig.min}
                    max={currentQuestion.sliderConfig.max}
                    step={currentQuestion.sliderConfig.step}
                    label={`${selectedValue || currentQuestion.sliderConfig.min}${currentQuestion.sliderConfig.unit}`}
                    showValue={false}
                    isFirstSlider={currentQuestion.id === 5} // First slider question is now #5
                  />
                  
                  {/* Slider labels */}
                  <div className="flex justify-between mt-4 text-sm text-gray-500">
                    <span>{currentQuestion.sliderConfig.min}{currentQuestion.sliderConfig.unit}</span>
                    <span>{currentQuestion.sliderConfig.max}{currentQuestion.sliderConfig.unit}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Question category indicator */}
            <div className="mt-8 flex items-center justify-center">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {currentQuestion.category.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <MobileNav
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
        onNext={handleNext}
        onBack={handleBack}
        canGoNext={canGoNext}
      />
    </div>
  )
}