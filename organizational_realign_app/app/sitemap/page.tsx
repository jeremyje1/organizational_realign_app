import { Metadata } from 'next';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Sitemap - NorthPath Strategies',
  description: 'Navigate the NorthPath Strategies website with our comprehensive sitemap. Find all sections and pages organized for easy access.',
};

export default function SitemapPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Navigation */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <SafeLink href="/" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Home
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/about" className="text-primary-600 hover:text-primary-800 hover:underline">
                    About Jeremy
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/pricing" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Pricing
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/contact" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Contact
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/methodology" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Methodology
                  </SafeLink>
                </li>
              </ul>
            </div>
            
            {/* Solutions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Solutions</h2>
              <ul className="space-y-2">
                <li>
                  <SafeLink href="/solutions/cost-reduction" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Cost Reduction
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/solutions/team-optimization" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Team Optimization
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/solutions/talent-alignment" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Talent Alignment
                  </SafeLink>
                </li>
              </ul>
            </div>
            
            {/* Assessment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment</h2>
              <ul className="space-y-2">
                <li>
                  <SafeLink href="/assessment/start" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Start Assessment
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/assessment/secure-access" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Secure Access
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/sample-reports" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Sample Reports
                  </SafeLink>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <SafeLink href="/resources" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Resources Overview
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/case-studies" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Case Studies
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/blog" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Blog
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/webinars" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Webinars
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/faq" className="text-primary-600 hover:text-primary-800 hover:underline">
                    FAQ
                  </SafeLink>
                </li>
              </ul>
            </div>
            
            {/* Legal Pages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <SafeLink href="/terms" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Terms of Service
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/privacy" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Privacy Policy
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/cookies" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Cookie Policy
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/security" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Security Policy
                  </SafeLink>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Support</h2>
              <ul className="space-y-2">
                <li>
                  <SafeLink href="/contact" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Contact Support
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/faq" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Frequently Asked Questions
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/sitemap" className="text-primary-600 hover:text-primary-800 hover:underline">
                    Sitemap
                  </SafeLink>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Blog Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SafeLink href="/blog/category/cost-reduction" className="text-primary-600 hover:text-primary-800 hover:underline">
                Cost Reduction
              </SafeLink>
              <SafeLink href="/blog/category/team-optimization" className="text-primary-600 hover:text-primary-800 hover:underline">
                Team Optimization
              </SafeLink>
              <SafeLink href="/blog/category/talent-alignment" className="text-primary-600 hover:text-primary-800 hover:underline">
                Talent Alignment
              </SafeLink>
              <SafeLink href="/blog/category/transformation" className="text-primary-600 hover:text-primary-800 hover:underline">
                Transformation
              </SafeLink>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Webinar Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SafeLink href="/webinars/topic/cost-reduction" className="text-primary-600 hover:text-primary-800 hover:underline">
                Cost Reduction
              </SafeLink>
              <SafeLink href="/webinars/topic/team-optimization" className="text-primary-600 hover:text-primary-800 hover:underline">
                Team Optimization
              </SafeLink>
              <SafeLink href="/webinars/topic/talent-alignment" className="text-primary-600 hover:text-primary-800 hover:underline">
                Talent Alignment
              </SafeLink>
              <SafeLink href="/webinars/topic/transformation" className="text-primary-600 hover:text-primary-800 hover:underline">
                Transformation
              </SafeLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
