/**
 * Admin Layout
 * Optimized layout for admin pages to reduce CSS preload warnings
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard - NorthPath Strategies",
  description: "Administrative interface for NorthPath Strategies",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Optimize CSS loading specifically for admin pages */}
      <style jsx global>{`
        /* Inline critical CSS for admin to reduce preload warnings */
        .admin-critical {
          font-display: swap;
        }
        
        /* Defer non-critical styles */
        @media screen {
          .admin-deferred {
            opacity: 1;
          }
        }
      `}</style>
      {children}
    </>
  );
}
