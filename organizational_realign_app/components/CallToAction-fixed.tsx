/**
 * Modern Call-to-Action Section - Premium business template style
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Play } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="hero-section py-32 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/30 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/15 rounded-full blur-2xl animate-float delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Headline */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent mt-2">
              Organization?
            </span>
          </h2>
          
          {/* Enhanced Supporting Text */}
          <p className="text-2xl md:text-3xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Get started with NorthPath&apos;s proven methodologies and expert guidance. 
            <strong className="text-cyan-300 block mt-2">Take the first step toward measurable organizational improvement.</strong>
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50 px-12 py-8 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <Link href="#consultation-packages" className="flex items-center gap-4">
                <Play size={24} />
                View Consultation Packages
                <ArrowRight size={24} />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2"
            >
              <Link href="https://calendly.com/jeremyestrella/30min" target="_blank" className="flex items-center gap-4">
                <Calendar size={24} />
                Schedule Free Consultation
              </Link>
            </Button>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="flex justify-center items-center gap-8 text-blue-200 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              SOC 2 Compliant
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              95% Success Rate
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              15+ Years Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
