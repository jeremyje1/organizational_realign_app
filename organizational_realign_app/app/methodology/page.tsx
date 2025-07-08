import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';
import ModernNavbar from '@/components/modern/ModernNavbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';

export const metadata: Metadata = {
  title: 'Our Methodology - NorthPath Strategies',
  description: 'Discover NorthPath Strategies\' proven 5-step methodology for organizational transformation. Our data-driven, human-centered approach delivers sustainable results.',
};

export default function MethodologyPage() {
  return (
    <PageWrapper>
      <ModernNavbar />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Transformation Methodology
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              NorthPath's proven 5-step methodology combines data-driven analysis with human-centered 
              design to deliver sustainable organizational transformation with measurable ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Methodology Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The NorthPath Approach</h2>
            <p className="text-lg text-gray-600">
              Our methodology has been refined through 15+ years of experience transforming Fortune 500 
              organizations and mid-sized businesses across diverse industries. Each step is carefully 
              designed to drive measurable, sustainable change.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block bg-primary-100 text-primary-800 font-bold px-4 py-1 rounded-full mb-4">
                  Step 1
                </div>
                <h3 className="text-3xl font-bold mb-6">Comprehensive Assessment</h3>
                <p className="text-lg text-gray-600 mb-6">
                  We begin with a thorough analysis of your organization's current state, including 
                  operational inefficiencies, cost structures, team dynamics, and talent alignment. 
                  Our proprietary assessment tools identify both immediate savings opportunities and 
                  long-term transformation potential.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Data-driven analysis of current operations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Stakeholder interviews across all levels</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Benchmarking against industry best practices</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 order-1 lg:order-2 rounded-xl overflow-hidden">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Comprehensive organizational assessment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Strategic roadmap development"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-primary-100 text-primary-800 font-bold px-4 py-1 rounded-full mb-4">
                  Step 2
                </div>
                <h3 className="text-3xl font-bold mb-6">Strategic Roadmap Development</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Based on assessment findings, we create a customized transformation roadmap that 
                  balances quick wins with long-term strategic initiatives. Each roadmap is tailored 
                  to your organization's unique needs, culture, and objectives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prioritized initiatives with clear ROI projections</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Timeline with defined milestones and metrics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Resource allocation and capability requirements</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block bg-primary-100 text-primary-800 font-bold px-4 py-1 rounded-full mb-4">
                  Step 3
                </div>
                <h3 className="text-3xl font-bold mb-6">Implementation & Change Management</h3>
                <p className="text-lg text-gray-600 mb-6">
                  We work alongside your team to implement changes, providing guidance, tools, and 
                  frameworks that ensure successful execution. Our change management approach focuses 
                  on building buy-in, addressing resistance, and developing internal champions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hands-on implementation support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Stakeholder communication and engagement strategy</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Leadership alignment and capability building</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 order-1 lg:order-2 rounded-xl overflow-hidden">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Implementation and change management"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Progress monitoring and optimization"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-primary-100 text-primary-800 font-bold px-4 py-1 rounded-full mb-4">
                  Step 4
                </div>
                <h3 className="text-3xl font-bold mb-6">Monitoring & Optimization</h3>
                <p className="text-lg text-gray-600 mb-6">
                  We establish robust measurement systems to track progress against key metrics, 
                  making data-driven adjustments to optimize results. Regular reviews ensure 
                  accountability and enable rapid course correction when needed.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time performance dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regular review sessions with stakeholders</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Continuous improvement feedback loops</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block bg-primary-100 text-primary-800 font-bold px-4 py-1 rounded-full mb-4">
                  Step 5
                </div>
                <h3 className="text-3xl font-bold mb-6">Sustainability & Capability Transfer</h3>
                <p className="text-lg text-gray-600 mb-6">
                  We ensure transformation success outlasts our engagement by transferring knowledge, 
                  tools, and capabilities to your team. This final phase focuses on embedding new 
                  ways of working into your organization's DNA.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Knowledge transfer and skill development</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Embedding processes into operational rhythms</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Long-term success roadmap development</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 order-1 lg:order-2 rounded-xl overflow-hidden">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Sustainability and capability transfer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proven Results</h2>
            <p className="text-lg text-gray-600">
              Our methodology has consistently delivered transformative results across industries. 
              Here's what our clients typically achieve:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-primary-600 text-4xl font-bold mb-2">15-30%</div>
              <p className="text-gray-700 font-medium">Cost Reduction</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-primary-600 text-4xl font-bold mb-2">25-40%</div>
              <p className="text-gray-700 font-medium">Productivity Improvement</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-primary-600 text-4xl font-bold mb-2">35%</div>
              <p className="text-gray-700 font-medium">Reduced Turnover</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-primary-600 text-4xl font-bold mb-2">10-30x</div>
              <p className="text-gray-700 font-medium">ROI on Consulting Investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Organization?
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
