/**
 * Professional Services Section - Clean Consultant Design
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Brain, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import SampleReports from './SampleReports';

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: "Sample Assessment Reports",
      description: "Review comprehensive examples of our AI-powered organizational assessments across different institution types to understand the depth and quality of our analysis.",
      features: ["Community College Analysis", "Hospital Network Report", "University Assessment", "Enterprise-Level Insights"],
      cta: "View Sample Reports",
      href: "#sample-reports"
    },
    {
      icon: Users,
      title: "Strategic Consulting",
      description: "Expert analysis and strategic guidance to help you implement organizational improvements with measurable results.",
      features: ["Expert Review & Analysis", "Implementation Roadmap", "Executive Consultations", "Change Management Support"],
      cta: "View Packages",
      href: "/pricing"
    },
    {
      icon: Brain,
      title: "Enterprise Solutions",
      description: "Complete transformation package for large institutions with system-wide access and dedicated consultant support.",
      features: ["Multi-Campus Support", "Dedicated Consultant", "Change Management", "Executive Presentations"],
      cta: "Schedule Consultation",
      href: "https://calendly.com/jeremyestrella/30min"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How We Help Organizations
              <span className="text-blue-600 block">Transform & Thrive</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our comprehensive approach combines strategic expertise with cutting-edge technology 
              to deliver measurable organizational improvements.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  {service.href.startsWith('http') ? (
                    <a href={service.href} target="_blank" rel="noopener noreferrer">
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  ) : service.href.startsWith('#') ? (
                    <a href={service.href}>
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <Link href={service.href}>
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Sample Reports Section */}
          <div id="sample-reports" className="mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                See Our Assessment Reports in Action
              </h3>
              <p className="text-lg text-gray-600">
                Review detailed examples from real organizational assessments across different institution types. 
                Each report demonstrates the depth, insights, and actionable recommendations our platform delivers.
              </p>
            </div>
            <SampleReports />
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-blue-50 rounded-2xl p-8 text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Organization?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Choose from our flexible packages designed to meet your specific needs and budget. From single assessments to comprehensive enterprise solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/pricing">
                  View All Packages
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assessment/secure-access">
                  Assessment Platform Access
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
