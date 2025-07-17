'use client'

import { ArrowRight, Clock, Users, TrendingDown, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Meetings Are Killing<br />
            <span className="text-red-600">Your Team's Productivity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover exactly how much meeting chaos is costing you—and get a personalized action plan to fix it.
          </p>
          
          <a 
            href="/diagnostic" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Free Diagnostic
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          
          <p className="mt-4 text-sm text-gray-500">
            Takes less than 5 minutes • No email required to start
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
            Your Free Meeting Diagnostic Includes:
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Personal Productivity Analysis</h3>
                <p className="text-gray-600 text-sm mt-1">
                  See exactly how meeting chaos affects your deep work and burnout risk
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Team Effectiveness Score</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Compare your team's meeting culture to top performers
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Context Switching Calculator</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Discover hours lost to mental task-switching between meetings
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Action Plan & Resources</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Get templates and guides tailored to your specific challenges
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
            Take the Free Diagnostic
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