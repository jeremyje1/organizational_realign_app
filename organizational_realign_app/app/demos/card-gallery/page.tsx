'use client';

import { useState } from 'react';
import { 
  EnhancedCard, 
  EnhancedCardProps 
} from '@/components/ui/enhanced-card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Settings, ImageIcon, Zap, Heart, Info, Code } from 'lucide-react';

export default function CardDemoPage() {
  const [loading, setLoading] = useState(false);
  
  // Toggle loading state for demo
  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  // Demo card configurations
  const cardConfigs: Array<EnhancedCardProps> = [
    {
      title: 'Default Card',
      description: 'This is a standard card with a clear heading and concise content. It adapts responsively to various screen sizes.',
      image: {
        src: '/images/optimized-hero-logo-60.jpg',
        alt: 'Sample image',
        aspectRatio: '16:9',
      },
      actions: [
        {
          label: 'Learn More',
          href: '#',
        }
      ],
      isLoading: loading,
    },
    {
      title: 'Elevated Card with Icon',
      description: 'This card features an icon, enhanced elevation, and multiple action buttons.',
      icon: <Settings className="h-6 w-6" />,
      variant: 'elevated',
      actions: [
        {
          label: 'Primary Action',
          href: '#',
        },
        {
          label: 'Secondary',
          href: '#',
          variant: 'outline',
        }
      ],
      isLoading: loading,
    },
    {
      title: 'Horizontal Orientation',
      description: 'This card uses horizontal orientation, perfect for content with supporting images. Resize the window to see how it responsively adapts.',
      image: {
        src: '/images/optimized-hero-logo-60.jpg',
        alt: 'Feature image',
        aspectRatio: '1:1',
      },
      orientation: 'horizontal',
      variant: 'elevated',
      actions: [
        {
          label: 'Get Started',
          href: '#',
          icon: <Zap className="h-4 w-4 ml-2" />,
        }
      ],
      isLoading: loading,
    },
    {
      title: 'Interactive Card',
      description: 'This entire card is clickable. It also features custom content.',
      variant: 'outlined',
      isLoading: loading,
      onClick: () => alert('Card clicked!'),
      children: (
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <p className="text-sm text-gray-700">Custom content can be added here using the children prop.</p>
        </div>
      ),
    },
    {
      title: 'Full Width Actions',
      description: 'This card demonstrates full-width action buttons that span the entire card width.',
      icon: <Heart className="h-6 w-6 text-red-500" />,
      fullWidthAction: true,
      actions: [
        {
          label: 'Primary Action',
          href: '#',
        },
        {
          label: 'Secondary Action',
          href: '#',
          variant: 'outline',
        },
        {
          label: 'External Link',
          href: 'https://northpath.com',
          external: true,
        }
      ],
      isLoading: loading,
    },
    {
      title: 'Compact Card',
      description: 'A compact version with reduced padding and smaller text.',
      variant: 'compact',
      icon: <Info className="h-5 w-5" />,
      actions: [
        {
          label: 'Details',
          href: '#',
          variant: 'ghost',
        }
      ],
      isLoading: loading,
    },
  ];
  
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Enhanced Card Components</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Versatile, responsive cards with various configurations for NorthPath Strategies website.
        </p>
        <Button onClick={toggleLoading} className="mt-8">
          {loading ? 'Loading...' : 'Toggle Loading State'}
        </Button>
      </div>

      <Tabs defaultValue="gallery" className="mb-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardConfigs.map((config, idx) => (
              <EnhancedCard
                key={idx}
                {...config}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="pt-6">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Component Usage
            </h2>
            <p>
              The <code>EnhancedCard</code> component is designed to be flexible and customizable.
              Here's how to implement it in your React components:
            </p>
            
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
              {`import { EnhancedCard } from '@/components/ui/enhanced-card';

// Basic usage
<EnhancedCard
  title="Card Title"
  description="Card description text here"
  actions={[{ label: 'Learn More', href: '/learn-more' }]}
/>

// With image
<EnhancedCard
  title="Card With Image"
  description="Description with image"
  image={{
    src: "/path/to/image.jpg",
    alt: "Image description",
    aspectRatio: "16:9" // Options: '16:9', '4:3', 'square', '1:1'
  }}
  actions={[{ label: 'Learn More', href: '/learn-more' }]}
/>

// Interactive card
<EnhancedCard
  title="Clickable Card"
  description="This entire card is clickable"
  onClick={() => handleCardClick()}
/>

// Different variants
<EnhancedCard
  title="Elevated Card"
  variant="elevated" // Options: 'default', 'elevated', 'outlined', 'compact'
/>

// Horizontal layout
<EnhancedCard
  title="Horizontal Card"
  orientation="horizontal"
  image={{ src: "/path/to/image.jpg", alt: "Image" }}
/>

// With custom content
<EnhancedCard title="Custom Content">
  <div className="custom-content">
    Add any React components here
  </div>
</EnhancedCard>`}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
