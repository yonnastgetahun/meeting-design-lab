// Meta Pixel Events
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

// Google Analytics Events
export const trackGAEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Combined tracking for important events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  trackMetaEvent(eventName, parameters)
  trackGAEvent(eventName, parameters)
}

// Specific event helpers for Meeting Design Lab
export const trackDiagnosticStart = () => {
  trackEvent('diagnostic_start', {
    tool: 'meeting_design_lab',
    step: 'begin'
  })
}

export const trackDiagnosticComplete = (score: number, category: string) => {
  trackEvent('diagnostic_complete', {
    tool: 'meeting_design_lab',
    effectiveness_score: score,
    category: category // 'critical', 'struggling', 'good'
  })
}

export const trackEmailCapture = (score: number) => {
  trackMetaEvent('Lead', {
    value: score,
    currency: 'USD',
    content_name: 'meeting_design_lab'
  })
  trackGAEvent('generate_lead', {
    value: score,
    currency: 'USD'
  })
}