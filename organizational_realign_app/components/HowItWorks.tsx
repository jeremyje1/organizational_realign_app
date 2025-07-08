/**
 * How It Works Section - Clear Process Explanation
 */
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, BarChart3, Target, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Take the Assessment",
      description: "Complete our 15-minute AI-powered organizational diagnostic",
      details: [
        "Answer questions about your current structure",
        "Upload organizational chart (optional)",
        "Define your transformation goals",
        "No registration or payment required"
      ],
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
      duration: "15 minutes"
    },
    {
      step: "02",
      title: "Get Instant Results",
      description: "Receive your comprehensive organizational health report",
      details: [
        "AI-powered analysis of your structure",
        "Industry benchmarks and comparisons",
        "Specific improvement opportunities",
        "ROI projections for changes"
      ],
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      duration: "Immediate"
    },
    {
      step: "03",
      title: "Choose Your Path",
      description: "Select the level of support that fits your needs",
      details: [
        "Self-service implementation guide",
        "Expert consultation packages",
        "Full transformation support",
        "Custom enterprise solutions"
      ],
      icon: Target,
      color: "from-green-500 to-emerald-500",
      duration: "Your choice"
    },
    {
      step: "04",
      title: "Transform & Succeed",
      description: "Implement changes with our proven methodologies",
      details: [
        "90-day transformation roadmap",
        "Expert guidance and support",
        "Progress tracking and optimization",
        "Measurable results and ROI"
      ],
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      duration: "90 days"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-8 py-4 bg-blue-600/10 text-blue-700 rounded-full text-sm font-bold mb-8 shadow-lg border border-blue-200">
            OUR PROVEN PROCESS
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            How NorthPath
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Transforms Organizations
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            From assessment to transformation - a clear, proven path to organizational excellence
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`flex items-center mb-24 ${!isEven ? 'flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`flex-1 ${isEven ? 'pr-16' : 'pl-16'}`}>
                  <div className="glass rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                    {/* Step Number and Duration */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-6xl font-bold text-gray-200 font-serif">{step.step}</span>
                      <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                        {step.duration}
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">{step.title}</h3>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">{step.description}</p>

                    {/* Details List */}
                    <div className="space-y-3 mb-8">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA for first step */}
                    {index === 0 && (
                      <Link href="/assessment/start">
                        <Button 
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl group transform hover:scale-105 transition-all duration-300"
                        >
                          Start Your Assessment Now
                          <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-shrink-0">
                  <div className={`w-32 h-32 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Connecting Line (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-24">
                    <div className="w-1 h-24 bg-gradient-to-b from-blue-300 to-purple-300 rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl border border-white/20">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Ready to Begin Your Transformation?</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join 500+ organizations that have already started their journey to operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment/start">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-xl group transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="mr-3 w-6 h-6" />
                  Start Free Assessment
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#services">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xl px-12 py-6 rounded-2xl transition-all duration-300"
                >
                  Explore Services
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
