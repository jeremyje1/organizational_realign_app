/**
 * Professional Consultant Hero Section - Clean Business Design
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      className="relative pt-24 pb-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/optimized-image-60.webp')"
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            
            {/* Content */}
            <div className="max-w-4xl text-center space-y-8">
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 leading-tight drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.8)'}}>
                  Transform Your Organization with
                  <span className="text-blue-900 block drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.8)'}}>Strategic Expertise</span>
                </h1>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-lg px-8 py-6 shadow-xl border-2 border-yellow-400">
                  <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Link href="/checkout">
                  <Button type="button" size="lg" className="text-lg px-8 py-6 border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white backdrop-blur-sm bg-white/95 shadow-xl font-semibold">
                    Try Assessment Platform
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
