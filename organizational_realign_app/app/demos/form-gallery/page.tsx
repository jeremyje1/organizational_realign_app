'use client';

import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { UserFriendlyForm, FormField } from '@/components/ui/user-friendly-form';
import { Button } from '@/components/ui/button';
import { 
  User, Mail, Building, Phone, MessageSquare, 
  Code, Info, Briefcase, Users, Globe 
} from 'lucide-react';

export default function FormDemoPage() {
  const [apiDelay, setApiDelay] = useState(1500);
  const [apiSuccess, setApiSuccess] = useState(true);
  
  // Basic contact form fields
  const basicFormFields: FormField[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      autoComplete: 'name',
      icon: <User className="h-5 w-5" />
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com',
      required: true,
      autoComplete: 'email',
      icon: <Mail className="h-5 w-5" />
    },
    {
      name: 'message',
      label: 'Your Message',
      type: 'textarea',
      placeholder: 'How can we help you?',
      required: true,
      icon: <MessageSquare className="h-5 w-5" />
    }
  ];
  
  // Advanced business form fields
  const advancedFormFields: FormField[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
      autoComplete: 'given-name',
      icon: <User className="h-5 w-5" />,
      minLength: 2
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
      autoComplete: 'family-name',
      icon: <User className="h-5 w-5" />,
      minLength: 2
    },
    {
      name: 'email',
      label: 'Work Email',
      type: 'email',
      placeholder: 'you@company.com',
      required: true,
      autoComplete: 'email',
      description: 'We\'ll send confirmation to this address',
      icon: <Mail className="h-5 w-5" />
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '(123) 456-7890',
      autoComplete: 'tel',
      icon: <Phone className="h-5 w-5" />,
      pattern: /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    },
    {
      name: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Enter company name',
      required: true,
      autoComplete: 'organization',
      icon: <Building className="h-5 w-5" />,
      minLength: 2
    },
    {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      placeholder: 'Your position',
      required: true,
      autoComplete: 'organization-title',
      icon: <Briefcase className="h-5 w-5" />,
      minLength: 3,
      maxLength: 50
    },
    {
      name: 'budget',
      label: 'Project Budget',
      type: 'number',
      placeholder: '5000',
      required: true,
      description: 'Enter budget in USD (minimum $1,000)',
      icon: <span className="text-gray-500">$</span>,
      min: 1000
    },
    {
      name: 'companySize',
      label: 'Company Size',
      type: 'select',
      required: true,
      icon: <Users className="h-5 w-5" />,
      options: [
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-500', label: '201-500 employees' },
        { value: '501-1000', label: '501-1000 employees' },
        { value: '1001+', label: '1001+ employees' }
      ]
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'select',
      required: true,
      icon: <Globe className="h-5 w-5" />,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education' },
        { value: 'finance', label: 'Finance' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'retail', label: 'Retail' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'message',
      label: 'Additional Information',
      type: 'textarea',
      placeholder: 'Tell us more about your project or inquiry',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      name: 'consent',
      label: 'I agree to receive communications from NorthPath Strategies',
      type: 'checkbox',
      required: true,
      description: 'You can unsubscribe at any time. Privacy Policy applies.'
    }
  ];
  
  // Newsletter subscription fields
  const newsletterFields: FormField[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com',
      required: true,
      autoComplete: 'email',
      icon: <Mail className="h-5 w-5" />
    },
    {
      name: 'interests',
      label: 'Topics of Interest',
      type: 'radio',
      required: true,
      options: [
        { value: 'business', label: 'Business Strategy' },
        { value: 'technology', label: 'Technology & Innovation' },
        { value: 'leadership', label: 'Leadership & Management' },
        { value: 'all', label: 'All Topics' }
      ]
    },
    {
      name: 'frequency',
      label: 'Email Frequency',
      type: 'select',
      required: true,
      icon: <Info className="h-5 w-5" />,
      options: [
        { value: 'daily', label: 'Daily Digest' },
        { value: 'weekly', label: 'Weekly Roundup' },
        { value: 'monthly', label: 'Monthly Newsletter' }
      ]
    },
    {
      name: 'consent',
      label: 'I agree to receive marketing communications',
      type: 'checkbox',
      required: true
    }
  ];

  // Submit handler with simulated API call
  const handleSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    
    // Simulated API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (apiSuccess) {
          resolve();
        } else {
          reject(new Error('Simulated API error'));
        }
      }, apiDelay);
    });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">User-Friendly Form Component</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          A comprehensive form component with validation, error handling, loading states, and responsive design.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <Button asChild variant="outline">
            <a href="/demos/enhanced-form">View Enhanced Form Demo</a>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">API Response:</span>
            <Button 
              size="sm"
              variant={apiSuccess ? "default" : "outline"}
              onClick={() => setApiSuccess(true)}
            >
              Success
            </Button>
            <Button 
              size="sm"
              variant={!apiSuccess ? "default" : "outline"}
              onClick={() => setApiSuccess(false)}
            >
              Error
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Delay:</span>
            <Button 
              size="sm"
              variant={apiDelay === 500 ? "default" : "outline"}
              onClick={() => setApiDelay(500)}
            >
              Fast (0.5s)
            </Button>
            <Button 
              size="sm"
              variant={apiDelay === 1500 ? "default" : "outline"}
              onClick={() => setApiDelay(1500)}
            >
              Medium (1.5s)
            </Button>
            <Button 
              size="sm"
              variant={apiDelay === 3000 ? "default" : "outline"}
              onClick={() => setApiDelay(3000)}
            >
              Slow (3s)
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="basic" className="mb-12 max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Contact</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Business</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter Signup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="pt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Contact Us</h2>
            <UserFriendlyForm 
              fields={basicFormFields}
              onSubmit={handleSubmit}
              submitLabel="Send Message"
              validationMode="onBlur"
            />
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Code className="h-5 w-5" />
              Implementation
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-sm">
{`import { UserFriendlyForm, FormField } from '@/components/ui/user-friendly-form';
import { User, Mail, MessageSquare } from 'lucide-react';

// Define form fields
const formFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
    icon: <User className="h-5 w-5" />
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
    icon: <Mail className="h-5 w-5" />
  },
  {
    name: 'message',
    label: 'Your Message',
    type: 'textarea',
    placeholder: 'How can we help you?',
    required: true,
    icon: <MessageSquare className="h-5 w-5" />
  }
];

// Handle form submission
const handleSubmit = async (data) => {
  // Process form data
  console.log(data);
};

// Render form
<UserFriendlyForm 
  fields={formFields}
  onSubmit={handleSubmit}
  submitLabel="Send Message"
  validationMode="onBlur"
/>`}
            </pre>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="pt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Request a Consultation</h2>
            <UserFriendlyForm 
              fields={advancedFormFields}
              onSubmit={handleSubmit}
              submitLabel="Submit Request"
              columns={2}
              scrollToErrors={true}
              layout="horizontal"
              formId="consultation-form"
              successMessage="Thank you for your interest! One of our consultants will contact you within 24 hours."
            />
          </div>
        </TabsContent>
        
        <TabsContent value="newsletter" className="pt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Subscribe to Our Newsletter</h2>
            <UserFriendlyForm 
              fields={newsletterFields}
              onSubmit={handleSubmit}
              submitLabel="Subscribe"
              validationMode="onChange"
              showValidationIcons={false}
              successMessage="Thanks for subscribing to our newsletter!"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Info className="h-5 w-5" />
          Form Features
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 list-disc pl-5">
          <li>Clearly labeled input fields with icons</li>
          <li>Inline validation with immediate visual feedback</li>
          <li>Error messages shown clearly below fields</li>
          <li>Submit button disabled until all validations pass</li>
          <li>Loading spinner animation upon submission</li>
          <li>Loading placeholder/skeleton states for fields</li>
          <li>Success/error notifications after submission</li>
          <li>Responsive design for all screen sizes</li>
          <li>Accessible with ARIA attributes and keyboard navigation</li>
          <li>Support for various field types (text, email, select, etc.)</li>
          <li>Field descriptions for additional context</li>
          <li>Auto-focus on first field for better UX</li>
          <li>Automatic scroll to errors on validation failure</li>
          <li>Customizable layouts (vertical, horizontal, grid)</li>
          <li>Hover effects for interactive elements</li>
          <li>Support for required fields with visual indicators</li>
        </ul>
      </div>
    </div>
  );
}
