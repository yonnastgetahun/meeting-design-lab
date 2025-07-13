'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SliderInput from '../UI/SliderInput'
import { calculateMeetingCosts, formatCurrency, MeetingInputs } from '@/app/lib/calculations'

interface CostCalculatorProps {
  onComplete: (inputs: MeetingInputs, costs: any) => void
}

export default function CostCalculator({ onComplete }: CostCalculatorProps) {
  const [inputs, setInputs] = useState<MeetingInputs>({
    avgMeetingsPerWeek: 10,
    avgAttendees: 5,
    avgMeetingLength: 60,
    avgSalary: 100000
  })

  const [showResults, setShowResults] = useState(false)

  // Calculate costs in real-time
  const costs = calculateMeetingCosts(inputs)

  const handleSubmit = () => {
    setShowResults(true)
    // Auto-advance after showing results briefly
    setTimeout(() => {
      onComplete(inputs, costs)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-dm-serif mb-4 text-pulse-navy">
          71% of meetings{' '}
          <span className="text-gradient">drain energy and kill productivity</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Take 2 minutes to discover:
        </p>
        <div className="max-w-md mx-auto text-left space-y-2">
          <p className="flex items-center gap-2 text-gray-700">
            <span className="text-pulse-coral text-lg">✓</span> 
            <span>Where you stand vs. the 71%</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <span className="text-pulse-coral text-lg">✓</span> 
            <span>Your personal burnout risk score</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <span className="text-pulse-coral text-lg">✓</span> 
            <span>Science-backed fixes that actually work</span>
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Meetings per week */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
            How many meetings do you attend per week?
          </h3>
          <SliderInput
            value={inputs.avgMeetingsPerWeek}
            onChange={(value) => setInputs({ ...inputs, avgMeetingsPerWeek: value })}
            min={1}
            max={40}
            step={1}
            label="Meetings per week"
          />
        </div>

        {/* Average attendees */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
            Average number of attendees per meeting?
          </h3>
          <SliderInput
            value={inputs.avgAttendees}
            onChange={(value) => setInputs({ ...inputs, avgAttendees: value })}
            min={2}
            max={20}
            step={1}
            label="People per meeting"
          />
        </div>

        {/* Meeting length */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
            Average meeting length?
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[30, 45, 60, 90].map((minutes) => (
              <button
                key={minutes}
                onClick={() => setInputs({ ...inputs, avgMeetingLength: minutes })}
                className={`py-3 px-4 rounded-xl font-medium transition-all
                  ${inputs.avgMeetingLength === minutes
                    ? 'bg-pulse-coral text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>

        {/* Average salary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-ibm-plex font-semibold mb-4 text-pulse-navy">
            Average attendee salary (for calculation purposes)
          </h3>
          <SliderInput
            value={inputs.avgSalary}
            onChange={(value) => setInputs({ ...inputs, avgSalary: value })}
            min={40000}
            max={200000}
            step={5000}
            label={formatCurrency(inputs.avgSalary)}
            showValue={false}
          />
          <p className="text-sm text-gray-500 mt-2">
            This stays private - just for calculations
          </p>
        </div>

        {/* Live calculation preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-pulse-coral/5 to-pulse-orange/5 rounded-2xl p-6 border border-pulse-coral/20"
        >
          <div className="text-center">
            <p className="text-gray-600 mb-2">Your meetings cost</p>
            <p className="text-5xl font-dm-serif text-gradient">
              {formatCurrency(costs.monthlyMeetingCost)}
            </p>
            <p className="text-gray-600 mt-2">per month</p>
          </div>
        </motion.div>

        {/* Continue button */}
        <button
          onClick={handleSubmit}
          className="w-full btn-primary text-lg py-4 shadow-md hover:shadow-lg"
        >
          {showResults ? 'Analyzing...' : 'Start Your Assessment →'}
        </button>
      </div>

      {/* Shocking result overlay */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <p className="text-6xl mb-4">😱</p>
              <h2 className="text-5xl font-dm-serif text-gradient">
                {formatCurrency(costs.annualMeetingCost)}
              </h2>
              <p className="text-2xl text-gray-700 mt-4">
                per year on meetings!
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600"
            >
              But how much of that is wasted? Let's find out...
            </motion.p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}