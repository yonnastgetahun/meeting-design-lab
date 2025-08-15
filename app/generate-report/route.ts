// lib/analytics.ts
declare global {
  interface Window {
    fbq: any
    gtag: any
    convertkit: any
  }
}

export const diagnosticTracking = {
  // MUST HAVE: User Engagement Tracking
  trackDiagnosticStart: () => {
    try {
      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'DiagnosticStart', {
          event_category: 'engagement',
          timestamp: Date.now()
        })
      }
      
      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'diagnostic_start', {
          event_category: 'engagement',
          event_action: 'start_diagnostic',
          timestamp: Date.now()
        })
      }
      
      // ConvertKit
      if (typeof window !== 'undefined' && window.convertkit) {
        window.convertkit.track('diagnostic_start')
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  trackPersonalAssessmentComplete: (score: number, completionTime: number) => {
    try {
      const data = {
        personal_score: score,
        completion_time_ms: completionTime,
        event_category: 'engagement'
      }

      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PersonalAssessmentComplete', data)
      }
      
      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'personal_assessment_complete', {
          ...data,
          event_action: 'complete_personal_assessment'
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  trackTeamAssessmentComplete: (score: number, completionTime: number) => {
    try {
      const data = {
        team_score: score,
        completion_time_ms: completionTime,
        event_category: 'engagement'
      }

      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'TeamAssessmentComplete', data)
      }
      
      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'team_assessment_complete', {
          ...data,
          event_action: 'complete_team_assessment'
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  trackDiagnosticCompletion: (personalScore: number, teamScore: number, totalTime: number) => {
    try {
      const data = {
        personal_score: personalScore,
        team_score: teamScore,
        total_completion_time_ms: totalTime,
        event_category: 'engagement'
      }

      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'DiagnosticComplete', data)
      }
      
      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'diagnostic_complete', {
          ...data,
          event_action: 'complete_full_diagnostic'
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  trackDropoff: (stage: string, screenNumber: number, timeSpent: number) => {
    try {
      const data = {
        stage,
        screen_number: screenNumber,
        time_spent_ms: timeSpent,
        event_category: 'engagement'
      }

      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'diagnostic_dropoff', {
          ...data,
          event_action: 'user_dropoff'
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  // MUST HAVE: Email Conversion Tracking
  trackEmailCapture: (stage: 'personal' | 'team') => {
    try {
      const data = {
        stage,
        event_category: 'conversion',
        timestamp: Date.now()
      }

      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          ...data,
          content_name: `${stage}_email_capture`
        })
      }
      
      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          ...data,
          event_action: 'capture_email',
          currency: 'USD',
          value: stage === 'personal' ? 25 : 50 // Estimated lead value
        })
      }

      // ConvertKit
      if (typeof window !== 'undefined' && window.convertkit) {
        window.convertkit.track(`email_capture_${stage}`)
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  trackEmailOpen: (stage: 'personal' | 'team', email: string) => {
    try {
      // This would typically be tracked on the email service side
      // But we can track the intent here
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_sent', {
          event_category: 'conversion',
          event_action: 'send_diagnostic_email',
          stage,
          timestamp: Date.now()
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  // MUST HAVE: PDF Generation Tracking
  trackPDFGeneration: (data: { personalScore: number, teamScore: number }) => {
    try {
      const trackingData = {
        ...data,
        event_category: 'conversion',
        timestamp: Date.now()
      }

      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PDFGenerated', trackingData)
      }
      
      // GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'pdf_generated', {
          ...trackingData,
          event_action: 'generate_diagnostic_pdf',
          currency: 'USD',
          value: 75 // Estimated value of PDF report
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  // NICE TO HAVE: Question Interaction Tracking
  trackQuestionInteraction: (questionId: string, selectedValue: number, assessmentType: 'personal' | 'team') => {
    try {
      // Only track this for detailed analysis if needed
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'question_interaction', {
          event_category: 'engagement',
          event_action: 'answer_question',
          question_id: questionId,
          selected_value: selectedValue,
          assessment_type: assessmentType,
          timestamp: Date.now()
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  // NICE TO HAVE: Scoring Insights
  trackScoringBreakdown: (personalScore: number, teamScore: number, metrics: any) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'scoring_breakdown', {
          event_category: 'insights',
          event_action: 'calculate_scores',
          personal_score: personalScore,
          team_score: teamScore,
          ...metrics,
          timestamp: Date.now()
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  },

  // Utility function to track time spent
  createTimeTracker: () => {
    const startTime = Date.now()
    return {
      getElapsed: () => Date.now() - startTime,
      startTime
    }
  }
}

// Export tracking utilities
export const trackingUtils = {
  // Create a session tracker
  createSession: () => {
    const sessionId = Math.random().toString(36).substring(2)
    const startTime = Date.now()
    
    return {
      sessionId,
      startTime,
      getSessionDuration: () => Date.now() - startTime
    }
  },

  // Throttle tracking calls to avoid spam
  throttle: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    let lastExecTime = 0
    
    return (...args: any[]) => {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func.apply(null, args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func.apply(null, args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }
}