'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  User, 
  Building, 
  MessageSquare,
  Calendar,
  Clock,
  Star,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyComponent, OptimizedButton } from '@/components/performance/PerformanceOptimizations';

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  organizationType: z.enum(['healthcare', 'education', 'government', 'enterprise', 'nonprofit', 'other']),
  organizationSize: z.enum(['1-50', '51-200', '201-1000', '1000+', 'prefer-not-to-say']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Animated input component
function AnimatedInput({ 
  label, 
  icon: Icon, 
  error, 
  ...props 
}: {
  label: string;
  icon: React.ComponentType<any>;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className={`relative rounded-2xl border-2 transition-all duration-300 ${
          error 
            ? 'border-error-500 bg-error-50 dark:bg-error-900/20' 
            : isFocused 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'
        }`}
        whileFocus={{ scale: 1.02 }}
      >
        <div className="relative flex items-center">
          <motion.div
            className={`absolute left-4 transition-colors duration-300 ${
              error 
                ? 'text-error-500' 
                : isFocused 
                  ? 'text-primary-500' 
                  : 'text-neutral-400'
            }`}
            animate={{ scale: isFocused ? 1.1 : 1 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          
          <input
            {...props}
            className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-neutral-900 dark:text-white placeholder-transparent"
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
          />
          
          <motion.label
            className={`absolute left-12 pointer-events-none transition-all duration-300 ${
              error 
                ? 'text-error-500' 
                : isFocused 
                  ? 'text-primary-500' 
                  : 'text-neutral-500'
            }`}
            animate={{
              y: isFocused || hasValue ? -28 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              x: isFocused || hasValue ? -12 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-error-500 text-sm mt-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="w-4 h-4 rounded-full bg-error-500 flex items-center justify-center text-white text-xs">!</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animated select component
function AnimatedSelect({ 
  label, 
  icon: Icon, 
  options, 
  error, 
  ...props 
}: {
  label: string;
  icon: React.ComponentType<any>;
  options: { value: string; label: string }[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className={`relative rounded-2xl border-2 transition-all duration-300 ${
          error 
            ? 'border-error-500 bg-error-50 dark:bg-error-900/20' 
            : isFocused 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'
        }`}
        whileFocus={{ scale: 1.02 }}
      >
        <div className="relative flex items-center">
          <motion.div
            className={`absolute left-4 transition-colors duration-300 ${
              error 
                ? 'text-error-500' 
                : isFocused 
                  ? 'text-primary-500' 
                  : 'text-neutral-400'
            }`}
            animate={{ scale: isFocused ? 1.1 : 1 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          
          <select
            {...props}
            className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-neutral-900 dark:text-white appearance-none cursor-pointer"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <option value="">{label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-error-500 text-sm mt-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="w-4 h-4 rounded-full bg-error-500 flex items-center justify-center text-white text-xs">!</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Contact information component
function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'jeremy@northpathstrategies.com',
      action: 'mailto:jeremy@northpathstrategies.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our headquarters',
      value: 'Portland, Oregon, USA',
      action: '#',
    },
    {
      icon: Calendar,
      title: 'Schedule a Call',
      description: 'Book a consultation',
      value: '30-minute strategy session',
      action: 'https://calendly.com/jeremyestrella/30min',
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Get in Touch
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Ready to transform your organization? We&apos;d love to hear from you. 
          Reach out using any of the methods below.
        </p>
      </motion.div>

      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={index}
            href={method.action}
            target={method.action.startsWith('http') ? '_blank' : undefined}
            rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group block p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <method.icon className="w-6 h-6" />
              </motion.div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {method.title}
                </h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  {method.description}
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                  {method.value}
                </p>
              </div>
              
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Business hours */}
      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h4 className="font-semibold text-neutral-900 dark:text-white">
            Business Hours
          </h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-300">Monday - Friday</span>
            <span className="text-neutral-900 dark:text-white font-medium">9:00 AM - 6:00 PM PST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-300">Saturday</span>
            <span className="text-neutral-900 dark:text-white font-medium">10:00 AM - 2:00 PM PST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-300">Sunday</span>
            <span className="text-neutral-900 dark:text-white font-medium">Closed</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main contact form component
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'contact_form'
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Form submitted successfully:', data);
        setIsSubmitted(true);
        
        // Track conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'contact_form_submit', {
            event_category: 'Lead Generation',
            event_label: data.organizationType,
            value: 1
          });
        }
        
        // Reset form after showing success message
        setTimeout(() => {
          setIsSubmitted(false);
          reset();
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // You could add error state handling here
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }, [reset]);

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Thank You! Your Savings Report is Coming
        </h3>
        <div className="space-y-4 mb-6">
          <p className="text-neutral-600 dark:text-neutral-300">
            <strong>What happens next:</strong>
          </p>
          <div className="text-left space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success-500" />
              <span>Within 24 hours: Personal consultation scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success-500" />
              <span>Within 48 hours: Custom savings analysis delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success-500" />
              <span>Within 7 days: Implementation roadmap provided</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 text-accent-500">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: i * 0.1, repeat: Infinity, duration: 1.5 }}
            >
              <Star className="w-5 h-5 fill-current" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedInput
          label="First Name"
          icon={User}
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <AnimatedInput
          label="Last Name"
          icon={User}
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      {/* Email and Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedInput
          label="Email Address"
          icon={Mail}
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <AnimatedInput
          label="Company"
          icon={Building}
          {...register('company')}
          error={errors.company?.message}
        />
      </div>

      {/* Phone */}
      <AnimatedInput
        label="Phone Number (Optional)"
        icon={Phone}
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      {/* Organization details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedSelect
          label="Organization Type"
          icon={Building}
          {...register('organizationType')}
          error={errors.organizationType?.message}
          options={[
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'education', label: 'Education' },
            { value: 'government', label: 'Government' },
            { value: 'enterprise', label: 'Enterprise' },
            { value: 'nonprofit', label: 'Non-profit' },
            { value: 'other', label: 'Other' },
          ]}
        />
        <AnimatedSelect
          label="Organization Size"
          icon={User}
          {...register('organizationSize')}
          error={errors.organizationSize?.message}
          options={[
            { value: '1-50', label: '1-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-1000', label: '201-1000 employees' },
            { value: '1000+', label: '1000+ employees' },
            { value: 'prefer-not-to-say', label: 'Prefer not to say' },
          ]}
        />
      </div>

      {/* Message */}
      <div className="relative">
        <motion.div
          className={`relative rounded-2xl border-2 transition-all duration-300 ${
            errors.message 
              ? 'border-error-500 bg-error-50 dark:bg-error-900/20' 
              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'
          }`}
          whileFocus={{ scale: 1.02 }}
        >
          <div className="flex items-start p-4">
            <MessageSquare className={`w-5 h-5 mt-1 mr-3 ${
              errors.message ? 'text-error-500' : 'text-neutral-400'
            }`} />
            <textarea
              {...register('message')}
              placeholder="Tell us about your organization and how we can help..."
              rows={6}
              className="w-full bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-500 resize-none"
            />
          </div>
        </motion.div>
        
        <AnimatePresence>
          {errors.message && (
            <motion.p
              className="text-error-500 text-sm mt-2 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="w-4 h-4 rounded-full bg-error-500 flex items-center justify-center text-white text-xs">!</span>
              {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Consent checkbox */}
      <motion.div
        className="flex items-start gap-3"
        whileHover={{ scale: 1.01 }}
      >
        <input
          type="checkbox"
          {...register('consent')}
          className="mt-1 w-5 h-5 rounded border-2 border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500"
        />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            I agree to be contacted by NorthPath Strategies regarding this inquiry. 
            We respect your privacy and will never share your information.
          </p>
          {errors.consent && (
            <p className="text-error-500 text-sm mt-1">
              {errors.consent.message}
            </p>
          )}
        </div>
      </motion.div>

      {/* Submit button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-premium transition-all duration-300 group relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Generating Your Report...
              </motion.div>
            ) : (
              <motion.div
                key="send"
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Get My Free $2.4M+ Savings Report
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>
    </form>
  );
}

// Main Contact component
export default function ModernContact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const contactContent = useMemo(() => (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 rounded-full px-6 py-3 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-4 h-4" />
            Free Savings Analysis
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6">
            Get Your Free
            <br />
            <span className="gradient-text">$2.4M+ Savings Report</span>
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            <strong>Join 500+ organizations</strong> that reduced costs by 23% in 90 days. 
            Get your personalized savings analysis and implementation roadmap - completely free.
          </p>
        </motion.div>

        {/* Contact content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="glass rounded-3xl p-8 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 shadow-premium"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Get Your Free Savings Analysis
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Tell us about your organization and receive a personalized cost reduction report within 48 hours.
              </p>
            </div>
            
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  ), [isInView]);

  return (
    <LazyComponent>
      {contactContent}
    </LazyComponent>
  );
}
