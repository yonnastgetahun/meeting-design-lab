// Analytics tracking utilities
// These are placeholders - implement with actual analytics tools when ready

// Track calculator start
export function trackCalculatorStart() {
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Calculator started')
    
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', 'calculator_start', {
        event_category: 'engagement',
        event_label: 'meeting_design_lab'
      })
    }
    
    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout')
    }
  }
}

// Track cost calculation complete
export function trackCostCalculation(costs: {
  annualCost: number
  monthlyWaste: number
}) {
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Cost calculated:', costs)
    
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', 'cost_calculated', {
        event_category: 'calculator',
        event_label: 'meeting_costs',
        value: costs.annualCost
      })
    }
    
    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        value: costs.monthlyWaste,
        currency: 'USD'
      })
    }
  }
}

// Track diagnostic progress
export function trackDiagnosticProgress(questionNumber: number, totalQuestions: number) {
  if (typeof window !== 'undefined') {
    const progressPercent = Math.round((questionNumber / totalQuestions) * 100)
    console.log(`[Analytics] Diagnostic progress: ${progressPercent}%`)
    
    // Track milestone completions
    if (progressPercent === 25 || progressPercent === 50 || progressPercent === 75) {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'diagnostic_milestone', {
          event_category: 'engagement',
          event_label: `completed_${progressPercent}_percent`
        })
      }
    }
  }
}

// Track diagnostic completion
export function trackDiagnosticComplete(score: number, category: string) {
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Diagnostic complete:', { score, category })
    
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', 'diagnostic_complete', {
        event_category: 'calculator',
        event_label: category,
        value: score
      })
    }
    
    // Meta Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'diagnostic_results',
        content_category: category,
        value: score
      })
    }
  }
}

// Track email capture
export function trackEmailCapture(score: number) {
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Email captured for score:', score)
    
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: 'meeting_toolkit',
        value: score
      })
    }
    
    // Meta Pixel - Lead event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'meeting_toolkit_download',
        value: score
      })
    }
  }
}

// Track toolkit download
export function trackToolkitDownload() {
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Toolkit downloaded')
    
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag('event', 'file_download', {
        event_category: 'conversion',
        event_label: 'meeting_transformation_toolkit',
        file_name: 'meeting-transformation-toolkit.pdf'
      })
    }
    
    // Meta Pixel - Purchase event (even though free)
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 0,
        currency: 'USD',
        content_name: 'meeting_toolkit'
      })
    }
  }
}

// Track drop-off points
export function trackDropOff(stage: string, additionalData?: any) {
  if (typeof window !== 'undefined') {
    console.log('[Analytics] User dropped off at:', stage, additionalData)
    
    if ((window as any).gtag) {
      (window as any).gtag('event', 'drop_off', {
        event_category: 'user_flow',
        event_label: stage,
        ...additionalData
      })
    }
  }
}

// Utility to check if analytics are loaded
export function isAnalyticsReady(): boolean {
  if (typeof window === 'undefined') return false
  
  const hasGA = !!(window as any).gtag
  const hasPixel = !!(window as any).fbq
  
  return hasGA || hasPixel
}

// Initialize analytics (call this in your app layout)
export function initializeAnalytics() {
  if (typeof window !== 'undefined') {
    // Log analytics status
    console.log('[Analytics] Initialized:', {
      googleAnalytics: !!(window as any).gtag,
      metaPixel: !!(window as any).fbq
    })
  }
}