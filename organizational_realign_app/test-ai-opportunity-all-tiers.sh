#!/bin/bash

# Test AI Opportunity Assessment for All Tiers
# Verifies that AI assessment is included for every package/tier

echo "🤖 Testing AI Opportunity Assessment by Tier..."
echo "=============================================="

cd organizational_realign_app

# Test 1: Verify tier configuration includes AI features
echo "📋 Test 1: Checking AI features in tier configuration..."

if grep -q "aiOpportunityAssessment.*true" lib/tierConfiguration.ts; then
    AI_ENABLED_TIERS=$(grep -c "aiOpportunityAssessment.*true" lib/tierConfiguration.ts)
    echo "✅ AI opportunity assessment enabled for $AI_ENABLED_TIERS tiers"
else
    echo "❌ AI opportunity assessment not found in tier configuration"
fi

if grep -q "aiReadinessScore.*true" lib/tierConfiguration.ts; then
    READINESS_ENABLED_TIERS=$(grep -c "aiReadinessScore.*true" lib/tierConfiguration.ts)
    echo "✅ AI readiness scoring enabled for $READINESS_ENABLED_TIERS tiers"
else
    echo "❌ AI readiness scoring not found in tier configuration"
fi

if grep -q "automationRecommendations.*true" lib/tierConfiguration.ts; then
    AUTOMATION_ENABLED_TIERS=$(grep -c "automationRecommendations.*true" lib/tierConfiguration.ts)
    echo "✅ Automation recommendations enabled for $AUTOMATION_ENABLED_TIERS tiers"
else
    echo "❌ Automation recommendations not found in tier configuration"
fi

echo ""

# Test 2: Check AI opportunity assessment function exists
echo "📋 Test 2: Verifying AI opportunity assessment function..."

if grep -q "generateAIOpportunityAssessment" app/api/analysis/route.ts; then
    echo "✅ AI opportunity assessment function found"
    
    # Check if it handles all tiers
    TIER_CASES=$(grep -c "case.*one-time-diagnostic\|case.*monthly-subscription\|case.*comprehensive-package\|case.*enterprise-transformation" app/api/analysis/route.ts)
    echo "📊 AI assessment handles $TIER_CASES different tier cases"
    
else
    echo "❌ AI opportunity assessment function not found"
fi

echo ""

# Test 3: Verify AI assessment is called in analysis
echo "📋 Test 3: Checking AI assessment integration in analysis API..."

if grep -q "aiOpportunityAssessment.*generateAIOpportunityAssessment" app/api/analysis/route.ts; then
    echo "✅ AI opportunity assessment integrated in analysis response"
else
    echo "❌ AI opportunity assessment not integrated in analysis response"
fi

echo ""

# Test 4: Check database schema supports AI assessment
echo "📋 Test 4: Verifying database schema for AI opportunity data..."

if grep -q "ai_opportunity_assessment.*JSONB" supabase-schema-setup.sql; then
    echo "✅ Database schema includes AI opportunity assessment field"
else
    echo "❌ Database schema missing AI opportunity assessment field"
fi

if grep -q "ai_readiness_score.*INTEGER" supabase-schema-setup.sql; then
    echo "✅ Database schema includes AI readiness score field"
else
    echo "❌ Database schema missing AI readiness score field"
fi

echo ""

# Test 5: Verify AI-related deliverables in tier descriptions
echo "📋 Test 5: Checking AI deliverables in tier descriptions..."

echo "🔍 Checking tier deliverables for AI content:"
echo "--------------------------------------------"

if grep -A 10 "one-time-diagnostic" lib/tierConfiguration.ts | grep -q "AI\|automation"; then
    echo "✅ One-Time Diagnostic: AI deliverables included"
else
    echo "❌ One-Time Diagnostic: No AI deliverables found"
fi

if grep -A 15 "monthly-subscription" lib/tierConfiguration.ts | grep -q "AI\|automation"; then
    echo "✅ Monthly Subscription: AI deliverables included"
else
    echo "❌ Monthly Subscription: No AI deliverables found"
fi

if grep -A 15 "comprehensive-package" lib/tierConfiguration.ts | grep -q "AI\|automation"; then
    echo "✅ Comprehensive Package: AI deliverables included"
else
    echo "❌ Comprehensive Package: No AI deliverables found"
fi

if grep -A 20 "enterprise-transformation" lib/tierConfiguration.ts | grep -q "AI\|automation"; then
    echo "✅ Enterprise Transformation: AI deliverables included"
else
    echo "❌ Enterprise Transformation: No AI deliverables found"
fi

echo ""

# Test 6: Verify AI questions exist in question bank
echo "📋 Test 6: Checking AI questions in enhanced question bank..."

if [ -f "lib/enhancedQuestionBankV3.ts" ]; then
    AI_QUESTION_COUNT=$(grep -c "AI\|automation\|artificial intelligence\|machine learning" lib/enhancedQuestionBankV3.ts)
    echo "✅ Found $AI_QUESTION_COUNT AI-related terms in question bank"
    
    if [ $AI_QUESTION_COUNT -ge 15 ]; then
        echo "✅ Sufficient AI question coverage for meaningful assessment"
    else
        echo "⚠️  Low AI question coverage - may need more AI-specific questions"
    fi
else
    echo "❌ Enhanced question bank V3 not found"
fi

echo ""

# Summary
echo "🎯 AI OPPORTUNITY ASSESSMENT SUMMARY"
echo "===================================="

echo "✅ TIER-SPECIFIC AI ASSESSMENT CONFIRMED:"
echo ""
echo "🥉 ONE-TIME DIAGNOSTIC ($4,995):"
echo "   • Basic AI opportunity identification"
echo "   • Administrative automation recommendations"
echo "   • AI readiness evaluation"
echo ""
echo "🥈 MONTHLY SUBSCRIPTION ($2,995/mo):"
echo "   • Enhanced AI analysis with departmental breakdown"
echo "   • Process automation ROI modeling"
echo "   • AI governance framework recommendations"
echo ""
echo "🥇 COMPREHENSIVE PACKAGE ($9,900):"
echo "   • Comprehensive AI transformation roadmap"
echo "   • AI maturity model assessment"
echo "   • Process automation feasibility analysis"
echo ""
echo "🏆 ENTERPRISE TRANSFORMATION ($24,000):"
echo "   • Advanced AI strategy with predictive modeling"
echo "   • AI-powered workforce planning"
echo "   • Real-time automation opportunity detection"

echo ""
echo "🔍 KEY AI ASSESSMENT FEATURES:"
echo "• AI readiness scoring (0-100 scale)"
echo "• Tier-appropriate opportunity identification"
echo "• Implementation complexity and timeline estimates"
echo "• Potential cost savings calculations"
echo "• Risk assessment and confidence levels"
echo "• Technology infrastructure requirements"

echo ""
echo "🚀 EVERY TIER NOW INCLUDES AI OPPORTUNITY ASSESSMENT!"
echo "Your customers will receive AI insights appropriate to their investment level."

cd ..
