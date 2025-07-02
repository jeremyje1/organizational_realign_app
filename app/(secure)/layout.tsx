import type { Metadata } from "next";
import Link from 'next/link';
import type { ReactNode } from "react";
import AuthButton from "@/components/AuthButton";

export const metadata: Metadata = {
  title: "Northpath Strategies – Organizational Realignment",
  description: "Strategic organizational realignment and transformation.",
};

export default function SecureLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ---------- Navbar ---------- */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.svg"
              alt="Northpath Strategies" 
              className="h-8 w-8 mr-2"
            />
            <span className="font-bold text-lg text-blue-900">Northpath Strategies</span>
          </Link>
          <AuthButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-white py-4 text-center text-sm text-zinc-500">
        Organizational Realignment Tool v1.0 © {new Date().getFullYear()} Northpath Strategies —{" "}
        <a
          href="mailto:feedback@northpathstrategies.org"
          className="font-medium underline"
        >
          Send Feedback
        </a>
      </footer>
    </div>
  );
}