'use client'

import { ArrowRight, Clock, Users, TrendingDown, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Velocity or burnout—<br />
            <span className="text-red-600">which way is your team heading?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            See how your meeting culture stacks up. Discover where you're losing momentum, what it's costing—and get the roadmap top teams use.
          </p>
          
          <a 
            href="/diagnostic" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          
          <p className="mt-4 text-sm text-gray-500">
            5-minute assessment • Benchmark results
          </p>
        </div>

        {/* Problem Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Clock className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">15+ hrs/week</div>
            <div className="text-sm text-gray-600">Average time in meetings</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingDown className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">73%</div>
            <div className="text-sm text-gray-600">Say meetings prevent real work</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">$25,000</div>
            <div className="text-sm text-gray-600">Wasted per employee/year</div>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="bg-blue-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Audit Reveals:
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Personal Impact Score</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Uncover how meetings are affecting your deep work, energy levels, and burnout risk
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Team Performance Benchmark</h3>
                <p className="text-gray-600 text-sm mt-1">
                  See exactly where your team stands compared to high-velocity teams
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Custom Action Plan</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Get specific strategies and tools that top teams use to fix your exact issues
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a 
            href="/diagnostic" 
            className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          
          <p className="mt-6 text-gray-600">
            Join 1,000+ teams who've transformed their meeting culture
          </p>
        </div>
      </div>
    </main>
  )
}