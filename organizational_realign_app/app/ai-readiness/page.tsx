import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Clock, 
  Users,
  CheckCircle 
} from 'lucide-react';

export default function AIReadinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              NorthPath Strategies
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/organizational-realignment" className="text-gray-600 hover:text-gray-900">Organizational Realignment</Link>
              <Link href="/ai-readiness" className="text-indigo-600 font-medium">AI Readiness</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Readiness & Implementation Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a comprehensive, third-party evaluation of your institution's AI readiness across strategy, 
            governance, pedagogy, technology, and culture—with actionable roadmaps tailored specifically for higher education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/ai-readiness/pricing" 
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              View Assessment Options
            </Link>
            <Button variant="outline" className="px-8 py-4">
              View Sample Report
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why AI Readiness Assessment Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most institutions know they're behind on AI adoption. Our assessment gives you a credible starting point 
              with objective insights grounded in higher education best practices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Objective Third-Party Analysis</h3>
              <p className="text-gray-600">
                Get an unbiased lens on your AI strategy—we're not pitching a product, 
                we're providing strategic guidance based on higher education expertise.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Insights Save Weeks</h3>
              <p className="text-gray-600">
                Our AI-powered report generation saves your team weeks of internal effort 
                while providing comprehensive analysis across all critical domains.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Built for Higher Education</h3>
              <p className="text-gray-600">
                Unlike generic enterprise frameworks, our assessment is designed specifically 
                for colleges and universities, addressing QEP alignment, academic integrity, and campus culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your AI Readiness Assessment</h2>
            <p className="text-lg text-gray-600">
              Affordable options designed for departmental budgets with clear upgrade paths for comprehensive support.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tier 1: Self-Service */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Readiness Assessment</h3>
                <p className="text-gray-600 mb-4">Self-Service Diagnostic</p>
                <div className="text-4xl font-bold text-indigo-600 mb-2">$2,500</div>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Full diagnostic (25 questions)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Maturity scores by domain</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Automated PDF report (15 pages)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Prioritized action plan</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Higher ed benchmarking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>30-day email support</span>
                </li>
              </ul>
              
              <Link 
                href="/ai-readiness/start?tier=basic" 
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center block"
              >
                Start Assessment
              </Link>
            </div>
            
            {/* Tier 2: Custom Analysis */}
            <div className="bg-white border-2 border-indigo-500 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Roadmap Intensive</h3>
                <p className="text-gray-600 mb-4">Custom Analysis + Consulting</p>
                <div className="text-4xl font-bold text-indigo-600 mb-2">$12,000</div>
                <p className="text-sm text-gray-500">Includes Tier 1 assessment value</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span><strong>All Tier 1 features included</strong></span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Custom domain weighting</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>QEP & accreditation alignment analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>90-minute 1:1 strategy session</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Custom narrative report (30 pages)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Executive presentation slides</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>30-day async advisory access</span>
                </li>
              </ul>
              
              <Link 
                href="/ai-readiness/start?tier=custom" 
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center block"
              >
                Get Custom Analysis
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              <strong>ROI Promise:</strong> For less than the cost of a single adjunct course release, 
              you'll get a full AI maturity roadmap that saves months of strategic planning time.
            </p>
            <p className="text-sm text-gray-500">
              Need implementation support? Ask about our AI Adoption Advisory program for long-term partnership.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your AI Readiness?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join forward-thinking institutions using objective assessment to guide their AI strategy.
            Get started with your comprehensive evaluation today.
          </p>
          <Link 
            href="/ai-readiness/start" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Begin Assessment Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            © 2024 NorthPath Strategies. Specialized AI readiness assessment for higher education.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
