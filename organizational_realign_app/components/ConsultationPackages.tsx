/**
 * Professional Consultation Packages - Clean Business Design
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Target, Users, Building, ArrowRight, Calendar } from 'lucide-react';

export default function ConsultationPackages() {
  const packages = [
    {
      id: 'assessment',
      name: 'Strategic Assessment',
      description: 'Comprehensive organizational evaluation with AI-powered insights and actionable recommendations.',
      price: '$2,999',
      duration: '2-3 weeks',
      deliverables: [
        '360° Organizational Analysis',
        'AI-Powered Insights Report',
        'Strategic Recommendations',
        'Implementation Roadmap',
        '2-Hour Strategy Session',
        '30-Day Follow-up Support'
      ],
      idealFor: 'Organizations seeking clarity on optimization opportunities',
      cta: 'Schedule Assessment',
      href: 'https://calendly.com/jeremyestrella/30min',
      popular: false
    },
    {
      id: 'consulting',
      name: 'Transformation Consulting',
      description: 'End-to-end consulting engagement for complex organizational transformation with ongoing support.',
      price: '$9,999',
      duration: '3-6 months',
      deliverables: [
        'Complete Transformation Strategy',
        'Change Management Plan',
        'Weekly Progress Reviews',
        'Executive Coaching Sessions',
        'Team Training & Development',
        'Performance Monitoring Dashboard',
        'Ongoing Strategic Support'
      ],
      idealFor: 'Organizations ready for comprehensive transformation',
      cta: 'Start Transformation',
      href: 'https://calendly.com/jeremyestrella/30min',
      popular: true
    },
    {
      id: 'platform',
      name: 'AI Platform Access',
      description: 'Self-service access to our advanced organizational assessment platform with real-time analytics.',
      price: '$499/month',
      duration: 'Ongoing',
      deliverables: [
        'Real-Time Assessment Platform',
        'AI-Powered Analytics Dashboard',
        'Scenario Modeling Tools',
        'Performance Tracking',
        'Monthly Insights Reports',
        'Email Support'
      ],
      idealFor: 'Organizations wanting continuous monitoring and insights',
      cta: 'Try Platform',
      href: '/assessment/start',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Consultation Packages
              <span className="text-blue-600 block">Choose Your Path Forward</span>
            </h2>
            <p className="text-xl text-gray-600">
              Select the level of support that matches your organizational transformation needs and goals.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className={`bg-white rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                pkg.popular ? 'border-blue-200 ring-2 ring-blue-500/20 relative' : 'border-gray-200'
              }`}>
                
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Target className="w-8 h-8 text-blue-600" />}
                    {index === 1 && <Users className="w-8 h-8 text-blue-600" />}
                    {index === 2 && <Building className="w-8 h-8 text-blue-600" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-blue-600">{pkg.price}</div>
                  <div className="text-gray-500 text-sm">{pkg.duration}</div>
                </div>

                {/* Deliverables */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What&apos;s Included:</h4>
                  <ul className="space-y-3">
                    {pkg.deliverables.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="mb-8">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Ideal for:</span> {pkg.idealFor}
                  </p>
                </div>

                {/* CTA Button */}
                <Button asChild className={`w-full ${
                  pkg.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}>
                  {pkg.href.startsWith('http') ? (
                    <a href={pkg.href} target="_blank" rel="noopener noreferrer">
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <Link href={pkg.href}>
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not Sure Which Option Is Right for You?
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule a free 30-minute consultation to discuss your specific needs and get personalized recommendations.
              </p>
              <Button asChild size="lg" variant="outline" className="border-2">
                <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
