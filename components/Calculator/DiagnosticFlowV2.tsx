// ===== FILE: components/Calculator/DiagnosticFlowV2.tsx =====
'use client'

import React, { useState } from 'react'
import { diagnosticParts, calculateWeightedScore, calculateContextSwitching, calculateEngagementScore } from '@/lib/diagnosticQuestions'
import { DiagnosticIntro } from '@/components/diagnostic/DiagnosticIntro'
import { QuestionScreen } from '@/components/diagnostic/QuestionScreen'
import { MiniInsight } from '@/components/diagnostic/MiniInsight'
import { DiagnosticResults } from '@/components/diagnostic/DiagnosticResults'
import { EmailCapture } from '@/components/diagnostic/EmailCapture'

type DiagnosticStage = 'intro' | 'questions' | 'results' | 'email-capture'
type DiagnosticPart = 'personal' | 'team' | 'complete'

export default function DiagnosticFlowV2() {
  const [currentPart, setCurrentPart] = useState<DiagnosticPart>('personal')
  const [stage, setStage] = useState<DiagnosticStage>('intro')
  const [currentScreen, setCurrentScreen] = useState(0)
  const [answers, setAnswers] = useState<Map<string, number>>(new Map())
  const [showMiniInsight, setShowMiniInsight] = useState(false)
  const [personalScore, setPersonalScore] = useState<number | null>(null)
  const [teamScore, setTeamScore] = useState<number | null>(null)

  // Get current part data
  const partData = currentPart === 'team' ? diagnosticParts[1] : diagnosticParts[0]
  
  // Calculate questions per screen (2-2-2-2 pattern)
  const questionsPerScreen = [2, 2, 2, 2]
  const totalScreens = Math.ceil(partData.questions.length / 2)
  
  // Get questions for current screen
  const getQuestionsForScreen = (screenIndex: number) => {
    const startIdx = questionsPerScreen.slice(0, screenIndex).reduce((a, b) => a + b, 0)
    const endIdx = startIdx + questionsPerScreen[screenIndex]
    return partData.questions.slice(startIdx, endIdx)
  }

  const currentQuestions = stage === 'questions' ? getQuestionsForScreen(currentScreen) : []

  // Handle answer submission
  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = new Map(answers)
    newAnswers.set(questionId, value)
    setAnswers(newAnswers)
  }

  // Check if all questions on current screen are answered
  const allCurrentQuestionsAnswered = currentQuestions.every(q => answers.has(q.id))

  // Handle navigation
  const handleNext = () => {
    // If currently showing mini-insight, hide it and continue
    if (showMiniInsight) {
      setShowMiniInsight(false)
      if (currentScreen < totalScreens - 1) {
        setCurrentScreen(currentScreen + 1)
      } else {
        completeCurrentPart()
      }
      return
    }

    // Check if we should show mini-insight (after screen 2, which is questions 3-4)
    const shouldShowPersonalInsight = currentPart === 'personal' && currentScreen === 1 && !showMiniInsight
    const shouldShowTeamInsight = currentPart === 'team' && currentScreen === 1 && !showMiniInsight
    
    if (shouldShowPersonalInsight || shouldShowTeamInsight) {
      setShowMiniInsight(true)
      return
    }

    // Normal navigation
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      completeCurrentPart()
    }
  }

  const completeCurrentPart = () => {
    // Calculate score for current part
    const score = calculateWeightedScore(answers, partData.questions)
    
    if (currentPart === 'personal') {
      setPersonalScore(score)
      setStage('results')
    } else {
      setTeamScore(score)
      setStage('results')
    }
  }

  const handleEmailSubmit = (email: string) => {
    console.log(`Email captured for ${currentPart}:`, email)
    
    if (currentPart === 'personal') {
      // Move to team questions
      setCurrentPart('team')
      setStage('intro')
      setCurrentScreen(0)
    } else {
      // Complete diagnostic
      setCurrentPart('complete')
    }
  }

  const handleStartQuestions = () => {
    setStage('questions')
    setCurrentScreen(0)
  }

  // Calculate progress
  const totalQuestions = partData.questions.length
  const answeredQuestions = partData.questions.filter(q => answers.has(q.id)).length
  const progress = (answeredQuestions / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        {stage === 'questions' && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Part {currentPart === 'personal' ? '1' : '2'}: {partData.title}</span>
              <span>{answeredQuestions} of {totalQuestions} questions</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        {stage === 'intro' && (
          <DiagnosticIntro
            title={partData.title}
            hook={partData.hook}
            onStart={handleStartQuestions}
            isTeamPart={currentPart === 'team'}
          />
        )}

        {stage === 'questions' && !showMiniInsight && (
          <QuestionScreen
            questions={currentQuestions}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            canProceed={allCurrentQuestionsAnswered}
            currentScreen={currentScreen + 1}
            totalScreens={totalScreens}
          />
        )}

        {stage === 'questions' && showMiniInsight && (
          <MiniInsight
            type={currentPart}
            answers={answers}
            onContinue={handleNext}
          />
        )}

        {stage === 'results' && (
          <DiagnosticResults
            type={currentPart}
            score={currentPart === 'personal' ? personalScore! : teamScore!}
            answers={answers}
            onContinue={() => setStage('email-capture')}
          />
        )}

        {stage === 'email-capture' && (
          <EmailCapture
            title={partData.emailCaptureTitle}
            description={partData.emailCaptureDescription}
            score={currentPart === 'personal' ? personalScore! : teamScore!}
            type={currentPart}
            onSubmit={handleEmailSubmit}
            onSkip={currentPart === 'personal' ? () => {
              setCurrentPart('team')
              setStage('intro')
              setCurrentScreen(0)
            } : undefined}
          />
        )}

        {currentPart === 'complete' && (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Diagnostic Complete!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for completing both parts of the meeting effectiveness diagnostic.
              Check your email for your personalized resources.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-2">Your Scores:</h3>
                <p>Personal Productivity: {personalScore}%</p>
                <p>Team Effectiveness: {teamScore}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}