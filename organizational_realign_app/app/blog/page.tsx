import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Blog - NorthPath Strategies',
  description: 'Insights and expertise on organizational transformation, cost reduction, team optimization, and talent alignment from NorthPath Strategies.',
};

export default function BlogPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              NorthPath Insights Blog
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Expert perspectives on organizational transformation, cost reduction strategies, 
              team optimization, and talent alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="h-64 md:h-full w-full">
                  <Image 
                    src="/images/optimized-hero-logo-60.jpg"
                    alt="Featured article on cost optimization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                    Featured
                  </span>
                  <span className="mx-3">•</span>
                  <span>July 5, 2025</span>
                  <span className="mx-3">•</span>
                  <span>10 min read</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  5 Critical Steps to Optimize Your Organization's Cost Structure
                </h2>
                <p className="text-gray-600 mb-6">
                  In today's challenging economic environment, optimizing your organization's cost 
                  structure isn't just about cutting expenses—it's about strategic realignment to 
                  ensure every dollar supports your core mission and growth objectives. This article 
                  explores proven methodologies for identifying and eliminating unnecessary costs while 
                  preserving core capabilities.
                </p>
                <SafeLink href="/blog/5-steps-cost-structure-optimization">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Read Full Article
                  </Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Recent Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Team optimization strategies"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>June 28, 2025</span>
                  <span className="mx-2">•</span>
                  <span>8 min read</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Building High-Performance Teams in a Hybrid Work Environment
                </h3>
                <p className="text-gray-600 mb-4">
                  The shift to hybrid work has fundamentally changed how teams collaborate and perform. 
                  Learn key strategies for optimizing team performance in this new paradigm.
                </p>
                <SafeLink href="/blog/high-performance-teams-hybrid-work">
                  <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                    Read Article →
                  </Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Article 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Talent alignment strategies"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>June 20, 2025</span>
                  <span className="mx-2">•</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  The Hidden Costs of Misaligned Talent: Why Skills Mapping Matters
                </h3>
                <p className="text-gray-600 mb-4">
                  Misaligned talent can cost organizations millions in lost productivity and turnover. 
                  Discover how strategic skills mapping can transform your workforce effectiveness.
                </p>
                <SafeLink href="/blog/hidden-costs-misaligned-talent">
                  <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                    Read Article →
                  </Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Article 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Cost reduction implementation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>June 15, 2025</span>
                  <span className="mx-2">•</span>
                  <span>7 min read</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Beyond Budget Cuts: Strategic Cost Optimization for Long-Term Growth
                </h3>
                <p className="text-gray-600 mb-4">
                  Traditional cost-cutting often leads to long-term damage. Explore how strategic cost 
                  optimization can create a foundation for sustainable growth and competitive advantage.
                </p>
                <SafeLink href="/blog/strategic-cost-optimization-long-term-growth">
                  <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                    Read Article →
                  </Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Browse by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SafeLink href="/blog/category/cost-reduction">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Cost Reduction</h3>
                <p className="text-gray-600 mb-3">
                  Strategies for optimizing costs while maintaining quality and performance.
                </p>
                <span className="text-sm text-primary-600">12 articles</span>
              </div>
            </SafeLink>
            
            <SafeLink href="/blog/category/team-optimization">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Team Optimization</h3>
                <p className="text-gray-600 mb-3">
                  Approaches to enhancing team performance, collaboration, and effectiveness.
                </p>
                <span className="text-sm text-primary-600">9 articles</span>
              </div>
            </SafeLink>
            
            <SafeLink href="/blog/category/talent-alignment">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Talent Alignment</h3>
                <p className="text-gray-600 mb-3">
                  Methods for aligning talent with business objectives and optimizing workforce capabilities.
                </p>
                <span className="text-sm text-primary-600">8 articles</span>
              </div>
            </SafeLink>
            
            <SafeLink href="/blog/category/transformation">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Transformation</h3>
                <p className="text-gray-600 mb-3">
                  Frameworks and case studies on successful organizational transformation initiatives.
                </p>
                <span className="text-sm text-primary-600">11 articles</span>
              </div>
            </SafeLink>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8">
              Stay updated with the latest insights, resources, and industry trends delivered 
              directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <Button variant="secondary" type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-primary-100 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
