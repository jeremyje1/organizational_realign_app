/**
 * Professional Founder Bio Section - Modern Design
 */
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function FounderBio() {
  const expertise = [
    "Higher Education Transformation",
    "Student Success Architecture", 
    "Strategic Systems Realignment",
    "Academic & Career Pathways",
    "Institutional Effectiveness",
    "Change Leadership"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Jeremy Estrella
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block">
                Founder & Principal
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Strategic Systems Realignment | Student Success Architecture | Higher Ed Transformation
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* Photo Section */}
            <motion.div 
              className="order-2 lg:order-1 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <Image
                    src="/images/jeremy-estrella.jpg"
                    alt="Jeremy Estrella, Founder & Strategic Consultant at NorthPath Strategies"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Professional Frame Effect */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl -z-10"></div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="order-1 lg:order-2 space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Jeremy Estrella
                </h3>
                
                <div className="text-lg text-gray-800 dark:text-gray-200 space-y-4 leading-relaxed">
                  <p>
                    Jeremy Estrella is a nationally recognized higher education leader, systems strategist, and student success architect with over two decades of leadership experience transforming institutions to better serve students, communities, and the future of work.
                  </p>
                  <p>
                    Before founding NorthPath Strategies, Jeremy served in leadership roles across large, complex community college systems, including Houston Community College and Portland Community College, where he led multimillion-dollar initiatives in academic and career pathways, student success infrastructure, and institution-wide redesign.
                  </p>
                  <p>
                    Jeremy's approach is grounded in clarity, alignment, and execution. From leading the integration of holistic student support systems to architecting multi-campus operational realignments, his work consistently delivers measurable impact: increased persistence, stronger workforce pipelines, and more access to higher education.
                  </p>
                  <p>
                    A former faculty chair and seasoned accreditation leader, Jeremy brings a unique ability to connect policy, practice, and purpose, making him a trusted advisor to college presidents, provosts, and change-making teams nationwide.
                  </p>
                  <p>
                    He holds an M.A. in Communication Studies from California State University, Long Beach, and remains passionate about educational access, systems innovation, and mentoring first-generation college students.
                  </p>
                </div>
              </div>

              {/* Core Expertise */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Core Expertise</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {expertise.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-3 justify-center lg:justify-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
                  <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                    Schedule a Strategy Session
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
