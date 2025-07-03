'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, CreditCard, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface QuickCheckoutProps {
  trigger?: React.ReactNode;
  assessmentId?: string;
  source?: 'hero' | 'pricing' | 'results';
}

const plans = [
  {
    id: 'basic',
    name: 'Basic Diagnostic',
    price: '$1,999',
    originalPrice: '$2,999',
    description: 'Essential assessment for organizations ≤ 500 FTE',
    popular: false,
    features: [
      'Complete DSCH analysis',
      'Basic AI insights',
      'PDF executive report',
      'Email support',
      '30-day implementation guide'
    ],
    savings: 'Save $1,000'
  },
  {
    id: 'team',
    name: 'Comprehensive Analysis',
    price: '$3,999',
    originalPrice: '$6,999',
    description: 'Advanced analysis for complex organizations',
    popular: true,
    features: [
      'Full DSCH + CRF + LEI analysis',
      'Advanced AI recommendations',
      'Custom branded reports',
      'Priority support & consultation',
      'Team collaboration features',
      'Implementation roadmap'
    ],
    savings: 'Save $3,000'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Optimization',
    price: '$8,999',
    originalPrice: '$14,999',
    description: 'Complete transformation package',
    popular: false,
    features: [
      'All Comprehensive features',
      'Dedicated success manager',
      'Multi-site analysis capability',
      'Custom integration support',
      'Quarterly progress reviews',
      'Executive briefing sessions'
    ],
    savings: 'Save $6,000'
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
      alert('Please fill in your name and email address');
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
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const defaultTrigger = (
    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
      Get Started Today
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Choose Your Optimization Package
          </DialogTitle>
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Limited Time: Up to 40% Off All Plans
              <Sparkles className="h-4 w-4 ml-2" />
            </div>
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
                  <span className="text-lg text-slate-400 line-through ml-2">{plan.originalPrice}</span>
                </div>
                <div className="text-green-400 text-sm font-medium">{plan.savings}</div>
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
                    <span>Processing...</span>
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
              <span>Secure Payment</span>
            </div>
            <span>•</span>
            <span>30-Day Money-Back Guarantee</span>
            <span>•</span>
            <span>SOC 2 Compliant</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            All prices are one-time payments. No recurring subscriptions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
