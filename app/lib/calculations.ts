// Meeting cost calculation utilities

export interface MeetingInputs {
  avgMeetingsPerWeek: number
  avgAttendees: number
  avgMeetingLength: number // in minutes
  avgSalary: number // annual salary
}

export interface MeetingCosts {
  costPerMeeting: number
  weeklyMeetingCost: number
  monthlyMeetingCost: number
  annualMeetingCost: number
  timeWastedWeekly: number // in hours
  timeWastedAnnually: number // in hours
}

// Convert annual salary to hourly rate (assuming 2080 work hours/year)
export function calculateHourlyRate(annualSalary: number): number {
  const workHoursPerYear = 2080 // 52 weeks * 40 hours
  return annualSalary / workHoursPerYear
}

// Calculate the cost of meetings
export function calculateMeetingCosts(inputs: MeetingInputs): MeetingCosts {
  const hourlyRate = calculateHourlyRate(inputs.avgSalary)
  const meetingHours = inputs.avgMeetingLength / 60
  
  // Cost per meeting = hours * hourly rate * number of attendees
  const costPerMeeting = meetingHours * hourlyRate * inputs.avgAttendees
  
  // Weekly cost
  const weeklyMeetingCost = costPerMeeting * inputs.avgMeetingsPerWeek
  
  // Monthly cost (4.33 weeks per month average)
  const monthlyMeetingCost = weeklyMeetingCost * 4.33
  
  // Annual cost
  const annualMeetingCost = weeklyMeetingCost * 52
  
  // Time calculations
  const timeWastedWeekly = (inputs.avgMeetingsPerWeek * inputs.avgMeetingLength) / 60
  const timeWastedAnnually = timeWastedWeekly * 52
  
  return {
    costPerMeeting: Math.round(costPerMeeting),
    weeklyMeetingCost: Math.round(weeklyMeetingCost),
    monthlyMeetingCost: Math.round(monthlyMeetingCost),
    annualMeetingCost: Math.round(annualMeetingCost),
    timeWastedWeekly: Math.round(timeWastedWeekly * 10) / 10,
    timeWastedAnnually: Math.round(timeWastedAnnually)
  }
}

// Effectiveness scoring based on diagnostic answers
export interface DiagnosticScore {
  overall: number // 0-10 scale
  category: 'critical' | 'struggling' | 'good' | 'excellent'
  areas: {
    participation: number
    purpose: number
    energy: number
    decisions: number
    followThrough: number
  }
}

// Calculate waste percentage based on effectiveness score
export function calculateWastePercentage(effectivenessScore: number): number {
  // If meetings are 10/10 effective, 0% waste
  // If meetings are 0/10 effective, 80% waste (some value still exists)
  const maxWaste = 0.8 // 80% maximum waste
  const wastePercentage = maxWaste * (1 - effectivenessScore / 10)
  return Math.round(wastePercentage * 100)
}

// Calculate actual money wasted
export function calculateMoneyWasted(meetingCosts: MeetingCosts, wastePercentage: number): {
  weeklyWaste: number
  monthlyWaste: number
  annualWaste: number
} {
  const wasteFactor = wastePercentage / 100
  
  return {
    weeklyWaste: Math.round(meetingCosts.weeklyMeetingCost * wasteFactor),
    monthlyWaste: Math.round(meetingCosts.monthlyMeetingCost * wasteFactor),
    annualWaste: Math.round(meetingCosts.annualMeetingCost * wasteFactor)
  }
}

// Get score category based on overall score
export function getScoreCategory(score: number): DiagnosticScore['category'] {
  if (score >= 8) return 'excellent'
  if (score >= 6) return 'good'
  if (score >= 4) return 'struggling'
  return 'critical'
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Sample calculation for testing
export function getSampleCalculation(): MeetingCosts {
  return calculateMeetingCosts({
    avgMeetingsPerWeek: 15,
    avgAttendees: 6,
    avgMeetingLength: 60,
    avgSalary: 120000
  })
}