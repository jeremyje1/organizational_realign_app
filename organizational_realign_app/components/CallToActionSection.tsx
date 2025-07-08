'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, FileText } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <section className="py-20 section-gradient-blue relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-enhanced-dark mb-6">
            Let's Build Better Systems
          </h2>
          <p className="text-lg text-enhanced-dark opacity-80 mb-10">
            Schedule a discovery call to explore how NorthPath Strategies can support 
            your next phase of organizational or institutional transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 max-w-xs mx-auto sm:mx-0"
            >
              <Link 
                href="/contact"
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 max-w-xs mx-auto sm:mx-0"
            >
              <Link 
                href="/resources/overview"
                className="w-full flex items-center justify-center gap-3 bg-white text-blue-700 px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl border border-blue-100"
              >
                <FileText className="w-5 h-5" />
                Download Overview PDF
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Optional decorative element */}
        <div className="hidden lg:block absolute bottom-0 right-0 w-64 h-64 -mb-12 -mr-12 opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M47.3,-57.2C59.6,-46.9,66.8,-30.9,68.7,-14.7C70.5,1.6,67,18.1,58.6,31.5C50.3,44.9,37.2,55.3,22.2,62.3C7.2,69.3,-9.8,73,-24.5,68.5C-39.3,63.9,-51.8,51.2,-59.1,36.3C-66.4,21.4,-68.5,4.3,-65,-11.3C-61.5,-26.9,-52.5,-41,-40.3,-51.3C-28.1,-61.7,-14.1,-68.2,1.8,-70.5C17.7,-72.8,35.1,-67.5,47.3,-57.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
