'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const dotsVariants = {
  initial: { scale: 1 },
  active: { scale: 1.2 },
};

// Testimonial data interface
interface Testimonial {
  id: number;
  author: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
  results: string;
  timeframe: string;
}

export default function TestimonialsCarousel() {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      author: 'Sarah Johnson',
      title: 'COO',
      company: 'TechInnovate Inc.',
      quote: 'NorthPath Strategies transformed our organizational structure, resulting in streamlined operations and improved team collaboration. Their methodical approach identified inefficiencies we had overlooked for years.',
      rating: 5,
      results: 'Optimized Team Structure',
      timeframe: '90 days'
    },
    {
      id: 2,
      author: 'Michael Chen',
      title: 'VP of Operations',
      company: 'Global Solutions Group',
      quote: 'The organizational assessment provided clear, actionable insights. Implementation was smooth, and we saw improved team collaboration within weeks of making the recommended changes.',
      rating: 5,
      results: 'Improved Workflow Efficiency',
      timeframe: '60 days'
    },
    {
      id: 3,
      author: 'Priya Patel',
      title: 'Director',
      company: 'Innovative Health Systems',
      quote: 'As a growing company, we needed expert guidance to scale effectively. NorthPath provided exactly that - practical solutions backed by data that helped us build a more resilient organization.',
      rating: 5,
      results: 'Enhanced Team Productivity',
      timeframe: '120 days'
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  
  // Auto-scroll effect
  useEffect(() => {
    if (isPlaying && inView) {
      timerRef.current = setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPlaying, inView, testimonials.length]);
  
  // Handle previous slide
  const handlePrev = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Handle next slide
  const handleNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  // Toggle autoplay
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Navigate to a specific slide
  const goToSlide = (index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  
  return (
    <section ref={ref} className="py-16 section-gradient-purple relative overflow-hidden">
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
            Trusted by Organizations
            <span className="block text-gradient-primary">
              Across Industries
            </span>
          </h2>
          <p className="text-lg text-enhanced-dark opacity-80">
            See how we've helped organizations optimize their structures and improve operational efficiency.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-2xl glass-purple shadow-xl border border-purple-200/50 relative hover:glass-blue transition-all duration-500">
            {/* Main carousel content */}
            <div className="relative h-full min-h-[400px] md:min-h-[350px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="p-8 md:p-10 absolute inset-0"
                >
                  {/* Quote mark decoration */}
                  <div className="absolute -top-2 -left-2 text-purple-200 text-7xl font-serif opacity-50">"</div>
                  
                  {/* Rating */}
                  <div className="flex mb-4 relative z-10">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-enhanced-dark mb-6 text-lg md:text-xl leading-relaxed relative z-10 font-medium italic">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  {/* Results box */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border border-purple-200/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-professional-blue font-bold text-lg">
                          {testimonials[currentIndex].results}
                        </div>
                        <div className="text-enhanced-dark opacity-70 text-sm">
                          Achieved in {testimonials[currentIndex].timeframe}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Author info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                      {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-enhanced-dark">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="text-enhanced-dark opacity-70 text-sm">
                        {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Prev/Next buttons */}
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                className="p-3 rounded-full glass-purple hover:glass-blue text-professional-blue transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="p-3 rounded-full glass-purple hover:glass-blue text-professional-blue transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Pagination dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg' 
                      : 'bg-enhanced-dark opacity-30 hover:opacity-50'
                  }`}
                  variants={dotsVariants}
                  animate={currentIndex === index ? 'active' : 'initial'}
                  whileHover={{ scale: 1.1 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Play/Pause button */}
            <button 
              onClick={togglePlay}
              className="p-3 rounded-full glass-purple hover:glass-blue text-professional-blue transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label={isPlaying ? 'Pause testimonial carousel' : 'Play testimonial carousel'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Accessibility label */}
          <div className="sr-only" aria-live="polite">
            Testimonial {currentIndex + 1} of {testimonials.length} from {testimonials[currentIndex].author}, {testimonials[currentIndex].title} at {testimonials[currentIndex].company}
          </div>
        </div>
      </div>
    </section>
  );
}
