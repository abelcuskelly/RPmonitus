import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured')
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  return new Resend(apiKey)
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Create enrollment record
    const enrollment = {
      eligibility_check_id: data.eligibilityId,
      enrollment_status: 'pending_verification',
      physician_name: data.physicianName,
      physician_npi: data.physicianNPI,
      shipping_address: data.shippingAddress,
      preferred_contact_time: data.preferredContactTime,
      created_at: new Date().toISOString(),
    }
    
    const supabase = getSupabaseClient()
    const { data: enrollmentData, error } = await supabase
      .from('enrollments')
      .insert(enrollment)
      .select()
      .single()
    
    if (error) throw error
    
    // Send confirmation email
    const resend = getResendClient()
    if (resend) {
      await resend.emails.send({
        from: 'RPmonitus <noreply@rpmonitus.com>',
        to: data.email,
        subject: 'Welcome to RPmonitus - Your Enrollment is Being Processed',
        html: `
          <h1>Welcome to RPmonitus!</h1>
          <p>Thank you for enrolling in our Remote Patient Monitoring program.</p>
          
          <h2>What Happens Next:</h2>
          <ol>
            <li>We'll verify your Medicare coverage (1-2 business days)</li>
            <li>Your free blood pressure monitor will ship within 3-5 business days</li>
            <li>Our care team will call to help you set up your device</li>
            <li>You'll start receiving 24/7 health monitoring at no cost</li>
          </ol>
          
          <p>Your enrollment ID: ${enrollmentData.id}</p>
          
          <p>If you have any questions, please call us at 1-800-RPM-CARE.</p>
          
          <p>Best regards,<br>The RPmonitus Team</p>
        `,
      }).catch(err => console.error('Email send error:', err))
    }
    
    return NextResponse.json({ 
      success: true,
      enrollmentId: enrollmentData.id,
      message: 'Enrollment submitted successfully' 
    })
    
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json(
      { error: 'Failed to process enrollment' },
      { status: 500 }
    )
  }
}

