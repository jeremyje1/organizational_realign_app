// components/marketing/MarketingHeader.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-40 border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/northpath-logo.png"
              alt="NorthPath Strategies"
              width={150}
              height={54}
              className="mr-2"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-gray-700 hover:text-blue-800 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-gray-700 hover:text-blue-800 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-800 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-800 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/app">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/app">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#how-it-works"
                className="text-gray-700 hover:text-blue-800 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#pricing"
                className="text-gray-700 hover:text-blue-800 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-800 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-800 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild>
                  <Link href="/app">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/app">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
