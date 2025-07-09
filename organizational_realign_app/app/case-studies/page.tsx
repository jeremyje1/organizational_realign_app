import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';

export const metadata: Metadata = {
  title: 'Case Studies - NorthPath Strategies',
  description: 'Explore real-world success stories of organizations that achieved significant cost reduction, team optimization, and talent alignment with NorthPath Strategies.',
};

export default function CaseStudiesPage() {
  return (
    <PageWrapper>
      <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Client Success Stories
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Explore how organizations across various industries have achieved remarkable results with 
              NorthPath Strategies' proven transformation methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Case Study 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-48 md:h-full w-full">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Manufacturing industry"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-1">
                    Manufacturing
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Fortune 500 Manufacturer Reduces Costs by 28% in 90 Days
                  </h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      $3.7M Savings
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      90 Days
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A global manufacturer faced significant cost pressures due to supply chain disruptions and 
                    increased competition. NorthPath implemented strategic cost reduction initiatives that 
                    eliminated operational waste while preserving core capabilities.
                  </p>
                  <SafeLink href="/case-studies/fortune-500-manufacturer">
                    <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                      Read Case Study →
                    </Button>
                  </SafeLink>
                </div>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-48 md:h-full w-full">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Financial services industry"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-1">
                    Financial Services
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Regional Bank Improves Team Performance by 42%
                  </h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      $2.1M Revenue Increase
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      6 Months
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A regional bank was struggling with siloed teams and inconsistent customer experiences. 
                    NorthPath implemented team optimization strategies that enhanced cross-functional collaboration 
                    and significantly improved customer satisfaction scores.
                  </p>
                  <SafeLink href="/case-studies/regional-bank">
                    <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                      Read Case Study →
                    </Button>
                  </SafeLink>
                </div>
              </div>
            </div>
            
            {/* Case Study 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-48 md:h-full w-full">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Healthcare industry"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-1">
                    Healthcare
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Hospital Network Reduces Turnover by 45% Through Talent Alignment
                  </h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      $4.2M Recruitment Savings
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      12 Months
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A regional hospital network was experiencing high turnover rates and difficulty attracting 
                    top talent. NorthPath implemented a comprehensive talent alignment strategy that improved 
                    recruitment, retention, and employee satisfaction.
                  </p>
                  <SafeLink href="/case-studies/hospital-network">
                    <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                      Read Case Study →
                    </Button>
                  </SafeLink>
                </div>
              </div>
            </div>
            
            {/* Case Study 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-48 md:h-full w-full">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Technology industry"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-1">
                    Technology
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    SaaS Company Cuts Time-to-Market by 35% with Team Optimization
                  </h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      32% Productivity Increase
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      120 Days
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A growing SaaS company was experiencing development bottlenecks and missed release dates. 
                    NorthPath implemented team optimization strategies that broke down silos and established 
                    cross-functional collaboration frameworks.
                  </p>
                  <SafeLink href="/case-studies/saas-company">
                    <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                      Read Case Study →
                    </Button>
                  </SafeLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Industry Results */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Results Across Industries
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-block p-4 rounded-full bg-primary-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Manufacturing</h3>
              <div className="text-primary-600 text-2xl font-bold mb-1">28%</div>
              <p className="text-gray-600">Average Cost Reduction</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-block p-4 rounded-full bg-primary-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Financial Services</h3>
              <div className="text-primary-600 text-2xl font-bold mb-1">42%</div>
              <p className="text-gray-600">Team Performance Improvement</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-block p-4 rounded-full bg-primary-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Healthcare</h3>
              <div className="text-primary-600 text-2xl font-bold mb-1">45%</div>
              <p className="text-gray-600">Turnover Reduction</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-block p-4 rounded-full bg-primary-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Technology</h3>
              <div className="text-primary-600 text-2xl font-bold mb-1">35%</div>
              <p className="text-gray-600">Time-to-Market Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the first step by completing our quick assessment to identify your organization's 
            transformation potential.
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
      <EnhancedFooter />
    </PageWrapper>
  );
}
