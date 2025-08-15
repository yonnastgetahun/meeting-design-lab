import React from 'react'
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

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  questions,
  answers,
  onAnswer,
  onNext,
  canProceed,
  currentScreen,
  totalScreens
}) => {
  // Compact option labels for mobile
  const getCompactLabel = (text: string): string => {
    const compactMap: { [key: string]: string } = {
      // Personal questions
      "Complete control": "Complete",
      "Mostly in control": "Mostly",
      "Some control": "Some",
      "Little control": "Little",
      "No control": "None",
      
      "Well-spaced with focus blocks": "Well-spaced",
      "Mostly grouped": "Grouped",
      "Scattered": "Scattered",
      "Back-to-back": "Back-to-back",
      "Random and unpredictable": "Random",
      
      "Less than 30 minutes": "<30 min",
      "30-60 minutes": "30-60 min",
      "1-2 hours": "1-2 hrs",
      "2+ hours of focus time": "2+ hrs",
      
      // Energy/feeling options
      "Drained and frustrated": "Drained",
      "Relieved it's over": "Relieved",
      "Neutral - just another meeting": "Neutral",
      "Energized and clear": "Energized",
      
      // Yes/No options
      "No - meetings all day, every day": "No",
      "Yes - protected focus time": "Yes",
      
      // Percentage options
      "Less than 25% - I'm in meeting jail": "<25%",
      "About 50% - half are questionable": "~50%",
      "About 75% - mostly relevant": "~75%",
      "Nearly all critical to my work": "~100%",
      
      // Team questions
      "Less than 25% speak up": "<25%",
      "About 25-50% participate": "25-50%",
      "50-75% are engaged": "50-75%",
      "Nearly everyone contributes": "~100%",
      
      "Constantly - it's laptop city": "Always",
      "Frequently - lots of 'quick emails'": "Often",
      "Occasionally - mostly focused": "Sometimes",
      "Rarely - full attention": "Rarely",
      
      // Additional team mappings
      "Often missing key decision makers": "Missing key",
      "Too many 'optional' attendees": "Too many",
      "Mostly right, some extras": "Mostly right",
      "Perfect attendance list": "Perfect",
      
      "Rarely - we just show up": "Rarely",
      "Sometimes - depends on the meeting": "Sometimes",
      "Usually - most have agendas": "Usually",
      "Always - it's our standard": "Always",
      
      "We avoid decisions like the plague": "Avoid",
      "Lots of discussion, few decisions": "Few",
      "Decisions happen, but slowly": "Slow",
      "Quick, clear decisions": "Quick",
      
      "Rarely - we just... end": "Just end",
      "Sometimes - depends on the meeting": "Sometimes",
      "Usually - quick recap at the end": "Usually",
      "Always - documented action items": "Always",
      
      "They disappear into the void": "Lost",
      "Some get done, many forgotten": "Some",
      "Tracked but not always completed": "Tracked",
      "Systematic tracking and completion": "Systematic",
      
      "Over 75% - we meet because we always have": ">75%",
      "About 50% - half are unnecessary": "~50%",
      "About 25% - most are needed": "~25%",
      "Less than 10% - we meet with purpose": "<10%",
      
      // Deep work percentages
      "About 25% (1-2 hours)": "25%",
      "About 50% (3-4 hours)": "50%",
      "About 75% (5-6 hours)": "75%",
      "Nearly 100% (most of my day)": "100%",
      
      // Daily feelings
      "Where did my day go? I got nothing done": "Nothing done",
      "Now I can finally start my real work": "Just starting",
      "I made real progress on important work": "Progress",
      "It varies too much to say": "Varies"
    }
    
    return compactMap[text] || text
  }

  // Get color for option based on score
  const getOptionColor = (score: number): string => {
    if (score >= 8) return 'bg-green-100 border-green-400 text-green-900'
    if (score >= 5) return 'bg-yellow-100 border-yellow-400 text-yellow-900'
    if (score >= 3) return 'bg-orange-100 border-orange-400 text-orange-900'
    return 'bg-red-100 border-red-400 text-red-900'
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-pulse-cream">
      {/* Minimal header - 8% */}
      <div className="px-4 py-2 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Screen {currentScreen} of {totalScreens}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalScreens }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < currentScreen ? 'bg-pulse-coral' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Questions container - 82% */}
      <div className="flex-1 px-4 pb-2">
        <div className="h-full flex flex-col">
          {questions.map((question, index) => (
            <div 
              key={question.id} 
              className={`flex-1 flex flex-col ${index === 0 ? 'mb-2' : ''}`}
            >
              {/* Question text - compact */}
              <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
                {question.text}
              </h3>
              
              {/* Options - horizontal layout for 4 or fewer, grid for 5 */}
              {question.options.length <= 4 ? (
                <div className="flex gap-1.5 flex-wrap">
                  {question.options.map((option) => {
                    const isSelected = answers.get(question.id) === option.value
                    const colorClass = isSelected ? getOptionColor(option.score) : 'bg-white'
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => onAnswer(question.id, option.value)}
                        className={`
                          flex-1 min-w-0 px-2 py-3 rounded-lg border-2 transition-all
                          ${isSelected 
                            ? `${colorClass} border-opacity-100 font-medium` 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span className="text-xs leading-tight block">
                          {getCompactLabel(option.text)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                // 5 options - use 3+2 grid
                <div className="space-y-1.5">
                  <div className="flex gap-1.5">
                    {question.options.slice(0, 3).map((option) => {
                      const isSelected = answers.get(question.id) === option.value
                      const colorClass = isSelected ? getOptionColor(option.score) : 'bg-white'
                      
                      return (
                        <button
                          key={option.value}
                          onClick={() => onAnswer(question.id, option.value)}
                          className={`
                            flex-1 px-2 py-2.5 rounded-lg border-2 transition-all
                            ${isSelected 
                              ? `${colorClass} border-opacity-100 font-medium` 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <span className="text-xs leading-tight block">
                            {getCompactLabel(option.text)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex gap-1.5">
                    {question.options.slice(3).map((option) => {
                      const isSelected = answers.get(question.id) === option.value
                      const colorClass = isSelected ? getOptionColor(option.score) : 'bg-white'
                      
                      return (
                        <button
                          key={option.value}
                          onClick={() => onAnswer(question.id, option.value)}
                          className={`
                            flex-1 px-2 py-2.5 rounded-lg border-2 transition-all
                            ${isSelected 
                              ? `${colorClass} border-opacity-100 font-medium` 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <span className="text-xs leading-tight block">
                            {getCompactLabel(option.text)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              
              {/* Divider between questions */}
              {index === 0 && questions.length > 1 && (
                <div className="my-2 border-t border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Continue button - 10% */}
      <div className="px-4 pb-4 flex-shrink-0">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            w-full py-3 rounded-lg font-semibold text-base transition-all
            ${canProceed
              ? 'bg-pulse-coral text-white hover:bg-opacity-90'
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