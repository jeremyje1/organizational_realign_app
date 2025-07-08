'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Animated statistics component
function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const stats = [
    { number: '500+', label: 'Organizations Transformed', icon: Users },
    { number: '95%', label: 'Client Satisfaction Rate', icon: TrendingUp },
    { number: '12M+', label: 'In Cost Savings Generated', icon: Sparkles },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate={controls}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="glass rounded-2xl p-6 text-center text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber-400" />
          <motion.div
            className="text-3xl font-bold mb-2 text-white drop-shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
          >
            {stat.number}
          </motion.div>
          <div className="text-white/90 text-sm font-medium drop-shadow-md">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Main Hero component
export default function ModernHero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-red-500"
      style={{
        backgroundImage: 'url("/images/optimized-hero-jul6-60.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Debug overlay */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded z-50">
        Testing: Should see image or red background
      </div>
      
      {/* Very light overlay for text readability */}
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-6xl mx-auto">
          
          {/* Badge with explicit new color scheme */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-sky-400/30 rounded-full px-6 py-3 text-white text-sm font-medium mb-8 shadow-lg"
          >
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
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
              Transform Your
              <br />
              <span 
                className="gradient-text animate-gradient-x bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-amber-400 to-sky-300 drop-shadow-2xl"
                style={{
                  background: 'linear-gradient(to right, #38BDF8, #FACC15, #7DD3FC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Organization
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl lg:text-2xl text-white font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-lg px-6 py-4"
            >
              Strategic consulting meets AI-powered insights. Unlock your organization&apos;s 
              potential with data-driven transformation strategies that deliver measurable results.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            <Link href="/assessment/start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-amber-500 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsVideoModalOpen(true)}
              className="glass border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-4 rounded-2xl backdrop-blur-md hover:scale-105 transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-white font-medium text-sm bg-black/30 backdrop-blur-sm rounded-lg px-6 py-3 inline-block"
          >
            Trusted by Fortune 500 companies and leading institutions worldwide
          </motion.div>

          {/* Animated Statistics */}
          <AnimatedStats />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gradient-to-br from-sky-500 to-amber-500 flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                <p className="text-xl">Demo video coming soon</p>
              </div>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
