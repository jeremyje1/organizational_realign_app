/**
 * Operational Excellence Solutions Page
 */
import React from 'react';
import { Metadata } from 'next';
import ModernNavbar from '@/components/modern/ModernNavbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Settings,
  Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Operational Excellence - NorthPath Strategies',
  description: 'Transform your operations with Fortune 500 strategies. Achieve operational excellence through proven methodologies and data-driven optimization.',
  keywords: [
    'operational excellence',
    'operations transformation',
    'process optimization',
    'fortune 500 strategies',
    'operational efficiency',
    'northpath strategies'
  ],
};

export default function OperationalExcellencePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "25-40% Efficiency Gains",
      description: "Streamline processes and eliminate waste through proven methodologies"
    },
    {
      icon: Target,
      title: "Precision Execution",
      description: "Implement Fortune 500 operational frameworks tailored to your organization"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Real-time operational metrics and continuous improvement tracking"
    },
    {
      icon: Settings,
      title: "Process Automation",
      description: "Identify and automate repetitive tasks to free up strategic capacity"
    }
  ];

  const features = [
    "Operational efficiency assessment and benchmarking",
    "Process mapping and optimization",
    "Workflow automation implementation",
    "Performance management systems",
    "Quality control frameworks",
    "Continuous improvement methodologies",
    "Change management support",
    "Staff training and development"
  ];

  return (
    <PageWrapper>
      <ModernNavbar />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-6 py-2 text-primary-700 text-sm font-medium mb-6">
                <Settings className="w-4 h-4" />
                Operational Excellence
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Operations with Fortune 500 Strategies
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Achieve operational excellence through proven methodologies that streamline processes, 
                eliminate waste, and drive sustainable performance improvements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SafeLink href="/assessment/start">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                    Start Operations Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SafeLink>
                <SafeLink href="/contact">
                  <Button size="lg" variant="outline">
                    Schedule Consultation
                  </Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Operational Excellence Benefits
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our operational excellence approach delivers measurable improvements across all key performance areas.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Comprehensive Operational Excellence Solutions
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our proven methodology addresses every aspect of operational performance, 
                  from process optimization to performance management.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <SafeLink href="/methodology">
                    <Button variant="outline" className="mr-4">
                      Learn Our Methodology
                    </Button>
                  </SafeLink>
                  <SafeLink href="/case-studies">
                    <Button variant="outline">
                      View Success Stories
                    </Button>
                  </SafeLink>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Performance Metrics</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Process Efficiency</span>
                      <span className="text-green-600 font-semibold">+32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost Reduction</span>
                      <span className="text-green-600 font-semibold">+28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quality Improvement</span>
                      <span className="text-green-600 font-semibold">+45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time to Market</span>
                      <span className="text-green-600 font-semibold">-25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Start with our comprehensive operational assessment to identify immediate improvement opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/assessment/start">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Start Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </SafeLink>
              <SafeLink href="/contact">
                <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary-700">
                  Schedule Consultation
                </Button>
              </SafeLink>
            </div>
          </div>
        </section>
      </div>
      <EnhancedFooter />
    </PageWrapper>
  );
}
