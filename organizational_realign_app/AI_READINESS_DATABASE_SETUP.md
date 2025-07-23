# AI Readiness Database Co- **Project URL*```bash
NEXT_PUBLIC_AI_READINESS_SUPABASE_URL=https://jocignzsthhcpspxfdfxae.supabase.co
NEXT_PUBLIC_AI_READINESS_SUPABASE_ANON_KEY=[REGENERATE_YOUR_KEY_SECURITY_INCIDENT]
AI_READINESS_SUPABASE_URL=https://jocignzsthhcpspxfdfxae.supabase.co
AI_READINESS_SUPABASE_ANON_KEY=[REGENERATE_YOUR_KEY_SECURITY_INCIDENT]
``` `https://jocignzsthhcpspxfdfxae.supabase.co`
- **Anon Key**: `[REGENERATE YOUR KEY - SECURITY INCIDENT]`iguration Instructions

## 🎯 Separate Database Setup for AI Readiness Assessment

You now have **two separate tools** with **two separate databases**:

### 1. **Organizational Realignment Tool** (Existing)
- **Database**: Your current Supabase project
- **Schema**: `supabase-schema-setup.sql`
- **Environment Variables**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Tables**: `assessments`, `teams`, `team_members`, etc.

### 2. **AI Readiness Assessment Tool** (New)
- **Database**: New Supabase project (to be created)
- **Schema**: `supabase-ai-readiness-schema.sql`
- **Environment Variables**: `NEXT_PUBLIC_AI_READINESS_SUPABASE_URL`, `NEXT_PUBLIC_AI_READINESS_SUPABASE_ANON_KEY`
- **Tables**: `ai_readiness_assessments`, `ai_readiness_teams`, `ai_policy_templates`, etc.

## 📋 Setup Instructions

### Step 1: Create New Supabase Project for AI Readiness ✅ COMPLETE
1. ✅ Go to [supabase.com](https://supabase.com)
2. ✅ Create a new project: **"AI Readiness Assessment"**
3. ✅ Note down the new project URL and anon key

**Your New AI Readiness Project:**
- **Project URL**: `https://jocigzsthcpspxfdfxae.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvY2lnenN0aGNwc3B4ZmRmeGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzExNzYsImV4cCI6MjA2ODgwNzE3Nn0.krJk0mzZQ3wmo_isokiYkm5eCTfMpIZcGP6qfSKYrHA`

### Step 2: Run AI Readiness Schema ✅ COMPLETE
1. ✅ **Go to your SQL Editor**: [https://jocigzsthcpspxfdfxae.supabase.co/project/default/sql](https://jocigzsthcpspxfdfxae.supabase.co/project/default/sql)
2. ✅ **Copy the schema**: Open `supabase-ai-readiness-schema.sql` and copy all contents
3. ✅ **Paste and run**: Paste into SQL Editor and click "Run" to create all tables and policies

**✅ SUCCESS**: AI Readiness Assessment database schema created successfully!

### Step 3: Update Environment Variables ✅ COMPLETE
Your `.env.local` has been updated with the AI Readiness database credentials:

```bash
# AI Readiness Database (NEW - Your Actual Credentials)
NEXT_PUBLIC_AI_READINESS_SUPABASE_URL=https://jocigzsthcpspxfdfxae.supabase.co
NEXT_PUBLIC_AI_READINESS_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvY2lnenN0aGNwc3B4ZmRmeGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzExNzYsImV4cCI6MjA2ODgwNzE3Nn0.krJk0mzZQ3wmo_isokiYkm5eCTfMpIZcGP6qfSKYrHA
```

### Step 4: Test Your Setup 🎯 FINAL STEP
Run the enhanced test script to verify both databases:

```bash
./test-enhanced-ai-readiness.sh
```

## 🔧 Database Operations

### AI Readiness Database Features:
- ✅ 100-question assessment storage
- ✅ Policy recommendation tracking
- ✅ Team collaboration support
- ✅ Custom policy generation
- ✅ Payment integration
- ✅ PDF report tracking
- ✅ Analytics and reporting

### Automatic Fallback:
If the AI Readiness database is not configured, the system will:
- Continue to work without database storage
- Log warnings instead of errors
- Store assessment results in memory only
- Disable team collaboration features

## 🚀 Benefits of Separate Databases

### 1. **Clean Separation**
- No data mixing between tools
- Independent scaling and management
- Clear tool boundaries

### 2. **Flexible Pricing**
- Different subscription models
- Independent billing
- Tool-specific analytics

### 3. **Enhanced Security**
- Separate access controls
- Tool-specific permissions
- Independent compliance requirements

### 4. **Development Efficiency**
- Independent deployments
- Parallel development
- Easier testing and debugging

## 📊 Next Steps

1. **Create the new Supabase project**
2. **Run the AI readiness schema**
3. **Update environment variables**
4. **Test the setup with sample data**
5. **Deploy to production with both databases**

## 🔗 File References

- **AI Readiness Database**: `lib/aiReadinessDatabase.ts`
- **AI Readiness Schema**: `supabase-ai-readiness-schema.sql`
- **API Route**: `app/api/ai-readiness/score/route.ts`
- **PDF Generator**: `lib/ai-readiness-pdf-generator.ts`
- **Engine**: `lib/aiReadinessEngine.ts`

---

**Need help with setup?** The system is designed to work with or without the database, so you can test the AI readiness assessment immediately and add the database later.
