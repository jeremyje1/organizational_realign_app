import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Resources - NorthPath Strategies',
  description: 'Access valuable resources on organizational transformation, cost reduction, team optimization, and talent alignment from NorthPath Strategies.',
};

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              NorthPath Resources Hub
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Access valuable insights, tools, and resources to help you transform your organization,
              reduce costs, optimize teams, and align talent with business objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Studies */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Case Studies"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Case Studies</h3>
                <p className="text-gray-600 mb-6">
                  Explore real-world success stories from organizations that have achieved transformative 
                  results with NorthPath Strategies.
                </p>
                <SafeLink href="/case-studies">
                  <Button variant="outline">View Case Studies</Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Blog */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Blog Articles"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Blog Articles</h3>
                <p className="text-gray-600 mb-6">
                  Stay informed with the latest insights, trends, and best practices in organizational 
                  transformation and operational excellence.
                </p>
                <SafeLink href="/blog">
                  <Button variant="outline">Read Articles</Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Webinars */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Webinars"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Webinars</h3>
                <p className="text-gray-600 mb-6">
                  Access on-demand webinars featuring expert discussions on key challenges and strategies 
                  for organizational success.
                </p>
                <SafeLink href="/webinars">
                  <Button variant="outline">Watch Webinars</Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Free Assessment */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Free Assessment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Free Assessment Tool</h3>
                <p className="text-gray-600 mb-6">
                  Discover your organization's potential for cost savings, productivity improvements, 
                  and operational excellence with our quick assessment.
                </p>
                <SafeLink href="/assessment/start">
                  <Button variant="outline">Take Assessment</Button>
                </SafeLink>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Frequently Asked Questions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">FAQ</h3>
                <p className="text-gray-600 mb-6">
                  Find answers to frequently asked questions about our services, methodology, 
                  pricing, and results.
                </p>
                <SafeLink href="/faq">
                  <Button variant="outline">View FAQ</Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Sample Reports */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Sample Reports"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Sample Reports</h3>
                <p className="text-gray-600 mb-6">
                  Preview sample assessment reports and transformation roadmaps to understand 
                  our comprehensive approach.
                </p>
                <SafeLink href="/sample-reports">
                  <Button variant="outline">View Sample Reports</Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Featured Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Case Study */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                Case Study
              </div>
              <h3 className="text-xl font-bold mb-3">
                Fortune 500 Manufacturer Reduces Costs by 28% in 90 Days
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how a global manufacturer identified and eliminated $3.7M in operational waste 
                through strategic cost reduction initiatives.
              </p>
              <SafeLink href="/case-studies/fortune-500-manufacturer">
                <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                  Read Case Study →
                </Button>
              </SafeLink>
            </div>
            
            {/* Featured Blog Post */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                Blog Article
              </div>
              <h3 className="text-xl font-bold mb-3">
                5 Critical Steps to Optimize Your Organization's Cost Structure
              </h3>
              <p className="text-gray-600 mb-4">
                Discover proven strategies for identifying and eliminating unnecessary costs while 
                preserving core capabilities and growth potential.
              </p>
              <SafeLink href="/blog/5-steps-cost-structure-optimization">
                <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                  Read Article →
                </Button>
              </SafeLink>
            </div>
            
            {/* Featured Webinar */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                Webinar
              </div>
              <h3 className="text-xl font-bold mb-3">
                Building High-Performance Teams in a Hybrid Work Environment
              </h3>
              <p className="text-gray-600 mb-4">
                Learn effective strategies for optimizing team performance, enhancing collaboration, 
                and driving results in hybrid and remote work settings.
              </p>
              <SafeLink href="/webinars/high-performance-teams-hybrid-work">
                <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                  Watch Webinar →
                </Button>
              </SafeLink>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Stay Updated with Our Newsletter</h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to receive the latest insights, resources, and industry trends directly 
                to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
