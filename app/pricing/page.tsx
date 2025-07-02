'use client';

import { useState } from 'react';
import { ASSESSMENT_PRODUCTS, type AssessmentTier } from '@/lib/stripe';

export default function PricingPage() {
  const [loading, setLoading] = useState<AssessmentTier | null>(null);

  const handlePurchase = async (tier: AssessmentTier) => {
    setLoading(tier);
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier,
          successUrl: `${window.location.origin}/assessment/start`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Organizational Realignment Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a comprehensive analysis of your institution&apos;s organizational structure, 
            identify inefficiencies, and receive AI-powered recommendations for improvement.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {(Object.entries(ASSESSMENT_PRODUCTS) as [AssessmentTier, typeof ASSESSMENT_PRODUCTS[AssessmentTier]][]).map(
            ([tier, product]) => (
              <div
                key={tier}
                className={`bg-white rounded-lg shadow-lg p-8 ${
                  tier === 'TEAM' ? 'border-2 border-blue-500 relative' : ''
                }`}
              >
                {tier === 'TEAM' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${(product.price / 100).toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">per assessment</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(tier)}
                  disabled={loading !== null}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    tier === 'TEAM'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  } ${
                    loading === tier
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {loading === tier ? 'Processing...' : 'Start Assessment'}
                </button>
              </div>
            )
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What&apos;s Included in Every Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Survey</h3>
              <p className="text-gray-600 text-sm">300+ targeted questions covering all aspects of organizational structure</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600 text-sm">Advanced algorithms identify inefficiencies and optimization opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Report</h3>
              <p className="text-gray-600 text-sm">Board-ready PDF with findings, recommendations, and implementation plan</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-lg p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 3v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Consultation</h3>
              <p className="text-gray-600 text-sm">Optional follow-up sessions with experienced reorganization specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
