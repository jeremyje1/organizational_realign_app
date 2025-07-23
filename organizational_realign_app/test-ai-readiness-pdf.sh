#!/bin/bash

# Test AI Readiness PDF Report Generation
# This script tests the isolated AI readiness tool's PDF generation

echo "🧪 Testing AI Readiness PDF Report Generation..."
echo "================================================"

# Test data for AI readiness assessment
TEST_DATA='{
  "results": {
    "scores": {
      "overall": 3.2,
      "domains": {
        "strategy": {
          "score": 3.5,
          "maxScore": 60,
          "percentage": 70,
          "maturityLevel": "Defined",
          "questions": 12
        },
        "governance": {
          "score": 2.8,
          "maxScore": 55,
          "percentage": 56,
          "maturityLevel": "Developing",
          "questions": 11
        },
        "pedagogy": {
          "score": 3.1,
          "maxScore": 65,
          "percentage": 62,
          "maturityLevel": "Defined",
          "questions": 13
        },
        "technology": {
          "score": 3.4,
          "maxScore": 55,
          "percentage": 68,
          "maturityLevel": "Defined",
          "questions": 11
        },
        "culture": {
          "score": 2.9,
          "maxScore": 35,
          "percentage": 58,
          "maturityLevel": "Developing",
          "questions": 7
        },
        "team_dynamics": {
          "score": 3.0,
          "maxScore": 30,
          "percentage": 60,
          "maturityLevel": "Defined",
          "questions": 6
        }
      }
    },
    "recommendations": [
      {
        "domain": "governance",
        "priority": "high",
        "title": "Develop comprehensive AI governance framework",
        "description": "Establish formal policies and procedures for AI use",
        "actions": ["Create AI governance committee", "Draft AI ethics policy"],
        "timeline": "3-6 months",
        "resources": ["Legal counsel", "IT leadership", "Faculty representatives"]
      },
      {
        "domain": "technology",
        "priority": "high",
        "title": "Enhance AI infrastructure capabilities",
        "description": "Upgrade technology infrastructure to support AI initiatives",
        "actions": ["Assess current infrastructure", "Plan cloud migration"],
        "timeline": "6-12 months",
        "resources": ["IT budget", "Cloud services", "Technical expertise"]
      },
      {
        "domain": "culture",
        "priority": "medium",
        "title": "Build AI-ready organizational culture",
        "description": "Foster enthusiasm and readiness for AI adoption",
        "actions": ["Faculty development programs", "Change management"],
        "timeline": "12-18 months",
        "resources": ["Training budget", "Change management expertise"]
      }
    ],
    "maturityProfile": {
      "overall": {
        "level": 3,
        "name": "Defined",
        "description": "Structured approach with documented processes and support"
      },
      "domains": {
        "strategy": {
          "level": 3,
          "name": "Defined",
          "description": "Structured approach with documented processes and support"
        },
        "governance": {
          "level": 2,
          "name": "Developing",
          "description": "Growing awareness with some planning and pilot efforts"
        },
        "pedagogy": {
          "level": 3,
          "name": "Defined",
          "description": "Structured approach with documented processes and support"
        },
        "technology": {
          "level": 3,
          "name": "Defined",
          "description": "Structured approach with documented processes and support"
        },
        "culture": {
          "level": 2,
          "name": "Developing",
          "description": "Growing awareness with some planning and pilot efforts"
        },
        "team_dynamics": {
          "level": 3,
          "name": "Defined",
          "description": "Structured approach with documented processes and support"
        }
      }
    },
    "institutionName": "State University Test",
    "isTeamAssessment": false,
    "openEndedResponses": {
      "strategy_3": ["We are developing a comprehensive AI strategy aligned with our 2025 strategic plan"],
      "governance_3": ["We need better transparency in AI decision-making processes"]
    }
  },
  "institutionInfo": {
    "name": "State University Test",
    "type": "Public Research University",
    "size": "15,000 students",
    "location": "Test State, USA"
  },
  "tier": "basic"
}'

echo "📋 Testing with sample AI readiness data..."
echo "Institution: State University Test"
echo "Tier: Basic (Self-Service)"
echo "Overall Score: 3.2/5.0"
echo ""

# Test the API endpoint
echo "🔄 Calling AI readiness report API..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/ai-readiness/report \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA")

# Check if the request was successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ AI readiness report API responded successfully"
  
  # Extract key information from response
  INSTITUTION=$(echo "$RESPONSE" | grep -o '"institutionName":"[^"]*"' | cut -d'"' -f4)
  TIER=$(echo "$RESPONSE" | grep -o '"tier":"[^"]*"' | cut -d'"' -f4)
  OVERALL_SCORE=$(echo "$RESPONSE" | grep -o '"overallScore":[0-9.]*' | cut -d':' -f2)
  MATURITY_LEVEL=$(echo "$RESPONSE" | grep -o '"maturityLevel":"[^"]*"' | cut -d'"' -f4)
  
  echo "📊 Report Generated:"
  echo "   Institution: $INSTITUTION"
  echo "   Tier: $TIER"
  echo "   Overall Score: $OVERALL_SCORE/5.0"
  echo "   Maturity Level: $MATURITY_LEVEL"
  
  # Check if PDF data is included
  if echo "$RESPONSE" | grep -q '"pdfData":"data:application/pdf'; then
    echo "✅ PDF data included in response"
    echo "📄 AI readiness PDF report generation: SUCCESS"
  else
    echo "❌ No PDF data found in response"
    echo "📄 AI readiness PDF report generation: FAILED"
  fi
  
else
  echo "❌ AI readiness report API failed"
  echo "Response: $RESPONSE"
  echo "📄 AI readiness PDF report generation: FAILED"
fi

echo ""
echo "================================================"
echo "🏁 AI Readiness PDF Test Complete"
echo "   Tool: AI Readiness Assessment (Isolated)"
echo "   PDF Generator: ai-readiness-pdf-generator.ts"
echo "   Tier System: Basic/Custom (2 tiers only)"
echo "   Completely separate from realignment tool"
echo "================================================"
