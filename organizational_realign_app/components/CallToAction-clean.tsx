/**
 * Modern Call-to-Action Section - Premium business template style
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Play } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
              Organization?
            </span>
          </h2>
          
          {/* Supporting Text */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Get started with NorthPath&apos;s proven methodologies and expert guidance. 
            Take the first step toward measurable organizational improvement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href="/assessment/start" className="flex items-center gap-3">
                <Play size={20} />
                Start Free Assessment
                <ArrowRight size={20} />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-10 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Calendar size={20} />
                Schedule 30min Call
              </a>
            </Button>
          </div>

          {/* Contact Information */}
          <div className="text-blue-200">
            <p className="text-lg mb-4 font-medium">Questions? We&apos;re here to help.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
              <a href="mailto:info@northpathstrategies.org" className="hover:text-white transition-colors flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                info@northpathstrategies.org
              </a>
              <div className="hidden md:block w-px h-4 bg-blue-400"></div>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                Houston, TX Headquarters
              </span>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-300">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              SOC 2 Compliant
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Patent Pending Technology
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
