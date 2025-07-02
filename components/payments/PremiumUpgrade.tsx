'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Check, Sparkles, Crown, Building, ArrowRight, X } from 'lucide-react';

interface PremiumUpgradeProps {
  assessmentId: string;
  trigger: React.ReactNode;
  currentPlan?: string;
  onUpgradeSuccess?: (tier: string) => void;
}

export function PremiumUpgrade({ assessmentId, trigger, currentPlan = 'basic', onUpgradeSuccess }: PremiumUpgradeProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('ai-enhanced');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const plans = [
    {
      id: 'ai-enhanced',
      name: 'AI-Enhanced Analysis',
      price: '$299',
      originalPrice: '$499',
      popular: true,
      description: 'Advanced AI insights and strategic recommendations',
      icon: <Sparkles className="h-6 w-6" />,
      features: [
        'AI-powered insights and recommendations',
        'Advanced implementation roadmap',
        'Cost-benefit analysis with ROI projections',
        'Industry benchmarking comparison',
        'Risk assessment and mitigation strategies',
        'Priority consultation scheduling',
        'Enhanced PDF report generation'
      ],
      cta: 'Upgrade to AI Analysis'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Professional',
      price: '$499',
      originalPrice: '$799',
      description: 'Complete executive-ready analysis package',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Everything in AI-Enhanced',
        'Executive-ready branded PDF report',
        'Custom organizational branding',
        '60-minute strategy consultation',
        'Implementation support and guidance',
        'Follow-up assessment in 6 months',
        'Priority email support'
      ],
      cta: 'Get Comprehensive Analysis'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Transformation',
      price: '$1,999',
      originalPrice: '$2,999',
      description: 'Full organizational transformation support',
      icon: <Building className="h-6 w-6" />,
      features: [
        'Everything in Comprehensive',
        'Multi-stakeholder assessment support',
        'Team collaboration features',
        'Ongoing consultation support (3 months)',
        'Custom integration and API access',
        'Dedicated success manager',
        'Quarterly progress reviews'
      ],
      cta: 'Start Enterprise Program'
    }
  ];

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId,
          plan: planId,
          customerEmail: '', // Would get from user context
          customerName: ''   // Would get from user context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { url } = await response.json();
      
      if (url) {
        // Store the upgrade callback for when user returns from Stripe
        if (onUpgradeSuccess) {
          sessionStorage.setItem('pendingUpgrade', JSON.stringify({ 
            planId, 
            assessmentId,
            callback: true 
          }));
        }
        window.location.href = url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      // Could add toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader className="relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-0 top-0 p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
          
          <DialogTitle className="text-2xl font-bold text-slate-100 mb-2">
            Unlock Advanced Analysis
          </DialogTitle>
          <p className="text-slate-300 text-base">
            Transform your basic assessment into actionable strategic insights with our AI-powered analysis
          </p>
        </DialogHeader>

        <div className="mt-8">
          {/* Limited Time Offer Banner */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-center">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-purple-200 font-semibold">Limited Time: Save up to 40% on all plans</span>
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border p-6 transition-all duration-200 hover:scale-105 cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                } ${plan.popular ? 'ring-2 ring-purple-500/50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    plan.id === 'ai-enhanced' ? 'bg-purple-500/20 text-purple-400' :
                    plan.id === 'comprehensive' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{plan.name}</h3>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-slate-100">{plan.price}</span>
                    <span className="text-sm text-slate-400 line-through">{plan.originalPrice}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{plan.description}</p>
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
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={loading}
                  className={`w-full ${
                    plan.id === 'ai-enhanced' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : plan.id === 'comprehensive'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  } text-white font-semibold`}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{plan.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-600">
            <h4 className="text-lg font-semibold text-slate-100 mb-4">Why Upgrade?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h5 className="font-medium text-slate-200">AI-Powered Insights</h5>
                  <p className="text-sm text-slate-400">Get deeper analysis powered by advanced AI algorithms</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h5 className="font-medium text-slate-200">Expert Consultation</h5>
                  <p className="text-sm text-slate-400">Direct access to organizational strategy experts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h5 className="font-medium text-slate-200">Implementation Support</h5>
                  <p className="text-sm text-slate-400">Guided implementation with proven methodologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h5 className="font-medium text-slate-200">Proven ROI</h5>
                  <p className="text-sm text-slate-400">Average 300% ROI within 12 months of implementation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Guarantee */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              🔒 Secure payment processing • 30-day money-back guarantee • Enterprise-grade security
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
