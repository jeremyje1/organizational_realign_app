'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Main Hero component with fixed background - Updated
export default function ModernHero() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="relative min-h-screen flex items-center justify-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-slate-100">
        <Image
          src="/images/pages-background-60.jpg"
          alt="Professional consulting background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      
      {/* Light Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-60" />
      
      {/* Content - Right aligned */}
      <div className="relative z-10 w-full max-w-7xl px-6 text-right mr-8" style={{ zIndex: 10 }}>
        <div className="max-w-2xl ml-auto">
          
          {/* Badge with logo and darker colors */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 text-white text-sm font-medium mb-8 shadow-lg"
          >
            <Image
              src="/images/optimized-hero-logo-60.jpg"
              alt="NorthPath Strategies Logo"
              width={24}
              height={24}
              className="rounded-full"
            />
            <Zap className="w-4 h-4 text-amber-400" />
            AI-Powered Organizational Intelligence
            <Sparkles className="w-4 h-4 text-sky-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-tight drop-shadow-lg">
              Reduce Operating Costs by
              <br />
              <span 
                className="gradient-text animate-gradient-x bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-500"
                style={{
                  background: 'linear-gradient(to right, #059669, #2563EB, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                23% in 90 Days
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl lg:text-2xl text-slate-800 font-medium max-w-2xl leading-relaxed drop-shadow-sm bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4"
            >
              <span className="font-bold text-emerald-700">Fortune 500 Results.</span> Expert strategic consulting with AI-powered organizational analysis. Get your roadmap to measurable efficiency gains in under 15 minutes.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-end items-end mb-8"
          >
            <Link href="/assessment/start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                Get My Savings Report - FREE
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/resources/overview" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-white font-medium text-lg px-8 py-4 rounded-2xl backdrop-blur-md hover:scale-105 transition-all duration-300 group"
              >
                Download Overview
              </Button>
            </Link>
            
            <Link href="mailto:jeremy@northpathstrategies.com?subject=Enterprise%20Sales%20Inquiry">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-white font-medium text-lg px-8 py-4 rounded-2xl backdrop-blur-md hover:scale-105 transition-all duration-300 group"
              >
                Book Strategy Call
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-slate-800 font-medium text-sm bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 inline-block"
          >
            ✅ 500+ Organizations Optimized • $2.4M Average Annual Savings • 95% Success Rate
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-600/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-slate-600/80 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}