#!/bin/bash

echo "🧪 Testing AI Readiness Assessment System"
echo "=========================================="

BASE_URL="http://localhost:3001"

echo "1. Testing marketing page..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/ai-readiness")
if [ "$response" = "200" ]; then
    echo "✅ Marketing page loads successfully"
else
    echo "❌ Marketing page failed (HTTP $response)"
fi

echo "2. Testing assessment start page..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/ai-readiness/start")
if [ "$response" = "200" ]; then
    echo "✅ Assessment start page loads successfully"
else
    echo "❌ Assessment start page failed (HTTP $response)"
fi

echo "3. Testing tier-specific start page..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/ai-readiness/start?tier=basic")
if [ "$response" = "200" ]; then
    echo "✅ Tier-specific start page loads successfully"
else
    echo "❌ Tier-specific start page failed (HTTP $response)"
fi

echo "4. Testing scoring API..."
response=$(curl -s -X POST "$BASE_URL/api/ai-readiness/score" \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "strategy_1": "developing_strategy",
      "strategy_2": "moderate_support",
      "governance_1": "basic_policies",
      "governance_2": "developing_framework",
      "pedagogy_1": "pilot_programs"
    },
    "tier": "basic"
  }' \
  -w "%{http_code}" \
  -o /tmp/score_response.json)

if [ "$response" = "200" ]; then
    echo "✅ Scoring API responds successfully"
    echo "📊 Sample response:"
    head -5 /tmp/score_response.json | jq . 2>/dev/null || cat /tmp/score_response.json | head -5
else
    echo "❌ Scoring API failed (HTTP $response)"
fi

echo "5. Testing questions endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/ai-readiness/questions")
if [ "$response" = "200" ]; then
    echo "✅ Questions API loads successfully"
else
    echo "❌ Questions API failed (HTTP $response)"
fi

echo ""
echo "🎯 AI Readiness System Test Complete!"
echo "🌐 Visit: $BASE_URL/ai-readiness to start testing manually"
