// components/diagnostic/QuestionScreen.tsx
import React, { useEffect } from 'react'
import { Question } from '@/lib/diagnosticQuestions'

interface QuestionScreenProps {
  questions: Question[]
  answers: Map<string, number>
  onAnswer: (questionId: string, value: number) => void
  onNext: () => void
  canProceed: boolean
  currentScreen: number
  totalScreens: number
}

export function QuestionScreen({
  questions,
  answers,
  onAnswer,
  onNext,
  canProceed,
  currentScreen,
  totalScreens
}: QuestionScreenProps) {
  
  // Scroll to top when new screen loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentScreen])

  return (
    <div className="flex flex-col h-full">
      {/* Questions Container - takes up available space */}
      <div className="flex-1 space-y-4 mb-6">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
            {question.subtext && (
              <p className="text-sm text-gray-600 mb-3">{question.subtext}</p>
            )}
            
            <div className="space-y-2">
              {question.options.map(option => (
                <label
                  key={option.value}
                  className={`
                    flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${answers.get(question.id) === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers.get(question.id) === option.value}
                    onChange={() => onAnswer(question.id, option.value)}
                    className="mr-3 mt-0.5"
                  />
                  <span className="text-gray-800 text-sm sm:text-base flex-1">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation - always at bottom */}
      <div className="flex justify-between items-center pt-6 mt-auto">
        <span className="text-sm text-gray-500">
          Screen {currentScreen} of {totalScreens}
        </span>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-6 py-2 rounded-lg font-medium transition-all
            ${canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  )
}