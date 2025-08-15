'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { diagnosticParts, calculateWeightedScore, calculateContextSwitching, calculateEngagementScore } from '@/lib/diagnosticQuestions'
import { DiagnosticIntro } from '@/components/diagnostic/DiagnosticIntro'
import { QuestionScreen } from '@/components/diagnostic/QuestionScreen'
import { DiagnosticResults } from '@/components/diagnostic/DiagnosticResults'
import { EmailCapture } from '@/components/diagnostic/EmailCapture'
import { DiagnosticComplete } from '@/components/diagnostic/DiagnosticComplete'
import { ProgressBar } from '@/components/UI/ProgressBar'
import { diagnosticTracking } from '@/lib/analytics'

type DiagnosticStage = 'intro' | 'personal' | 'personal-results' | 'personal-email' | 'team' | 'team-results' | 'team-email' | 'complete'

interface DiagnosticState {
  currentStage: DiagnosticStage
  personalAnswers: Map<string, number>
  teamAnswers: Map<string, number>
  personalScore: number | null
  teamScore: number | null
  userEmail: string | null
  completionStartTime: number
  currentScreenIndex: number
}

export function DiagnosticFlowV2() {
  const [state, setState] = useState<DiagnosticState>({
    currentStage: 'intro',
    personalAnswers: new Map(),
    teamAnswers: new Map(),
    personalScore: null,
    teamScore: null,
    userEmail: null,
    completionStartTime: Date.now(),
    currentScreenIndex: 0
  })

  // Track diagnostic start
  useEffect(() => {
    diagnosticTracking.trackDiagnosticStart()
  }, [])

  const calculatePersonalScore = useCallback(() => {
    if (state.personalAnswers.size === 0) return 0
    return calculateWeightedScore(state.personalAnswers, 'personal')
  }, [state.personalAnswers])

  const calculateTeamScore = useCallback(() => {
    if (state.teamAnswers.size === 0) return 0
    return calculateWeightedScore(state.teamAnswers, 'team')
  }, [state.teamAnswers])

  const handlePersonalAnswer = (questionId: string, value: number) => {
    const newAnswers = new Map(state.personalAnswers)
    newAnswers.set(questionId, value)
    
    setState(prev => ({
      ...prev,
      personalAnswers: newAnswers
    }))

    // Track question interaction
    diagnosticTracking.trackQuestionInteraction(questionId, value, 'personal')
  }

  const handleTeamAnswer = (questionId: string, value: number) => {
    const newAnswers = new Map(state.teamAnswers)
    newAnswers.set(questionId, value)
    
    setState(prev => ({
      ...prev,
      teamAnswers: newAnswers
    }))

    // Track question interaction
    diagnosticTracking.trackQuestionInteraction(questionId, value, 'team')
  }

  const handlePersonalComplete = () => {
    const score = calculatePersonalScore()
    setState(prev => ({
      ...prev,
      personalScore: score,
      currentStage: 'personal-results',
      currentScreenIndex: 0
    }))

    // Track personal assessment completion
    diagnosticTracking.trackPersonalAssessmentComplete(score, Date.now() - state.completionStartTime)
  }

  const handleTeamComplete = () => {
    const score = calculateTeamScore()
    setState(prev => ({
      ...prev,
      teamScore: score,
      currentStage: 'team-results',
      currentScreenIndex: 0
    }))

    // Track team assessment completion
    diagnosticTracking.trackTeamAssessmentComplete(score, Date.now() - state.completionStartTime)
  }

  const handleEmailCapture = async (email: string, stage: 'personal' | 'team') => {
    setState(prev => ({
      ...prev,
      userEmail: email
    }))

    // Track email capture
    diagnosticTracking.trackEmailCapture(stage)

    // Generate and send PDF if both scores available
    if (state.personalScore !== null && state.teamScore !== null) {
      await generatePDFReport(email)
    }

    // Move to next stage
    if (stage === 'personal') {
      setState(prev => ({
        ...prev,
        currentStage: 'team',
        currentScreenIndex: 0
      }))
    } else {
      setState(prev => ({
        ...prev,
        currentStage: 'complete'
      }))
    }
  }

  const generatePDFReport = async (email: string) => {
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalScore: state.personalScore,
          teamScore: state.teamScore,
          personalAnswers: Array.from(state.personalAnswers.entries()),
          teamAnswers: Array.from(state.teamAnswers.entries()),
          email
        })
      })

      if (response.ok) {
        diagnosticTracking.trackPDFGeneration({
          personalScore: state.personalScore!,
          teamScore: state.teamScore!
        })
      }
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
  }

  const handleNextScreen = () => {
    setState(prev => ({
      ...prev,
      currentScreenIndex: prev.currentScreenIndex + 1
    }))
  }

  const handleSkipToTeam = () => {
    setState(prev => ({
      ...prev,
      currentStage: 'team',
      currentScreenIndex: 0
    }))
  }

  const canProceedPersonal = () => {
    const currentQuestions = diagnosticParts.personal.questions.slice(
      state.currentScreenIndex * 2,
      (state.currentScreenIndex + 1) * 2
    )
    return currentQuestions.every(q => state.personalAnswers.has(q.id))
  }

  const canProceedTeam = () => {
    const currentQuestions = diagnosticParts.team.questions.slice(
      state.currentScreenIndex * 2,
      (state.currentScreenIndex + 1) * 2
    )
    return currentQuestions.every(q => state.teamAnswers.has(q.id))
  }

  const getTotalProgress = () => {
    const personalTotal = diagnosticParts.personal.questions.length
    const teamTotal = diagnosticParts.team.questions.length
    const personalAnswered = state.personalAnswers.size
    const teamAnswered = state.teamAnswers.size
    
    return Math.round(((personalAnswered + teamAnswered) / (personalTotal + teamTotal)) * 100)
  }

  const getCurrentScreenQuestions = () => {
    const currentPart = state.currentStage === 'personal' ? diagnosticParts.personal : diagnosticParts.team
    return currentPart.questions.slice(
      state.currentScreenIndex * 2,
      (state.currentScreenIndex + 1) * 2
    )
  }

  const isLastScreen = () => {
    const currentPart = state.currentStage === 'personal' ? diagnosticParts.personal : diagnosticParts.team
    const totalScreens = Math.ceil(currentPart.questions.length / 2)
    return state.currentScreenIndex >= totalScreens - 1
  }

  const renderCurrentStage = () => {
    switch (state.currentStage) {
      case 'intro':
        return (
          <DiagnosticIntro
            title={diagnosticParts.personal.title}
            hook={diagnosticParts.personal.hook}
            introQuestions={diagnosticParts.personal.introQuestions}
            answers={state.personalAnswers}
            onAnswer={handlePersonalAnswer}
            onStart={() => setState(prev => ({ ...prev, currentStage: 'personal' }))}
          />
        )

      case 'personal':
        return (
          <QuestionScreen
            questions={getCurrentScreenQuestions()}
            answers={state.personalAnswers}
            onAnswer={handlePersonalAnswer}
            onNext={isLastScreen() ? handlePersonalComplete : handleNextScreen}
            canProceed={canProceedPersonal()}
            currentScreen={state.currentScreenIndex + 1}
            totalScreens={Math.ceil(diagnosticParts.personal.questions.length / 2)}
            assessmentType="personal"
          />
        )

      case 'personal-results':
        return (
          <DiagnosticResults
            type="personal"
            score={state.personalScore!}
            answers={state.personalAnswers}
            onContinue={() => setState(prev => ({ ...prev, currentStage: 'personal-email' }))}
            onSkip={handleSkipToTeam}
          />
        )

      case 'personal-email':
        return (
          <EmailCapture
            type="personal"
            score={state.personalScore!}
            onSubmit={(email) => handleEmailCapture(email, 'personal')}
          />
        )

      case 'team':
        return (
          <QuestionScreen
            questions={getCurrentScreenQuestions()}
            answers={state.teamAnswers}
            onAnswer={handleTeamAnswer}
            onNext={isLastScreen() ? handleTeamComplete : handleNextScreen}
            canProceed={canProceedTeam()}
            currentScreen={state.currentScreenIndex + 1}
            totalScreens={Math.ceil(diagnosticParts.team.questions.length / 2)}
            assessmentType="team"
          />
        )

      case 'team-results':
        return (
          <DiagnosticResults
            type="team"
            score={state.teamScore!}
            answers={state.teamAnswers}
            onContinue={() => setState(prev => ({ ...prev, currentStage: 'team-email' }))}
          />
        )

      case 'team-email':
        return (
          <EmailCapture
            type="team"
            score={state.teamScore!}
            onSubmit={(email) => handleEmailCapture(email, 'team')}
          />
        )

      case 'complete':
        return (
          <DiagnosticComplete
            personalScore={state.personalScore}
            teamScore={state.teamScore}
            userEmail={state.userEmail!}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-pulse-cream">
      {/* Progress Bar */}
      {!['intro', 'complete'].includes(state.currentStage) && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <ProgressBar 
            progress={getTotalProgress()} 
            showPercentage={true}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={`${!['intro', 'complete'].includes(state.currentStage) ? 'pt-16' : ''}`}>
        {renderCurrentStage()}
      </div>
    </div>
  )
}