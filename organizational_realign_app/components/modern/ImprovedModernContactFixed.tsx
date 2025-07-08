'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  preferredContact: z.enum(['email', 'phone', 'either']).default('email'),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Simple input component with high contrast
function SimpleInput({ 
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
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600" />
          {label}
        </div>
      </label>
      <input
        {...props}
        id={id}
        className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-500'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</span>
          {error}
        </p>
      )}
    </div>
  );
}

// Simple select component with high contrast
function SimpleSelect({ 
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
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600" />
          {label}
        </div>
      </label>
      <select
        {...props}
        id={id}
        className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-500'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</span>
          {error}
        </p>
      )}
    </div>
  );
}

// Simple textarea component with high contrast
function SimpleTextarea({ 
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
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600" />
          {label}
        </div>
      </label>
      <textarea
        {...props}
        id={id}
        className={`w-full px-4 py-3 border-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[120px] resize-y ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-500'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</span>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ImprovedModernContactFixed() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });
  
  const [formSuccess, setFormSuccess] = useState(false);
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulating form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted successfully:', data);
      
      reset();
      setFormSuccess(true);
      
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
    <section className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Ready to transform your organization? Reach out to our team of experts today and let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Contact form */}
            <div className="md:col-span-3 bg-gray-50 rounded-3xl shadow-xl p-8 border border-gray-200">
              <AnimatePresence mode="wait">
                {formSuccess ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-700 mb-6">
                      Your message has been received. We'll get back to you shortly.
                    </p>
                    <Button 
                      type="button" 
                      onClick={() => setFormSuccess(false)} 
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
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
                      <SimpleInput
                        id="firstName"
                        label="First Name"
                        icon={User}
                        error={errors.firstName?.message}
                        {...register('firstName')}
                      />
                      <SimpleInput
                        id="lastName"
                        label="Last Name"
                        icon={User}
                        error={errors.lastName?.message}
                        {...register('lastName')}
                      />
                    </div>
                    
                    <SimpleInput
                      id="email"
                      label="Email Address"
                      type="email"
                      icon={Mail}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                    
                    <SimpleInput
                      id="phone"
                      label="Phone Number (optional)"
                      type="tel"
                      icon={Phone}
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    
                    <SimpleInput
                      id="company"
                      label="Company / Organization"
                      icon={Building}
                      error={errors.company?.message}
                      {...register('company')}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <SimpleSelect
                        id="organizationType"
                        label="Organization Type"
                        icon={Building}
                        options={organizationTypes}
                        error={errors.organizationType?.message}
                        {...register('organizationType')}
                      />
                      <SimpleSelect
                        id="organizationSize"
                        label="Organization Size"
                        icon={Building}
                        options={organizationSizes}
                        error={errors.organizationSize?.message}
                        {...register('organizationSize')}
                      />
                    </div>

                    <SimpleSelect
                      id="preferredContact"
                      label="Preferred Contact Method"
                      icon={Star}
                      options={contactPreferences}
                      error={errors.preferredContact?.message}
                      {...register('preferredContact')}
                    />
                    
                    <SimpleTextarea
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
                        className="rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5 mt-1"
                        {...register('consent')}
                      />
                      <div>
                        <label htmlFor="consent" className="text-gray-900 font-medium">
                          I agree to be contacted about NorthPath services
                        </label>
                        {errors.consent && (
                          <p className="text-red-600 text-sm mt-1">{errors.consent.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl"
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
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Schedule a Consultation</h3>
                <p className="text-gray-700 mb-6">
                  Prefer to speak directly with a consultant? Book a 30-minute discovery call.
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 flex items-center justify-center"
                  onClick={() => window.open('https://calendly.com/jeremyestrella/30min', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Meeting
                </Button>
              </motion.div>

              <motion.div
                className="bg-gray-100 p-6 rounded-3xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 mr-2 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Response Times</h4>
                </div>
                <p className="text-sm text-gray-700">
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
