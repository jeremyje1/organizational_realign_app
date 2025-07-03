/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Card grid for services (3-up desktop, stack mobile)
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Puzzle, Rocket, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Realignment Diagnostic",
      icon: Settings,
      description: "Rapid 360° assessment of roles & spend",
      details: "Comprehensive analysis using our proprietary DSCH algorithm to identify optimization opportunities across your organizational structure.",
      features: ["Quick turnaround", "Data-driven insights", "Actionable recommendations"],
      href: "/pricing"
    },
    {
      title: "Scenario Builder", 
      icon: Puzzle,
      description: "Simulate unlimited org charts & cost outcomes",
      details: "Interactive modeling platform powered by Monte-Carlo simulations to test organizational changes before implementation.",
      features: ["Unlimited scenarios", "Risk analysis", "Cost projections"],
      href: "/scenarios"
    },
    {
      title: "Implementation Coaching",
      icon: Rocket,
      description: "90‑day sprints to hard‑wire the change",
      details: "Hands-on guidance through transformation with our proven methodology and ongoing support throughout the process.",
      features: ["Expert guidance", "Change management", "Success tracking"],
      href: "/contact"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three integrated approaches to organizational transformation, each powered by our proprietary algorithms and proven methodologies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 bg-white border-0 overflow-hidden">
                {/* Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-500" />
                
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <IconComponent size={24} className="text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-blue-600 font-medium">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.details}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    <Link href={service.href} className="flex items-center justify-center gap-2">
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to transform your organization with proven methodologies?
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/assessment/start">
              Start Your Assessment
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
