import { NextResponse } from 'next/server'

export async function POST(request: Request) {
 try {
   const { email, firstName, score, category } = await request.json()

   // Validate input
   if (!email) {
     return NextResponse.json(
       { error: 'Email is required' },
       { status: 400 }
     )
   }

   // ConvertKit API endpoint
   const CONVERTKIT_API_URL = `https://api.convertkit.com/v3/forms/${process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscribe`

   // Prepare the request
   const response = await fetch(CONVERTKIT_API_URL, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       api_secret: process.env.CONVERTKIT_API_SECRET,  // ← CHANGED to api_secret
       email,
       first_name: firstName || '',
       fields: {
         meeting_score: score,
         meeting_category: category,
       },
       tags: [`meeting-design-lab-${category}`, `score-${Math.floor(score)}`],
     }),
   })

   if (!response.ok) {
     const error = await response.json()
     console.error('ConvertKit error:', error)
     return NextResponse.json(
       { error: 'Failed to subscribe' },
       { status: 500 }
     )
   }

   const data = await response.json()

   // Return success with download link
   return NextResponse.json({
     success: true,
     message: 'Successfully subscribed!',
     downloadUrl: '/downloads/meeting-transformation-toolkit.pdf',
     subscriber: data.subscription,
   })

 } catch (error) {
   console.error('API route error:', error)
   return NextResponse.json(
     { error: 'Internal server error' },
     { status: 500 }
   )
 }
}