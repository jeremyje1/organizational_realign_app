#!/bin/bash

echo "Inspecting Supabase Database Schema..."

# Test database connection and inspect schema
curl -X POST http://localhost:3000/api/database/inspect \
  -H "Content-Type: application/json" \
  -d '{}' \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "Database inspection completed."
