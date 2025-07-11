'use client';

import EnhancedHeroNoLinks from '@/components/EnhancedHeroNoLinks';
import ContentSections from '@/components/ContentSections';

export default function HomeClientTestNoLinks() {
  return (
    <main id="main-content" className="min-h-screen relative homepage-hero-bg">
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/northpath_background_opt.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80" />
      </div>
      
      <div className="relative z-10 text-white">
        <EnhancedHeroNoLinks />
        <ContentSections />
      </div>
    </main>
  );
}
