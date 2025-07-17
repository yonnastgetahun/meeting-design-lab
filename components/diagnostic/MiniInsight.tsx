// ===== FILE 3: components/diagnostic/MiniInsight.tsx =====
import React from 'react'
import { calculateContextSwitching, calculateEngagementScore } from '@/lib/diagnosticQuestions'

interface MiniInsightProps {
  type: 'personal' | 'team'
  answers: Map<string, number>
  onContinue: () => void
}

export function MiniInsight({ type, answers, onContinue }: MiniInsightProps) {
  const renderPersonalInsight = () => {
    const meetingDistribution = answers.get('p2') || 1
    const insight = calculateContextSwitching(meetingDistribution)
    
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-900 mb-3">
          💡 Quick Insight: Context Switching Cost
        </h3>
        <p className="text-lg text-yellow-800 mb-2">
          You're losing <span className="font-bold">{insight.hoursLostPerWeek} hours/week</span> to context switching
        </p>
        <p className="text-sm text-yellow-700">
          ({insight.minutesLostPerSwitch} minutes between each meeting × {insight.switchesPerDay} meetings/day)
        </p>
        <p className="text-sm text-yellow-700 mt-2">
          Plus an additional {insight.productivityLoss}% productivity loss from mental fatigue
        </p>
      </div>
    )
  }

  const renderTeamInsight = () => {
    const participation = answers.get('t1') || 1
    const multitasking = answers.get('t2') || 1
    const rightPeople = answers.get('t3') || 1
    const engagementScore = calculateEngagementScore(participation, multitasking, rightPeople)
    
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-3">
          📊 Quick Insight: Team Engagement
        </h3>
        <p className="text-lg text-blue-800">
          Your meetings have an engagement score of <span className="font-bold">{engagementScore}%</span>
        </p>
        <p className="text-sm text-blue-700 mt-2">
          Top performing teams average 85% or higher
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {type === 'personal' ? renderPersonalInsight() : renderTeamInsight()}
      
      <div className="text-center">
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}