import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Cost Reduction Solutions - NorthPath Strategies',
  description: 'Strategic cost optimization solutions that drive operational efficiency while maintaining quality. Our proven methodologies deliver 15-30% cost reduction in 90 days.',
};

export default function CostReductionPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Strategic Cost Reduction Without Sacrificing Quality
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Our proven methodologies help organizations identify and eliminate inefficiencies, 
                reduce operational costs, and optimize resources - all while maintaining or improving 
                service quality and operational effectiveness.
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
                alt="Cost reduction strategies visualization"
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
            Achieve Measurable Cost Reduction Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">15-30% Cost Reduction</h3>
              <p className="text-gray-600">
                Our clients typically achieve 15-30% cost reduction within the first 90 days 
                of implementing our recommendations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Preservation</h3>
              <p className="text-gray-600">
                Our approach ensures cost reduction doesn't compromise quality, customer satisfaction, 
                or employee experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Implementation</h3>
              <p className="text-gray-600">
                We focus on quick wins first, delivering immediate savings while developing 
                longer-term strategic cost optimization initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Strategic Cost Reduction Approach
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Comprehensive Cost Analysis</h3>
                    <p className="text-gray-600">
                      We perform a thorough analysis of your entire cost structure, identifying 
                      inefficiencies and opportunities for optimization.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Strategic Recommendations</h3>
                    <p className="text-gray-600">
                      We develop actionable recommendations prioritized by impact, implementation 
                      ease, and alignment with your business strategy.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Implementation Support</h3>
                    <p className="text-gray-600">
                      Our team provides hands-on implementation support, ensuring recommendations 
                      are executed effectively for maximum impact.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sustainable Cost Management</h3>
                    <p className="text-gray-600">
                      We help establish processes and systems to maintain cost discipline and 
                      continuously identify new optimization opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/optimized-hero-logo-60.jpg"
                alt="Strategic cost reduction approach"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your Organization's Cost Structure?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start with our strategic assessment to identify potential savings of $2.4M+ and receive 
            a customized cost reduction roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SafeLink href="/assessment/start">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                Start Your Assessment
              </Button>
            </SafeLink>
            <SafeLink href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-800">
                Contact Our Team
              </Button>
            </SafeLink>
          </div>
        </div>
      </section>
    </div>
  );
}
