#!/bin/bash

echo "Testing Enhanced Question Bank Integration..."

# Test the assessment endpoint with mixed question types
curl -X POST http://localhost:3000/api/assessment/submit \
  -H "Content-Type: application/json" \
  -d '{
    "tier": "one-time-diagnostic",
    "organizationType": "higher-education",
    "institutionName": "Test University",
    "contactEmail": "test@university.edu",
    "contactName": "Test Administrator",
    "responses": {
      "leadership_vision_likert": 4,
      "leadership_vision_text": "Our vision focuses on student success and innovation in learning.",
      "leadership_vision_numeric": 85,
      "communication_effectiveness_likert": 3,
      "communication_effectiveness_text": "We use multiple channels but struggle with consistency.",
      "organizational_structure_clarity_likert": 2,
      "organizational_structure_clarity_text": "Roles and responsibilities need clarification.",
      "resource_allocation_efficiency_numeric": 65,
      "financial_stability_numeric": 78,
      "infrastructure_capacity_likert": 4,
      "infrastructure_capacity_text": "Recent upgrades have improved our capabilities."
    },
    "uploadedFiles": []
  }' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "Test completed."
