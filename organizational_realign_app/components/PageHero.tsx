// PageHero.tsx - A reusable hero component for page headers
import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  overlap?: boolean;
  height?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  textColor?: 'light' | 'dark';
}

/**
 * PageHero - A reusable hero component for page headers
 * 
 * @param title - Main headline of the hero section
 * @param subtitle - Optional secondary text below the title
 * @param imageUrl - Background image URL
 * @param overlap - Whether the hero should overlap with the content below
 * @param height - Height of the hero section: 'sm' (small), 'md' (medium), 'lg' (large)
 * @param align - Text alignment: 'left', 'center', or 'right'
 * @param textColor - Text color scheme: 'light' (white) or 'dark' (dark gray)
 */
const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  imageUrl = '/images/default-hero-bg.jpg',
  overlap = false,
  height = 'md',
  align = 'center',
  textColor = 'light'
}) => {
  // Calculate height class
  const heightClass = {
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-28',
    lg: 'py-24 md:py-36'
  }[height];
  
  // Calculate alignment class
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];
  
  // Calculate text color class
  const textColorClass = textColor === 'light' ? 'text-white' : 'text-gray-800';
  
  return (
    <div 
      className={`relative w-full ${heightClass} px-6 flex items-center justify-center ${overlap ? 'mb-[-4rem]' : ''}`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900/60 z-10"></div>
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className={`relative z-20 max-w-5xl mx-auto ${alignClass}`}>
        <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${textColorClass}`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${textColor === 'light' ? 'text-gray-200' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
