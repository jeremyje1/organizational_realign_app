#!/bin/bash
# Deploy script for NorthPath Strategies
# This script ensures that the application is properly deployed
# to the app.northpathstrategies.org domain

echo "🚀 Starting deployment process for NorthPath Strategies"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing now..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is installed"

# Pull the latest environment variables
echo "📥 Pulling latest environment variables..."
vercel env pull --environment=production

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy the project to production
echo "🚀 Deploying to app.northpathstrategies.org..."
vercel --prod --yes

echo "✅ Deployment complete!"
echo "🌐 Your site should now be live at https://app.northpathstrategies.org"
echo ""
echo "⚠️ Important: Check your DNS settings to ensure that:"
echo "   1. app.northpathstrategies.org points to your Vercel deployment"
echo "   2. northpathstrategies.org redirects to app.northpathstrategies.org"
echo ""
echo "If you encounter any issues, please check the Vercel dashboard"
echo "at https://vercel.com/dashboard"
