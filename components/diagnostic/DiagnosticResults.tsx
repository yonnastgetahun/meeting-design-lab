// components/diagnostic/DiagnosticResults.tsx
import React from 'react'
import { topPerformerBenchmarks } from '@/lib/diagnosticQuestions'
import { 
  calculatePersonalMetrics, 
  calculateTeamMetrics, 
  generateRecommendations,
  PersonalMetrics,
  TeamMetrics 
} from '@/lib/calculations'

interface DiagnosticResultsProps {
  type: 'personal' | 'team'
  score: number
  answers: Map<string, number>
  onContinue: () => void
}

export function DiagnosticResults({ type, score, answers, onContinue }: DiagnosticResultsProps) {
  const benchmarks = type === 'personal' 
    ? topPerformerBenchmarks.personal 
    : topPerformerBenchmarks.team

  // Calculate detailed metrics
  const personalMetrics = type === 'personal' ? calculatePersonalMetrics(answers) : null
  const teamMetrics = type === 'team' ? calculateTeamMetrics(answers) : null

  const renderPersonalResults = (metrics: PersonalMetrics) => (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm text-red-700">Burnout Risk</div>
          <div className="text-2xl font-bold text-red-900">{metrics.burnoutRisk}%</div>
          <div className="text-xs text-red-600 mt-1">
            {metrics.burnoutRisk > 70 ? 'Critical' : 
             metrics.burnoutRisk > 50 ? 'High' : 
             metrics.burnoutRisk > 30 ? 'Moderate' : 'Low'}
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-sm text-orange-700">Deep Work Lost</div>
          <div className="text-2xl font-bold text-orange-900">{metrics.deepWorkLoss}h</div>
          <div className="text-xs text-orange-600 mt-1">per week</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-700">Context Switch Cost</div>
          <div className="text-2xl font-bold text-yellow-900">{metrics.contextSwitchCost}h</div>
          <div className="text-xs text-yellow-600 mt-1">per week</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-700">Meeting Efficiency</div>
          <div className="text-2xl font-bold text-blue-900">{metrics.meetingEfficiency}%</div>
          <div className="text-xs text-blue-600 mt-1">vs 85% target</div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Bottom Line Impact</h4>
        <p className="text-gray-700">
          You're losing <span className="font-bold text-red-600">
          {Math.round(metrics.contextSwitchCost + metrics.deepWorkLoss)} hours per week
          </span> to meeting inefficiency — that's {' '}
          <span className="font-bold">{Math.round((metrics.contextSwitchCost + metrics.deepWorkLoss) * 50)} hours per year</span> or {' '}
          <span className="font-bold">{Math.round((metrics.contextSwitchCost + metrics.deepWorkLoss) * 50 / 40)} full work weeks</span>.
        </p>
      </div>
    </>
  )

  const renderTeamResults = (metrics: TeamMetrics) => (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-700">Team Engagement</div>
          <div className="text-2xl font-bold text-blue-900">{metrics.engagementScore}%</div>
          <div className="text-xs text-blue-600 mt-1">vs 85% benchmark</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-700">Decision Velocity</div>
          <div className="text-2xl font-bold text-green-900">{metrics.decisionVelocity}%</div>
          <div className="text-xs text-green-600 mt-1">
            {metrics.decisionVelocity > 70 ? 'Fast' : 
             metrics.decisionVelocity > 50 ? 'Average' : 'Slow'}
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-700">Follow-Through</div>
          <div className="text-2xl font-bold text-purple-900">{metrics.followThroughRate}%</div>
          <div className="text-xs text-purple-600 mt-1">completion rate</div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm text-red-700">Meeting Waste</div>
          <div className="text-2xl font-bold text-red-900">{metrics.wastePercentage}%</div>
          <div className="text-xs text-red-600 mt-1">could be eliminated</div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Team Impact</h4>
        <p className="text-gray-700">
          Your team could eliminate <span className="font-bold text-red-600">{metrics.wastePercentage}%</span> of meetings, 
          saving approximately <span className="font-bold">{Math.round(metrics.wastePercentage * 0.15)} hours per person per week</span>.
          With better meeting practices, decision speed could improve by <span className="font-bold">{Math.max(0, 80 - metrics.decisionVelocity)}%</span>.
        </p>
      </div>
    </>
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Your {type === 'personal' ? 'Personal' : 'Team'} Results
        </h2>
        <div className="text-6xl font-bold text-blue-600 mb-2">
          {score}%
        </div>
        <p className="text-gray-600">
          Overall Score (Top performers: {benchmarks.overallScore}%)
        </p>
      </div>

      {/* Detailed Metrics */}
      {type === 'personal' && personalMetrics && renderPersonalResults(personalMetrics)}
      {type === 'team' && teamMetrics && renderTeamResults(teamMetrics)}

      {/* Top Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-3">Your #1 Priority</h3>
        {type === 'personal' && personalMetrics && (
          personalMetrics.burnoutRisk > 70 ? (
            <div className="text-red-700">
              <strong>Urgent:</strong> Your burnout risk is critical. Block 2 hours of focus time daily starting tomorrow.
            </div>
          ) : personalMetrics.deepWorkLoss > 10 ? (
            <div className="text-orange-700">
              <strong>Important:</strong> You're losing {personalMetrics.deepWorkLoss} hours of deep work weekly. 
              Batch your meetings to recover this time.
            </div>
          ) : (
            <div className="text-green-700">
              <strong>Optimize:</strong> Your meeting habits are decent. Focus on protecting your existing deep work blocks.
            </div>
          )
        )}
        
        {type === 'team' && teamMetrics && (
          teamMetrics.wastePercentage > 50 ? (
            <div className="text-red-700">
              <strong>Urgent:</strong> {teamMetrics.wastePercentage}% of your meetings could be emails. 
              Audit all recurring meetings this week.
            </div>
          ) : teamMetrics.decisionVelocity < 50 ? (
            <div className="text-orange-700">
              <strong>Important:</strong> Slow decision-making is blocking progress. 
              Implement a "decide by" date for every discussion.
            </div>
          ) : (
            <div className="text-green-700">
              <strong>Optimize:</strong> Your team meetings are relatively effective. 
              Focus on improving follow-through to {'>'}90%.
            </div>
          )
        )}
      </div>

      <div className="text-center">
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Your {type === 'personal' ? 'Productivity' : 'Team'} Action Plan
        </button>
      </div>
    </div>
  )
}