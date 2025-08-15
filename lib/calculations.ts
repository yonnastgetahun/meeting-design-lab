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
  // Get answer values with proper defaults
  const calendarControl = answers.get('p1') || 5 // Default to worst case
  const meetingDistribution = answers.get('p2') || 5
  const deepWorkAvailable = answers.get('p3') || 1
  const deepWorkNeeded = answers.get('p4') || 3
  const meetingEnergy = answers.get('p5') || 1
  const dailyAccomplishment = answers.get('p6') || 1
  const protectedTime = answers.get('p7') || 0
  const meetingNecessity = answers.get('p8') || 1

  // Context Switching Cost
  const contextSwitch = calculateContextSwitching(meetingDistribution)
  
  // Burnout Risk Calculation (0-100 scale)
  // Higher values = worse, so we invert the scoring
  const burnoutFactors = [
    (5 - calendarControl) * 20, // Less control = higher burnout (0-80)
    (4 - deepWorkAvailable) * 15, // Less deep work = higher burnout (0-45)
    (4 - meetingEnergy) * 15, // Lower energy = higher burnout (0-45)
    (meetingDistribution - 1) * 10, // Scattered meetings (0-40)
    (protectedTime === 0 ? 20 : 0) // No protected time
  ]
  const burnoutRisk = Math.min(100, burnoutFactors.reduce((a, b) => a + b, 0))

  // Deep Work Loss Calculation
  const idealDeepWorkHours = deepWorkNeeded === 1 ? 2 : 
                            deepWorkNeeded === 2 ? 4 : 
                            deepWorkNeeded === 3 ? 6 : 8
  
  const actualDeepWorkHours = deepWorkAvailable === 1 ? 0.5 : 
                             deepWorkAvailable === 2 ? 1.5 : 
                             deepWorkAvailable === 3 ? 3 : 4
  
  const deepWorkLoss = Math.max(0, idealDeepWorkHours - actualDeepWorkHours)

  // Meeting Efficiency (higher is better)
  const efficiencyFactors = [
    (meetingNecessity - 1) * 25, // Higher necessity = better efficiency (0-75)
    (protectedTime === 1 ? 25 : 0), // Protected time helps
    (meetingEnergy - 1) * 20, // Higher energy = better meetings (0-60)
    (5 - meetingDistribution) * 10 // Better distribution (0-40)
  ]
  const meetingEfficiency = Math.min(100, efficiencyFactors.reduce((a, b) => a + b, 0) / 2)

  // Overall Productivity Loss
  const productivityLoss = Math.round(
    (contextSwitch.hoursLostPerWeek / 40) * 50 + // Time lost to switching
    (deepWorkLoss / 20) * 30 + // Deep work deficit impact
    ((100 - meetingEfficiency) / 100) * 20 // Inefficient meetings impact
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
  yearlyWaste: number // dollar amount
  performanceGap: number // 0-100
  velocity: string // status text
}

export function calculateTeamMetrics(answers: Map<string, number>): TeamMetrics {
  // Meeting cost calculations
  const attendees = answers.get('attendees') || 5
  const meetingLength = answers.get('meetingLength') || 60
  const avgSalary = answers.get('avgSalary') || 100000
  const meetingsPerWeek = answers.get('meetingsPerWeek') || 10
  
  // Team effectiveness answers
  const participation = answers.get('t1') || 1
  const multitasking = answers.get('t2') || 1
  const rightPeople = answers.get('t3') || 1
  const hasAgenda = answers.get('t4') || 1
  const decisionSpeed = answers.get('t5') || 1
  const nextSteps = answers.get('t6') || 1
  const actionTracking = answers.get('t7') || 1
  const couldBeEmail = answers.get('t8') || 1

  // Calculate Engagement Score
  const engagementScore = calculateEngagementScore(participation, multitasking, rightPeople)

  // Calculate Decision Velocity (0-100)
  const decisionFactors = [
    (decisionSpeed - 1) * 30, // Quick decisions (0-90)
    (hasAgenda - 1) * 10, // Preparation helps (0-30)
    (rightPeople - 1) * 20 // Right people present (0-60)
  ]
  const decisionVelocity = Math.min(100, decisionFactors.reduce((a, b) => a + b, 0) / 1.8)

  // Calculate Follow-Through Rate (0-100)
  const followThroughFactors = [
    (nextSteps - 1) * 35, // Clear next steps (0-105)
    (actionTracking - 1) * 35, // Tracking completion (0-105)
  ]
  const followThroughRate = Math.min(100, followThroughFactors.reduce((a, b) => a + b, 0) / 2.1)

  // Calculate Meeting ROI (0-100)
  const roiFactors = [
    (4 - couldBeEmail) * 25, // Necessary meetings (0-75)
    engagementScore * 0.25, // Engagement impact
    decisionVelocity * 0.25, // Decision impact
    followThroughRate * 0.25 // Execution impact
  ]
  const meetingROI = Math.round(roiFactors.reduce((a, b) => a + b, 0))

  // Calculate Waste Percentage
  const wastePercentage = couldBeEmail === 1 ? 75 : 
                         couldBeEmail === 2 ? 50 : 
                         couldBeEmail === 3 ? 25 : 10

  // Calculate financial waste
  const hourlyRate = avgSalary / 2080
  const costPerMeeting = (attendees * hourlyRate * meetingLength) / 60
  const weeklyWaste = costPerMeeting * meetingsPerWeek * (wastePercentage / 100)
  const yearlyWaste = weeklyWaste * 52

  // Calculate Performance Gap (inverse of overall team health)
  const teamHealthScore = (engagementScore + decisionVelocity + followThroughRate + meetingROI) / 4
  const performanceGap = Math.round(100 - teamHealthScore)

  // Determine velocity status
  const velocity = teamHealthScore >= 80 ? "Peak Velocity" :
                  teamHealthScore >= 60 ? "Good Momentum" :
                  teamHealthScore >= 40 ? "Some Friction" :
                  teamHealthScore >= 20 ? "Momentum Blocked" :
                  "Velocity Crisis"

  return {
    engagementScore: Math.round(engagementScore),
    decisionVelocity: Math.round(decisionVelocity),
    followThroughRate: Math.round(followThroughRate),
    meetingROI: Math.round(meetingROI),
    wastePercentage: Math.round(wastePercentage),
    yearlyWaste: Math.round(yearlyWaste),
    performanceGap,
    velocity
  }
}

// Helper function - Context Switching (aligned with diagnosticQuestions.ts)
function calculateContextSwitching(meetingDistribution: number): {
  switchesPerDay: number
  minutesLostPerSwitch: number
  hoursLostPerWeek: number
  productivityLoss: number
} {
  // Map answer values to switches per day
  const switchesPerDay = meetingDistribution === 1 ? 1 :  // Well-spaced
                        meetingDistribution === 2 ? 3 :  // Mostly grouped
                        meetingDistribution === 3 ? 6 :  // Scattered
                        meetingDistribution === 4 ? 8 :  // Back-to-back
                        10 // Random

  const minutesLostPerSwitch = 23
  const baseMinutesLost = switchesPerDay * minutesLostPerSwitch
  const compoundEffect = 1.3 // Mental fatigue multiplier
  
  const totalMinutesPerDay = baseMinutesLost * compoundEffect
  const hoursLostPerWeek = Math.round((totalMinutesPerDay * 5) / 60 * 10) / 10

  return {
    switchesPerDay,
    minutesLostPerSwitch,
    hoursLostPerWeek,
    productivityLoss: Math.round((compoundEffect - 1) * 100)
  }
}

// Helper function - Engagement Score
function calculateEngagementScore(
  participationRate: number,
  multitaskingRate: number,
  rightPeople: number
): number {
  // Convert answers to scores (higher answer value = better)
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
  // Percentile calculations based on normal distribution
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

  if (personalMetrics.deepWorkLoss > 3) {
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