/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Two-column about section with differentiators
 */
'use client';

import { CheckCircle } from 'lucide-react';

export default function About() {
  const differentiators = [
    {
      title: "Dynamic Span‑of‑Control Heuristic (DSCH)",
      description: "Proprietary algorithm optimizes management structures for maximum efficiency and minimal overhead"
    },
    {
      title: "Monte‑Carlo Cultural Resilience Factor (CRF)", 
      description: "Advanced modeling predicts and mitigates cultural resistance to organizational change"
    },
    {
      title: "License Efficiency Index (LEI)",
      description: "Data-driven optimization of software licensing and resource allocation across teams"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Transforming Organizations Through 
              <span className="text-blue-600"> Proprietary Intelligence</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              NorthPath Strategies leverages cutting-edge algorithms and proven methodologies to deliver 
              measurable organizational transformation. Our patent-pending approach combines data science 
              with deep sector expertise to optimize your structure, culture, and performance.
            </p>

            {/* Differentiators List */}
            <div className="space-y-6">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration Column */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              {/* Abstract SVG Illustration */}
              <svg 
                className="w-full h-full max-w-sm max-h-sm text-blue-600" 
                viewBox="0 0 400 400" 
                fill="none"
              >
                {/* Organizational Network Diagram */}
                <circle cx="200" cy="100" r="20" fill="currentColor" opacity="0.8" />
                <circle cx="120" cy="180" r="15" fill="currentColor" opacity="0.6" />
                <circle cx="280" cy="180" r="15" fill="currentColor" opacity="0.6" />
                <circle cx="80" cy="260" r="12" fill="currentColor" opacity="0.4" />
                <circle cx="160" cy="260" r="12" fill="currentColor" opacity="0.4" />
                <circle cx="240" cy="260" r="12" fill="currentColor" opacity="0.4" />
                <circle cx="320" cy="260" r="12" fill="currentColor" opacity="0.4" />
                
                {/* Connecting Lines */}
                <line x1="200" y1="120" x2="120" y2="165" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <line x1="200" y1="120" x2="280" y2="165" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <line x1="120" y1="195" x2="80" y2="248" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <line x1="120" y1="195" x2="160" y2="248" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <line x1="280" y1="195" x2="240" y2="248" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <line x1="280" y1="195" x2="320" y2="248" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                
                {/* Data Flow Indicators */}
                <path d="M200 300 Q300 320 380 340" stroke="var(--np-orange-400)" strokeWidth="3" fill="none" opacity="0.7" />
                <path d="M200 300 Q100 320 20 340" stroke="var(--np-orange-400)" strokeWidth="3" fill="none" opacity="0.7" />
                
                {/* Algorithm Visualization */}
                <rect x="170" y="320" width="60" height="40" rx="8" fill="var(--np-orange-400)" opacity="0.2" />
                <text x="200" y="345" textAnchor="middle" className="text-sm font-medium" fill="currentColor">
                  AI Engine
                </text>
              </svg>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$1B+</div>
                <div className="text-sm text-gray-600">Spend Modeled</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">97%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
