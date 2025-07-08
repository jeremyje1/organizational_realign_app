# Get Started Button Fix - Vercel Environment Variables Setup ⚡

## 🚨 **Issue Identified**

The "Get Started" buttons on the pricing page are not working because the required Stripe environment variables are missing from your Vercel deployment.

## 🔧 **Required Stripe Price IDs**

Your payment system uses these specific Stripe Price IDs:

```bash
# Current NorthPath Stripe Price IDs
STRIPE_SINGLE_USE_PRICE_ID="price_1Rhdf0ELd2WOuqIWwagqCdLa"
STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID="price_1RhdgNELd2WOuqIW9HDyggY3"  
STRIPE_COMPREHENSIVE_PRICE_ID="price_1RgUduELd2WOuqIWFHobukeZ"
STRIPE_ENTERPRISE_PRICE_ID="price_1RgUb8ELd2WOuqIWMxA0mLwz"
```

## 🚀 **Quick Fix - Option 1: Use Setup Script**

### **Step 1: Run the Setup Script**
```bash
cd /Users/jeremyestrella/Downloads/organizational_realign_app_specs/organizational_realign_app
./setup-vercel-env.sh
```

### **Step 2: Add Your Stripe Keys**
The script will prompt you to add these manually:
```bash
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 'pk_live_or_test_key_here' production
vercel env add STRIPE_SECRET_KEY 'sk_live_or_test_key_here' production  
vercel env add STRIPE_WEBHOOK_SECRET 'whsec_webhook_secret_here' production
```

## 🔧 **Manual Fix - Option 2: Set Environment Variables Directly**

### **Step 1: Install Vercel CLI (if not installed)**
```bash
npm install -g vercel
```

### **Step 2: Login to Vercel**
```bash
vercel login
```

### **Step 3: Set Required Environment Variables**

#### **Core Stripe Configuration**
```bash
# Add your actual Stripe keys
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
```

#### **Stripe Price IDs (Pre-configured)**
```bash
vercel env add STRIPE_SINGLE_USE_PRICE_ID "price_1Rhdf0ELd2WOuqIWwagqCdLa" production
vercel env add STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID "price_1RhdgNELd2WOuqIW9HDyggY3" production
vercel env add STRIPE_COMPREHENSIVE_PRICE_ID "price_1RgUduELd2WOuqIWFHobukeZ" production
vercel env add STRIPE_ENTERPRISE_PRICE_ID "price_1RgUb8ELd2WOuqIWMxA0mLwz" production
```

#### **Application URLs**
```bash
vercel env add NEXT_PUBLIC_BASE_URL "https://app.northpathstrategies.org" production
vercel env add NEXT_PUBLIC_API_URL "https://app.northpathstrategies.org" production
```

### **Step 4: Redeploy the Application**
```bash
vercel --prod
```

## 📋 **Where to Get Your Stripe Keys**

### **1. Stripe Dashboard**
- Visit: https://dashboard.stripe.com/apikeys
- **Publishable Key**: Starts with `pk_test_` or `pk_live_`
- **Secret Key**: Starts with `sk_test_` or `sk_live_`

### **2. Stripe Webhook Secret**
- Visit: https://dashboard.stripe.com/webhooks
- Create webhook endpoint: `https://app.northpathstrategies.org/api/payments/webhook`
- Copy the webhook secret (starts with `whsec_`)

## 🎯 **Testing the Fix**

### **After Setting Environment Variables:**

1. **Redeploy**: `vercel --prod`
2. **Visit**: https://app.northpathstrategies.org/pricing
3. **Test**: Click any "Get Started" button
4. **Expected**: Stripe checkout modal should open
5. **Verify**: Payment flow works correctly

## 🔍 **How the Payment Flow Works**

### **Current Implementation:**
1. **User clicks** "Get Started" button
2. **QuickCheckout component** opens modal
3. **User enters** name and email
4. **API call** to `/api/payments/create-session`
5. **Stripe session** created with price ID
6. **User redirected** to Stripe checkout
7. **Payment processed** securely by Stripe

### **Required Environment Variables:**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side Stripe initialization
- `STRIPE_SECRET_KEY` - Server-side Stripe API calls
- `STRIPE_WEBHOOK_SECRET` - Webhook signature verification
- `NEXT_PUBLIC_BASE_URL` - Success/cancel URL generation

## 🚨 **Common Issues & Solutions**

### **Issue 1: Buttons Still Not Working**
**Solution**: Check browser console for JavaScript errors
```bash
# Verify environment variables are set
vercel env ls
```

### **Issue 2: Stripe Checkout Fails**
**Solution**: Ensure webhook endpoint is configured
- URL: `https://app.northpathstrategies.org/api/payments/webhook`
- Events: `checkout.session.completed`, `payment_intent.succeeded`

### **Issue 3: Wrong Environment**
**Solution**: Ensure variables are set for production
```bash
vercel env add VARIABLE_NAME "value" production --force
```

## 📊 **Verification Checklist**

- [ ] ✅ Vercel CLI installed and logged in
- [ ] ✅ Stripe publishable key added to Vercel
- [ ] ✅ Stripe secret key added to Vercel  
- [ ] ✅ Stripe webhook secret added to Vercel
- [ ] ✅ All 4 price IDs configured in Vercel
- [ ] ✅ Base URL set to production domain
- [ ] ✅ Application redeployed to Vercel
- [ ] ✅ Pricing page "Get Started" buttons tested
- [ ] ✅ Stripe checkout flow working end-to-end

## 🎉 **Expected Result**

After completing these steps:
- ✅ "Get Started" buttons will open the payment modal
- ✅ Users can enter their information
- ✅ Stripe checkout will process payments correctly
- ✅ Success/failure flows will work as expected

## 💡 **Pro Tips**

1. **Use Test Mode First**: Set up with `pk_test_` and `sk_test_` keys initially
2. **Test Thoroughly**: Complete a test purchase before going live
3. **Monitor Webhooks**: Check Stripe dashboard for webhook delivery status
4. **Check Logs**: Use `vercel logs` to debug any remaining issues

Run the setup script or follow the manual steps above to fix the "Get Started" button functionality!
