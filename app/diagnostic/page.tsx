'use client'

import { Suspense, useEffect } from 'react'
import DiagnosticFlowV2 from '@/components/Calculator/DiagnosticFlowV2'
import { trackEvent } from '@/lib/analytics'

// Loading component
function DiagnosticLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pulse-cream/30 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pulse-coral/20 rounded-full mb-4 animate-pulse">
          <div className="w-8 h-8 bg-pulse-coral rounded-full animate-ping" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Your Meeting Audit...
        </h2>
        <p className="text-gray-600">Preparing your assessment</p>
      </div>
    </div>
  )
}

// Main diagnostic page component
export default function DiagnosticPage() {
  useEffect(() => {
    // Track page view
    trackEvent('diagnostic_started', {
      source: 'direct',
      timestamp: new Date().toISOString()
    })

    // Track page exit
    return () => {
      trackEvent('diagnostic_exited', {
        timestamp: new Date().toISOString()
      })
    }
  }, [])

  return (
    <Suspense fallback={<DiagnosticLoading />}>
      <DiagnosticFlowV2 />
    </Suspense>
  )
}