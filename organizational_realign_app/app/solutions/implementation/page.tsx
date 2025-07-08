/**
 * Implementation Solutions Page
 */
import React from 'react';
import { Metadata } from 'next';
import ModernNavbar from '@/components/modern/ModernNavbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';
import { 
  Rocket, 
  Target, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Shield,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Implementation Programs - NorthPath Strategies',
  description: '90-day transformation programs with guaranteed ROI. Comprehensive implementation support to ensure sustainable organizational change.',
  keywords: [
    '90-day transformation',
    'implementation program',
    'guaranteed roi',
    'organizational change',
    'transformation support',
    'northpath strategies'
  ],
};

export default function ImplementationPage() {
  const phases = [
    {
      phase: "Phase 1: Foundation",
      duration: "Days 1-30",
      icon: Shield,
      activities: [
        "Stakeholder alignment and buy-in",
        "Change management framework setup",
        "Quick wins identification and execution",
        "Communication strategy implementation"
      ]
    },
    {
      phase: "Phase 2: Execution",
      duration: "Days 31-60", 
      icon: Rocket,
      activities: [
        "Core transformation initiatives rollout",
        "Process optimization implementation",
        "Staff training and development",
        "Performance monitoring systems"
      ]
    },
    {
      phase: "Phase 3: Optimization",
      duration: "Days 61-90",
      icon: TrendingUp,
      activities: [
        "Results measurement and analysis",
        "Continuous improvement processes",
        "Sustainability planning",
        "Knowledge transfer and documentation"
      ]
    }
  ];

  const guarantees = [
    {
      icon: TrendingUp,
      title: "10-30x ROI Guarantee",
      description: "We guarantee measurable returns on your investment within 90 days"
    },
    {
      icon: Clock,
      title: "90-Day Timeline",
      description: "Structured program with clear milestones and deliverables"
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "95% success rate across 500+ organizational transformations"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Assigned transformation specialist throughout the program"
    }
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
                <Rocket className="w-4 h-4" />
                Implementation Programs
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                90-Day Transformation Programs with Guaranteed ROI
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Turn insights into action with our comprehensive implementation programs. 
                We don't just identify opportunities - we ensure they become sustainable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SafeLink href="/assessment/start">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                    Start Implementation Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SafeLink>
                <SafeLink href="/contact">
                  <Button size="lg" variant="outline">
                    Schedule Strategy Call
                  </Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Implementation Guarantees
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We stand behind our methodology with concrete guarantees and measurable outcomes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                    <guarantee.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{guarantee.title}</h3>
                  <p className="text-gray-600">{guarantee.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 90-Day Program Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                90-Day Transformation Roadmap
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our structured approach ensures rapid, sustainable transformation with clear milestones.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {phases.map((phase, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg relative">
                  {/* Phase connector line */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200 z-10">
                      <ArrowRight className="absolute -top-2 right-0 w-4 h-4 text-primary-400" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <phase.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{phase.phase}</h3>
                      <p className="text-sm text-gray-500">{phase.duration}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {phase.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Proven Results Across Industries
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our implementation programs deliver consistent, measurable results across 
                  healthcare, education, government, and enterprise organizations.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                    <div className="text-sm text-gray-600">Organizations Transformed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">$12M+</div>
                    <div className="text-sm text-gray-600">Cost Savings Generated</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">90</div>
                    <div className="text-sm text-gray-600">Day Average ROI</div>
                  </div>
                </div>

                <SafeLink href="/case-studies">
                  <Button variant="outline">
                    View Success Stories
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SafeLink>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-8 rounded-xl text-white">
                  <h3 className="text-2xl font-bold mb-6">Implementation Package Includes:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Dedicated implementation specialist</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Weekly progress reviews and adjustments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Change management toolkit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Staff training and development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Performance monitoring dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Post-implementation support</span>
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
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Start with our assessment to identify your transformation opportunities, 
              then let us guide you through proven implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/assessment/start">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Start Your Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </SafeLink>
              <SafeLink href="/contact">
                <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary-700">
                  Schedule Strategy Call
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
