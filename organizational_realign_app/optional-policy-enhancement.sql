-- Optional Enhancement: Add dedicated policy recommendations storage
-- This is NOT required - current schema already supports everything
-- Only add if you want easier querying of policy data

ALTER TABLE public.assessments 
ADD COLUMN IF NOT EXISTS policy_recommendations JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS policy_frameworks_generated BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS comprehensive_report_generated BOOLEAN DEFAULT FALSE;

-- Optional: Add index for policy recommendations if added
CREATE INDEX IF NOT EXISTS idx_assessments_policy_recommendations 
ON public.assessments USING GIN(policy_recommendations);

-- Success message
SELECT 'Optional policy storage enhancement complete - but not required for functionality!' as status;
