# Production Environment Configuration Guide

## 🚀 Production Environment Setup for NorthPath Strategies

This guide outlines the production environment configuration needed for the organizational realignment application.

---

## 📋 Required Environment Variables

### 1. **Core Application Settings**
```env
# Domain Configuration
NEXT_PUBLIC_DOMAIN=northpathstrategies.org
NEXT_PUBLIC_APP_URL=https://app.northpathstrategies.org
NEXT_PUBLIC_BASE_URL=https://app.northpathstrategies.org

# Build Configuration
NODE_ENV=production
NEXT_PUBLIC_VERCEL_URL=app.northpathstrategies.org
```

### 2. **Database Configuration**
```env
# Supabase Database (Primary)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[SUPABASE-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[SUPABASE-SERVICE-KEY]
```

### 3. **Payment Processing (Stripe)**
```env
# Stripe Production Keys
STRIPE_SECRET_KEY=sk_live_[STRIPE-SECRET-KEY]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[STRIPE-PUBLISHABLE-KEY]
STRIPE_WEBHOOK_SECRET=whsec_[WEBHOOK-ENDPOINT-SECRET]

# Stripe Price IDs (Created in Stripe Dashboard)
STRIPE_BASIC_PRICE_ID=price_[BASIC-PRICE-ID]
STRIPE_TEAM_PRICE_ID=price_[TEAM-PRICE-ID]
STRIPE_ENTERPRISE_PRICE_ID=price_[ENTERPRISE-PRICE-ID]
```

### 4. **AI Analysis (OpenAI)**
```env
# OpenAI API
OPENAI_API_KEY=sk-[OPENAI-API-KEY]
OPENAI_ORG_ID=[OPENAI-ORGANIZATION-ID]
```

### 5. **Authentication (Auth0)**
```env
# Auth0 Configuration
AUTH0_SECRET=[RANDOM-SECRET-STRING]
AUTH0_BASE_URL=https://app.northpathstrategies.org
AUTH0_ISSUER_BASE_URL=https://[TENANT].us.auth0.com
AUTH0_CLIENT_ID=[AUTH0-CLIENT-ID]
AUTH0_CLIENT_SECRET=[AUTH0-CLIENT-SECRET]
```

### 6. **Email Services**
```env
# Email Configuration (Resend/SendGrid)
RESEND_API_KEY=re_[RESEND-API-KEY]
FROM_EMAIL=noreply@northpathstrategies.org
SUPPORT_EMAIL=support@northpathstrategies.org
```

### 7. **Analytics & Monitoring**
```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-[GA-MEASUREMENT-ID]

# Sentry Error Tracking
SENTRY_DSN=https://[SENTRY-DSN]
NEXT_PUBLIC_SENTRY_DSN=https://[SENTRY-DSN]
```

---

## 🔧 Setup Instructions

### Step 1: Vercel Project Configuration

1. **Access Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your NorthPath Strategies project

2. **Configure Environment Variables**
   - Navigate to **Settings** → **Environment Variables**
   - Add each variable listed above
   - Set for **Production** environment

### Step 2: Stripe Production Setup

1. **Enable Production Mode**
   - Switch Stripe dashboard to "Live mode"
   - Get live API keys from **Developers** → **API keys**

2. **Create Products & Prices**
   ```bash
   # Basic Assessment - $299
   # Team Assessment - $499  
   # Enterprise Assessment - $1,999
   ```

3. **Configure Webhooks**
   - Create webhook endpoint: `https://app.northpathstrategies.org/api/payments/webhook`
   - Subscribe to events: `checkout.session.completed`, `payment_intent.succeeded`

### Step 3: Database Production Configuration

1. **Supabase Production**
   - Upgrade to Supabase Pro plan
   - Configure production database
   - Enable Row Level Security (RLS)
   - Set up backup schedules

2. **Run Production Migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

### Step 4: Custom Domain Setup

1. **DNS Configuration**
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```

2. **SSL Certificate**
   - Vercel auto-provisions SSL certificates
   - Verify certificate status in dashboard

### Step 5: Auth0 Production Setup

1. **Create Production Application**
   - Application type: Regular Web Application
   - Allowed Callback URLs: `https://app.northpathstrategies.org/api/auth/callback`
   - Allowed Logout URLs: `https://app.northpathstrategies.org`

2. **Configure Domain**
   - Set custom domain: `auth.northpathstrategies.org`
   - Enable Universal Login

---

## 📊 Monitoring & Analytics

### Performance Monitoring
- **Vercel Analytics**: Enabled by default
- **Core Web Vitals**: Tracked in Vercel dashboard
- **Error Tracking**: Sentry integration

### Business Metrics
- **Payment Success Rate**: Stripe dashboard
- **User Conversion**: GA4 custom events
- **Assessment Completion**: Custom analytics endpoint

---

## 🔒 Security Configuration

### Security Headers (Already Configured)
```javascript
// next.config.js headers
'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'SAMEORIGIN'
'X-XSS-Protection': '1; mode=block'
```

### Data Protection
- **Encryption**: All data encrypted in transit (TLS 1.3) and at rest
- **GDPR Compliance**: Privacy policy and data handling procedures
- **Audit Logging**: All user actions logged for compliance

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Stripe webhooks tested
- [ ] Database migrations applied
- [ ] DNS records configured
- [ ] SSL certificates active

### Post-Deployment
- [ ] Payment flow tested end-to-end
- [ ] Email notifications working
- [ ] Analytics tracking verified
- [ ] Assessment completion tested
- [ ] AI analysis generation confirmed

### Monitoring Setup
- [ ] Vercel deployment notifications enabled
- [ ] Stripe webhook monitoring active
- [ ] Error tracking alerts configured
- [ ] Performance monitoring baseline established

---

## 📞 Support & Maintenance

### Emergency Contacts
- **Technical Issues**: Vercel Support
- **Payment Issues**: Stripe Support  
- **Database Issues**: Supabase Support

### Regular Maintenance
- **Weekly**: Review error logs and performance metrics
- **Monthly**: Analyze payment success rates and user feedback
- **Quarterly**: Security audit and dependency updates

---

## 🎯 Success Metrics

### Technical KPIs
- **Uptime**: >99.9%
- **Page Load Speed**: <2 seconds
- **Payment Success Rate**: >95%
- **Error Rate**: <1%

### Business KPIs
- **Assessment Completion Rate**: Target >80%
- **Premium Conversion Rate**: Target >15%
- **Customer Satisfaction**: Target >4.5/5

---

*Last Updated: July 2, 2025*
*Production Environment: app.northpathstrategies.org*
