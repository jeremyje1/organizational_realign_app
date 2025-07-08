'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PagesBackground } from '@/components/ui/pages-background';

const plans = [
  {
    id: 'single_use',
    name: 'Single Use Assessment',
    price: '$899',
    originalPrice: '',
    description: 'One-time organizational analysis',
    popular: false,
    features: [
      'AI-enhanced Assessment Tool access',
      'One complete assessment customized for your institution',
      'AI-generated organizational analysis report',
      'Actionable recommendations on role alignment',
      'Single-use access only'
    ],
    savings: ''
  },
  {
    id: 'monthly_subscription',
    name: 'Monthly Subscription',
    price: '$899',
    originalPrice: '',
    description: 'Unlimited ongoing assessments',
    popular: true,
    features: [
      'Unlimited access during active subscription',
      'Multiple assessments across teams/departments',
      'AI-generated report for each submission',
      'Full data export/download option',
      'Monthly progress reassessment capability'
    ],
    savings: '/month (cancel anytime)'
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Analysis & Strategy',
    price: '$3,999',
    originalPrice: '',
    description: 'Expert analysis + consulting support',
    popular: false,
    features: [
      'Unlimited tool access for 30 days',
      'Deep-dive review by NorthPath consultants',
      '1:1 virtual consulting session',
      'Executive-ready summary report with visuals',
      'Institutional benchmarking data'
    ],
    savings: ''
  },
  {
    id: 'enterprise',
    name: 'Enterprise Transformation',
    price: '$8,999+',
    originalPrice: '',
    description: 'Complete transformation package',
    popular: false,
    features: [
      'System-wide access to NorthPath platform',
      'Multi-campus/division data collection support',
      'Dedicated consultant for strategy & coaching',
      'Change management playbook',
      'Executive presentations & follow-up sessions'
    ],
    savings: '60-90 day engagement'
  }
];

export default function CheckoutPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleCheckout = async (planId: string) => {
    setLoading(planId);
    
    if (!email || !name) {
      alert('Please fill in your name and email address before proceeding to checkout.');
      setLoading(null);
      return;
    }

    try {
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId: 'new',
          plan: planId,
          customerEmail: email,
          customerName: name,
          source: 'checkout-page'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please check your information and try again. If the problem persists, please contact support.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <PagesBackground>
      <div className="min-h-screen">
        {/* Header */}
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-white font-bold text-xl">
              NorthPath Strategies
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get Started with NorthPath
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enter your information below and select the package that best fits your organizational needs
          </p>
        </div>

        {/* Customer Information Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@organization.com"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Plans Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Choose Your Package
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-2xl border transition-all hover:scale-105 ${
                  plan.popular
                    ? 'border-purple-500 bg-gradient-to-b from-purple-900/50 to-slate-900/50 backdrop-blur-sm'
                    : 'border-white/20 bg-white/10 backdrop-blur-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">{plan.originalPrice}</span>
                    )}
                  </div>
                  {plan.savings && (
                    <div className="text-blue-400 text-sm font-medium">{plan.savings}</div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loading === plan.id || !name || !email}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  } text-white font-semibold py-3 min-h-[50px] transition-all duration-200`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Redirecting to secure checkout...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Select This Plan</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-300 mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Secure Stripe Processing</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span>Reports Stored Securely</span>
              <span className="hidden md:inline">•</span>
              <span>Cancel Subscriptions Anytime</span>
            </div>
            <p className="text-xs text-gray-400">
              All payments securely processed via Stripe. Subscriptions can be managed from your customer portal.
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            Need help choosing the right package?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/sample-reports" 
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              View Sample Reports
            </Link>
            <span className="hidden sm:inline text-gray-500">•</span>
            <a 
              href="mailto:info@northpathstrategies.org" 
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      </div>
    </PagesBackground>
  );
}
