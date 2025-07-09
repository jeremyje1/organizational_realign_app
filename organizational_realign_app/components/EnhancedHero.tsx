'use client';

import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ui/responsive-image';
import { ArrowRight, ChevronRight } from 'lucide-react';

// Safe Link wrapper to avoid "Cannot read properties of undefined (reading 'call')" error
function Link({ href, children, className, onClick, ...props }: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  return (
    <NextLink href={href} {...props} onClick={onClick} className={className}>
      {children}
    </NextLink>
  );
}

export default function EnhancedHero() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-28 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/optimized-041412-60.jpg"
          alt="NorthPath Strategies organizational realignment background"
          fill
          quality={90}
          priority
          className="object-cover"
          title="Organizational Excellence Background"
          sizes="100vw"
          fetchPriority="high"
          structuredData={true}
          overlay={true}
          overlayType="diagonal"
          overlayOpacity={0.6}
        />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Gradient orbs for visual interest with animations */}
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-200/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        {/* Animated small floating particles - reduced opacity for better visibility against background image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 50 + 10,
                height: Math.random() * 50 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Grid pattern overlay with subtle animation */}
        <motion.div 
          className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
          animate={{ 
            backgroundPosition: ['0px 0px', '20px 20px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        ></motion.div>
      </div>

      <div className="container relative mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center z-20">
        {/* Text Content Section */}
        <motion.div 
          className="w-full lg:w-1/2 text-center lg:text-left lg:pr-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Tag line */}
          <motion.div 
            variants={itemVariants}
            className="inline-block mb-6 px-4 py-1.5 bg-blue-600 text-white font-medium text-sm rounded-full"
          >
            Institutional & Organizational Transformation
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-shadow-lg"
          >
            Redesign the Systems. <span className="text-blue-200">Align the Strategy. Transform the Institution.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto lg:mx-0 text-shadow-md"
          >
            NorthPath Strategies partners with mission-driven colleges, universities, nonprofits, healthcare, and businesses to solve the root causes of misalignment, fragmentation, and underperformance, not just the symptoms.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
            <Link href="/contact">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                aria-label="Schedule a discovery call"
              >
                Schedule a Call
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link href="/resources/overview">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                aria-label="Download our overview PDF"
              >
                Download Overview
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Professional credibility indicator - simplified and without stats */}
          <motion.div 
            variants={itemVariants}
            className="hidden md:flex items-center gap-3 text-sm text-white flex-wrap text-shadow-sm"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-medium">Higher Education</span>
            <span className="text-white/50 mx-2">•</span>
            <span>Nonprofit Expertise</span>
            <span className="text-white/50 mx-2 hidden lg:inline-block">•</span>
            <span className="hidden lg:inline-block">Systems Transformation</span>
          </motion.div>
        </motion.div>

        {/* Hero Image Section */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative"
          >
            {/* Main hero image - updated with backdrop blur for better visibility against background */}
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl relative z-10">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <ResponsiveImage
                  src="/images/organizational-dashboard.svg" 
                  alt="NorthPath Organizational Dashboard showing realignment metrics and KPIs"
                  width={600}
                  height={450}
                  className="object-cover"
                  priority
                  title="Organizational Realignment Dashboard"
                  quality={95}
                  structuredData={true}
                />
              </div>
              
              {/* Floating element for visual interest with animation - updated to remove specific stats */}
              <motion.div 
                className="absolute -right-8 -bottom-8 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3"
                animate={{
                  y: [0, -5, 0],
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Systemic</div>
                  <div className="text-sm font-bold">Transformation</div>
                </div>
              </motion.div>
            </div>

            {/* Background decoration with subtle animations - updated colors for visibility */}
            <motion.div 
              className="absolute top-8 -right-8 w-full h-full border-2 border-dashed border-white/50 rounded-2xl -z-10"
              animate={{
                rotate: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div 
              className="absolute -top-8 left-8 w-full h-full border-2 border-dashed border-white/40 rounded-2xl -z-10"
              animate={{
                rotate: [0, -1, 0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            ></motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider with animation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 text-white"
          animate={{
            y: [0, 2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,142.53,107.1,221.49,89.64Z" fill="currentColor"></path>
        </motion.svg>
      </div>
    </section>
  );
}
