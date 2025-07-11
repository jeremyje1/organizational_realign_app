'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Shield,
  Lightbulb,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const values = [
  {
    icon: Shield,
    title: "Systems Thinking",
    description: "Comprehensive organizational frameworks designed for institutional transformation",
    color: "blue"
  },
  {
    icon: Lightbulb,
    title: "Mission-Driven",
    description: "Strategies aligned with your institution's unique purpose and community impact",
    color: "emerald"
  },
  {
    icon: Zap,
    title: "Sustainable Change",
    description: "Implementation approaches that build lasting organizational capacity",
    color: "purple"
  }
];

const colorClasses = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    glass: "glass-blue"
  },
  emerald: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    glass: "glass-emerald"
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    text: "text-purple-700",
    glass: "glass-purple"
  }
};

export default function EnhancedAbout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Hero Background */}
      <section className="relative py-24 hero-background overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >


            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Strategic Excellence
              <br />
              <span className="text-blue-200">
                Meets Innovation
              </span>
            </h1>
            
            <p className="text-xl text-blue-200 leading-relaxed mb-8">
              Partnering with mission-driven colleges, universities, and nonprofits to solve the root causes of misalignment, fragmentation, and underperformance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/assessment/start">
                <Button variant="outline" size="lg" className="border-2 border-white/50 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full filter blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full filter blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </section>



      {/* Values Section */}
      <section className="py-24 hero-background relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              We design systems that support mission-driven institutions at the intersection of strategy, equity, and execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${colorClasses[value.color].gradient} text-white mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <value.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-blue-200 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 hero-background relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20">
              <motion.div
                className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8 shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <Target className="w-8 h-8" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-blue-200 leading-relaxed mb-8">
                "To empower mission-driven institutions with the strategic insights and innovative solutions needed 
                to achieve sustainable impact, operational excellence, and measurable advancement of their educational 
                and community goals."
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link href="/services">
                  <Button size="lg" className="bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                    Explore Our Services
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
