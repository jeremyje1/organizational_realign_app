import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Open_Sans, Lora } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "NorthPath Strategies - Organizational Realignment & Optimization Suite",
    template: "%s | NorthPath Strategies"
  },
  description: "Transform your organization with NorthPath's proprietary optimization engine featuring Dynamic Span-of-Control Heuristic (DSCH), Monte-Carlo Cultural Resilience Factor (CRF), and License Efficiency Index (LEI). Expert consulting for universities, hospitals, nonprofits, and businesses.",
  keywords: [
    "organizational realignment",
    "span of control optimization", 
    "cultural resilience analysis",
    "license efficiency",
    "organizational restructuring",
    "higher education consulting",
    "hospital systems optimization",
    "nonprofit efficiency",
    "government agency optimization",
    "business process optimization",
    "AI-powered analytics",
    "cost savings analysis",
    "dynamic organizational heuristics"
  ],
  authors: [{ name: "Jeremy Estrella", url: "https://northpathstrategies.org/about" }],
  creator: "NorthPath Strategies",
  publisher: "NorthPath Strategies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://app.northpathstrategies.org',
    siteName: 'NorthPath Strategies',
    title: 'NorthPath Strategies - Organizational Realignment & Optimization Suite',
    description: 'Proprietary optimization engine with DSCH, CRF, and LEI algorithms. Transform your organization with data-driven insights and proven methodologies.',
    images: [
      {
        url: 'https://app.northpathstrategies.org/og-homepage.png',
        width: 1200,
        height: 630,
        alt: 'NorthPath Strategies - Organizational Optimization Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'North Path Strategies - Organizational Realignment for Higher Education',
    description: 'Strategic organizational realignment consulting for higher education institutions.',
    images: ['https://app.northpathstrategies.org/twitter-image.png'],
    creator: '@northpathstrat',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'Education',
  classification: 'Higher Education Consulting',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://app.northpathstrategies.org'),
  alternates: {
    canonical: 'https://app.northpathstrategies.org',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'North Path Strategies',
    description: 'Strategic organizational realignment consulting for higher education institutions',
    url: 'https://app.northpathstrategies.org',
    logo: 'https://app.northpathstrategies.org/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Jeremy Estrella',
      jobTitle: 'Founder & Higher Education Strategist',
      description: 'Higher education strategist and systems architect with over 15 years of experience leading institutional transformation',
    },
    serviceArea: {
      '@type': 'Country',
      name: 'United States',
    },
    areaServed: 'United States',
    industry: 'Higher Education Consulting',
    knowsAbout: [
      'Organizational Realignment',
      'Higher Education Administration',
      'Student Success Strategies',
      'Institutional Effectiveness',
      'Educational Leadership',
    ],
    offers: {
      '@type': 'Service',
      name: 'Organizational Assessment and Realignment',
      description: 'Comprehensive evaluation and strategic realignment of higher education institutions',
      provider: {
        '@type': 'Organization',
        name: 'North Path Strategies',
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#104E8B" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.stripe.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//supabase.co" />
        <link rel="dns-prefetch" href="//vercel.app" />
      </head>
      <body className={`min-h-screen bg-gray-50 text-gray-800 font-sans antialiased flex flex-col ${openSans.variable} ${lora.variable}`}>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}