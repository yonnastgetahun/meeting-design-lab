// Meeting effectiveness diagnostic questions

export interface Question {
  id: number
  category: 'participation' | 'purpose' | 'energy' | 'decisions' | 'followThrough'
  text: string
  subtext?: string
  type: 'multiple-choice' | 'slider' | 'yes-no'
  options?: {
    text: string
    value: number
    score: number // 0-10 scale
  }[]
  sliderConfig?: {
    min: number
    max: number
    step: number
    unit: string
    scoreMapping: (value: number) => number // Convert slider value to score
  }
}

export const diagnosticQuestions: Question[] = [
  // PARTICIPATION QUESTIONS
  {
    id: 1,
    category: 'participation',
    text: "In your typical meeting, what percentage of attendees actively contribute?",
    type: 'multiple-choice',
    options: [
      { text: "Less than 25% speak up", value: 1, score: 2 },
      { text: "About 25-50% participate", value: 2, score: 4 },
      { text: "50-75% are engaged", value: 3, score: 7 },
      { text: "Nearly everyone contributes", value: 4, score: 9 }
    ]
  },
  {
    id: 2,
    category: 'participation',
    text: "How often do people multitask during your meetings?",
    subtext: "Be honest - we all see those typing sounds on calls",
    type: 'multiple-choice',
    options: [
      { text: "Constantly - it's laptop city", value: 1, score: 2 },
      { text: "Frequently - lots of 'quick emails'", value: 2, score: 4 },
      { text: "Occasionally - mostly focused", value: 3, score: 7 },
      { text: "Rarely - full attention", value: 4, score: 9 }
    ]
  },
  {
    id: 3,
    category: 'participation',
    text: "Do the right people attend your meetings?",
    type: 'multiple-choice',
    options: [
      { text: "Often missing key decision makers", value: 1, score: 2 },
      { text: "Too many 'optional' attendees", value: 2, score: 4 },
      { text: "Mostly right, some extras", value: 3, score: 7 },
      { text: "Perfect attendance list", value: 4, score: 9 }
    ]
  },

  // NEW: CONTEXT SWITCHING QUESTION
  {
    id: 4,
    category: 'energy',
    text: "How are your meetings typically distributed throughout the day?",
    subtext: "This affects your ability to focus",
    type: 'multiple-choice',
    options: [
      { text: "Back-to-back meeting marathons", value: 1, score: 1 },
      { text: "Scattered randomly throughout the day", value: 2, score: 3 },
      { text: "Clustered in 2-3 hour blocks", value: 3, score: 7 },
      { text: "Mostly grouped in one part of the day", value: 4, score: 9 }
    ]
  },

  // PURPOSE QUESTIONS
  {
    id: 5,
    category: 'purpose',
    text: "How many of your meetings have a clear agenda shared in advance?",
    type: 'slider',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      scoreMapping: (value) => Math.round(value / 10)
    }
  },
  {
    id: 6,
    category: 'purpose',
    text: "How often do meetings end with clear next steps and owners?",
    type: 'multiple-choice',
    options: [
      { text: "Rarely - we just... end", value: 1, score: 2 },
      { text: "Sometimes - depends on the meeting", value: 2, score: 5 },
      { text: "Usually - quick recap at the end", value: 3, score: 7 },
      { text: "Always - documented action items", value: 4, score: 10 }
    ]
  },
  {
    id: 7,
    category: 'purpose',
    text: "What percentage of your meetings could have been an email?",
    subtext: "We won't judge... much",
    type: 'slider',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      scoreMapping: (value) => Math.round(10 - (value / 10))
    }
  },

  // ENERGY QUESTIONS
  {
    id: 8,
    category: 'energy',
    text: "How do people typically feel leaving your meetings?",
    type: 'multiple-choice',
    options: [
      { text: "Drained and frustrated", value: 1, score: 1 },
      { text: "Relieved it's over", value: 2, score: 3 },
      { text: "Neutral - just another meeting", value: 3, score: 5 },
      { text: "Energized and clear", value: 4, score: 9 }
    ]
  },

  // NEW: BURNOUT RISK QUESTION
  {
    id: 9,
    category: 'energy',
    text: "How much control do you have over your calendar?",
    type: 'multiple-choice',
    options: [
      { text: "None - fully booked by others", value: 1, score: 1 },
      { text: "Limited - can block some time", value: 2, score: 4 },
      { text: "Moderate - protect key hours", value: 3, score: 7 },
      { text: "High - I own my schedule", value: 4, score: 10 }
    ]
  },

  {
    id: 10,
    category: 'energy',
    text: "How often do your meetings start and end on time?",
    type: 'multiple-choice',
    options: [
      { text: "Ha! Time is a suggestion", value: 1, score: 2 },
      { text: "Usually run over", value: 2, score: 4 },
      { text: "Mostly on time", value: 3, score: 7 },
      { text: "Like clockwork", value: 4, score: 10 }
    ]
  },
  {
    id: 11,
    category: 'energy',
    text: "Rate the energy level in your typical meeting",
    type: 'slider',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      unit: '/10',
      scoreMapping: (value) => value
    }
  },

  // DECISION QUESTIONS
  {
    id: 12,
    category: 'decisions',
    text: "How quickly do decisions get made in your meetings?",
    type: 'multiple-choice',
    options: [
      { text: "We avoid decisions like the plague", value: 1, score: 1 },
      { text: "Lots of discussion, few decisions", value: 2, score: 3 },
      { text: "Decisions happen, but slowly", value: 3, score: 6 },
      { text: "Quick, clear decisions", value: 4, score: 9 }
    ]
  },
  {
    id: 13,
    category: 'decisions',
    text: "Do decisions made in meetings actually stick?",
    type: 'multiple-choice',
    options: [
      { text: "Decisions? What decisions?", value: 1, score: 1 },
      { text: "Often revisited or ignored", value: 2, score: 3 },
      { text: "Usually stick with some changes", value: 3, score: 7 },
      { text: "Decisions are final and followed", value: 4, score: 10 }
    ]
  },

  // FOLLOW THROUGH QUESTIONS
  {
    id: 14,
    category: 'followThrough',
    text: "How well are action items tracked after meetings?",
    type: 'multiple-choice',
    options: [
      { text: "They disappear into the void", value: 1, score: 1 },
      { text: "Some get done, many forgotten", value: 2, score: 4 },
      { text: "Tracked but not always completed", value: 3, score: 6 },
      { text: "Systematic tracking and completion", value: 4, score: 9 }
    ]
  },

  // NEW: DEEP WORK QUESTION
  {
    id: 15,
    category: 'followThrough',
    text: "What's your longest uninterrupted work block on a typical day?",
    type: 'multiple-choice',
    options: [
      { text: "Less than 30 minutes", value: 1, score: 1 },
      { text: "30-60 minutes", value: 2, score: 3 },
      { text: "1-2 hours", value: 3, score: 6 },
      { text: "2+ hours of focus time", value: 4, score: 9 }
    ]
  },

  {
    id: 16,
    category: 'followThrough',
    text: "Do you have meeting-free time blocks for deep work?",
    type: 'yes-no',
    options: [
      { text: "No - meetings all day, every day", value: 0, score: 2 },
      { text: "Yes - protected focus time", value: 1, score: 9 }
    ]
  },

  // NEW: ROLE TYPE QUESTION
  {
    id: 17,
    category: 'purpose',
    text: "What percentage of your role requires deep, focused work?",
    subtext: "Think coding, writing, analysis, creative work",
    type: 'slider',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 10,
      unit: '%',
      scoreMapping: (value) => value >= 70 ? 2 : value >= 40 ? 5 : 8
    }
  },

  {
    id: 18,
    category: 'followThrough',
    text: "Rate your overall meeting effectiveness",
    subtext: "Be brutally honest",
    type: 'slider',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      unit: '/10',
      scoreMapping: (value) => value
    }
  }
]

// Calculate scores by category
export function calculateCategoryScores(answers: Map<number, number>): {
  participation: number
  purpose: number
  energy: number
  decisions: number
  followThrough: number
  overall: number
} {
  const scores = {
    participation: [] as number[],
    purpose: [] as number[],
    energy: [] as number[],
    decisions: [] as number[],
    followThrough: [] as number[]
  }

  // Group scores by category
  diagnosticQuestions.forEach(question => {
    const answer = answers.get(question.id)
    if (answer !== undefined) {
      let score = 0
      
      if (question.type === 'multiple-choice' || question.type === 'yes-no') {
        const option = question.options?.find(opt => opt.value === answer)
        score = option?.score || 0
      } else if (question.type === 'slider' && question.sliderConfig) {
        score = question.sliderConfig.scoreMapping(answer)
      }
      
      scores[question.category].push(score)
    }
  })

  // Calculate averages
  const categoryAverages = {
    participation: calculateAverage(scores.participation),
    purpose: calculateAverage(scores.purpose),
    energy: calculateAverage(scores.energy),
    decisions: calculateAverage(scores.decisions),
    followThrough: calculateAverage(scores.followThrough),
    overall: 0
  }

  // Calculate overall average
  categoryAverages.overall = calculateAverage([
    categoryAverages.participation,
    categoryAverages.purpose,
    categoryAverages.energy,
    categoryAverages.decisions,
    categoryAverages.followThrough
  ])

  return categoryAverages
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((acc, num) => acc + num, 0)
  return Math.round((sum / numbers.length) * 10) / 10
}

// NEW: Calculate additional insights
export function calculateAdditionalInsights(answers: Map<number, number>, meetingInputs: any) {
  const contextSwitchingScore = answers.get(4) || 1 // Meeting distribution question
  const deepWorkAvailable = answers.get(15) || 1 // Longest uninterrupted block
  const calendarControl = answers.get(9) || 1 // Control over calendar
  const deepWorkNeeded = answers.get(17) || 50 // % role needs deep work
  
  // Context switching cost calculation
  const avgTransitionsPerDay = contextSwitchingScore === 1 ? 8 : 
                               contextSwitchingScore === 2 ? 6 : 
                               contextSwitchingScore === 3 ? 3 : 1
  
  const contextSwitchCostPerWeek = avgTransitionsPerDay * 5 * 23 // 23 min per switch
  
  // Deep work loss calculation
  const potentialDeepWorkHours = 20 // per week
  const actualDeepWorkHours = deepWorkAvailable === 1 ? 2 : 
                              deepWorkAvailable === 2 ? 5 : 
                              deepWorkAvailable === 3 ? 10 : 15
  
  const deepWorkLossHours = potentialDeepWorkHours - actualDeepWorkHours
  
  // Burnout risk calculation (0-100 scale)
  const burnoutRisk = Math.round(
    (100 - (calendarControl * 10)) * 0.4 + // Calendar control weight
    (100 - (deepWorkAvailable * 10)) * 0.3 + // Deep work availability weight
    (contextSwitchingScore === 1 ? 30 : contextSwitchingScore === 2 ? 20 : 10) // Meeting chaos weight
  )
  
  return {
    contextSwitchCostPerWeek,
    deepWorkLossHours,
    burnoutRisk,
    deepWorkNeeded
  }
}