-- Migration: Add assessment_analyses table for storing AI analysis results
-- File: migrations/004_add_ai_analysis_storage.sql

-- Create table for storing AI analysis results
CREATE TABLE IF NOT EXISTS assessment_analyses (
  id SERIAL PRIMARY KEY,
  assessment_id UUID NOT NULL,
  analysis_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Foreign key constraint
  CONSTRAINT fk_assessment_analyses_assessment 
    FOREIGN KEY (assessment_id) 
    REFERENCES survey_responses(id) 
    ON DELETE CASCADE,
    
  -- Ensure one analysis per assessment
  CONSTRAINT unique_assessment_analysis 
    UNIQUE (assessment_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessment_analyses_assessment_id 
  ON assessment_analyses(assessment_id);

-- Create index for analysis data queries
CREATE INDEX IF NOT EXISTS idx_assessment_analyses_analysis_data 
  ON assessment_analyses USING GIN(analysis_data);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_assessment_analyses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_assessment_analyses_updated_at
  BEFORE UPDATE ON assessment_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_assessment_analyses_updated_at();

-- Enable Row Level Security
ALTER TABLE assessment_analyses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own analyses" ON assessment_analyses
  FOR SELECT USING (
    assessment_id IN (
      SELECT id FROM survey_responses 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own analyses" ON assessment_analyses
  FOR INSERT WITH CHECK (
    assessment_id IN (
      SELECT id FROM survey_responses 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own analyses" ON assessment_analyses
  FOR UPDATE USING (
    assessment_id IN (
      SELECT id FROM survey_responses 
      WHERE user_id = auth.uid()
    )
  );

-- Grant necessary permissions
GRANT ALL ON assessment_analyses TO authenticated;
GRANT USAGE ON SEQUENCE assessment_analyses_id_seq TO authenticated;
