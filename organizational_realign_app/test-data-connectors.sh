#!/bin/bash

# Test script for data connectors
echo "Testing Data Connectors..."

# Test 1: Check if upload endpoint exists
echo "1. Testing upload endpoint..."
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-positions.csv" \
  -H "Content-Type: multipart/form-data"

echo ""

# Test 2: Check Workday integration endpoint
echo "2. Testing Workday integration endpoint..."
curl -X GET "http://localhost:3000/api/integrations/workday?action=test&apiKey=test-key"

echo ""

# Test 3: Test positions sync
echo "3. Testing Workday positions sync..."
curl -X POST http://localhost:3000/api/integrations/workday \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "test-key", "action": "sync-positions"}'

echo ""
echo "Data connector tests completed!"
