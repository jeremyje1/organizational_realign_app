import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Webinars - NorthPath Strategies',
  description: 'Access on-demand webinars featuring expert discussions on organizational transformation, cost reduction, team optimization, and talent alignment.',
};

export default function WebinarsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              NorthPath Webinar Series
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Access expert discussions and practical insights on organizational transformation, 
              cost reduction, team optimization, and talent alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Webinar */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="h-64 md:h-full w-full relative">
                  <Image 
                    src="/images/optimized-hero-logo-60.jpg"
                    alt="Featured webinar on hybrid work"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                    Featured
                  </span>
                  <span className="mx-3">•</span>
                  <span>July 2, 2025</span>
                  <span className="mx-3">•</span>
                  <span>45 minutes</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Building High-Performance Teams in a Hybrid Work Environment
                </h2>
                <p className="text-gray-600 mb-6">
                  In this webinar, our expert panel discusses effective strategies for optimizing team 
                  performance, enhancing collaboration, and driving results in hybrid and remote work 
                  settings. Learn practical approaches to overcome common challenges and build a 
                  high-performance culture regardless of physical location.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative mr-3">
                      <Image 
                        src="/images/optimized-hero-logo-60.jpg"
                        alt="Jeremy Estrella"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Jeremy Estrella</p>
                      <p className="text-gray-500">Founder & CEO</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative mr-3">
                      <Image 
                        src="/images/optimized-hero-logo-60.jpg"
                        alt="Sarah Johnson"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-gray-500">VP of Team Optimization</p>
                    </div>
                  </div>
                </div>
                <SafeLink href="/webinars/high-performance-teams-hybrid-work">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Watch Webinar
                  </Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Webinars */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Recent Webinars</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Webinar 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Cost reduction strategies webinar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>June 25, 2025</span>
                  <span className="mx-2">•</span>
                  <span>40 minutes</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Strategic Cost Optimization: Beyond Budget Cuts
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover how leading organizations are moving beyond traditional cost-cutting to 
                  implement strategic cost optimization initiatives that fund growth and innovation.
                </p>
                <SafeLink href="/webinars/strategic-cost-optimization">
                  <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                    Watch Webinar →
                  </Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Webinar 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Talent alignment webinar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>June 18, 2025</span>
                  <span className="mx-2">•</span>
                  <span>35 minutes</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Future-Ready Workforce: Strategic Talent Alignment
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to build a future-ready workforce through strategic talent alignment, 
                  skills mapping, and creating career pathways that drive both individual and 
                  organizational success.
                </p>
                <SafeLink href="/webinars/future-ready-workforce">
                  <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                    Watch Webinar →
                  </Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Webinar 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full relative">
                <Image 
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="Organizational transformation webinar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>June 10, 2025</span>
                  <span className="mx-2">•</span>
                  <span>50 minutes</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Leading Successful Organizational Transformation
                </h3>
                <p className="text-gray-600 mb-4">
                  This panel discussion explores key success factors for leading organizational 
                  transformation initiatives, overcoming resistance to change, and ensuring 
                  sustainable results.
                </p>
                <SafeLink href="/webinars/leading-successful-transformation">
                  <Button variant="link" className="p-0 text-primary-600 hover:text-primary-700">
                    Watch Webinar →
                  </Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Webinar Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Browse by Topic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SafeLink href="/webinars/topic/cost-reduction">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Cost Reduction</h3>
                <p className="text-gray-600 mb-3">
                  Strategic approaches to optimizing costs and improving operational efficiency.
                </p>
                <span className="text-sm text-primary-600">5 webinars</span>
              </div>
            </SafeLink>
            
            <SafeLink href="/webinars/topic/team-optimization">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Team Optimization</h3>
                <p className="text-gray-600 mb-3">
                  Strategies for building and managing high-performance teams in various work environments.
                </p>
                <span className="text-sm text-primary-600">4 webinars</span>
              </div>
            </SafeLink>
            
            <SafeLink href="/webinars/topic/talent-alignment">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Talent Alignment</h3>
                <p className="text-gray-600 mb-3">
                  Approaches to aligning talent with business objectives and building future-ready workforces.
                </p>
                <span className="text-sm text-primary-600">3 webinars</span>
              </div>
            </SafeLink>
            
            <SafeLink href="/webinars/topic/transformation">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Transformation</h3>
                <p className="text-gray-600 mb-3">
                  Insights on leading successful organizational transformation initiatives with sustainable results.
                </p>
                <span className="text-sm text-primary-600">6 webinars</span>
              </div>
            </SafeLink>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Upcoming Live Webinars</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upcoming Webinar 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-primary-600 font-semibold mb-1">July 15, 2025 • 1:00 PM ET</div>
                  <h3 className="text-xl font-bold">The Future of Work: Balancing Automation and Human Talent</h3>
                </div>
                <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  Upcoming
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Join our expert panel as they discuss how organizations can effectively balance automation 
                and AI with human talent to create optimal operational models for the future of work.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden relative">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Speaker 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden relative">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Speaker 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden relative">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Speaker 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <SafeLink href="/webinars/register/future-of-work-automation">
                  <Button variant="outline">Register Now</Button>
                </SafeLink>
              </div>
            </div>
            
            {/* Upcoming Webinar 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-primary-600 font-semibold mb-1">July 29, 2025 • 2:00 PM ET</div>
                  <h3 className="text-xl font-bold">Crisis-Proof Organizations: Building Resilience in Uncertain Times</h3>
                </div>
                <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  Upcoming
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Learn how to build organizational resilience through strategic cost structures, 
                adaptable teams, and aligned talent that can weather any crisis or market disruption.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden relative">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Speaker 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden relative">
                    <Image 
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="Speaker 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <SafeLink href="/webinars/register/crisis-proof-organizations">
                  <Button variant="outline">Register Now</Button>
                </SafeLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Never Miss a Webinar</h2>
              <p className="text-lg mb-8">
                Subscribe to receive notifications about upcoming webinars and exclusive access 
                to our on-demand content library.
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
        </div>
      </section>
    </div>
  );
}
