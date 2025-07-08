'use client';

import { useState } from 'react';
import { type AssessmentTier } from '@/lib/assessment-db';

// Force dynamic rendering to avoid serialization issues during build
export const dynamic = 'force-dynamic';

export default function PricingPage() {
  const [loading, setLoading] = useState<AssessmentTier | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState<AssessmentTier | null>(null);

  const handlePurchase = async (tier: AssessmentTier) => {
    setLoading(tier);
    
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier,
          email: email || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };
  
  const handleGetStarted = (tier: AssessmentTier) => {
    setShowEmailForm(tier);
  };
  
  const handleSubmitEmail = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (showEmailForm) {
      handlePurchase(showEmailForm);
      setShowEmailForm(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NorthPath Package Options & Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect optimization package for your organization. 
            All packages include our proprietary DSCH, CRF, and LEI algorithms.
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-blue-100 rounded-lg">
            <span className="text-sm text-blue-800 font-medium">🔒 Patent Pending • SOC 2 Compliant</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Diagnostic */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">Basic Diagnostic</h3>
              <p className="mt-2 text-gray-600">≤ 500 FTE / ≤ 2 sites</p>
              <p className="mt-8 text-5xl font-bold text-gray-900">$1,999</p>
              <p className="mt-2 text-gray-500">One-time payment</p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Sections 1‑8 questionnaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>One DSCH scenario</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>12‑page PDF brief</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>30‑min results call</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">⚡</span>
                  <span className="font-semibold text-blue-700">Rapid insights</span>
                </li>
              </ul>
            </div>
            
            <div className="px-8 pb-8">
              <button
                onClick={() => handleGetStarted('INDIVIDUAL')}
                disabled={loading === 'INDIVIDUAL'}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading === 'INDIVIDUAL' ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          </div>

          {/* Comprehensive */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-500 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-bl-lg">
              Most Popular
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">Comprehensive</h3>
              <p className="mt-2 text-gray-600">501‑2,999 FTE / ≤ 5 sites</p>
              <p className="mt-8 text-5xl font-bold text-gray-900">$3,999</p>
              <p className="mt-2 text-gray-500">One-time payment</p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Basic <strong>plus</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Two additional scenarios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Interactive Power BI dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>½‑day virtual workshop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>90‑day e‑mail support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">⚡</span>
                  <span className="font-semibold text-blue-700">Scenario depth</span>
                </li>
              </ul>
            </div>
            
            <div className="px-8 pb-8">
              <button
                onClick={() => handleGetStarted('TEAM')}
                disabled={loading === 'TEAM'}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading === 'TEAM' ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-500">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
              <p className="mt-2 text-gray-600">≥ 3,000 FTE or multi‑system</p>
              <p className="mt-8 text-5xl font-bold text-gray-900">$8,999</p>
              <p className="mt-2 text-gray-500">One-time payment</p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Comprehensive <strong>plus</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Unlimited scenarios (6 mos.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>API access to scenario‑builder</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Custom cultural weighting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>On‑site workshop (1 day)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Board‑ready slide deck</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-3">⚡</span>
                  <span className="font-semibold text-purple-700">Full integration</span>
                </li>
              </ul>
            </div>
            
            <div className="px-8 pb-8">
              <button
                onClick={() => handleGetStarted('ENTERPRISE')}
                disabled={loading === 'ENTERPRISE'}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading === 'ENTERPRISE' ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            <strong>*</strong> Headcount is guidance; select the tier that matches desired analytic depth.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Technical Stack & Security</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div><strong>Front-end:</strong> Next.js 14 (RSC)</div>
              <div><strong>Auth & DB:</strong> Supabase + Postgres 15</div>
              <div><strong>AI Core:</strong> OpenAI o3</div>
              <div><strong>Analytics:</strong> Power BI Embedded</div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              SOC 2-aligned, field-level AES-256, S3 object lock
            </p>
          </div>
        </div>
        
        {/* Email form modal */}
        {showEmailForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Enter your email to continue</h3>
              <p className="text-gray-600 mb-6">We&apos;ll send you checkout information and assessment details.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEmailForm(null)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitEmail}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
