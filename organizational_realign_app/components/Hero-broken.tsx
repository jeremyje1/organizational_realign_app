/**
 * Modern Premium Hero Section - Dramatically Improved Design
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Star, Target, Zap, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-500/20"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            />
          ))}
        </div>
        
        {/* Large background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Enhanced Content */}
            <div className="space-y-8 text-white">
              {/* Premium Status Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg animate-fade-in">
                <Sparkles className="w-5 h-5 mr-3 text-yellow-400" />
                <span className="text-sm font-semibold text-white">Patent-Pending AI • SOC 2 Certified • 15+ Years Excellence</span>
              </div>

              {/* Main Headline - More Dramatic */}
              <div className="space-y-6 animate-slide-up">
                <h1 className="text-5xl lg:text-7xl font-bold leading-none font-serif">
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
                    Transform Your Organization
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl mt-2">
                    with AI-Powered Insights
                  </span>
                </h1>

                <h2 className="text-xl lg:text-2xl font-light text-blue-100 leading-relaxed max-w-3xl">
                  Patent-pending optimization algorithms that analyze your organizational structure and deliver 
                  <span className="font-semibold text-white"> measurable transformation roadmaps</span> in minutes, not months.
                </h2>

                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-200">95% Success Rate</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-200">500+ Organizations</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-200">$2.4M Avg. Savings</span>
                  </div>
                </div>
              </div>

              {/* Clear Navigation Options */}
              <div className="space-y-6 pt-8 animate-slide-up delay-400">
                <h3 className="text-2xl font-bold text-white mb-6">Choose Your Path Forward:</h3>
                
                {/* Primary Action - Assessment */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/30 shadow-2xl">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">1. Start Your Free Assessment</h4>
                      <p className="text-blue-200 mb-4 leading-relaxed">
                        Get instant organizational insights with our AI-powered diagnostic. 
                        No registration required • Results in 15 minutes • Industry benchmarks included
                      </p>
                      <Link href="/assessment/start">
                        <Button 
                          size="lg"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-xl group transform hover:scale-105 transition-all duration-300"
                        >
                          <span>Start Free Assessment</span>
                          <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Secondary Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Learn About Services */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">2. Explore Our Services</h4>
                    </div>
                    <p className="text-blue-200 mb-4">
                      Learn about our consultation packages and implementation support options.
                    </p>
                    <Button 
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl group"
                      asChild
                    >
                      <Link href="#services">
                        View Services <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Meet the Founder */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">3. Meet Our Founder</h4>
                    </div>
                    <p className="text-blue-200 mb-4">
                      Learn about Jeremy Estrella&apos;s 15+ years of organizational transformation expertise.
                    </p>
                    <Button 
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl group"
                      asChild
                    >
                      <Link href="#about">
                        Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="flex items-center justify-center space-x-8 pt-8 opacity-90">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-blue-200">SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-blue-200">Patent-Pending Technology</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-blue-200">Enterprise-Grade Security</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Visual */}
            <div className="hidden lg:block relative animate-slide-up delay-600">
              <div className="relative">
                {/* Main visual container */}
                <div className="relative w-full h-[600px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                  
                  {/* Animated content inside */}
                  <div className="absolute inset-6 space-y-6">
                    {/* Header */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">Live Assessment Preview</h3>
                      <p className="text-blue-200">Real-time organizational insights</p>
                    </div>

                    {/* Mock metrics */}
                    <div className="space-y-4">
                      {[
                        { label: 'Organizational Health', value: 78, color: 'from-green-400 to-emerald-500' },
                        { label: 'AI Readiness Score', value: 65, color: 'from-blue-400 to-cyan-500' },
                        { label: 'Efficiency Index', value: 82, color: 'from-purple-400 to-pink-500' },
                        { label: 'Transformation Potential', value: 91, color: 'from-orange-400 to-red-500' }
                      ].map((metric, index) => (
                        <div key={metric.label} className="space-y-2">
                          <div className="flex justify-between text-white">
                            <span className="text-sm font-medium">{metric.label}</span>
                            <span className="text-sm font-bold">{metric.value}%</span>
                          </div>
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                              style={{ 
                                width: `${metric.value}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to action inside preview */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                        <p className="text-white text-sm mb-2 font-semibold">Start your transformation today</p>
                        <div className="text-xs text-blue-200">✓ No credit card required ✓ Instant results ✓ Industry benchmarks</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-green-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 left-4 w-6 h-6 bg-blue-400/30 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute top-1/3 right-8 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
                </div>

                {/* Decorative elements around the main visual */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-sm">Scroll to explore</div>
          <div className="w-1 h-8 bg-white/30 rounded-full relative overflow-hidden">
            <div className="w-full h-2 bg-white rounded-full absolute top-0 animate-bounce"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </section>
  );
}
