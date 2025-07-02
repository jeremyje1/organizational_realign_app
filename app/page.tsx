import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Check, ArrowRight, BarChart3, Users, Brain, Shield, Calendar,
  Target, TrendingUp, Award, CheckCircle, Star, Quote
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-200">
              <div className="text-3xl font-bold text-blue-800 mb-2">150+</div>
              <div className="text-slate-600 text-sm">Organizations Transformed</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-200">
              <div className="text-3xl font-bold text-blue-800 mb-2">89%</div>
              <div className="text-slate-600 text-sm">Efficiency Improvements</div>
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
                    <h3 className="font-semibold text-slate-900">Operational Inefficiencies</h3>
                    <p className="text-slate-600">Duplicated processes and unclear roles leading to confusion and delays</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Communication Breakdowns</h3>
                    <p className="text-slate-600">Siloed departments and poor information flow hampering decision-making</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
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

      {/* Methodology Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Proven Methodology</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A systematic approach that combines human expertise with AI-powered analysis to drive transformational change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Assessment</h3>
              <p className="text-slate-600 text-sm">
                Comprehensive evaluation of your organization's current alignment, culture, and processes
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900">AI Analysis</h3>
              <p className="text-slate-600 text-sm">
                Advanced algorithms identify patterns, gaps, and opportunities for improvement
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Strategic Planning</h3>
              <p className="text-slate-600 text-sm">
                Expert consultants develop customized realignment strategies based on insights
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Implementation</h3>
              <p className="text-slate-600 text-sm">
                Guided execution of your transformation plan with ongoing support and coaching
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 text-xl font-bold">
                5
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Monitoring</h3>
              <p className="text-slate-600 text-sm">
                Continuous tracking of progress and outcomes to ensure lasting transformation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powerful tools and insights to support your organizational transformation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>AI-Enhanced Analysis</CardTitle>
                <CardDescription>Advanced algorithms identify patterns and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pattern recognition</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Gap analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Optimization recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Multi-stakeholder input and collaborative planning</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Multi-user assessments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Role-based access controls</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Real-time collaboration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Expert Consultations</CardTitle>
                <CardDescription>Connect with organizational alignment specialists</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>One-on-one expert sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Implementation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Strategic planning support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>Secure infrastructure for sensitive organizational data</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Enterprise-grade encryption</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Compliance standards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Data privacy protection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real results from organizations that have transformed with North Path Strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
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

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
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
                "The AI-powered analysis revealed optimization opportunities that saved us $1.2M annually. The ROI on this assessment exceeded all our expectations."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Michael Rodriguez</h4>
                  <p className="text-sm text-slate-600">CFO, Regional University</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
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

      {/* Founder Bio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-600/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative rounded-2xl shadow-xl bg-gradient-to-br from-slate-100 to-slate-200 h-96 w-80 mx-auto flex items-center justify-center">
                    {/* Replace this div with your actual Image component once photo is added */}
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">JE</span>
                      </div>
                      <p className="text-slate-600 text-sm">Professional Photo</p>
                      <p className="text-slate-500 text-xs">Coming Soon</p>
                    </div>
                  </div>
                  {/* Uncomment when photo is ready:
                  <Image
                    src="/images/jeremy-estrella-founder.jpg"
                    alt="Jeremy Estrella, Founder of NorthPath Strategies"
                    width={400}
                    height={500}
                    className="relative rounded-2xl shadow-xl object-cover"
                    priority
                  />
                  */}
                </div>
              </div>
              
              <div className="lg:order-1">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Meet Our Founder
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Jeremy Estrella
                </h2>
                <h3 className="text-xl text-blue-600 font-semibold mb-6">
                  Founder, NorthPath Strategies
                </h3>
                
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Jeremy Estrella is a higher education strategist and systems architect with over 15 years of experience leading institutional transformation across some of the nation's largest and most complex colleges. He is the founder of NorthPath Strategies, a consulting firm that helps institutions streamline operations, realign organizational structures, and implement student-centered strategies that drive measurable improvements in retention, completion, and institutional performance.
                  </p>
                  
                  <p>
                    Jeremy's vision for NorthPath Strategies emerged from a consistent observation throughout his career: <strong>outdated, siloed, and bureaucratic organizational structures often stood in the way of student success.</strong> He saw firsthand how unclear lines of responsibility, delayed decisions, and misaligned policy implementation negatively impacted students; causing breakdowns in advising, financial aid confusion, and a lack of timely support when students needed it most.
                  </p>
                  
                  <p>
                    Motivated by a commitment to operational clarity and student impact, Jeremy played a key leadership role in one of the largest structural reorganizations in the country, helping to transform the largest institution of higher education in the state of Oregon. His efforts guided the transition from fragmented multi-campus operations to a unified model, resulting in reduced duplication, more responsive services, and a consistent student experience across all locations.
                  </p>
                  
                  <p>
                    Known for his ability to cut through complexity and focus teams on actionable outcomes, Jeremy works with executive leaders, department chairs, and frontline staff to design structures that support, not obstruct, the student journey. <strong>NorthPath Strategies was founded to help institutions identify what's not working, build better systems, and move forward with purpose and confidence.</strong>
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <Link href="/contact">Schedule a Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
                    <Link href="/about">Learn More About Our Approach</Link>
                  </Button>
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