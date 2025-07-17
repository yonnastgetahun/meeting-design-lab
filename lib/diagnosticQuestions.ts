// Meeting effectiveness diagnostic questions - Two-part structure with weighted scoring

export interface Question {
  id: string
  part: 'personal' | 'team'
  text: string
  subtext?: string
  type: 'multiple-choice' | 'yes-no'
  weight: number // Impact weight: 1 (low), 2 (medium), 3 (high)
  options: {
    text: string
    value: number
    score: number // 0-10 scale
  }[]
}

export interface DiagnosticPart {
  id: 'personal' | 'team'
  title: string
  hook: string
  questions: Question[]
  miniInsightAfter?: string // Question ID after which to show mini-insight
  emailCaptureTitle: string
  emailCaptureDescription: string
}

// PART 1: PERSONAL PRODUCTIVITY & BURNOUT RISK
const personalQuestions: Question[] = [
  {
    id: 'p1',
    part: 'personal',
    text: "How much control do you have over your calendar?",
    type: 'multiple-choice',
    weight: 3, // High impact - burnout indicator
    options: [
      { text: "None - fully booked by others", value: 1, score: 1 },
      { text: "Limited - I can block some time", value: 2, score: 3 },
      { text: "Moderate - I can protect key hours but worry about pushback", value: 3, score: 6 },
      { text: "High - I confidently own my schedule", value: 4, score: 10 }
    ]
  },
  {
    id: 'p2',
    part: 'personal',
    text: "How are your meetings typically distributed throughout the day?",
    subtext: "This affects your ability to focus",
    type: 'multiple-choice',
    weight: 3, // High impact - context switching
    options: [
      { text: "Back-to-back meeting marathons", value: 1, score: 1 },
      { text: "Scattered randomly throughout the day", value: 2, score: 3 },
      { text: "Clustered in 2-3 hour blocks", value: 3, score: 7 },
      { text: "Mostly grouped in one part of the day", value: 4, score: 10 }
    ]
  },
  {
    id: 'p3',
    part: 'personal',
    text: "What's your longest uninterrupted work block on a typical day?",
    type: 'multiple-choice',
    weight: 3, // High impact - productivity
    options: [
      { text: "Less than 30 minutes", value: 1, score: 1 },
      { text: "30-60 minutes", value: 2, score: 3 },
      { text: "1-2 hours", value: 3, score: 6 },
      { text: "2+ hours of focus time", value: 4, score: 10 }
    ]
  },
  {
    id: 'p4',
    part: 'personal',
    text: "To do your best work, what percentage of your workday requires deep, uninterrupted periods?",
    subtext: "Think coding, writing, research, analysis, creative work, strategic planning",
    type: 'multiple-choice',
    weight: 2, // Medium impact - role fit
    options: [
      { text: "About 25% (1-2 hours)", value: 1, score: 8 },
      { text: "About 50% (3-4 hours)", value: 2, score: 5 },
      { text: "About 75% (5-6 hours)", value: 3, score: 3 },
      { text: "Nearly 100% (most of my day)", value: 4, score: 1 }
    ]
  },
  {
    id: 'p5',
    part: 'personal',
    text: "How do you typically feel leaving meetings?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - energy
    options: [
      { text: "Drained and frustrated", value: 1, score: 1 },
      { text: "Relieved it's over", value: 2, score: 3 },
      { text: "Neutral - just another meeting", value: 3, score: 5 },
      { text: "Energized and clear", value: 4, score: 10 }
    ]
  },
  {
    id: 'p6',
    part: 'personal',
    text: "Which feeling best describes MOST of your workdays?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - daily reality
    options: [
      { text: "Where did my day go? I got nothing done", value: 1, score: 1 },
      { text: "Now I can finally start my real work", value: 2, score: 3 },
      { text: "I made real progress on important work", value: 3, score: 8 },
      { text: "It varies too much to say", value: 4, score: 5 }
    ]
  },
  {
    id: 'p7',
    part: 'personal',
    text: "Do you have meeting-free time blocks for deep work?",
    type: 'yes-no',
    weight: 2, // Medium impact
    options: [
      { text: "No - meetings all day, every day", value: 0, score: 1 },
      { text: "Yes - protected focus time", value: 1, score: 9 }
    ]
  },
  {
    id: 'p8',
    part: 'personal',
    text: "What percentage of meetings you attend are truly necessary for your role?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - meeting necessity
    options: [
      { text: "Less than 25% - I'm in meeting jail", value: 1, score: 1 },
      { text: "About 50% - half are questionable", value: 2, score: 4 },
      { text: "About 75% - mostly relevant", value: 3, score: 7 },
      { text: "Nearly all critical to my work", value: 4, score: 10 }
    ]
  }
]

// PART 2: TEAM MEETING HEALTH
const teamQuestions: Question[] = [
  {
    id: 't1',
    part: 'team',
    text: "In your typical meeting, what percentage of attendees actively contribute?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - engagement
    options: [
      { text: "Less than 25% speak up", value: 1, score: 2 },
      { text: "About 25-50% participate", value: 2, score: 4 },
      { text: "50-75% are engaged", value: 3, score: 7 },
      { text: "Nearly everyone contributes", value: 4, score: 10 }
    ]
  },
  {
    id: 't2',
    part: 'team',
    text: "How often do people multitask during your meetings?",
    subtext: "Be honest - we all see those typing sounds on calls",
    type: 'multiple-choice',
    weight: 2, // Medium impact - focus
    options: [
      { text: "Constantly - it's laptop city", value: 1, score: 1 },
      { text: "Frequently - lots of 'quick emails'", value: 2, score: 3 },
      { text: "Occasionally - mostly focused", value: 3, score: 7 },
      { text: "Rarely - full attention", value: 4, score: 10 }
    ]
  },
  {
    id: 't3',
    part: 'team',
    text: "Do the right people attend your meetings?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - efficiency
    options: [
      { text: "Often missing key decision makers", value: 1, score: 1 },
      { text: "Too many 'optional' attendees", value: 2, score: 4 },
      { text: "Mostly right, some extras", value: 3, score: 7 },
      { text: "Perfect attendance list", value: 4, score: 10 }
    ]
  },
  {
    id: 't4',
    part: 'team',
    text: "How many of your meetings have a clear agenda shared in advance?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - preparation
    options: [
      { text: "Rarely - we just show up", value: 1, score: 1 },
      { text: "Sometimes - depends on the meeting", value: 2, score: 4 },
      { text: "Usually - most have agendas", value: 3, score: 7 },
      { text: "Always - it's our standard", value: 4, score: 10 }
    ]
  },
  {
    id: 't5',
    part: 'team',
    text: "How quickly do decisions get made in your meetings?",
    type: 'multiple-choice',
    weight: 3, // High impact - progress
    options: [
      { text: "We avoid decisions like the plague", value: 1, score: 1 },
      { text: "Lots of discussion, few decisions", value: 2, score: 3 },
      { text: "Decisions happen, but slowly", value: 3, score: 6 },
      { text: "Quick, clear decisions", value: 4, score: 10 }
    ]
  },
  {
    id: 't6',
    part: 'team',
    text: "How often do meetings end with clear next steps and owners?",
    type: 'multiple-choice',
    weight: 2, // Medium impact - follow-through setup
    options: [
      { text: "Rarely - we just... end", value: 1, score: 1 },
      { text: "Sometimes - depends on the meeting", value: 2, score: 4 },
      { text: "Usually - quick recap at the end", value: 3, score: 7 },
      { text: "Always - documented action items", value: 4, score: 10 }
    ]
  },
  {
    id: 't7',
    part: 'team',
    text: "How well are action items tracked after meetings?",
    type: 'multiple-choice',
    weight: 3, // High impact - execution
    options: [
      { text: "They disappear into the void", value: 1, score: 1 },
      { text: "Some get done, many forgotten", value: 2, score: 3 },
      { text: "Tracked but not always completed", value: 3, score: 6 },
      { text: "Systematic tracking and completion", value: 4, score: 10 }
    ]
  },
  {
    id: 't8',
    part: 'team',
    text: "What percentage of your team meetings could have been an email?",
    subtext: "We won't judge... much",
    type: 'multiple-choice',
    weight: 2, // Medium impact - necessity
    options: [
      { text: "Over 75% - we meet because we always have", value: 1, score: 1 },
      { text: "About 50% - half are unnecessary", value: 2, score: 3 },
      { text: "About 25% - most are needed", value: 3, score: 7 },
      { text: "Less than 10% - we meet with purpose", value: 4, score: 10 }
    ]
  }
]

// DIAGNOSTIC STRUCTURE
export const diagnosticParts: DiagnosticPart[] = [
  {
    id: 'personal',
    title: 'Personal Productivity & Burnout Risk',
    hook: 'How much is meeting chaos costing YOU?',
    questions: personalQuestions,
    miniInsightAfter: 'p3', // Show context switching insight after question 3
    emailCaptureTitle: 'Personal productivity templates/guides',
    emailCaptureDescription: 'Get your personalized productivity recovery plan'
  },
  {
    id: 'team',
    title: 'Team Meeting Health',
    hook: "Now let's diagnose your team's meeting culture",
    questions: teamQuestions,
    miniInsightAfter: 't3', // Show engagement score after question 3
    emailCaptureTitle: 'Team facilitation playbooks/workshops',
    emailCaptureDescription: 'Transform your team\'s meeting culture'
  }
]

// CALCULATION FUNCTIONS
export function calculateWeightedScore(answers: Map<string, number>, questions: Question[]): number {
  let totalScore = 0
  let totalWeight = 0

  questions.forEach(question => {
    const answer = answers.get(question.id)
    if (answer !== undefined) {
      const option = question.options.find(opt => opt.value === answer)
      if (option) {
        totalScore += option.score * question.weight
        totalWeight += question.weight * 10 // Max score is 10
      }
    }
  })

  return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0
}

// CONTEXT SWITCHING CALCULATION
export function calculateContextSwitching(meetingDistribution: number): {
  switchesPerDay: number
  minutesLostPerSwitch: number
  hoursLostPerWeek: number
  productivityLoss: number
} {
  // Based on meeting distribution answer
  const switchesPerDay = meetingDistribution === 1 ? 8 : 
                        meetingDistribution === 2 ? 6 : 
                        meetingDistribution === 3 ? 3 : 1

  const minutesLostPerSwitch = 23 // Research-based
  const baseMinutesLost = switchesPerDay * minutesLostPerSwitch
  const compoundEffect = 1.3 // 30% additional loss from mental fatigue
  
  const totalMinutesPerDay = baseMinutesLost * compoundEffect
  const hoursLostPerWeek = Math.round((totalMinutesPerDay * 5) / 60 * 10) / 10

  return {
    switchesPerDay,
    minutesLostPerSwitch,
    hoursLostPerWeek,
    productivityLoss: Math.round((compoundEffect - 1) * 100)
  }
}

// ENGAGEMENT SCORE CALCULATION
export function calculateEngagementScore(
  participationRate: number,
  multitaskingRate: number,
  rightPeople: number
): number {
  // Weight participation highest, then multitasking, then right people
  const participationScore = participationRate === 1 ? 20 : 
                           participationRate === 2 ? 40 : 
                           participationRate === 3 ? 70 : 100

  const multitaskingScore = multitaskingRate === 1 ? 10 : 
                           multitaskingRate === 2 ? 30 : 
                           multitaskingRate === 3 ? 70 : 100

  const rightPeopleScore = rightPeople === 1 ? 10 : 
                          rightPeople === 2 ? 40 : 
                          rightPeople === 3 ? 70 : 100

  // Weighted average
  return Math.round(
    (participationScore * 0.5) + 
    (multitaskingScore * 0.3) + 
    (rightPeopleScore * 0.2)
  )
}

// TOP PERFORMER BENCHMARKS
export const topPerformerBenchmarks = {
  personal: {
    overallScore: 85,
    calendarControl: 90,
    deepWorkAvailable: 80,
    meetingNecessity: 90
  },
  team: {
    overallScore: 85,
    engagementScore: 85,
    decisionVelocity: 80,
    followThrough: 90,
    meetingNecessity: 90
  }
}