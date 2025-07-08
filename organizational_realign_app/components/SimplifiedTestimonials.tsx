'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function SimplifiedTestimonials() {
  return (
    <section className="section-gradient-purple py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-enhanced-dark mb-4">
            Institutional Impact
            <span className="block text-gradient-primary">
              Coming Soon
            </span>
          </h2>
          <p className="text-lg text-enhanced-dark opacity-80">
            We're gathering success stories from our partner institutions. Check back soon to see how we've helped colleges, universities, 
            and nonprofits align their systems with their mission and transform their outcomes.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-purple p-10 rounded-2xl border border-purple-200/30 shadow-xl text-center flex flex-col items-center justify-center"
            style={{ minHeight: "300px" }}
          >
            <Clock className="w-16 h-16 text-indigo-400 mb-6" />
            <h3 className="text-2xl font-semibold text-enhanced-dark mb-4">Institution Success Stories Coming Soon</h3>
            <p className="text-enhanced-dark opacity-80 max-w-xl mx-auto">
              We're collaborating with our partner institutions to document their transformation journeys and share 
              how we've helped them redesign systems, align strategy, and transform their outcomes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
