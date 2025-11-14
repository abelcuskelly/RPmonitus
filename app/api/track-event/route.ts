import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { event, properties } = await req.json()
    
    // Track event in your analytics platform
    // This could be Google Analytics, Mixpanel, Segment, etc.
    
    // Example: Google Analytics 4 Measurement Protocol
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const GA_API_SECRET = process.env.GA_API_SECRET
    
    if (GA_MEASUREMENT_ID && GA_API_SECRET) {
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: 'POST',
          body: JSON.stringify({
            client_id: req.cookies.get('_ga')?.value || 'anonymous',
            events: [
              {
                name: event,
                params: properties,
              },
            ],
          }),
        }
      ).catch(err => console.error('GA tracking error:', err))
    }
    
    // Also log to your database for internal analytics
    console.log('Event tracked:', { event, properties })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Event tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

