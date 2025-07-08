'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, CreditCard, Shield, ArrowRight } from 'lucide-react';

interface QuickCheckoutProps {
  trigger?: React.ReactNode;
  assessmentId?: string;
  source?: 'hero' | 'pricing' | 'results';
}

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

export function QuickCheckout({ trigger, assessmentId, source = 'hero' }: QuickCheckoutProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
          assessmentId: assessmentId || 'new',
          plan: planId,
          customerEmail: email,
          customerName: name,
          source
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        // Close the modal before redirecting
        setIsOpen(false);
        // Add a small delay to allow modal to close gracefully
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please check your information and try again. If the problem persists, please contact support.');
    } finally {
      setLoading(null);
    }
  };

  const defaultTrigger = (
    <Button type="button" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[60px]">
      Get Started Today
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-md text-white border-slate-700 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            NorthPath Strategies – Product & Service Packages
          </DialogTitle>
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Choose the package that best fits your organizational needs
            </p>
            <p className="text-blue-400 text-xs mt-1">
              You&apos;ll be redirected to our secure Stripe checkout after selecting a plan
            </p>
          </div>
        </DialogHeader>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-800 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@organization.com"
              required
            />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 rounded-xl border transition-all hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500 bg-gradient-to-b from-purple-900/50 to-slate-900'
                  : 'border-slate-700 bg-slate-800'
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
                <p className="text-sm text-slate-300 mb-4">{plan.description}</p>
                
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-lg text-slate-400 line-through ml-2">{plan.originalPrice}</span>
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
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                } text-white font-semibold py-3`}
              >
                {loading === plan.id ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Redirecting to secure checkout...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Select Plan</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Secure Stripe Processing</span>
            </div>
            <span>•</span>
            <span>Reports Stored Securely</span>
            <span>•</span>
            <span>Cancel Subscriptions Anytime</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            All payments securely processed via Stripe. Subscriptions can be managed from your customer portal.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
