// lib/pdfGeneration.ts
import PDFDocument from 'pdfkit'
import { PersonalMetrics, TeamMetrics } from './calculations'
import { getStatus } from './designSystem'

interface DiagnosticPDFOptions {
  personalScore: number
  teamScore: number
  personalMetrics: PersonalMetrics
  teamMetrics: TeamMetrics
  email: string
}

export async function generateDiagnosticPDF(options: DiagnosticPDFOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        margin: 50,
        size: 'A4',
        info: {
          Title: 'Pulse Collab Diagnostic Report',
          Author: 'Pulse Collab',
          Subject: 'Meeting Performance Diagnostic',
          Creator: 'Pulse Collab Meeting Design Lab'
        }
      })
      
      const chunks: Buffer[] = []

      doc.on('data', chunk => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      // Generate PDF content
      addHeader(doc)
      addPersonalResults(doc, options)
      addTeamResults(doc, options)
      addRecommendations(doc, options)
      addContactInfo(doc)

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

function addHeader(doc: PDFKit.PDFDocument) {
  // Header with Pulse Collab branding
  doc.fontSize(28)
     .fillColor('#FF6B47') // pulse-coral
     .text('Pulse Collab', 50, 50)
     
  doc.fontSize(20)
     .fillColor('#2D3748') // charcoal
     .text('Meeting Diagnostic Report', 50, 85)
     
  doc.fontSize(12)
     .fillColor('#6B7280') // gray-500
     .text(`Generated on ${new Date().toLocaleDateString('en-US', { 
       year: 'numeric', 
       month: 'long', 
       day: 'numeric' 
     })}`, 50, 115)
     
  // Decorative line
  doc.moveTo(50, 140)
     .lineTo(550, 140)
     .strokeColor('#E5E7EB')
     .lineWidth(1)
     .stroke()
}

function addPersonalResults(doc: PDFKit.PDFDocument, options: DiagnosticPDFOptions) {
  const personalStatus = getStatus(options.personalScore, 'personal')
  let yPosition = 170

  // Personal Section Header
  doc.fontSize(18)
     .fillColor('#2D3748')
     .text('Personal Performance Diagnostic', 50, yPosition)
     
  yPosition += 35

  // Score Display
  doc.fontSize(48)
     .fillColor('#FF6B47')
     .text(`${options.personalScore}%`, 50, yPosition)
     
  // Status Text
  doc.fontSize(16)
     .fillColor('#2D3748')
     .text(personalStatus.text, 150, yPosition + 5)
     
  doc.fontSize(12)
     .fillColor('#6B7280')
     .text(personalStatus.subtitle, 150, yPosition + 30, { width: 350 })

  yPosition += 85

  // Personal Metrics Header
  doc.fontSize(14)
     .fillColor('#2D3748')
     .text('Key Personal Metrics:', 50, yPosition)
     
  yPosition += 25

  // Metrics Grid
  const personalMetrics = [
    { 
      label: 'Burnout Risk', 
      value: `${options.personalMetrics.burnoutRisk}%`,
      color: options.personalMetrics.burnoutRisk > 70 ? '#EF4444' : '#F59E0B'
    },
    { 
      label: 'Deep Work Lost', 
      value: `${options.personalMetrics.deepWorkLoss}h/week`,
      color: '#F97316'
    },
    { 
      label: 'Context Switches', 
      value: `${options.personalMetrics.contextSwitches}/day`,
      color: '#8B5CF6'
    },
    { 
      label: 'Meeting Efficiency', 
      value: `${options.personalMetrics.meetingEfficiency}%`,
      color: options.personalMetrics.meetingEfficiency > 60 ? '#10B981' : '#EF4444'
    }
  ]

  personalMetrics.forEach((metric, index) => {
    const xPos = 50 + (index % 2) * 280
    const yPos = yPosition + Math.floor(index / 2) * 35
    
    // Metric label
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(`${metric.label}:`, xPos, yPos)
       
    // Metric value with color
    doc.fontSize(14)
       .fillColor(metric.color)
       .text(metric.value, xPos + 120, yPos - 2)
  })

  yPosition += 85

  // Personal Bottom Line
  const weeklyLoss = Math.round(options.personalMetrics.contextSwitchCost + options.personalMetrics.deepWorkLoss)
  
  doc.rect(50, yPosition, 500, 45)
     .fillColor('#FEF3F2')
     .fill()
     
  doc.fontSize(12)
     .fillColor('#2D3748')
     .text('Bottom Line:', 60, yPosition + 10)
     
  doc.fontSize(11)
     .fillColor('#6B7280')
     .text(`You're losing ${weeklyLoss} hours per week to inefficient meetings and context switching.`, 60, yPosition + 28, { width: 480 })
}

function addTeamResults(doc: PDFKit.PDFDocument, options: DiagnosticPDFOptions) {
  const teamStatus = getStatus(options.teamScore, 'team')
  
  // Add new page for team results
  doc.addPage()
  
  let yPosition = 50

  // Team Section Header
  doc.fontSize(18)
     .fillColor('#2D3748')
     .text('Team Performance Diagnostic', 50, yPosition)
     
  yPosition += 35

  // Score Display
  doc.fontSize(48)
     .fillColor('#FF6B47')
     .text(`${options.teamScore}%`, 50, yPosition)
     
  // Status Text
  doc.fontSize(16)
     .fillColor('#2D3748')
     .text(teamStatus.text, 150, yPosition + 5)
     
  doc.fontSize(12)
     .fillColor('#6B7280')
     .text(teamStatus.subtitle, 150, yPosition + 30, { width: 350 })

  yPosition += 85

  // Team Metrics Header
  doc.fontSize(14)
     .fillColor('#2D3748')
     .text('Key Team Metrics:', 50, yPosition)
     
  yPosition += 25

  // Team Metrics Grid
  const teamMetrics = [
    { 
      label: 'Decision Velocity', 
      value: `${options.teamMetrics.decisionVelocity}%`,
      color: options.teamMetrics.decisionVelocity > 60 ? '#10B981' : '#EF4444'
    },
    { 
      label: 'Team Engagement', 
      value: `${options.teamMetrics.engagementScore}%`,
      color: '#3B82F6'
    },
    { 
      label: 'Follow Through Rate', 
      value: `${options.teamMetrics.followThroughRate}%`,
      color: '#8B5CF6'
    },
    { 
      label: 'Annual Meeting Waste', 
      value: `$${options.teamMetrics.yearlyWaste.toLocaleString()}`,
      color: '#EF4444'
    }
  ]

  teamMetrics.forEach((metric, index) => {
    const xPos = 50 + (index % 2) * 280
    const yPos = yPosition + Math.floor(index / 2) * 35
    
    // Metric label
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(`${metric.label}:`, xPos, yPos)
       
    // Metric value with color
    doc.fontSize(14)
       .fillColor(metric.color)
       .text(metric.value, xPos + 130, yPos - 2)
  })

  yPosition += 85

  // Team Bottom Line
  doc.rect(50, yPosition, 500, 45)
     .fillColor('#F0F9FF')
     .fill()
     
  doc.fontSize(12)
     .fillColor('#2D3748')
     .text('Bottom Line:', 60, yPosition + 10)
     
  doc.fontSize(11)
     .fillColor('#6B7280')
     .text(`Your team could save $${options.teamMetrics.yearlyWaste.toLocaleString()} annually by optimizing meeting culture.`, 60, yPosition + 28, { width: 480 })
}

function addRecommendations(doc: PDFKit.PDFDocument, options: DiagnosticPDFOptions) {
  let yPosition = 300

  // Recommendations Section
  doc.fontSize(16)
     .fillColor('#2D3748')
     .text('Immediate Action Items', 50, yPosition)
     
  yPosition += 30

  // Personal Recommendations
  const personalRecs = getPersonalRecommendations(options.personalScore, options.personalMetrics)
  const teamRecs = getTeamRecommendations(options.teamScore, options.teamMetrics)

  doc.fontSize(14)
     .fillColor('#FF6B47')
     .text('Personal Quick Wins:', 50, yPosition)
     
  yPosition += 20

  personalRecs.slice(0, 3).forEach((rec, index) => {
    doc.fontSize(11)
       .fillColor('#2D3748')
       .text(`${index + 1}.`, 60, yPosition)
       
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(rec, 75, yPosition, { width: 460 })
       
    yPosition += 25
  })

  yPosition += 15

  doc.fontSize(14)
     .fillColor('#FF6B47')
     .text('Team Quick Wins:', 50, yPosition)
     
  yPosition += 20

  teamRecs.slice(0, 3).forEach((rec, index) => {
    doc.fontSize(11)
       .fillColor('#2D3748')
       .text(`${index + 1}.`, 60, yPosition)
       
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(rec, 75, yPosition, { width: 460 })
       
    yPosition += 25
  })
}

function addContactInfo(doc: PDFKit.PDFDocument) {
  const yPosition = 650

  // Contact section with background
  doc.rect(50, yPosition, 500, 120)
     .fillColor('#FDF7F4')
     .fill()
     
  doc.rect(50, yPosition, 500, 120)
     .strokeColor('#FF6B47')
     .lineWidth(2)
     .stroke()

  // Contact header
  doc.fontSize(16)
     .fillColor('#2D3748')
     .text('Ready to Transform Your Meeting Culture?', 70, yPosition + 20)
     
  doc.fontSize(12)
     .fillColor('#6B7280')
     .text('Let\'s unlock your team\'s full potential together.', 70, yPosition + 45)
     
  // Contact details
  doc.fontSize(11)
     .fillColor('#4B5563')
     .text('🌐 Website: www.pulsecollab.com', 70, yPosition + 70)
     
  doc.fontSize(11)
     .fillColor('#4B5563')
     .text('📧 Email: hello@pulsecollab.com', 70, yPosition + 90)
     
  doc.fontSize(11)
     .fillColor('#FF6B47')
     .text('📅 Book a consultation: www.pulsecollab.com/consult', 70, yPosition + 110)
}

// Helper functions for recommendations
function getPersonalRecommendations(score: number, metrics: PersonalMetrics): string[] {
  const recommendations = []
  
  if (metrics.burnoutRisk > 70) {
    recommendations.push('Implement a "no-meeting" block for 2-3 hours daily to protect deep work time')
  }
  
  if (metrics.contextSwitches > 8) {
    recommendations.push('Batch similar meetings together and create transition buffers between different types of work')
  }
  
  if (metrics.meetingEfficiency < 60) {
    recommendations.push('Start using meeting agendas and time-boxing to improve meeting quality')
  }
  
  if (metrics.deepWorkLoss > 10) {
    recommendations.push('Negotiate meeting-free mornings or afternoons with your team')
  }
  
  recommendations.push('Use the "2-minute rule" - if a meeting topic can be resolved in 2 minutes, handle it via message instead')
  
  return recommendations
}

function getTeamRecommendations(score: number, metrics: TeamMetrics): string[] {
  const recommendations = []
  
  if (metrics.decisionVelocity < 50) {
    recommendations.push('Implement decision-making frameworks (RACI, DACI) to accelerate team decisions')
  }
  
  if (metrics.engagementScore < 60) {
    recommendations.push('Introduce rotating facilitation and ensure every meeting has clear outcomes')
  }
  
  if (metrics.followThroughRate < 70) {
    recommendations.push('Create a shared action item tracker with owners and deadlines')
  }
  
  if (metrics.yearlyWaste > 50000) {
    recommendations.push('Audit recurring meetings monthly - cancel or optimize low-value meetings')
  }
  
  recommendations.push('Establish "meeting hygiene" rules: agendas required, start/end on time, and clear next steps')
  
  return recommendations
}

export default generateDiagnosticPDF