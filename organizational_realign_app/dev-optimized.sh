#!/bin/bash

echo "🚀 Optimized Development Server Startup"
echo "======================================"

# Clear Next.js cache for clean start
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Clear node_modules cache if needed
if [ "$1" == "--fresh" ]; then
    echo "🔥 Fresh install mode - clearing node_modules..."
    rm -rf node_modules
    npm install
fi

# Set memory optimization environment variables
export NODE_OPTIONS="--max-old-space-size=4096 --no-warnings"

# Start with optimized settings
echo "⚡ Starting development server with performance optimizations..."
npm run dev
