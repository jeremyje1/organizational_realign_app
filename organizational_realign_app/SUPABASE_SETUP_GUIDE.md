# Supabase Schema Setup for Enhanced Question Bank

## Step-by-Step Instructions

### 1. Access Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your project: `ribxxibwzwxstgprhcra`
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"

### 2. Run the Schema Setup

1. Copy the entire contents of `supabase-schema-setup.sql`
2. Paste it into the SQL Editor
3. Click "Run" (or press Ctrl/Cmd + Enter)

### 3. What This Setup Does

#### Creates/Updates Tables:

- **`assessments`**: Main table for storing assessment data with proper columns
- **`surveys`**: Backup table for flexible JSON storage

#### Key Features:

- ✅ **Mixed Question Types**: JSONB fields support Likert, numeric, text, and upload data
- ✅ **Organization Types**: Proper enum constraints for all 5 institution types
- ✅ **Tier Support**: All 4 service tiers supported
- ✅ **Anonymous Submissions**: RLS policies allow public assessment submissions
- ✅ **Performance**: Indexes on key fields for fast queries
- ✅ **Analytics View**: Built-in view for analyzing assessment patterns

#### New Schema Structure:

```sql
assessments:
├── id (UUID, auto-generated)
├── user_id (UUID, nullable for anonymous)
├── tier (TEXT, enum constraint)
├── organization_type (TEXT, enum constraint)
├── institution_name (TEXT)
├── contact_email (TEXT)
├── contact_name (TEXT)
├── responses (JSONB) -- Mixed question responses
├── uploaded_files (JSONB) -- File metadata
├── status (TEXT, enum constraint)
├── analysis_results (JSONB) -- Algorithm outputs
└── timestamps (created_at, updated_at, etc.)
```

### 4. Test the Setup

After running the SQL, test with:

```bash
./test-enhanced-question-bank.sh
```

### 5. Expected Results

- ✅ Assessment submissions will save to database instead of mock mode
- ✅ All mixed question types (Likert, numeric, text, upload) will be stored properly
- ✅ Analytics view will be available for reporting
- ✅ Performance will be optimized with proper indexes

### 6. Database Features Added

#### Analytics Query Examples:

```sql
-- View assessment completion by organization type
SELECT organization_type, COUNT(*) as assessments
FROM assessment_analytics
GROUP BY organization_type;

-- Average scores by tier
SELECT tier,
       AVG(leadership_vision_score) as avg_leadership,
       AVG(communication_score) as avg_communication
FROM assessment_analytics
WHERE leadership_vision_score IS NOT NULL
GROUP BY tier;

-- Response completeness analysis
SELECT tier,
       AVG(total_responses) as avg_responses,
       AVG(text_questions_answered) as avg_text_responses
FROM assessment_analytics
GROUP BY tier;
```

### 7. Schema Migration Notes

- **Backwards Compatible**: Existing data will be preserved
- **Safe Execution**: Uses `IF NOT EXISTS` and `ON CONFLICT DO NOTHING`
- **Incremental**: Can be run multiple times safely
- **Rollback**: No destructive operations, only additions

### 8. Security Features

- **Row Level Security**: Enabled with appropriate policies
- **Anonymous Submissions**: Allowed for assessment form
- **Data Protection**: Users can only access their own data
- **Admin Access**: Can be enabled by uncommenting admin policy

## Quick Commands

Copy and paste this entire file into Supabase SQL Editor:

```
supabase-schema-setup.sql
```

After setup, test with:

```bash
./test-enhanced-question-bank.sh
```

The enhanced question bank will then work with full database persistence! 🎉
