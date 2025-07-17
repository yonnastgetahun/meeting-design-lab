// lib/calculations.ts - Enhanced calculation functions

import { Question } from './diagnosticQuestions'

// PERSONAL CALCULATIONS
export interface PersonalMetrics {
  burnoutRisk: number // 0-100
  deepWorkLoss: number // hours per week
  contextSwitchCost: number // hours per week
  productivityLoss: number // percentage
  meetingEfficiency: number // percentage
}

export function calculatePersonalMetrics(answers: Map<string, number>): PersonalMetrics {
  // Get answer values
  const calendarControl = answers.get('p1') || 1
  const meetingDistribution = answers.get('p2') || 1
  const deepWorkAvailable = answers.get('p3') || 1
  const deepWorkNeeded = answers.get('p4') || 1
  const meetingEnergy = answers.get('p5') || 1
  const dailyAccomplishment = answers.get('p6') || 1
  const protectedTime = answers.get('p7') || 0
  const meetingNecessity = answers.get('p8') || 1

  // Context Switching Cost (already implemented)
  const contextSwitch = calculateContextSwitching(meetingDistribution)
  
  // Burnout Risk Calculation (0-100 scale)
  const burnoutFactors = [
    (4 - calendarControl) * 25, // Less control = higher burnout
    (4 - deepWorkAvailable) * 20, // Less deep work = higher burnout
    (4 - meetingEnergy) * 20, // Lower energy = higher burnout
    (meetingDistribution === 1 ? 20 : meetingDistribution === 2 ? 15 : 5), // Scattered meetings
    (protectedTime === 0 ? 15 : 0) // No protected time
  ]
  const burnoutRisk = Math.min(100, burnoutFactors.reduce((a, b) => a + b, 0))

  // Deep Work Loss Calculation
  const idealDeepWorkHours = deepWorkNeeded === 1 ? 2 : 
                            deepWorkNeeded === 2 ? 4 : 
                            deepWorkNeeded === 3 ? 6 : 8
  
  const actualDeepWorkHours = deepWorkAvailable === 1 ? 0.5 : 
                             deepWorkAvailable === 2 ? 1 : 
                             deepWorkAvailable === 3 ? 1.5 : 3
  
  const deepWorkLoss = Math.max(0, (idealDeepWorkHours - actualDeepWorkHours) * 5) // per week

  // Meeting Efficiency
  const efficiencyFactors = [
    meetingNecessity * 25, // Higher necessity = better efficiency
    (protectedTime === 1 ? 25 : 10), // Protected time helps
    meetingEnergy * 20, // Higher energy = better meetings
    (5 - meetingDistribution) * 15 // Better distribution
  ]
  const meetingEfficiency = Math.min(100, efficiencyFactors.reduce((a, b) => a + b, 0) / 3.5)

  // Overall Productivity Loss
  const productivityLoss = Math.round(
    (contextSwitch.hoursLostPerWeek / 40) * 100 + // Time lost
    (deepWorkLoss / 40) * 100 + // Deep work deficit
    ((100 - meetingEfficiency) / 4) // Inefficient meetings
  )

  return {
    burnoutRisk: Math.round(burnoutRisk),
    deepWorkLoss: Math.round(deepWorkLoss * 10) / 10,
    contextSwitchCost: contextSwitch.hoursLostPerWeek,
    productivityLoss: Math.min(100, productivityLoss),
    meetingEfficiency: Math.round(meetingEfficiency)
  }
}

// TEAM CALCULATIONS
export interface TeamMetrics {
  engagementScore: number // 0-100
  decisionVelocity: number // 0-100
  followThroughRate: number // 0-100
  meetingROI: number // 0-100
  wastePercentage: number // 0-100
}

export function calculateTeamMetrics(answers: Map<string, number>): TeamMetrics {
  // Get answer values
  const participation = answers.get('t1') || 1
  const multitasking = answers.get('t2') || 1
  const rightPeople = answers.get('t3') || 1
  const agendas = answers.get('t4') || 1
  const decisionSpeed = answers.get('t5') || 1
  const nextSteps = answers.get('t6') || 1
  const actionTracking = answers.get('t7') || 1
  const couldBeEmail = answers.get('t8') || 1

  // Engagement Score (already implemented)
  const engagementScore = calculateEngagementScore(participation, multitasking, rightPeople)

  // Decision Velocity
  const decisionFactors = [
    decisionSpeed * 40, // Speed of decisions
    nextSteps * 30, // Clear next steps
    rightPeople * 30 // Right people present
  ]
  const decisionVelocity = Math.round(decisionFactors.reduce((a, b) => a + b, 0) / 4)

  // Follow-Through Rate
  const followThroughFactors = [
    actionTracking * 40, // Tracking system
    nextSteps * 35, // Clear ownership
    agendas * 25 // Preparation helps execution
  ]
  const followThroughRate = Math.round(followThroughFactors.reduce((a, b) => a + b, 0) / 4)

  // Meeting ROI (Return on Investment)
  const roiFactors = [
    (5 - couldBeEmail) * 25, // Necessary meetings
    decisionSpeed * 25, // Quick decisions
    participation * 25, // High engagement
    (5 - multitasking) * 25 // Focused attention
  ]
  const meetingROI = Math.round(roiFactors.reduce((a, b) => a + b, 0) / 4)

  // Waste Percentage
  const wastePercentage = couldBeEmail === 1 ? 75 : 
                          couldBeEmail === 2 ? 50 : 
                          couldBeEmail === 3 ? 25 : 10

  return {
    engagementScore,
    decisionVelocity,
    followThroughRate,
    meetingROI,
    wastePercentage
  }
}

// COMPARISON CALCULATIONS
export interface ComparisonData {
  personal: {
    yourScore: number
    topPerformer: number
    gap: number
    percentile: number
  }
  team: {
    yourScore: number
    topPerformer: number
    gap: number
    percentile: number
  }
}

export function calculateComparison(
  personalScore: number, 
  teamScore: number
): ComparisonData {
  // Percentile calculations (based on typical distribution)
  const getPercentile = (score: number) => {
    if (score >= 85) return 90 // Top 10%
    if (score >= 75) return 75 // Top 25%
    if (score >= 60) return 50 // Average
    if (score >= 45) return 25 // Bottom 25%
    return 10 // Bottom 10%
  }

  return {
    personal: {
      yourScore: personalScore,
      topPerformer: 85,
      gap: Math.max(0, 85 - personalScore),
      percentile: getPercentile(personalScore)
    },
    team: {
      yourScore: teamScore,
      topPerformer: 85,
      gap: Math.max(0, 85 - teamScore),
      percentile: getPercentile(teamScore)
    }
  }
}

// RECOMMENDATIONS ENGINE
export interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  area: string
  issue: string
  action: string
  impact: string
}

export function generateRecommendations(
  personalMetrics: PersonalMetrics,
  teamMetrics: TeamMetrics,
  answers: Map<string, number>
): Recommendation[] {
  const recommendations: Recommendation[] = []

  // Personal Recommendations
  if (personalMetrics.burnoutRisk > 70) {
    recommendations.push({
      priority: 'high',
      area: 'Burnout Prevention',
      issue: 'Critical burnout risk detected',
      action: 'Implement "No Meeting Fridays" and block 2-hour focus blocks daily',
      impact: 'Reduce burnout risk by 40% in 4 weeks'
    })
  }

  if (personalMetrics.deepWorkLoss > 10) {
    recommendations.push({
      priority: 'high',
      area: 'Deep Work Recovery',
      issue: `Losing ${personalMetrics.deepWorkLoss} hours of deep work weekly`,
      action: 'Batch meetings to 2 days per week, protect 3 full days for deep work',
      impact: 'Recover 8-10 hours of productive time per week'
    })
  }

  // Team Recommendations
  if (teamMetrics.decisionVelocity < 50) {
    recommendations.push({
      priority: 'high',
      area: 'Decision Making',
      issue: 'Slow decision-making process',
      action: 'Implement RAPID decision framework and "decide by" dates',
      impact: '3x faster decisions within 30 days'
    })
  }

  if (teamMetrics.wastePercentage > 50) {
    recommendations.push({
      priority: 'high',
      area: 'Meeting Efficiency',
      issue: `${teamMetrics.wastePercentage}% of meetings could be eliminated`,
      action: 'Audit all recurring meetings, convert 50% to async updates',
      impact: `Save ${Math.round(teamMetrics.wastePercentage * 0.15)} hours per person per week`
    })
  }

  // Sort by priority
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}

// Helper function - Context Switching (from diagnosticQuestions.ts)
function calculateContextSwitching(meetingDistribution: number): {
  switchesPerDay: number
  minutesLostPerSwitch: number
  hoursLostPerWeek: number
  productivityLoss: number
} {
  const switchesPerDay = meetingDistribution === 1 ? 8 : 
                        meetingDistribution === 2 ? 6 : 
                        meetingDistribution === 3 ? 3 : 1

  const minutesLostPerSwitch = 23
  const baseMinutesLost = switchesPerDay * minutesLostPerSwitch
  const compoundEffect = 1.3
  
  const totalMinutesPerDay = baseMinutesLost * compoundEffect
  const hoursLostPerWeek = Math.round((totalMinutesPerDay * 5) / 60 * 10) / 10

  return {
    switchesPerDay,
    minutesLostPerSwitch,
    hoursLostPerWeek,
    productivityLoss: Math.round((compoundEffect - 1) * 100)
  }
}

// Helper function - Engagement Score (from diagnosticQuestions.ts)  
function calculateEngagementScore(
  participationRate: number,
  multitaskingRate: number,
  rightPeople: number
): number {
  const participationScore = participationRate === 1 ? 20 : 
                           participationRate === 2 ? 40 : 
                           participationRate === 3 ? 70 : 100

  const multitaskingScore = multitaskingRate === 1 ? 10 : 
                           multitaskingRate === 2 ? 30 : 
                           multitaskingRate === 3 ? 70 : 100

  const rightPeopleScore = rightPeople === 1 ? 10 : 
                          rightPeople === 2 ? 40 : 
                          rightPeople === 3 ? 70 : 100

  return Math.round(
    (participationScore * 0.5) + 
    (multitaskingScore * 0.3) + 
    (rightPeopleScore * 0.2)
  )
}