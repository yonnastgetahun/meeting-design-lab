'use client'

import { useState, useEffect } from 'react'
import Container from './components/Layout/Container'
import CostCalculator from './components/Calculator/CostCalculator'
import DiagnosticFlow from './components/Calculator/DiagnosticFlow'
import ResultsDashboard from './components/Calculator/ResultsDashboard'
import { MeetingInputs, MeetingCosts } from './lib/calculations'
import { trackCalculatorStart, trackCostCalculation, trackDiagnosticComplete, initializeAnalytics } from './lib/analytics'

type Stage = 'calculator' | 'diagnostic' | 'results'

export default function Home() {
  const [currentStage, setCurrentStage] = useState<Stage>('calculator')
  const [meetingInputs, setMeetingInputs] = useState<MeetingInputs | null>(null)
  const [meetingCosts, setMeetingCosts] = useState<MeetingCosts | null>(null)
  const [diagnosticScores, setDiagnosticScores] = useState<any>(null)
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Map<number, number>>(new Map())

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics()
    trackCalculatorStart()
  }, [])

  const handleCalculatorComplete = (inputs: MeetingInputs, costs: MeetingCosts) => {
    setMeetingInputs(inputs)
    setMeetingCosts(costs)
    
    // Track the calculation
    trackCostCalculation({
      annualCost: costs.annualMeetingCost,
      monthlyWaste: costs.monthlyMeetingCost
    })
    
    // Move to diagnostic
    setCurrentStage('diagnostic')
  }

  const handleDiagnosticComplete = (scores: any, answers: Map<number, number>) => {
    setDiagnosticScores(scores)
    setDiagnosticAnswers(answers)
    
    // Track completion
    trackDiagnosticComplete(scores.overall, scores.overall < 4 ? 'critical' : scores.overall < 6 ? 'struggling' : 'good')
    
    // Move to results
    setCurrentStage('results')
  }

  return (
    <main className="min-h-screen bg-pulse-cream">
      {currentStage === 'calculator' && (
        <Container className="pt-12">
          <CostCalculator onComplete={handleCalculatorComplete} />
        </Container>
      )}

      {currentStage === 'diagnostic' && (
        <DiagnosticFlow onComplete={handleDiagnosticComplete} />
      )}

      {currentStage === 'results' && meetingCosts && diagnosticScores && meetingInputs && (
        <ResultsDashboard 
          meetingCosts={meetingCosts}
          meetingInputs={meetingInputs}
          diagnosticScores={diagnosticScores}
          answers={diagnosticAnswers}
        />
      )}
    </main>
  )
}