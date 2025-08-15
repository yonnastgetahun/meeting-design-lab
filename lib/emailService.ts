// lib/emailService.ts
import { PersonalMetrics, TeamMetrics } from './calculations'

interface EmailData {
  email: string
  pdfBuffer: Buffer
  personalScore: number
  teamScore: number
  personalMetrics: PersonalMetrics
  teamMetrics: TeamMetrics
}

interface EmailServiceConfig {
  provider: 'sendgrid' | 'mailgun' | 'convertkit' | 'resend'
  apiKey: string
  fromEmail: string
  fromName: string
}

export async function sendEmailWithPDF(data: EmailData): Promise<void> {
  const config: EmailServiceConfig = {
    provider: (process.env.EMAIL_PROVIDER as any) || 'sendgrid',
    apiKey: process.env.EMAIL_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || 'hello@pulsecollab.com',
    fromName: process.env.FROM_NAME || 'Pulse Collab'
  }

  if (!config.apiKey) {
    throw new Error('Email API key not configured')
  }

  switch (config.provider) {
    case 'sendgrid':
      return await sendWithSendGrid(data, config)
    case 'mailgun':
      return await sendWithMailgun(data, config)
    case 'resend':
      return await sendWithResend(data, config)
    case 'convertkit':
      return await sendWithConvertKit(data, config)
    default:
      throw new Error(`Unsupported email provider: ${config.provider}`)
  }
}

// SendGrid Implementation (Recommended)
async function sendWithSendGrid(data: EmailData, config: EmailServiceConfig): Promise<void> {
  const emailContent = generateEmailHTML(data)
  
  const payload = {
    personalizations: [{
      to: [{ email: data.email }],
      subject: 'Your Pulse Collab Diagnostic Report'
    }],
    from: {
      email: config.fromEmail,
      name: config.fromName
    },
    content: [{
      type: 'text/html',
      value: emailContent
    }],
    attachments: [{
      content: data.pdfBuffer.toString('base64'),
      filename: 'pulse-collab-diagnostic-report.pdf',
      type: 'application/pdf',
      disposition: 'attachment'
    }]
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`SendGrid error: ${error}`)
  }
}

// Resend Implementation (Modern Alternative)
async function sendWithResend(data: EmailData, config: EmailServiceConfig): Promise<void> {
  const emailContent = generateEmailHTML(data)
  
  const payload = {
    from: `${config.fromName} <${config.fromEmail}>`,
    to: [data.email],
    subject: 'Your Pulse Collab Diagnostic Report',
    html: emailContent,
    attachments: [{
      filename: 'pulse-collab-diagnostic-report.pdf',
      content: data.pdfBuffer
    }]
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend error: ${error}`)
  }
}

// Mailgun Implementation
async function sendWithMailgun(data: EmailData, config: EmailServiceConfig): Promise<void> {
  const emailContent = generateEmailHTML(data)
  const domain = process.env.MAILGUN_DOMAIN || 'mg.pulsecollab.com'
  
  const formData = new FormData()
  formData.append('from', `${config.fromName} <${config.fromEmail}>`)
  formData.append('to', data.email)
  formData.append('subject', 'Your Pulse Collab Diagnostic Report')
  formData.append('html', emailContent)
  formData.append('attachment', new Blob([data.pdfBuffer], { type: 'application/pdf' }), 'pulse-collab-diagnostic-report.pdf')

  const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`api:${config.apiKey}`).toString('base64')}`
    },
    body: formData
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Mailgun error: ${error}`)
  }
}

// ConvertKit Implementation (Limited - no attachments)
async function sendWithConvertKit(data: EmailData, config: EmailServiceConfig): Promise<void> {
  // Note: ConvertKit doesn't support attachments directly
  // You would need to upload the PDF to cloud storage and include the link
  console.warn('ConvertKit does not support PDF attachments. Consider using SendGrid or Resend instead.')
  
  const emailContent = generateEmailHTMLForConvertKit(data)
  
  // This is a simplified implementation - you'd need to use ConvertKit's broadcast API
  const payload = {
    email_address: data.email,
    first_name: '', // You might want to collect this during the diagnostic
    tags: ['diagnostic-completed'],
    fields: {
      personal_score: data.personalScore.toString(),
      team_score: data.teamScore.toString()
    }
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: config.apiKey,
      ...payload
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`ConvertKit error: ${error}`)
  }
}

// Email HTML Template
function generateEmailHTML(data: EmailData): string {
  const personalStatus = getStatusForEmail(data.personalScore, 'personal')
  const teamStatus = getStatusForEmail(data.teamScore, 'team')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Pulse Collab Diagnostic Report</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .header { 
          background: linear-gradient(135deg, #FF6B47 0%, #FF8A65 100%); 
          color: white; 
          padding: 30px 20px; 
          border-radius: 8px; 
          text-align: center; 
          margin-bottom: 30px;
        }
        .header h1 { 
          margin: 0; 
          font-size: 28px; 
          font-weight: 700;
        }
        .header p { 
          margin: 10px 0 0 0; 
          opacity: 0.9;
        }
        .score-section { 
          background: #f8f9fa; 
          padding: 20px; 
          border-radius: 8px; 
          margin-bottom: 20px; 
          border-left: 4px solid #FF6B47;
        }
        .score-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 20px; 
          margin: 20px 0;
        }
        .score-item { 
          text-align: center;
        }
        .score-number { 
          font-size: 36px; 
          font-weight: bold; 
          color: #FF6B47; 
          margin-bottom: 5px;
        }
        .score-label { 
          font-size: 14px; 
          color: #666; 
          text-transform: uppercase; 
          letter-spacing: 0.5px;
        }
        .status-text { 
          font-size: 16px; 
          color: #2d3748; 
          margin-bottom: 8px;
        }
        .cta-section { 
          background: #2d3748; 
          color: white; 
          padding: 30px 20px; 
          border-radius: 8px; 
          text-align: center; 
          margin: 30px 0;
        }
        .cta-button { 
          display: inline-block; 
          background: #FF6B47; 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 6px; 
          font-weight: 600; 
          margin-top: 15px;
        }
        .footer { 
          text-align: center; 
          color: #666; 
          font-size: 12px; 
          margin-top: 40px; 
          padding-top: 20px; 
          border-top: 1px solid #eee;
        }
        .attachment-note {
          background: #e6f3ff;
          border: 1px solid #b3d9ff;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
        }
        @media (max-width: 600px) {
          .score-grid { grid-template-columns: 1fr; }
          body { padding: 10px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 Your Diagnostic Report is Ready!</h1>
        <p>Insights to transform your meeting culture</p>
      </div>

      <div class="score-section">
        <h2 style="margin-top: 0; color: #2d3748;">Your Performance Scores</h2>
        <div class="score-grid">
          <div class="score-item">
            <div class="score-number">${data.personalScore}%</div>
            <div class="score-label">Personal Performance</div>
            <div class="status-text">${personalStatus}</div>
          </div>
          <div class="score-item">
            <div class="score-number">${data.teamScore}%</div>
            <div class="score-label">Team Performance</div>
            <div class="status-text">${teamStatus}</div>
          </div>
        </div>
      </div>

      <div class="attachment-note">
        <h3 style="margin-top: 0; color: #0066cc;">📋 Your Complete Report</h3>
        <p style="margin-bottom: 0;">Your detailed diagnostic report is attached as a PDF. It includes:</p>
        <ul style="margin: 10px 0;">
          <li>Detailed breakdown of your scores</li>
          <li>Key metrics and insights</li>
          <li>Personalized recommendations</li>
          <li>Action items to improve performance</li>
        </ul>
      </div>

      <div style="background: #fff3f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #2d3748;">💡 Quick Wins</h3>
        <p><strong>Personal:</strong> ${getTopPersonalInsight(data.personalMetrics)}</p>
        <p><strong>Team:</strong> ${getTopTeamInsight(data.teamMetrics)}</p>
      </div>

      <div class="cta-section">
        <h3 style="margin-top: 0;">Ready to Transform Your Meeting Culture?</h3>
        <p>Let's turn these insights into action. Book a free consultation to create your implementation roadmap.</p>
        <a href="https://www.pulsecollab.com/consult" class="cta-button">Schedule Free Consultation</a>
      </div>

      <div class="footer">
        <p><strong>Pulse Collab</strong> - Transforming Meeting Culture</p>
        <p>
          <a href="https://www.pulsecollab.com" style="color: #FF6B47;">www.pulsecollab.com</a> | 
          <a href="mailto:hello@pulsecollab.com" style="color: #FF6B47;">hello@pulsecollab.com</a>
        </p>
        <p style="margin-top: 15px; font-size: 11px;">
          You received this email because you completed our Meeting Diagnostic. 
          Questions? Reply to this email - we read every message.
        </p>
      </div>
    </body>
    </html>
  `
}

// ConvertKit version (without attachment references)
function generateEmailHTMLForConvertKit(data: EmailData): string {
  // Simplified version for ConvertKit
  return generateEmailHTML(data).replace(
    /<div class="attachment-note">.*?<\/div>/s, 
    '<div class="attachment-note"><h3>📊 Your Results</h3><p>Your detailed diagnostic insights are being processed. Check your email for follow-up resources!</p></div>'
  )
}

// Helper functions
function getStatusForEmail(score: number, type: 'personal' | 'team'): string {
  if (score >= 75) return type === 'personal' ? 'Peak Performance' : 'High-Velocity Team'
  if (score >= 50) return type === 'personal' ? 'Room for Improvement' : 'Momentum Blocked'
  return type === 'personal' ? 'Burnout Risk' : 'Significant Barriers'
}

function getTopPersonalInsight(metrics: PersonalMetrics): string {
  if (metrics.burnoutRisk > 70) {
    return 'Block 2-3 hours daily for deep work to reduce burnout risk'
  }
  if (metrics.contextSwitches > 8) {
    return 'Batch similar meetings together to reduce context switching'
  }
  return 'Implement meeting-free time blocks to protect productivity'
}

function getTopTeamInsight(metrics: TeamMetrics): string {
  if (metrics.decisionVelocity < 50) {
    return 'Use decision frameworks (RACI/DACI) to speed up team decisions'
  }
  if (metrics.engagementScore < 60) {
    return 'Rotate meeting facilitation to increase team engagement'
  }
  return 'Audit recurring meetings monthly to eliminate waste'
}

// Environment Variables Helper
export function validateEmailConfig(): { isValid: boolean; missingVars: string[] } {
  const requiredVars = ['EMAIL_PROVIDER', 'EMAIL_API_KEY', 'FROM_EMAIL']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  return {
    isValid: missingVars.length === 0,
    missingVars
  }
}

export default sendEmailWithPDF