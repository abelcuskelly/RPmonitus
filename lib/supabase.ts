import { createClient } from '@supabase/supabase-js'

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not configured')
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

// For backward compatibility, but only create client when actually used
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get() {
    return getSupabaseClient()
  }
})

// Database schema for Supabase
export const databaseSchema = `
-- Eligibility checks table
CREATE TABLE eligibility_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name_encrypted TEXT NOT NULL,
  last_name_encrypted TEXT NOT NULL,
  email_encrypted TEXT NOT NULL,
  phone_encrypted TEXT NOT NULL,
  medicare_id_encrypted TEXT NOT NULL,
  date_of_birth_encrypted TEXT NOT NULL,
  zip_code VARCHAR(5) NOT NULL,
  conditions JSONB,
  eligible BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Enrollments table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  eligibility_check_id UUID REFERENCES eligibility_checks(id),
  enrollment_status VARCHAR(50) DEFAULT 'pending',
  device_shipped BOOLEAN DEFAULT FALSE,
  device_activated BOOLEAN DEFAULT FALSE,
  first_reading_date DATE,
  physician_name TEXT,
  physician_npi VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_eligibility_created_at ON eligibility_checks(created_at DESC);
CREATE INDEX idx_eligibility_eligible ON eligibility_checks(eligible);
CREATE INDEX idx_enrollments_status ON enrollments(enrollment_status);

-- Row Level Security
ALTER TABLE eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
`;

