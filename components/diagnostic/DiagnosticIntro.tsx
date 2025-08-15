import React from 'react'
import { Question } from '@/lib/diagnosticQuestions'

interface DiagnosticIntroProps {
  title: string
  hook: string
  introQuestions: Question[]
  answers: Map<string, number>
  onAnswer: (questionId: string, value: number) => void
  onStart: () => void
  isTeamPart?: boolean
  attendees?: number
  meetingLength?: number
  avgSalary?: number
  meetingsPerWeek?: number
  onAttendeesChange?: (value: number) => void
  onMeetingLengthChange?: (value: number) => void
  onSalaryChange?: (value: number) => void
  onMeetingsPerWeekChange?: (value: number) => void
}

export const DiagnosticIntro: React.FC<DiagnosticIntroProps> = ({
  title,
  hook,
  introQuestions,
  answers,
  onAnswer,
  onStart,
  isTeamPart = false,
  attendees = 5,
  meetingLength = 60,
  avgSalary = 100000,
  meetingsPerWeek = 10,
  onAttendeesChange,
  onMeetingLengthChange,
  onSalaryChange,
  onMeetingsPerWeekChange
}) => {
  const allQuestionsAnswered = introQuestions.every(q => answers.has(q.id))
  
  // Get color for option based on score
  const getOptionColor = (score: number, isSelected: boolean) => {
    if (!isSelected) return 'bg-white border-gray-200'
    if (score >= 8) return 'bg-green-100 border-green-400 text-green-900'
    if (score >= 5) return 'bg-yellow-100 border-yellow-400 text-yellow-900'
    if (score >= 3) return 'bg-orange-100 border-orange-400 text-orange-900'
    return 'bg-red-100 border-red-400 text-red-900'
  }

  // Compact labels for mobile
  const getCompactLabel = (text: string): string => {
    const compactMap: { [key: string]: string } = {
      "Complete control": "Complete",
      "Mostly in control": "Mostly",
      "Some control": "Some", 
      "Little control": "Little",
      "No control": "None",
      "Well-spaced with focus blocks": "Well-spaced",
      "Mostly grouped": "Grouped",
      "Scattered": "Scattered",
      "Back-to-back": "Back-to-back",
      "Random and unpredictable": "Random"
    }
    return compactMap[text] || text
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-pulse-cream">
      {/* Header - 20% */}
      <div className="flex-shrink-0 px-4 pt-6 pb-3">
        <h1 className="text-xl font-bold text-center text-gray-900 mb-2">
          {hook}
        </h1>
        <p className="text-sm text-center text-gray-600">
          {isTeamPart ? "A few quick details to reveal your team's hidden meeting costs" : "Understanding your current reality:"}
        </p>
      </div>

      {/* Questions/Content - 70% */}
      <div className="flex-1 px-4 overflow-y-auto">
        {!isTeamPart ? (
          // Personal intro questions - compact layout
          <div className="space-y-4">
            {introQuestions.map((question, index) => (
              <div key={question.id}>
                <h3 className="font-semibold text-sm text-gray-900 mb-2">
                  {question.text}
                </h3>
                
                {/* 5 options - use 3+2 grid layout */}
                {question.options.length === 5 ? (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5">
                      {question.options.slice(0, 3).map((option) => {
                        const isSelected = answers.get(question.id) === option.value
                        return (
                          <button
                            key={option.value}
                            onClick={() => onAnswer(question.id, option.value)}
                            className={`px-2 py-2.5 rounded-lg border-2 transition-all text-xs font-medium
                              ${getOptionColor(option.score, isSelected)}
                              ${isSelected ? 'border-opacity-100' : 'hover:border-gray-300'}
                            `}
                          >
                            {getCompactLabel(option.text)}
                          </button>
                        )
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {question.options.slice(3).map((option) => {
                        const isSelected = answers.get(question.id) === option.value
                        return (
                          <button
                            key={option.value}
                            onClick={() => onAnswer(question.id, option.value)}
                            className={`px-2 py-2.5 rounded-lg border-2 transition-all text-xs font-medium
                              ${getOptionColor(option.score, isSelected)}
                              ${isSelected ? 'border-opacity-100' : 'hover:border-gray-300'}
                            `}
                          >
                            {getCompactLabel(option.text)}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  // 4 options - 2x2 grid
                  <div className="grid grid-cols-2 gap-1.5">
                    {question.options.map((option) => {
                      const isSelected = answers.get(question.id) === option.value
                      return (
                        <button
                          key={option.value}
                          onClick={() => onAnswer(question.id, option.value)}
                          className={`px-2 py-2.5 rounded-lg border-2 transition-all text-xs font-medium
                            ${getOptionColor(option.score, isSelected)}
                            ${isSelected ? 'border-opacity-100' : 'hover:border-gray-300'}
                          `}
                        >
                          {getCompactLabel(option.text)}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Team intro - sliders and inputs
          <div className="space-y-4">
            {/* Attendees */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average number of attendees per meeting
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={attendees}
                  onChange={(e) => onAttendeesChange?.(Number(e.target.value))}
                  className="flex-1 attendee-slider"
                />
                <span className="text-lg font-semibold w-12 text-right">{attendees}</span>
              </div>
            </div>

            {/* Meeting Length */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average meeting length
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[30, 45, 60, 90].map((length) => (
                  <button
                    key={length}
                    onClick={() => onMeetingLengthChange?.(length)}
                    className={`py-2 px-1 rounded-lg border-2 text-xs font-medium transition-all
                      ${meetingLength === length
                        ? 'bg-blue-100 border-blue-400 text-blue-900'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {length}m
                  </button>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average attendee salary
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="50000"
                  max="200000"
                  step="5000"
                  value={avgSalary}
                  onChange={(e) => onSalaryChange?.(Number(e.target.value))}
                  className="flex-1 salary-slider"
                />
                <span className="text-sm font-semibold w-16 text-right">
                  ${(avgSalary / 1000).toFixed(0)}k
                </span>
              </div>
            </div>

            {/* Meetings per week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meetings per week
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={meetingsPerWeek}
                  onChange={(e) => onMeetingsPerWeekChange?.(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold w-12 text-right">{meetingsPerWeek}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button - 10% */}
      <div className="flex-shrink-0 px-4 pb-6 pt-3">
        <button
          onClick={onStart}
          disabled={!allQuestionsAnswered}
          className={`w-full py-3 rounded-lg font-semibold text-base transition-all
            ${allQuestionsAnswered
              ? 'bg-pulse-coral text-white hover:bg-opacity-90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Continue to {isTeamPart ? 'Team' : 'Deep Work'} Questions →
        </button>
      </div>
    </div>
  )
}