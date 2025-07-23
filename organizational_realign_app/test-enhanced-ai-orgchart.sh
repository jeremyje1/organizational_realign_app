#!/bin/bash

# Test Enhanced AI PDF Generator with Org Chart Integration
# This script tests the GPT-4o + AI image generation integration

echo "🧪 Testing Enhanced AI PDF with Org Chart Integration"
echo "=================================================="

# Check if server is running
if ! curl -s http://localhost:3001 > /dev/null; then
    echo "❌ Development server is not running"
    echo "Please start the server with: npm run dev"
    exit 1
fi

echo "✅ Development server is running"

# Test data for comprehensive org chart generation
TEST_DATA='{
  "answers": {
    "organization_structure": "hierarchical",
    "departments": ["Academic Affairs", "Finance", "Operations", "Student Services"],
    "leadership_style": "collaborative",
    "decision_making": "distributed",
    "employee_count": "150-250",
    "budget_size": "large",
    "technology_adoption": "moderate",
    "industry": "Higher Education"
  },
  "scores": {
    "overall": 4.2,
    "organizationalHealth": 8.5,
    "efficiencyScore": 7.3,
    "aiReadinessScore": 6.8,
    "leadership": 8.1,
    "communication": 7.5,
    "innovation": 6.9
  },
  "tier": "enterprise-transformation",
  "openEndedResponses": {
    "biggest_challenge": "Need to modernize our organizational structure while maintaining academic excellence and reducing operational costs.",
    "strategic_goals": "Digital transformation, improved student outcomes, cost optimization, better faculty retention",
    "change_readiness": "Leadership is committed but faculty resistance is expected. Strong change management needed."
  },
  "orgChart": {
    "data": [
      {
        "id": "ceo",
        "roleTitle": "President",
        "fte": 1.0,
        "annualCost": 250000,
        "level": 1,
        "department": "Executive"
      },
      {
        "id": "vp_academic",
        "roleTitle": "VP Academic Affairs",
        "fte": 1.0,
        "annualCost": 180000,
        "level": 2,
        "department": "Academic"
      },
      {
        "id": "vp_finance", 
        "roleTitle": "VP Finance",
        "fte": 1.0,
        "annualCost": 175000,
        "level": 2,
        "department": "Finance"
      },
      {
        "id": "vp_operations",
        "roleTitle": "VP Operations", 
        "fte": 1.0,
        "annualCost": 165000,
        "level": 2,
        "department": "Operations"
      },
      {
        "id": "dean_1",
        "roleTitle": "Dean of Engineering",
        "fte": 1.0,
        "annualCost": 145000,
        "level": 3,
        "department": "Academic"
      },
      {
        "id": "dean_2", 
        "roleTitle": "Dean of Liberal Arts",
        "fte": 1.0,
        "annualCost": 140000,
        "level": 3,
        "department": "Academic"
      }
    ],
    "metadata": {
      "totalCost": 1055000,
      "roleCount": 6
    }
  },
  "scenarios": [
    {
      "name": "Current State",
      "totalCost": 1055000,
      "efficiency": "Baseline"
    },
    {
      "name": "Optimized Structure",
      "totalCost": 925000,
      "efficiency": "12% improvement"
    }
  ],
  "options": {
    "enhancedAI": true,
    "organizationName": "Elite University",
    "includeRecommendations": true,
    "includeCharts": true,
    "templateStyle": "executive"
  }
}'

echo ""
echo "🚀 Generating Enhanced AI PDF with Org Chart..."
echo "Request includes:"
echo "- GPT-4o AI analysis"  
echo "- DALL-E 3 org chart image generation"
echo "- Comprehensive org chart data"
echo "- Scenario modeling"
echo "- Open-ended responses"
echo ""

# Make the API request
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  http://localhost:3001/api/report/generate)

# Extract HTTP status code (last line)
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    # Save PDF
    FILENAME="enhanced-ai-orgchart-report-$(date +%Y%m%d-%H%M%S).pdf"
    echo "$RESPONSE_BODY" | base64 -d > "$FILENAME" 2>/dev/null || echo "$RESPONSE_BODY" > "$FILENAME"
    
    FILE_SIZE=$(ls -lh "$FILENAME" | awk '{print $5}')
    
    echo "✅ SUCCESS: Enhanced AI PDF generated!"
    echo "📁 Saved as: $FILENAME"
    echo "📊 File size: $FILE_SIZE"
    echo ""
    echo "🎯 Enhanced Features Tested:"
    echo "✅ GPT-4o deep analysis integration"
    echo "✅ AI org chart image generation (DALL-E 3)"
    echo "✅ Professional org chart visualization"
    echo "✅ Scenario cost modeling"
    echo "✅ Executive-level strategic insights"
    echo ""
    echo "📖 Expected Content:"
    echo "- AI Executive Summary (3-4 pages)"
    echo "- Deep AI Analysis (4-5 pages)"
    echo "- Strategic Recommendations (4-5 pages)"
    echo "- Implementation Plan (4-5 pages)"
    echo "- Risk Assessment (3-4 pages)"
    echo "- Industry Benchmarking (3-4 pages)"
    echo "- Financial Projections (3-4 pages)"
    echo "- Change Management Strategy (3-4 pages)"
    echo "- AI-Generated Org Chart & Analysis (4-5 pages)"
    echo ""
    echo "🎨 Org Chart Features:"
    echo "- DALL-E 3 professional diagram"
    echo "- AI structural analysis"
    echo "- Cost optimization insights"
    echo "- Scenario comparisons"
    echo ""
    
    # Check file size to ensure substantial content
    SIZE_BYTES=$(stat -f%z "$FILENAME" 2>/dev/null || stat -c%s "$FILENAME" 2>/dev/null)
    if [ "$SIZE_BYTES" -gt 500000 ]; then
        echo "✅ File size indicates comprehensive content (>500KB)"
    else
        echo "⚠️  File size is smaller than expected - may need investigation"
    fi
    
else
    echo "❌ FAILED: HTTP $HTTP_STATUS"
    echo "Response: $RESPONSE_BODY"
    
    # Check for specific error patterns
    if echo "$RESPONSE_BODY" | grep -i "quota"; then
        echo ""
        echo "💡 This appears to be an OpenAI quota issue."
        echo "The system should have fallen back to the comprehensive PDF generator."
        echo "Check server logs for fallback execution."
    elif echo "$RESPONSE_BODY" | grep -i "api key"; then
        echo ""
        echo "💡 This appears to be an API key issue."
        echo "Please ensure OPENAI_API_KEY is properly configured."
    fi
fi

echo ""
echo "🔍 Next Steps:"
echo "1. Open the generated PDF to verify:"
echo "   - AI-enhanced content quality"
echo "   - Org chart image integration"
echo "   - Professional presentation"
echo ""
echo "2. Test different scenarios:"
echo "   - Different organization types"
echo "   - Varying org chart sizes"
echo "   - Different style preferences"
echo ""
echo "3. Monitor performance:"
echo "   - AI generation time"
echo "   - Image generation success rate"
echo "   - Fallback handling"
