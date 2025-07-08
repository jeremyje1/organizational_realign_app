import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Talent Alignment Solutions - NorthPath Strategies',
  description: 'Align your talent strategy with business objectives. Our talent alignment solutions ensure you have the right people in the right roles to drive organizational success.',
};

export default function TalentAlignmentPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Align Your Talent With Business Objectives
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Our talent alignment solutions help organizations place the right people in the right roles, 
                develop critical skills, and create career paths that enhance both business performance and 
                employee satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SafeLink href="/assessment/start">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                    Start Your Assessment
                  </Button>
                </SafeLink>
                <SafeLink href="/contact">
                  <Button variant="outline" size="lg">
                    Schedule Consultation
                  </Button>
                </SafeLink>
              </div>
            </div>
            <div className="relative h-80 md:h-96 lg:h-full rounded-xl overflow-hidden">
              <Image 
                src="/images/optimized-hero-logo-60.jpg"
                alt="Talent alignment strategies visualization"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Drive Business Success Through Strategic Talent Alignment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Reduced Turnover</h3>
              <p className="text-gray-600">
                Our clients typically experience a 40% reduction in voluntary turnover through improved 
                role alignment and clear career development paths.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Performance</h3>
              <p className="text-gray-600">
                Properly aligned talent delivers 28% higher individual performance and contributes to 
                significantly improved team and organizational outcomes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Accelerated Innovation</h3>
              <p className="text-gray-600">
                Organizations with aligned talent report 35% faster innovation cycles and greater 
                adaptability to market changes and business challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Talent Alignment Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  Skills Audit & Competency Mapping
                </h3>
                <p className="text-gray-600 pl-11">
                  We conduct a comprehensive assessment of your workforce's current skills and capabilities,
                  mapping them against your business requirements and strategic objectives.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  Gap Analysis & Development Planning
                </h3>
                <p className="text-gray-600 pl-11">
                  We identify critical skill gaps and create targeted development plans to build capabilities
                  that support current operations and future business needs.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  Role Optimization
                </h3>
                <p className="text-gray-600 pl-11">
                  We redesign roles to better align with individual strengths and business requirements,
                  ensuring each team member is positioned to make their greatest contribution.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                  Career Pathway Development
                </h3>
                <p className="text-gray-600 pl-11">
                  We create clear, strategic career pathways that align personal growth with organizational
                  needs, enhancing retention and ensuring succession readiness.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">Case Study: Financial Services Company</h3>
              <p className="text-gray-600 mb-6">
                A mid-sized financial services company was struggling with high turnover rates and difficulty 
                adapting to new market demands due to skills gaps within their workforce.
              </p>
              <div className="border-l-4 border-primary-500 pl-4 mb-6">
                <p className="italic text-gray-600">
                  "NorthPath's talent alignment program transformed our approach to workforce management. By implementing 
                  their competency mapping and career pathway frameworks, we reduced turnover by 45% and were able to 
                  rapidly deploy new services that previously seemed impossible with our existing talent base."
                </p>
                <p className="mt-2 font-semibold">- CHRO, Financial Services Company</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-4">
                <div>
                  <p className="font-semibold">Turnover Reduction</p>
                  <p className="text-primary-600 text-xl font-bold">45%</p>
                </div>
                <div>
                  <p className="font-semibold">Promotion Readiness</p>
                  <p className="text-primary-600 text-xl font-bold">+38%</p>
                </div>
                <div>
                  <p className="font-semibold">Revenue Per Employee</p>
                  <p className="text-primary-600 text-xl font-bold">+24%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Align Your Talent Strategy With Business Goals?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the first step toward building a workforce that's perfectly aligned with your 
            organization's current needs and future ambitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SafeLink href="/assessment/start">
              <Button size="lg" variant="secondary">
                Start Your Free Assessment
              </Button>
            </SafeLink>
            <SafeLink href="/contact">
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary-700">
                Schedule a Consultation
              </Button>
            </SafeLink>
          </div>
        </div>
      </section>
    </div>
  );
}
