/**
 * Services Page - Professional Services Overview
 */
import React from 'react';
import { Metadata } from 'next';
import SimpleNavbar from '@/components/SimpleNavbar';
import ModernServices from '@/components/modern/ModernServices';
import ConsultationPackages from '@/components/ConsultationPackages';
import ModernFooter from '@/components/modern/ModernFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { PagesBackground } from '@/components/ui/pages-background';

export const metadata: Metadata = {
  title: 'Services - NorthPath Strategies',
  description: 'Explore our comprehensive organizational transformation services including strategic assessment, consulting, and AI-powered platform solutions.',
  keywords: [
    'strategic consulting services',
    'organizational assessment',
    'transformation consulting',
    'AI-powered platform',
    'business consulting',
    'strategic planning'
  ],
};

export default function ServicesPage() {
  return (
    <PagesBackground>
      <PageWrapper>
        <SimpleNavbar />
        <main>
          <ModernServices />
          <ConsultationPackages />
        </main>
        <ModernFooter />
      </PageWrapper>
    </PagesBackground>
  );
}
