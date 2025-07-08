'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Building, 
  Phone, 
  MessageSquare,
  Loader2,
  ArrowRight,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Form schema
const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .regex(/^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 
      { message: "Please enter a valid phone number" })
    .optional(),
  company: z.string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" }),
  agreeToTerms: z.boolean()
    .refine((val) => val === true, { message: "You must agree to the terms" })
});

type FormData = z.infer<typeof formSchema>;

// Form field component with validation and animations
const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  register,
  errors,
  icon: Icon,
  children,
  disabled = false,
  description
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: any;
  errors: any;
  icon?: React.ComponentType<any>;
  children?: React.ReactNode;
  disabled?: boolean;
  description?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const error = errors[name]?.message;
  const isValid = touched && !error;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label 
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        
        {isValid && (
          <span className="text-xs text-green-600 dark:text-green-500 flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Valid
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <Info className="w-3 h-3 mr-1" />
          {description}
        </p>
      )}
      
      <div className={cn(
        "relative group",
        focused && "ring-2 ring-offset-1 ring-blue-500/20 rounded-md"
      )}>
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        
        {children || (
          type === 'textarea' ? (
            <textarea
              id={name}
              placeholder={placeholder}
              className={cn(
                "w-full rounded-md border px-3 py-2",
                "transition-all duration-150 ease-in-out",
                "min-h-[100px] resize-y",
                Icon && "pl-9",
                error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" :
                  "border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500",
                "hover:border-gray-400 dark:hover:border-gray-600",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20",
                disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
              )}
              disabled={disabled}
              {...register(name, { 
                onBlur: () => setTouched(true) 
              })}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-invalid={!!error}
            />
          ) : type === 'checkbox' ? (
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id={name}
                className={cn(
                  "h-4 w-4 rounded border transition-all duration-150",
                  error ? "border-red-300 text-red-600" : 
                    "border-gray-300 dark:border-gray-700 text-blue-600",
                  "focus:ring-2 focus:ring-offset-1",
                  error ? "focus:ring-red-500/20" : "focus:ring-blue-500/20",
                  disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
                )}
                disabled={disabled}
                {...register(name, { 
                  onBlur: () => setTouched(true) 
                })}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-invalid={!!error}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {placeholder}
              </span>
            </div>
          ) : (
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              className={cn(
                "w-full rounded-md border px-3 py-2",
                "transition-all duration-150 ease-in-out",
                Icon && "pl-9",
                error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" :
                  "border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500",
                "hover:border-gray-400 dark:hover:border-gray-600",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20",
                "shadow-sm hover:shadow-md focus:shadow-md",
                disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
              )}
              disabled={disabled}
              {...register(name, { 
                onBlur: () => setTouched(true) 
              })}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-invalid={!!error}
            />
          )
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-red-500 text-xs"
          >
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Form loading state component
const FormSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First name field */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        
        {/* Last name field */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      
      {/* Email field */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      
      {/* Phone field */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      
      {/* Company field */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      
      {/* Message field */}
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-24 bg-gray-200 rounded w-full"></div>
      </div>
      
      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      {/* Button */}
      <div className="h-10 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

// Success notification
const SuccessNotification = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 
      rounded-md p-4 flex items-start gap-3"
  >
    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
    <div>
      <h4 className="font-medium text-green-800 dark:text-green-300">Success!</h4>
      <p className="text-green-700 dark:text-green-400 text-sm">{message}</p>
    </div>
  </motion.div>
);

// Error notification
const ErrorNotification = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
      rounded-md p-4 flex items-start gap-3"
  >
    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
    <div>
      <h4 className="font-medium text-red-800 dark:text-red-300">Error</h4>
      <p className="text-red-700 dark:text-red-400 text-sm">{message}</p>
    </div>
  </motion.div>
);

// Main page component
export default function EnhancedFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form data:', data);
      
      setSubmitSuccess(true);
      reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleLoadingState = () => {
    setIsLoading(prev => !prev);
    if (!isLoading) {
      // Auto-disable loading state after 3 seconds
      setTimeout(() => setIsLoading(false), 3000);
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Enhanced User-Friendly Form</h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            A comprehensive form component with validation, loading states, and responsive design.
          </p>
          
          <Button 
            variant="outline" 
            onClick={toggleLoadingState}
            className="mb-6"
          >
            {isLoading ? 'Hide' : 'Show'} Loading State
          </Button>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Fill out this form to get in touch with our team.</CardDescription>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              {submitSuccess && (
                <SuccessNotification message="Your message has been sent successfully! We'll get back to you soon." />
              )}
              
              {submitError && (
                <ErrorNotification message="There was a problem submitting the form. Please try again." />
              )}
            </AnimatePresence>
            
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                    register={register}
                    errors={errors}
                    icon={User}
                  />
                  
                  <FormField
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                    register={register}
                    errors={errors}
                    icon={User}
                  />
                </div>
                
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  register={register}
                  errors={errors}
                  icon={Mail}
                  description="We'll never share your email with anyone else."
                />
                
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  register={register}
                  errors={errors}
                  icon={Phone}
                  description="Optional, but helpful for urgent inquiries."
                />
                
                <FormField
                  label="Company"
                  name="company"
                  placeholder="Your company name"
                  required
                  register={register}
                  errors={errors}
                  icon={Building}
                />
                
                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  placeholder="How can we help you?"
                  required
                  register={register}
                  errors={errors}
                  icon={MessageSquare}
                />
                
                <FormField
                  label="Terms and Conditions"
                  name="agreeToTerms"
                  type="checkbox"
                  placeholder="I agree to the terms and conditions"
                  required
                  register={register}
                  errors={errors}
                />
                
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={cn(
                      "relative overflow-hidden group transition-all duration-300",
                      "hover:shadow-lg hover:shadow-blue-500/20"
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Form
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col items-start">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Info className="h-4 w-4" />
              Form Features
            </h3>
            <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
              <li>Clearly labeled input fields with icons</li>
              <li>Inline validation with immediate visual feedback</li>
              <li>Error messages shown clearly below fields</li>
              <li>Submit button disabled until all validations pass</li>
              <li>Loading spinner animation upon submission</li>
              <li>Loading placeholder/skeleton states</li>
              <li>Success/error notifications after submission</li>
              <li>Responsive design for all screen sizes</li>
            </ul>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
