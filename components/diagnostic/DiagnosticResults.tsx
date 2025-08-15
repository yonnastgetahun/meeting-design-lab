import React from 'react'
import { topPerformerBenchmarks } from '@/lib/diagnosticQuestions'
import { 
  calculatePersonalMetrics, 
  calculateTeamMetrics, 
  generateRecommendations,
  PersonalMetrics,
  TeamMetrics 
} from '@/lib/calculations'
import { StatusCard } from '@/components/UI/StatusCard'
import { ScoreCard } from '@/components/UI/ScoreCard'
import { MetricGrid } from '@/components/UI/MetricGrid'
import { getStatus } from '@/lib/designSystem'

interface DiagnosticResultsProps {
  type: 'personal' | 'team'
  score: number
  answers: Map<string, number>
  onContinue: () => void
  onSkip?: () => void
}

export function DiagnosticResults({ type, score, answers, onContinue, onSkip }: DiagnosticResultsProps) {
  const metrics = type === 'personal' 
    ? calculatePersonalMetrics(answers) 
    : calculateTeamMetrics(answers)
  
  const recommendations = generateRecommendations(type, score, metrics)
  const status = getStatus(score, type)

  const formatMetricsForGrid = () => {
    if (type === 'personal') {
      const personalMetrics = metrics as PersonalMetrics
      return [
        {
          value: `${personalMetrics.burnoutRisk}%`,
          label: 'Burnout Risk',
          color: personalMetrics.burnoutRisk > 70 ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
        },
        {
          value: `${personalMetrics.deepWorkLoss}h`,
          label: 'Deep Work Lost',
          color: 'bg-orange-50 text-orange-600'
        },
        {
          value: `${personalMetrics.contextSwitches}`,
          label: 'Context Switches',
          color: 'bg-purple-50 text-purple-600'
        },
        {
          value: `${personalMetrics.meetingEfficiency}%`,
          label: 'Meeting Quality',
          color: personalMetrics.meetingEfficiency > 60 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }
      ]
    } else {
      const teamMetrics = metrics as TeamMetrics
      return [
        {
          value: `${teamMetrics.decisionVelocity}%`,
          label: 'Decision Speed',
          color: teamMetrics.decisionVelocity > 60 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        },
        {
          value: `${teamMetrics.engagementScore}%`,
          label: 'Team Engagement',
          color: 'bg-blue-50 text-blue-600'
        },
        {
          value: `${teamMetrics.followThroughRate}%`,
          label: 'Follow Through',
          color: 'bg-purple-50 text-purple-600'
        },
        {
          value: `$${teamMetrics.yearlyWaste.toLocaleString()}`,
          label: 'Annual Waste',
          color: 'bg-red-50 text-red-600'
        }
      ]
    }
  }

  const getBottomLineMessage = () => {
    if (type === 'personal') {
      const personalMetrics = metrics as PersonalMetrics
      const weeklyLoss = Math.round(personalMetrics.contextSwitchCost + personalMetrics.deepWorkLoss)
      return `You're losing ${weeklyLoss} hours/week to inefficient meetings and context switching`
    } else {
      const teamMetrics = metrics as TeamMetrics
      return `Your team could save $${teamMetrics.yearlyWaste.toLocaleString()} annually by optimizing meeting culture`
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-pulse-cream">
      {/* Scrollable Content Area */}
      <div className="flex-1 px-4 pt-6 pb-28 overflow-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'personal' ? 'Your Productivity Diagnostic' : 'Your Team Performance Diagnostic'}
          </h1>
          <p className="text-gray-600">
            {type === 'personal' 
              ? 'Based on your responses, here\'s how you\'re performing'
              : 'Based on your responses, here\'s how your team is performing'
            }
          </p>
        </div>

        {/* Score Card */}
        <ScoreCard 
          score={score} 
          type={type}
          description={status.subtitle}
        />

        {/* Status Card */}
        <StatusCard
          emoji={status.emoji}
          title={status.text}
          subtitle={status.subtitle}
          score={score}
        />

        {/* Metrics Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Key Metrics</h3>
          <MetricGrid metrics={formatMetricsForGrid()} />
        </div>

        {/* Bottom Line */}
        <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-pulse-coral">
          <h3 className="font-semibold text-gray-800 mb-2">Bottom Line</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {getBottomLineMessage()}
          </p>
        </div>

        {/* Top Recommendations */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Wins</h3>
          <ul className="space-y-2">
            {recommendations.slice(0, 3).map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-pulse-coral mr-2 mt-1">•</span>
                <span className="text-gray-700 text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benchmark Comparison */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">vs. High Performers</h3>
          <p className="text-gray-600 text-sm">
            Top-performing {type === 'personal' ? 'individuals' : 'teams'} score {topPerformerBenchmarks[type]}% 
            on average. You're currently at {score}%.
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex flex-col space-y-2">
          <button
            onClick={onContinue}
            aria-label={`Get your ${type === 'personal' ? 'Productivity' : 'Team'} Action Plan`}
            className="w-full bg-pulse-coral text-white py-3 px-4 rounded-lg font-semibold text-base hover:bg-pulse-coral/90 transition-colors"
          >
            Get Your {type === 'personal' ? 'Productivity Action Plan' : 'Team Acceleration Plan'} →
          </button>
          
          {onSkip && (
            <button
              onClick={onSkip}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
            >
              Skip to Team Assessment →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}