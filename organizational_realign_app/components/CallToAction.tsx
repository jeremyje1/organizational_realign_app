/**
 * Premium Call-to-Action Section - Enterprise-grade design with advanced animations
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Play, Sparkles, Shield, Zap } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-32 bg-gradient-to-br from-np-deep-blue via-np-primary-blue to-np-bright-blue text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-np-light-blue/10 via-transparent to-np-bright-blue/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-np-primary-blue/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-np-light-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-np-bright-blue/5 rounded-full blur-3xl animate-pulse-glow"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/5"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="mb-16">
            <span className="inline-block px-8 py-4 glass-dark text-cyan-300 rounded-full text-sm font-bold mb-8 shadow-xl border border-cyan-500/20">
              GET STARTED TODAY
            </span>
            
            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-4 animate-gradient-shift">
                Organization?
              </span>
            </h2>
            
            {/* Supporting Text */}
            <p className="text-2xl md:text-3xl text-slate-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light">
              Join 500+ organizations that have achieved measurable transformation
            </p>
            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get started with NorthPath&apos;s proven AI-powered methodologies and expert guidance. 
              Take the first step toward measurable organizational improvement.
            </p>
          </div>

          {/* Enhanced Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-premium rounded-2xl p-6 border border-white/10 hover-lift">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Insights</h3>
              <p className="text-slate-300 text-sm">Get immediate results from our AI-powered diagnostic</p>
            </div>
            
            <div className="glass-premium rounded-2xl p-6 border border-white/10 hover-lift">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Risk-Free Trial</h3>
              <p className="text-slate-300 text-sm">30-day money-back guarantee on all packages</p>
            </div>
            
            <div className="glass-premium rounded-2xl p-6 border border-white/10 hover-lift">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Expert Support</h3>
              <p className="text-slate-300 text-sm">15+ years of proven organizational expertise</p>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="btn-premium bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-cyan-400/30"
            >
              <Link href="/assessment/secure-access" className="flex items-center gap-4">
                <Play size={24} />
                Start Assessment
                <ArrowRight size={24} />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="glass-premium border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm"
            >
              <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                <Calendar size={24} />
                Schedule Expert Call
              </a>
            </Button>
          </div>

          {/* Enhanced Trust Section */}
          <div className="glass-dark rounded-3xl p-10 border border-white/10 shadow-2xl">
            {/* Contact Information */}
            <div className="text-slate-200 mb-8">
              <p className="text-2xl mb-6 font-semibold">Questions? We&apos;re here to help.</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-lg">
                <a href="mailto:info@northpathstrategies.org" className="hover:text-cyan-400 transition-colors flex items-center gap-3 group">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full group-hover:animate-pulse"></div>
                  info@northpathstrategies.org
                </a>
                <div className="hidden md:block w-px h-6 bg-slate-500"></div>
                <span className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  Houston, TX Headquarters
                </span>
              </div>
            </div>

            {/* Enhanced Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-slate-300">
              <div className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-400">SOC 2 Compliant</span>
                <span className="text-xs text-slate-400">Enterprise Security</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-purple-400">Patent Pending</span>
                <span className="text-xs text-slate-400">AI Technology</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-cyan-400">15+ Years</span>
                <span className="text-xs text-slate-400">Proven Experience</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-yellow-400">500+ Clients</span>
                <span className="text-xs text-slate-400">Trusted Worldwide</span>
              </div>
            </div>

            {/* Final value statement */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-slate-300 text-lg font-light italic">
                &quot;Transform your organization with confidence. Our proven methodologies and expert guidance 
                ensure measurable results and sustainable change.&quot;
              </p>
              <p className="text-cyan-400 font-semibold mt-4">— Jeremy Estrella, Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}