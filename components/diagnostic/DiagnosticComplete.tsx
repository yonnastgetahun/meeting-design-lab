import React, { useEffect, useRef } from 'react';

interface DiagnosticCompleteProps {
  personalScore: number;
  teamScore: number;
  totalCost: number;
  personalMetrics: {
    burnoutRisk: number;
    deepWorkLost: number;
    contextSwitches: number;
  };
  teamMetrics: {
    performanceGap: number;
    velocity: string;
  };
}

const DiagnosticComplete: React.FC<DiagnosticCompleteProps> = ({
  personalScore,
  teamScore,
  totalCost,
  personalMetrics,
  teamMetrics,
}) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const overallScore = Math.round((personalScore + teamScore) / 2);

  // Auto-scroll to results when component mounts
  useEffect(() => {
    if (resultsRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }, 100);
    }
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Success Icon - Keep this at top */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Consolidated Results Card */}
      <div ref={resultsRef} className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Your Complete Meeting Audit
          </h1>

          {/* Overall Score */}
          <div className="text-center mb-8">
            <h2 className="text-lg text-gray-600 mb-2">Overall Meeting Culture Score</h2>
            <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-4">
              {overallScore}%
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <span className="font-bold text-2xl">{personalScore}%</span>
                <div className="text-gray-600">Personal</div>
              </div>
              <div className="text-gray-400">|</div>
              <div>
                <span className="font-bold text-2xl">{teamScore}%</span>
                <div className="text-gray-600">Team</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          {/* Personal & Team Impact - Side by Side on Desktop */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Personal Impact */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <span className="text-2xl mr-2">🚀</span> Personal Impact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Burnout Risk</span>
                  <span className="font-bold text-red-500">{personalMetrics.burnoutRisk}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Deep Work Lost</span>
                  <span className="font-bold text-orange-500">{personalMetrics.deepWorkLost}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Context Switches</span>
                  <span className="font-bold text-yellow-500">~{personalMetrics.contextSwitches}/day</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium">Personal Score</div>
                <div className="text-2xl font-bold text-orange-600">{(personalScore/10).toFixed(1)} / 10</div>
              </div>
            </div>

            {/* Team Impact */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <span className="text-2xl mr-2">🚧</span> Team Impact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Performance Gap</span>
                  <span className="font-bold text-orange-500">{teamMetrics.performanceGap}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Velocity Status</span>
                  <span className="font-bold text-yellow-600">{teamMetrics.velocity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Cost</span>
                  <span className="font-bold text-red-500">{formatCurrency(totalCost)}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium">Team Score</div>
                <div className="text-2xl font-bold text-purple-600">{(teamScore/10).toFixed(1)} / 10</div>
              </div>
            </div>
          </div>

          {/* Bottom Line Summary */}
          <div className="bg-gray-900 text-white p-6 rounded-lg mb-8">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <span className="text-2xl mr-2">💡</span> The Bottom Line
            </h3>
            <p className="text-gray-100">
              You're losing <span className="text-yellow-400 font-bold">30 hours/week</span> personally 
              and your team is wasting <span className="text-yellow-400 font-bold">{formatCurrency(totalCost)}/year</span>. 
              That's not just time and money — it's your ability to do meaningful work and compete at the highest level.
            </p>
          </div>

          {/* Recovery Roadmap */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="text-2xl mr-2">🗺️</span> Your Recovery Roadmap
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="ml-3">
                  <div className="font-bold">Protect Your Energy</div>
                  <div className="text-gray-600 text-sm">Block 2 hours daily for deep work. Non-negotiable.</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="ml-3">
                  <div className="font-bold">Fix Decision Velocity</div>
                  <div className="text-gray-600 text-sm">Every meeting needs a decision and owner within 24 hours.</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="ml-3">
                  <div className="font-bold">Cut Meeting Waste</div>
                  <div className="text-gray-600 text-sm">Eliminate 50% of recurring meetings using our audit framework.</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity">
              Book Strategy Session
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
              <span className="mr-2">📤</span> Share Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// IMPORTANT: Default export
export default DiagnosticComplete;