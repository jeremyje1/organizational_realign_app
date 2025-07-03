/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Full-width contrasting CTA band
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Harness NorthPath&apos;s proprietary algorithms today.
          </h2>
          
          {/* Supporting Text */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the organizations already transforming with our patent-pending DSCH, CRF, and LEI methodologies.
          </p>

          {/* CTA Button */}
          <Button 
            asChild 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/assessment/start" className="flex items-center gap-3">
              <Zap size={24} />
              Start Your Assessment
              <ArrowRight size={24} />
            </Link>
          </Button>

          {/* Trust Badge */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              🔒 SOC 2 Compliant
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              ⚡ Patent Pending Technology
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-2">
              🎯 Proven Results
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
