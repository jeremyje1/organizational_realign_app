// app/(marketing)/layout.tsx
import { Metadata } from 'next'
import '../globals.css'
import { Poppins } from 'next/font/google'
import MarketingHeader from '@/components/marketing/MarketingHeader'
import MarketingFooter from '@/components/marketing/MarketingFooter'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'North Path Strategies | Organizational Alignment Solutions',
    template: '%s | North Path Strategies'
  },
  description: 'Organizational alignment assessment and consulting services to help teams and companies improve efficiency, communication, and performance.',
  keywords: ['organizational alignment', 'team efficiency', 'company assessment', 'organizational consulting', 'business transformation'],
  authors: [{ name: 'North Path Strategies' }],
  creator: 'North Path Strategies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://northpathstrategies.org',
    title: 'North Path Strategies | Organizational Alignment Solutions',
    description: 'Organizational alignment assessment and consulting services to help teams and companies improve efficiency, communication, and performance.',
    siteName: 'North Path Strategies',
    images: [
      {
        url: 'https://northpathstrategies.org/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'North Path Strategies'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'North Path Strategies | Organizational Alignment Solutions',
    description: 'Organizational alignment assessment and consulting services to help teams and companies improve efficiency, communication, and performance.',
    images: ['https://northpathstrategies.org/images/og-image.jpg']
  },
  metadataBase: new URL('https://northpathstrategies.org'),
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="bg-white min-h-screen flex flex-col">
        <MarketingHeader />
        <main className="flex-grow">
          {children}
        </main>
        <MarketingFooter />
      </body>
    </html>
  )
}
