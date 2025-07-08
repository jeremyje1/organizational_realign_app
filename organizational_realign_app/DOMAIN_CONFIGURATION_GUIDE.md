# Domain Configuration and Deployment Guide

## Current Status - UPDATED

- ✅ Website is now configured to serve from: https://northpathstrategies.org (primary domain)
- ✅ Assessment and app features redirect to: https://app.northpathstrategies.org
- ⚠️  Note: There may be a DNS-level redirect from northpathstrategies.org to www.northpathstrategies.org

## Domain Architecture

The application now uses a hybrid approach:

1. **northpathstrategies.org** - Main marketing website with services, about, contact, pricing, etc.
2. **app.northpathstrategies.org** - Assessment platform for the interactive tools

### Automatic Redirects

The middleware automatically redirects these paths to the app subdomain:
- `/assessment/start` → https://app.northpathstrategies.org/assessment/start
- `/assessment/results` → https://app.northpathstrategies.org/assessment/results  
- `/dashboard` → https://app.northpathstrategies.org/dashboard
- `/survey` → https://app.northpathstrategies.org/survey
- `/secure/*` → https://app.northpathstrategies.org/secure/*
- `/workspaces` → https://app.northpathstrategies.org/workspaces
- `/teams` → https://app.northpathstrategies.org/teams

## Domain Configuration

The application is configured to use **northpathstrategies.org** as the primary domain for marketing content. The following changes have been made:

1. Updated `vercel.json` to use northpathstrategies.org as the primary domain
2. Updated all internal references to use northpathstrategies.org
3. Added middleware to handle app-specific feature redirects to app.northpathstrategies.org
4. Ensured SEO and structured data uses the correct primary domain

## DNS Configuration

To ensure proper domain routing, please make sure your DNS configuration includes:

1. A record or CNAME for northpathstrategies.org pointing to your Vercel deployment
2. CNAME record for app.northpathstrategies.org:
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   TTL: 300 seconds (or Auto)
   ```

## Vercel Project Configuration

In your Vercel dashboard, make sure both domains are added to the same project:
- northpathstrategies.org (primary)
- app.northpathstrategies.org (for assessment features)

## Deployment Instructions

To deploy the application:

1. Make sure you have the Vercel CLI installed:
   ```
   npm install -g vercel
   ```

2. Use the deployment script:
   ```
   ./deploy.sh
   ```

3. Alternatively, deploy manually:
   ```
   vercel --prod
   ```

4. After deployment, verify that:
   - https://northpathstrategies.org shows your marketing website
   - Assessment features properly redirect to app.northpathstrategies.org

## Troubleshooting

If the website is not updated after deployment:

1. Check the Vercel dashboard for deployment errors
2. Verify DNS configuration in your domain registrar
3. Clear your browser cache to ensure you're seeing the latest version
4. Verify that both domains are linked to the correct project in Vercel
5. If you see redirects to www.northpathstrategies.org, check your domain registrar's redirect settings
