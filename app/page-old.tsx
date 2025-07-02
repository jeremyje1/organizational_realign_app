import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Check, ArrowRight, BarChart3, Users, Brain, Shield, Calendar,
  Target, TrendingUp, Award, CheckCircle, Star, Quote,
  Mail, Phone, MapPin
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">North Path</span>
              <span className="text-xl font-light text-gray-600"> Strategies</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/assessment/start">Start Assessment</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-800 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-800 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-800 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/assessment/start">Start Assessment</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold">North Path</span>
                <span className="text-xl font-light text-gray-300"> Strategies</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Strategic organizational realignment consulting powered by AI-enhanced assessments. 
              Transform your organization with data-driven insights and expert guidance.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">contact@northpathstrategies.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Remote & On-site Consulting</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/assessment/start" className="text-gray-300 hover:text-white transition-colors">
                  Organizational Assessment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Strategic Consulting
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Implementation Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 North Path Strategies. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-blue-400/30">
                  Strategic Organizational Consulting
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Strategic Organizational Realignment That 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Delivers Results</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed">
                Transform your organization with AI-powered assessments, expert strategic guidance, and proven methodologies that create measurable impact.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <span className="text-slate-200">Expert Strategic Consultants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-200">AI-Enhanced Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-slate-200">Measurable Results</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg" asChild>
                  <Link href="/assessment/start" className="flex items-center">
                    Start Your Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-300 hover:bg-slate-800" asChild>
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-600/30 bg-gradient-to-br from-slate-800 to-slate-900 p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Organizational Assessment</h3>
                    <div className="px-3 py-1 bg-green-600 rounded-full text-xs text-white">Complete</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-400">92%</div>
                      <div className="text-xs text-slate-300">Alignment Score</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-400">+34%</div>
                      <div className="text-xs text-slate-300">Efficiency Gain</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Strategy Alignment</span>
                      <span className="text-sm text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full">
                      <div className="h-2 bg-blue-400 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Team Collaboration</span>
                      <span className="text-sm text-green-400">78%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full">
                      <div className="h-2 bg-green-400 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Trusted by Forward-Thinking Organizations
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Strategic consulting expertise across industries, from startups to Fortune 500 companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-200">
              <div className="text-3xl font-bold text-blue-800 mb-2">150+</div>
              <div className="text-slate-600 text-sm">Organizations Transformed</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-200">
              <div className="text-3xl font-bold text-blue-800 mb-2">89%</div>
              <div className="text-slate-600 text-sm">Report Improved Efficiency</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-200">
              <div className="text-3xl font-bold text-blue-800 mb-2">$2.4M</div>
              <div className="text-slate-600 text-sm">Average ROI Achieved</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-200">
              <div className="text-3xl font-bold text-blue-800 mb-2">15+</div>
              <div className="text-slate-600 text-sm">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Organizations Struggle With Alignment Challenges
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Strategic Misalignment</h3>
                    <p className="text-slate-600">Teams working toward different goals, wasting resources and effort</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Communication Breakdowns</h3>
                    <p className="text-slate-600">Silos prevent effective collaboration and knowledge sharing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Inefficient Processes</h3>
                    <p className="text-slate-600">Outdated workflows that don't support current business objectives</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Proven Solution</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Comprehensive Assessment</h4>
                      <p className="text-slate-600">AI-enhanced evaluation of your organization's current state</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Strategic Planning</h4>
                      <p className="text-slate-600">Expert-guided roadmap for organizational transformation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Implementation Support</h4>
                      <p className="text-slate-600">Ongoing guidance to ensure successful change adoption</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced technology meets strategic expertise to deliver unprecedented insights and results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-slate-900">AI-Enhanced Analysis</CardTitle>
                <CardDescription className="text-slate-600">Advanced insights powered by cutting-edge AI technology</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Pattern recognition and trend analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Predictive recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Real-time insights dashboard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-slate-900">Team Collaboration</CardTitle>
                <CardDescription className="text-slate-600">Collaborative assessment and planning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Multi-stakeholder assessments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Real-time collaboration features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Secure data sharing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-slate-900">Expert Consultations</CardTitle>
                <CardDescription className="text-slate-600">Direct access to strategic alignment specialists</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">One-on-one expert sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Implementation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Strategic planning support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real results from organizations that have transformed with North Path Strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <Quote className="h-6 w-6 text-slate-400 mb-4" />
              <p className="text-slate-700 mb-6">
                "North Path's assessment identified critical misalignments we weren't aware of. Their strategic guidance helped us achieve a 45% improvement in team efficiency within 6 months."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Sarah Johnson</h4>
                  <p className="text-sm text-slate-600">CTO, TechNova Inc.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <Quote className="h-6 w-6 text-slate-400 mb-4" />
              <p className="text-slate-700 mb-6">
                "The collaborative features allowed our global team to participate meaningfully. The insights we gained fundamentally changed how we structure our organization."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Michael Chen</h4>
                  <p className="text-sm text-slate-600">CEO, Growth Ventures</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <Quote className="h-6 w-6 text-slate-400 mb-4" />
              <p className="text-slate-700 mb-6">
                "The expert consultation sessions were invaluable. Having a strategic partner guide us through implementation made all the difference in our transformation success."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  JM
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Jessica Martinez</h4>
                  <p className="text-sm text-slate-600">VP Operations, Global Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Organization?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-slate-200">
            Take the first step towards strategic alignment, increased efficiency, and measurable results. 
            Start with our comprehensive assessment or schedule a consultation with our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg" asChild>
              <Link href="/assessment/start" className="flex items-center">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 text-slate-300 hover:bg-slate-800" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
