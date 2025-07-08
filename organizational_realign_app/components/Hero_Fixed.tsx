/**
 * Modern Premium Hero Section - Navigation-Based Design
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Star, BarChart3, Target, Zap, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-background-60.jpg)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Enhanced Brand Gradient Overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-blue-700/75"></div>
      
      {/* Additional Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/10 to-blue-400/10"></div>
        
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
          <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                <span className="text-sm font-semibold tracking-wide">AI-POWERED TRANSFORMATION</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-6 animate-slide-up">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Transform Your Organization with
                  <span className="block bg-gradient-to-r from-blue-300 via-blue-400 to-white bg-clip-text text-transparent mt-2">
                    AI-Powered Insights
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                  Navigate complex organizational challenges with our proprietary algorithms.
                  <strong className="block text-white mt-2">Get measurable results in 90 days or less.</strong>
                </p>
              </div>

              {/* Trust Indicators - Compact Version */}
              <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-blue-200">95% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-200">$2.4M Avg. Savings</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-blue-200">500+ Organizations</span>
                </div>
              </div>

              {/* Choose Your Path Forward Section */}
              <div className="space-y-6 animate-slide-up delay-400">
                <div className="pt-8 border-t border-white/20">
                  <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                    Choose Your Path Forward
                  </h2>
                  
                  <div className="grid gap-4">
                    {/* Primary Assessment Path */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">Start Free Assessment</h3>
                          <p className="text-blue-200 text-sm mb-4">
                            15-minute AI-powered diagnostic. Instant insights, actionable roadmap. 
                            No registration required.
                          </p>
                          <Button 
                            asChild
                            size="lg" 
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Link href="/assessment/start" className="flex items-center justify-center gap-2">
                              Take Assessment
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Navigation Options */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-blue-400" />
                          </div>
                          <h4 className="font-semibold">Explore Services</h4>
                        </div>
                        <p className="text-sm text-blue-200 mb-3">
                          View our transformation packages and expert consultation options.
                        </p>
                        <Button 
                          asChild
                          variant="outline" 
                          size="sm" 
                          className="w-full border-white/30 text-white hover:bg-white/10"
                        >
                          <Link href="#services">
                            View Services
                          </Link>
                        </Button>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-green-400" />
                          </div>
                          <h4 className="font-semibold">Meet Our Founder</h4>
                        </div>
                        <p className="text-sm text-blue-200 mb-3">
                          Learn about Jeremy&apos;s 15+ years of transformation expertise.
                        </p>
                        <Button 
                          asChild
                          variant="outline" 
                          size="sm" 
                          className="w-full border-white/30 text-white hover:bg-white/10"
                        >
                          <Link href="#about">
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
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
                        { label: 'Organizational Health', value: '87%', color: 'bg-green-500' },
                        { label: 'Efficiency Score', value: '72%', color: 'bg-blue-500' },
                        { label: 'Cultural Alignment', value: '91%', color: 'bg-yellow-500' },
                        { label: 'Change Readiness', value: '64%', color: 'bg-orange-500' }
                      ].map((metric, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">{metric.label}</span>
                            <span className="text-lg font-bold text-white">{metric.value}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`${metric.color} h-2 rounded-full transition-all duration-1000`}
                              style={{ 
                                width: metric.value,
                                animationDelay: `${index * 200}ms`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Insights Preview */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-blue-300">AI Insight</span>
                      </div>
                      <p className="text-sm text-white/90">
                        &quot;Consider consolidating departments X and Y to reduce overhead by 23% 
                        while maintaining operational efficiency.&quot;
                      </p>
                    </div>
                  </div>

                  {/* Floating indicators */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 left-4 w-6 h-6 bg-blue-500/30 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute top-1/3 right-8 w-4 h-4 bg-yellow-500/30 rounded-full animate-pulse delay-1000"></div>
                </div>

                {/* Decorative elements around the main visual */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1200"></div>
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
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
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
