-- Migration: Create collaboration_events table for analytics tracking
-- Filename: 20250702_create_collaboration_events.sql

-- Create the collaboration_events table
CREATE TABLE IF NOT EXISTS public.collaboration_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  assessment_id UUID,
  team_id UUID,
  type VARCHAR(50) NOT NULL,  -- EDIT, COMMENT, VIEW
  section VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_collab_events_user_id ON public.collaboration_events(user_id);
CREATE INDEX IF NOT EXISTS idx_collab_events_assessment_id ON public.collaboration_events(assessment_id);
CREATE INDEX IF NOT EXISTS idx_collab_events_team_id ON public.collaboration_events(team_id);
CREATE INDEX IF NOT EXISTS idx_collab_events_type ON public.collaboration_events(type);
CREATE INDEX IF NOT EXISTS idx_collab_events_created_at ON public.collaboration_events(created_at);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create a trigger to call the function
CREATE TRIGGER update_collaboration_events_updated_at
BEFORE UPDATE ON public.collaboration_events
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Add comment to the table
COMMENT ON TABLE public.collaboration_events IS 'Tracks user collaboration activities for analytics';
