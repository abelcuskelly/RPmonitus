import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// Encryption for PII/PHI
function encrypt(text: string): string {
  const algorithm = 'aes-256-gcm'
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Basic eligibility checks
    const eligibilityChecks = {
      hasValidMedicare: data.medicareId.length === 11,
      hasChronicCondition: data.hasHypertension || data.hasDiabetes || 
                           data.hasHeartDisease || data.hasCOPD,
      ageEligible: calculateAge(data.dateOfBirth) >= 65,
    }
    
    const isEligible = Object.values(eligibilityChecks).every(check => check)
    
    // Store encrypted data in Supabase
    const encryptedData = {
      id: crypto.randomUUID(),
      first_name_encrypted: encrypt(data.firstName),
      last_name_encrypted: encrypt(data.lastName),
      email_encrypted: encrypt(data.email),
      phone_encrypted: encrypt(data.phone),
      medicare_id_encrypted: encrypt(data.medicareId),
      date_of_birth_encrypted: encrypt(data.dateOfBirth),
      zip_code: data.zipCode, // Not PII, can store unencrypted
      conditions: {
        hypertension: data.hasHypertension,
        diabetes: data.hasDiabetes,
        heart_disease: data.hasHeartDisease,
        copd: data.hasCOPD,
      },
      eligible: isEligible,
      created_at: new Date().toISOString(),
      source: 'website',
      utm_source: req.headers.get('referer') || 'direct',
    }
    
    const { data: insertedData, error } = await supabase
      .from('eligibility_checks')
      .insert(encryptedData)
      .select()
      .single()
    
    if (error) throw error
    
    // Track conversion event
    await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/track-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'eligibility_check',
        properties: {
          eligible: isEligible,
          zip_code: data.zipCode,
          conditions_count: Object.values(data).filter(v => 
            typeof v === 'boolean' && v).length - 1,
        },
      }),
    }).catch(err => console.error('Event tracking error:', err))
    
    return NextResponse.json({ 
      eligible: isEligible,
      id: insertedData?.id,
      checks: eligibilityChecks,
      message: isEligible 
        ? 'Congratulations! You qualify for free RPM services.'
        : 'We need to verify some information. A representative will contact you.'
    })
    
  } catch (error) {
    console.error('Eligibility check error:', error)
    return NextResponse.json(
      { error: 'An error occurred checking eligibility' },
      { status: 500 }
    )
  }
}

