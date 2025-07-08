'use client';

import { useState } from 'react';
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
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Form validation schema with improved validation
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string()
    .optional()
    .refine(
      (val) => !val || /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(val),
      'Please enter a valid phone number'
    ),
  organizationType: z.enum(['healthcare', 'education', 'government', 'enterprise', 'nonprofit', 'other']),
  organizationSize: z.enum(['1-50', '51-200', '201-1000', '1000+', 'prefer-not-to-say']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'either']).default('email'),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Animated input component with accessibility improvements
function AnimatedInput({ 
  label, 
  icon: Icon, 
  error, 
  id,
  ...props 
}: {
  label: string;
  icon: React.ComponentType<any>;
  error?: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

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
            aria-hidden="true"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          
          <input
            {...props}
            id={id}
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
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          
          <motion.label
            htmlFor={id}
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
            id={`${id}-error`}
            className="text-error-500 text-sm mt-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="w-4 h-4 rounded-full bg-error-500 flex items-center justify-center text-white text-xs" aria-hidden="true">!</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animated select component with accessibility improvements
function AnimatedSelect({ 
  label, 
  icon: Icon, 
  options, 
  error, 
  id,
  ...props 
}: {
  label: string;
  icon: React.ComponentType<any>;
  options: { value: string; label: string }[];
  error?: string;
  id: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value && props.value !== "");

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
            aria-hidden="true"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          
          <select
            {...props}
            id={id}
            className="w-full pl-12 pr-10 py-4 bg-transparent outline-none text-neutral-900 dark:text-white appearance-none cursor-pointer"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setHasValue(e.target.value !== "");
              props.onChange?.(e);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <option value="" disabled hidden>{label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg className="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="text-error-500 text-sm mt-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="w-4 h-4 rounded-full bg-error-500 flex items-center justify-center text-white text-xs" aria-hidden="true">!</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animated textarea component
function AnimatedTextarea({ 
  label, 
  icon: Icon, 
  error, 
  id,
  ...props 
}: {
  label: string;
  icon: React.ComponentType<any>;
  error?: string;
  id: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

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
        <div className="relative flex">
          <motion.div
            className={`absolute left-4 top-4 transition-colors duration-300 ${
              error 
                ? 'text-error-500' 
                : isFocused 
                  ? 'text-primary-500' 
                  : 'text-neutral-400'
            }`}
            animate={{ scale: isFocused ? 1.1 : 1 }}
            aria-hidden="true"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          
          <textarea
            {...props}
            id={id}
            className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-neutral-900 dark:text-white placeholder-transparent min-h-[120px] resize-y"
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          
          <motion.label
            htmlFor={id}
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
            id={`${id}-error`}
            className="text-error-500 text-sm mt-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="w-4 h-4 rounded-full bg-error-500 flex items-center justify-center text-white text-xs" aria-hidden="true">!</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ImprovedModernContact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });
  
  const [formSuccess, setFormSuccess] = useState(false);
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulating form submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Console log the data for now (would be API submission in production)
      console.log('Form submitted successfully:', data);
      
      // Reset form and show success message
      reset();
      setFormSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const organizationTypes = [
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'government', label: 'Government' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'other', label: 'Other' }
  ];
  
  const organizationSizes = [
    { value: '1-50', label: '1-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const contactPreferences = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'either', label: 'Either' }
  ];

  return (
    <section className="relative min-h-screen bg-gray-50 py-20">
      {/* Enhanced Background elements with creative gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ready to transform your organization? Reach out to our team of experts today and let's discuss how we can help you achieve your goals.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Contact form */}
            <div className="md:col-span-3 bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <AnimatePresence mode="wait">
                {formSuccess ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Thank you!</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                      Your message has been received. We'll get back to you shortly.
                    </p>
                    <Button 
                      type="button" 
                      onClick={() => setFormSuccess(false)} 
                      variant="outline"
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <AnimatedInput
                        id="firstName"
                        label="First Name"
                        icon={User}
                        error={errors.firstName?.message}
                        {...register('firstName')}
                      />
                      <AnimatedInput
                        id="lastName"
                        label="Last Name"
                        icon={User}
                        error={errors.lastName?.message}
                        {...register('lastName')}
                      />
                    </div>
                    
                    <AnimatedInput
                      id="email"
                      label="Email Address"
                      type="email"
                      icon={Mail}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                    
                    <AnimatedInput
                      id="phone"
                      label="Phone Number (optional)"
                      type="tel"
                      icon={Phone}
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    
                    <AnimatedInput
                      id="company"
                      label="Company / Organization"
                      icon={Building}
                      error={errors.company?.message}
                      {...register('company')}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <AnimatedSelect
                        id="organizationType"
                        label="Organization Type"
                        icon={Building}
                        options={organizationTypes}
                        error={errors.organizationType?.message}
                        {...register('organizationType')}
                      />
                      <AnimatedSelect
                        id="organizationSize"
                        label="Organization Size"
                        icon={Building}
                        options={organizationSizes}
                        error={errors.organizationSize?.message}
                        {...register('organizationSize')}
                      />
                    </div>

                    <AnimatedSelect
                      id="preferredContact"
                      label="Preferred Contact Method"
                      icon={Star}
                      options={contactPreferences}
                      error={errors.preferredContact?.message}
                      {...register('preferredContact')}
                    />
                    
                    <AnimatedTextarea
                      id="message"
                      label="Message"
                      icon={MessageSquare}
                      error={errors.message?.message}
                      {...register('message')}
                      rows={4}
                    />
                    
                    <div className="flex items-start space-x-3 mb-4">
                      <input 
                        type="checkbox"
                        id="consent"
                        className="rounded border-2 border-neutral-300 dark:border-neutral-700 text-primary-600 focus:ring-primary-500 h-5 w-5 mt-1"
                        {...register('consent')}
                      />
                      <div>
                        <label htmlFor="consent" className="text-neutral-700 dark:text-neutral-300 font-medium">
                          I agree to be contacted about NorthPath services
                        </label>
                        {errors.consent && (
                          <p className="text-error-500 text-sm mt-1">{errors.consent.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Contact information */}
            <div className="md:col-span-2 space-y-8">
              <motion.div
                className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 p-8 rounded-3xl text-white shadow-xl border border-blue-400/20 dark:border-blue-700/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:jeremy.estrella@gmail.com" className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Email</p>
                      <p className="font-medium">jeremy.estrella@gmail.com</p>
                    </div>
                  </a>
                  
                  <a href="tel:+18005551234" className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Phone</p>
                      <p className="font-medium">+1 (800) 555-1234</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Location</p>
                      <p className="font-medium">Houston, TX & Remote</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Schedule a Consultation</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  Prefer to speak directly with a consultant? Book a 30-minute discovery call.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl py-4 flex items-center justify-center"
                  onClick={() => window.open('https://calendly.com/jeremyestrella/30min', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Meeting
                </Button>
              </motion.div>

              <motion.div
                className="bg-neutral-100 dark:bg-neutral-700/40 p-6 rounded-3xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-300" />
                  <h4 className="font-medium text-neutral-900 dark:text-white">Response Times</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  We typically respond to all inquiries within 24 business hours.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
