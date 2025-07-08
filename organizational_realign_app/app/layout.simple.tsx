import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NorthPath Strategies - Organizational Realignment & Optimization Suite",
  description: "Transform your organization with NorthPath Strategies.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`min-h-screen bg-gray-50 text-gray-800 font-sans antialiased flex flex-col ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
