-- Migration: Add consultation booking tables
-- File: 003_add_consultation_bookings.sql

CREATE TABLE consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  consultation_type VARCHAR(50) NOT NULL CHECK (consultation_type IN ('strategic', 'implementation', 'follow-up')),
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  message TEXT,
  organization_size VARCHAR(20) NOT NULL CHECK (organization_size IN ('small', 'medium', 'large', 'enterprise')),
  urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  scheduled_duration INTEGER DEFAULT 60, -- minutes
  meeting_url TEXT,
  consultant_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_consultation_bookings_user_id ON consultation_bookings(user_id);
CREATE INDEX idx_consultation_bookings_assessment_id ON consultation_bookings(assessment_id);
CREATE INDEX idx_consultation_bookings_status ON consultation_bookings(status);
CREATE INDEX idx_consultation_bookings_scheduled_date ON consultation_bookings(scheduled_date);

-- Add RLS policies
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Users can only see their own bookings
CREATE POLICY "Users can view own consultation bookings" ON consultation_bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only create their own bookings
CREATE POLICY "Users can create own consultation bookings" ON consultation_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own bookings (limited fields)
CREATE POLICY "Users can update own consultation bookings" ON consultation_bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_consultation_bookings_updated_at
  BEFORE UPDATE ON consultation_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add table for consultation availability slots (for future scheduling)
CREATE TABLE consultation_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  max_bookings INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(consultant_id, date, start_time)
);

CREATE INDEX idx_consultation_availability_consultant_id ON consultation_availability(consultant_id);
CREATE INDEX idx_consultation_availability_date ON consultation_availability(date);
CREATE INDEX idx_consultation_availability_is_available ON consultation_availability(is_available);

-- Add trigger for availability updated_at
CREATE TRIGGER update_consultation_availability_updated_at
  BEFORE UPDATE ON consultation_availability
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
