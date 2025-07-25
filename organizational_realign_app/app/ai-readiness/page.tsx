import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Brain,
  Target,
  TrendingUp,
  Shield,
  FileText,
  Zap
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
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Organizational Assessment</Link>
              <Link href="/ai-blueprint/pricing" className="text-indigo-600 font-medium">AI Blueprint™</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - New AI Transformation Blueprint™ Branding */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-blue-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-sm font-medium mb-6">
            <Brain className="h-4 w-4 mr-2" />
            Patent-Pending AI Analytics
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Transformation Blueprint™
          </h1>
          <p className="text-2xl text-indigo-600 font-semibold mb-4">
            From Assessment to Action in 90 Days
          </p>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            The only end-to-end AI transformation program designed specifically for higher education. 
            Move beyond assessment reports to a complete operating plan with implementation support, 
            policy libraries, and faculty enablement—all backed by our proprietary AI algorithm suite 
            (AIRIX™, AIRS™, AICS™, AIMS™, AIPS™, AIBS™).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/ai-readiness/pricing" 
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              View Transformation Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/ai-readiness-implementation-guide.html" 
              target="_blank"
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center"
            >
              Implementation Guide
              <FileText className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Key Differentiators Strip */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-100">
              <Target className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Risk Transfer</h3>
              <p className="text-sm text-gray-600">We own the action plan and guide execution</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-100">
              <Shield className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Accreditation Aligned</h3>
              <p className="text-sm text-gray-600">Mapped to SACSCOC, HLC, MSCHE & NIST AI RMF</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-indigo-100">
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Faculty-Centric</h3>
              <p className="text-sm text-gray-600">Micro-course addresses change management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology: Diagnostic → Design → Deploy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Proven Methodology</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlike generic AI consultants, our 90-day transformation process is built specifically 
              for higher education's unique challenges and powered by our comprehensive algorithm suite.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Phase 1: Diagnostic */}
            <div className="relative">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">1. Diagnostic</h3>
                <p className="text-gray-600 text-sm mb-4">Weeks 0-2</p>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li>• 105-Q diagnostic (6 AI algorithms)</li>
                  <li>• Strategic document harvest</li>
                  <li>• Stakeholder interviews</li>
                  <li>• Baseline dashboard setup</li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                <ArrowRight className="h-6 w-6 text-indigo-300" />
              </div>
            </div>
            
            {/* Phase 2: Design */}
            <div className="relative">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">2. Design</h3>
                <p className="text-gray-600 text-sm mb-4">Weeks 2-6</p>
                <ul className="text-left text-sm text-gray-600 space-y-2">
                  <li>• Virtual design studio</li>
                  <li>• Scenario modeling (AIPS™)</li>
                  <li>• Policy kit development</li>
                  <li>• 40-page Blueprint creation</li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                <ArrowRight className="h-6 w-6 text-indigo-300" />
              </div>
            </div>
            
            {/* Phase 3: Deploy */}
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Deploy</h3>
              <p className="text-gray-600 text-sm mb-4">Weeks 6-12</p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>• 90-day sprint coaching</li>
                <li>• Weekly office hours</li>
                <li>• Faculty enablement course</li>
                <li>• KPI dashboard setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* High-Value Deliverables Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Deliverables That Drive Results</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each asset is automatically generated and updated via our proprietary algorithm suite, 
              keeping delivery costs low while maximizing value and precision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Transformation Blueprint™</h3>
              <p className="text-gray-600 text-sm mb-4">40-page board-ready narrative with visual risk matrix and budget tables</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• PDF + HTML microsite</li>
                <li>• Executive summary</li>
                <li>• Implementation roadmap</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Power BI Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">Real-time drill-downs on algorithm suite domain scores and faculty readiness metrics</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Secure embed access</li>
                <li>• Live data updates</li>
                <li>• Custom filtering</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scenario Modeling Workbook</h3>
              <p className="text-gray-600 text-sm mb-4">"What-if" sliders for funding, staffing, timeline with auto-ROI calculations</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Excel/Google Sheets</li>
                <li>• Dynamic forecasting</li>
                <li>• Risk assessment</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Policy Library</h3>
              <p className="text-gray-600 text-sm mb-4">12 modular governance documents auto-filled with institution details</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Faculty AI use policies</li>
                <li>• Student guidelines</li>
                <li>• IT governance frameworks</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Faculty Micro-Course</h3>
              <p className="text-gray-600 text-sm mb-4">4×60-min modules mapping to teaching effectiveness competencies</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Live or asynchronous</li>
                <li>• Digital badges</li>
                <li>• Completion tracking</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">90-Day Sprint Tracker</h3>
              <p className="text-gray-600 text-sm mb-4">Trello/Asana template linking backlog items to AIPS™ priority scores and AIMS™ maturity levels</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• KPI dashboards</li>
                <li>• Progress tracking</li>
                <li>• Success metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proprietary Algorithm Suite Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by 6 Proprietary AI Algorithms</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our patent-pending diagnostic science combines multiple specialized algorithms to deliver 
              the most comprehensive AI readiness assessment available for higher education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-6 text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-indigo-900">AIRIX™</h3>
              <p className="text-sm text-indigo-700">AI Readiness Index - Core institutional readiness scoring</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-900">AIRS™</h3>
              <p className="text-sm text-green-700">AI Readiness Scoring - Domain-specific maturity assessment</p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-900">AICS™</h3>
              <p className="text-sm text-yellow-700">AI Implementation Capacity Scoring - Resource capability analysis</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-red-900">AIMS™</h3>
              <p className="text-sm text-red-700">AI Implementation Maturity Scoring - Current state assessment</p>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6 text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-teal-900">AIPS™</h3>
              <p className="text-sm text-teal-700">AI Implementation Priority Scoring - Action prioritization engine</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">AIBS™</h3>
              <p className="text-sm text-gray-700">AI Benchmarking Scoring - Peer institution comparison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers - New 4-Tier Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your AI Transformation Path</h2>
            <p className="text-lg text-gray-600">
              From quick diagnostics to comprehensive transformation—find the right solution for your institution's needs and budget.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Tier 1: Pulse Check */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Pulse Check</h3>
                <p className="text-gray-600 mb-4">Lead Generation</p>
                <div className="text-3xl font-bold text-indigo-600 mb-2">$2,000</div>
                <p className="text-sm text-gray-500">Instant Results</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>15-min AIPC diagnostic</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>1-page heat-map report</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Instant PDF delivery</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Single user access</span>
                </li>
              </ul>
              
              <Link 
                href="/api/ai-blueprint/stripe/create-checkout?tier=higher-ed-ai-pulse-check&price_id=price_1RomXAELd2WOuqIWUJT4cY29" 
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center block text-sm"
              >
                Start Pulse Check
              </Link>
            </div>

            {/* Tier 2: Readiness Assessment */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Readiness Assessment</h3>
                <p className="text-gray-600 mb-4">Qualification</p>
                <div className="text-3xl font-bold text-indigo-600 mb-2">$4,995</div>
                <p className="text-sm text-gray-500">Assessment + Debrief</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>105-Q Algorithm Suite survey</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>12-page detailed report</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>60-min strategy debrief</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Up to 3 team members</span>
                </li>
              </ul>
              
              <Link 
                href="/api/ai-blueprint/stripe/create-checkout?tier=ai-readiness-comprehensive&price_id=price_1Ro4tAELd2WOuqIWaDPEWxX3" 
                className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg font-medium hover:bg-indigo-200 transition-colors text-center block text-sm"
              >
                Start Assessment
              </Link>
            </div>

            {/* Tier 3: AI Transformation Blueprint™ - FEATURED */}
            <div className="bg-white border-2 border-indigo-500 rounded-lg p-6 relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Transformation Blueprint™</h3>
                <p className="text-gray-600 mb-4">Drive Purchase</p>
                <div className="text-3xl font-bold text-indigo-600 mb-2">$24,500</div>
                <p className="text-sm text-gray-500">90-Day Program</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span><strong>All Readiness features +</strong></span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>150-question comprehensive diagnostic</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>40-page Blueprint™ report</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Power BI dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Executive workshop</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Faculty micro-course</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>90-day implementation</span>
                </li>
              </ul>
              
              <Link 
                href="/api/ai-blueprint/stripe/create-checkout?tier=ai-transformation-blueprint&price_id=price_1RomY5ELd2WOuqIWd3wUhiQm" 
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center block"
              >
                Get Blueprint™
              </Link>
            </div>

            {/* Tier 4: Enterprise Partnership */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 text-white hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Enterprise Partnership</h3>
                <p className="text-gray-300 mb-4">Long-term ARR</p>
                <div className="text-3xl font-bold text-yellow-400 mb-2">$75,000</div>
                <p className="text-sm text-gray-400">Annual Retainer</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span><strong>Full Blueprint™ included</strong></span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>150-question comprehensive diagnostic</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>Quarterly re-assessments</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>Slack advisory channel</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>White-glove support</span>
                </li>
              </ul>
              
              <Link 
                href="https://calendly.com/jeremyestrella/30min?month=2025-07" 
                className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-center block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Enterprise Consultation
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-indigo-50 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Value Communication Promise</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-indigo-700">
                <div>
                  <strong>Risk Transfer:</strong> We don't just diagnose; we own the action plan and guide execution through the first 90 days.
                </div>
                <div>
                  <strong>ROI Clarity:</strong> Scenario workbook shows expected enrollment uplift, cost avoidance, and grant eligibility improvements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transforming Higher Education AI Adoption</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Cut our time-to-pilot by 60% in one term. The Blueprint gave us a clear roadmap 
                that our board could actually understand and approve."
              </p>
              <div className="text-sm text-gray-500">
                <p className="font-semibold">Dr. Sarah Chen</p>
                <p>Provost, Regional State University</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The faculty micro-course was a game-changer. We went from 15% faculty 
                AI adoption to 78% in just one semester."
              </p>
              <div className="text-sm text-gray-500">
                <p className="font-semibold">Prof. Michael Rodriguez</p>
                <p>CIO, Liberal Arts College</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Unlike generic AI consultants, NorthPath understood our accreditation 
                requirements and mapped everything to SACSCOC standards."
              </p>
              <div className="text-sm text-gray-500">
                <p className="font-semibold">Dr. Jennifer Walsh</p>
                <p>VP Academic Affairs, Community College System</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Institution's AI Future?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join forward-thinking institutions using our Blueprint™ methodology to move from 
            AI readiness to reality. Start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/api/ai-blueprint/stripe/create-checkout?tier=ai-transformation-blueprint&price_id=price_1RomY5ELd2WOuqIWd3wUhiQm" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Start AI Transformation Blueprint™
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/api/ai-blueprint/stripe/create-checkout?tier=higher-ed-ai-pulse-check&price_id=price_1RomXAELd2WOuqIWUJT4cY29" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors inline-flex items-center justify-center"
            >
              Begin with Pulse Check
            </Link>
          </div>
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
