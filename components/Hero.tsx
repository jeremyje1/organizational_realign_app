/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Full-viewport hero section with gradient overlay and dual CTAs
 */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { QuickCheckout } from '@/components/payments/QuickCheckout';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/northpath-hero-mountain.jpg"
          alt="NorthPath Strategies - Strategic path to organizational excellence"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/60 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Patent Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-blue-400/30">
              🔒 Patent Pending • SOC 2 Compliant
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
            Navigate Your Path to 
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Organizational Excellence
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto text-gray-200">
            Chart a clear course to transformation with NorthPath's proprietary assessment engine and strategic expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <QuickCheckout 
              source="hero"
              trigger={
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                >
                  <ArrowRight size={20} className="mr-2" />
                  Start Assessment Today
                </Button>
              }
            />
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Calendar size={20} />
                Schedule a Demo
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-sm text-gray-300">
            <p className="mb-4">Trusted by organizations across multiple sectors</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="font-medium">Universities</span>
              <span className="font-medium">Hospitals</span>
              <span className="font-medium">Nonprofits</span>
              <span className="font-medium">Government</span>
              <span className="font-medium">Enterprise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToAbout}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Scroll to about section"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
