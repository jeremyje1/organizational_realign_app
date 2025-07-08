# Custom Domain Setup: app.northpathstrategies.org

## 🌐 Domain Configuration Guide

This guide provides step-by-step instructions for setting up the custom domain `app.northpathstrategies.org` for the North Path Strategies organizational realignment application.

---

## 📋 Prerequisites

- Access to northpathstrategies.org DNS management
- Vercel project access with deployment permissions
- Domain ownership verification

---

## 🔧 Step 1: DNS Configuration

### 1.1 Add CNAME Record

In your DNS provider (GoDaddy, Cloudflare, etc.), add the following CNAME record:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 300 (or Auto)
```

### 1.2 Verify DNS Propagation

Check DNS propagation using online tools:
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

Expected result:
```
app.northpathstrategies.org → cname.vercel-dns.com
```

---

## 🚀 Step 2: Vercel Domain Configuration

### 2.1 Add Domain to Project

1. Open Vercel Dashboard
2. Navigate to your project
3. Go to **Settings** → **Domains**
4. Click **Add** and enter: `app.northpathstrategies.org`
5. Click **Add Domain**

### 2.2 Verify Domain Status

Wait for Vercel to verify the domain. Status should show:
- ✅ **Valid Configuration**
- 🔒 **SSL Certificate: Active**

---

## 🔒 Step 3: SSL Certificate

### 3.1 Automatic Provisioning

Vercel automatically provisions SSL certificates via Let's Encrypt. This process typically takes 5-15 minutes.

### 3.2 Verify SSL Status

Check SSL certificate status:
```bash
# Command line verification
openssl s_client -connect app.northpathstrategies.org:443 -servername app.northpathstrategies.org

# Browser verification  
https://app.northpathstrategies.org
```

---

## ⚙️ Step 4: Environment Variables Update

### 4.1 Production Environment Variables

Update the following environment variables in Vercel:

```env
# Domain Configuration
NEXT_PUBLIC_DOMAIN=northpathstrategies.org
NEXT_PUBLIC_APP_URL=https://app.northpathstrategies.org
NEXT_PUBLIC_BASE_URL=https://app.northpathstrategies.org

# Auth0 Configuration
AUTH0_BASE_URL=https://app.northpathstrategies.org
AUTH0_ISSUER_BASE_URL=https://[your-tenant].us.auth0.com

# Stripe Configuration (update webhook endpoints)
STRIPE_WEBHOOK_SECRET=[new-webhook-secret-for-custom-domain]
```

### 4.2 Update External Services

**Auth0 Configuration:**
1. Login to Auth0 Dashboard
2. Navigate to Applications → [Your App]
3. Update Allowed Callback URLs:
   ```
   https://app.northpathstrategies.org/api/auth/callback
   ```
4. Update Allowed Logout URLs:
   ```
   https://app.northpathstrategies.org
   ```

**Stripe Webhook Configuration:**
1. Login to Stripe Dashboard
2. Navigate to Developers → Webhooks
3. Update webhook endpoint URL:
   ```
   https://app.northpathstrategies.org/api/payments/webhook
   ```
4. Update webhook secret in environment variables

---

## 🔄 Step 5: Deployment and Testing

### 5.1 Trigger New Deployment

1. Make a small change to trigger deployment, or
2. Use Vercel CLI:
   ```bash
   vercel --prod
   ```

### 5.2 Comprehensive Testing

**Basic Functionality:**
- [ ] Homepage loads correctly
- [ ] Navigation works properly
- [ ] SSL certificate is active
- [ ] No mixed content warnings

**Application Features:**
- [ ] User authentication flow
- [ ] Assessment functionality
- [ ] Payment processing
- [ ] Email notifications
- [ ] API endpoints responding

**Performance Testing:**
- [ ] Page load speed < 3 seconds
- [ ] Core Web Vitals pass
- [ ] Mobile responsiveness

---

## 📊 Step 6: Monitoring & Analytics

### 6.1 Setup Monitoring

**Google Analytics:**
```javascript
// Update GA4 configuration
gtag('config', 'G-XXXXXXXXXX', {
  page_title: 'North Path Strategies',
  page_location: 'https://app.northpathstrategies.org'
});
```

**Vercel Analytics:**
- Automatically enabled for custom domains
- Access via Vercel Dashboard → Analytics

### 6.2 Performance Monitoring

**Core Web Vitals Tracking:**
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms  
- Cumulative Layout Shift (CLS) < 0.1

---

## 🚨 Troubleshooting

### Common Issues

**Domain Not Resolving:**
- Check DNS propagation (can take up to 48 hours)
- Verify CNAME record is correct
- Clear DNS cache: `sudo dscacheutil -flushcache`

**SSL Certificate Issues:**
- Wait for automatic provisioning (up to 24 hours)
- Check domain ownership verification
- Contact Vercel support if issues persist

**Redirect Issues:**
- Verify environment variables are updated
- Check Auth0 callback URLs
- Clear browser cache and cookies

### Health Check Commands

```bash
# DNS Resolution
nslookup app.northpathstrategies.org

# SSL Certificate Check
openssl s_client -connect app.northpathstrategies.org:443

# HTTP Response Check
curl -I https://app.northpathstrategies.org

# Performance Test
curl -w "%{time_total}\n" -o /dev/null -s https://app.northpathstrategies.org
```

---

## ✅ Verification Checklist

### Pre-Launch
- [ ] DNS CNAME record configured
- [ ] Vercel domain added and verified
- [ ] SSL certificate active
- [ ] Environment variables updated
- [ ] Auth0 callback URLs updated
- [ ] Stripe webhook URLs updated

### Post-Launch
- [ ] Homepage accessible via custom domain
- [ ] Authentication flow working
- [ ] Payment processing functional
- [ ] Email notifications sending
- [ ] Analytics tracking active
- [ ] Performance metrics within targets

### Ongoing Monitoring
- [ ] SSL certificate auto-renewal working
- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] Backup and recovery procedures documented

---

## 📞 Support Resources

### Technical Support
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **DNS Issues**: Contact your DNS provider
- **SSL Issues**: Vercel handles Let's Encrypt integration

### Documentation
- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Auth0 Custom Domains](https://auth0.com/docs/custom-domains)

---

## 🎯 Success Metrics

### Technical KPIs
- **Uptime**: 99.9% availability
- **Performance**: <3s page load time
- **Security**: A+ SSL rating
- **SEO**: Core Web Vitals passing

### Business Impact
- **Professional Branding**: Custom domain enhances credibility
- **SEO Benefits**: Better search engine rankings
- **User Trust**: SSL certificate and professional URL
- **Marketing**: Easier to remember and share

---

*Custom Domain Setup Complete* ✅  
*Domain: https://app.northpathstrategies.org*  
*Last Updated: July 2, 2025*
