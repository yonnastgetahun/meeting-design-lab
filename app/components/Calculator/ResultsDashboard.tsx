'use client'

import { motion } from 'framer-motion'
import { MeetingCosts, calculateWastePercentage, calculateMoneyWasted, formatCurrency, getScoreCategory, calculateHourlyRate } from '@/app/lib/calculations'
import { calculateAdditionalInsights } from '@/app/lib/questions'
import DownloadGate from '../EmailCapture/DownloadGate'
import { useState } from 'react'

interface ResultsDashboardProps {
  meetingCosts: MeetingCosts
  meetingInputs: {
    avgMeetingsPerWeek: number
    avgAttendees: number
    avgMeetingLength: number
    avgSalary: number
  }
  diagnosticScores: {
    participation: number
    purpose: number
    energy: number
    decisions: number
    followThrough: number
    overall: number
  }
  answers: Map<number, number>
}

export default function ResultsDashboard({ meetingCosts, meetingInputs, diagnosticScores, answers }: ResultsDashboardProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  
  const wastePercentage = calculateWastePercentage(diagnosticScores.overall)
  const moneyWasted = calculateMoneyWasted(meetingCosts, wastePercentage)
  const category = getScoreCategory(diagnosticScores.overall)
  
  // Calculate additional insights
  const insights = calculateAdditionalInsights(answers, meetingInputs)
  const hourlyRate = calculateHourlyRate(meetingInputs.avgSalary)
  
  // Calculate context switching cost
  const contextSwitchCostWeekly = Math.round((insights.contextSwitchCostPerWeek / 60) * hourlyRate)
  const contextSwitchCostAnnual = Math.round(contextSwitchCostWeekly * 52)
  
  // Calculate deep work loss cost
  const deepWorkCostWeekly = Math.round(insights.deepWorkLossHours * hourlyRate * 1.5) // 1.5x multiplier for high-value work
  const deepWorkCostAnnual = Math.round(deepWorkCostWeekly * 52)

  const categoryConfig = {
    critical: {
      emoji: '🚨',
      title: 'Critical Condition',
      color: 'text-red-500',
      message: 'Your meetings are in crisis mode'
    },
    struggling: {
      emoji: '😰',
      title: 'Struggling',
      color: 'text-orange-500',
      message: 'Your meetings need serious help'
    },
    good: {
      emoji: '👍',
      title: 'Pretty Good',
      color: 'text-green-600',
      message: 'Better than most, but room to improve'
    },
    excellent: {
      emoji: '🌟',
      title: 'Excellent!',
      color: 'text-green-600',
      message: 'Your meetings are highly effective'
    }
  }

  const config = categoryConfig[category]

  if (showEmailCapture) {
    return (
      <div className="min-h-screen bg-pulse-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <DownloadGate score={diagnosticScores.overall} category={category} />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-pulse-cream pb-24"
    >
      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {config.emoji}
          </motion.div>
          <h1 className="text-4xl font-dm-serif mb-2 text-pulse-navy">
            <span className={config.color}>{config.title}</span>
          </h1>
          <p className="text-xl text-gray-600">{config.message}</p>
        </motion.div>

        {/* Main Impact Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Team/Org Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 text-center shadow-md border border-gray-100"
          >
            <p className="text-gray-600 mb-2">Your meetings cost the organization</p>
            <p className="text-5xl font-dm-serif text-gradient mb-4">
              {formatCurrency(moneyWasted.annualWaste)}
            </p>
            <p className="text-xl text-gray-700 mb-6">
              per year in wasted time
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-pulse-coral">
                  {formatCurrency(contextSwitchCostAnnual)}
                </p>
                <p className="text-sm text-gray-600">Context switching cost</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pulse-orange">
                  {formatCurrency(deepWorkCostAnnual)}
                </p>
                <p className="text-sm text-gray-600">Deep work loss</p>
              </div>
            </div>
          </motion.div>

          {/* Personal Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            <h3 className="text-lg font-ibm-plex font-semibold mb-6 text-pulse-navy">
              Your Personal Impact
            </h3>
            
            {/* Burnout Risk Meter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Burnout Risk</span>
                <span className={`font-bold ${
                  insights.burnoutRisk > 70 ? 'text-red-500' : 
                  insights.burnoutRisk > 40 ? 'text-orange-500' : 'text-green-600'
                }`}>
                  {insights.burnoutRisk}%
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${insights.burnoutRisk}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className={`h-full ${
                    insights.burnoutRisk > 70 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                    insights.burnoutRisk > 40 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 
                    'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Context switches/day</span>
                <span className="font-medium text-pulse-navy">~{Math.round(insights.contextSwitchCostPerWeek / 115)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deep work hours lost/week</span>
                <span className="font-medium text-pulse-navy">{insights.deepWorkLossHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time in ineffective meetings</span>
                <span className="font-medium text-pulse-navy">{wastePercentage}%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Overall Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
              Meeting Health Score
            </h3>
            <div className="relative h-40 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="60"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="60"
                  fill="none"
                  stroke="#FF6B6B"
                  strokeWidth="12"
                  strokeDasharray={`${diagnosticScores.overall * 37.7} 377`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="text-center">
                <p className="text-4xl font-bold text-pulse-navy">{diagnosticScores.overall}</p>
                <p className="text-gray-600">out of 10</p>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
              Score Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries({
                'Participation': diagnosticScores.participation,
                'Purpose': diagnosticScores.purpose,
                'Energy': diagnosticScores.energy,
                'Decisions': diagnosticScores.decisions,
                'Follow Through': diagnosticScores.followThrough
              }).map(([label, score]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium text-pulse-navy">{score}/10</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score * 10}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-pulse-coral to-pulse-orange"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Time & Money Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
            Total Impact Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-pulse-coral">
                {Math.round(meetingCosts.timeWastedWeekly * wastePercentage / 100)}
              </p>
              <p className="text-sm text-gray-600">hours/week wasted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-pulse-orange">
                {Math.round(meetingCosts.timeWastedAnnually * wastePercentage / 100 / 8)}
              </p>
              <p className="text-sm text-gray-600">days/year wasted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(moneyWasted.monthlyWaste)}
              </p>
              <p className="text-sm text-gray-600">monthly waste</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {insights.deepWorkNeeded}%
              </p>
              <p className="text-sm text-gray-600">role needs deep work</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-xl text-gray-700 mb-6">
            Ready to reclaim your time, reduce burnout, and save your organization money?
          </p>
          <button
            onClick={() => setShowEmailCapture(true)}
            className="btn-primary text-lg px-8 py-4 shadow-lg"
          >
            Get Your Free Meeting Transformation Toolkit →
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}