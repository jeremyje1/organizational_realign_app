import '../globals.css';
import type { Metadata } from "next";
import Link from 'next/link';
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NorthPath – Organizational Realignment",
  description: "Realign your org, quickly.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        {/* ---------- Navbar ---------- */}
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-bold text-lg">
              NorthPath
            </Link>
            {/* auth buttons come in Step 2 */}
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>

        <footer className="border-t bg-white py-4 text-center text-sm text-zinc-500">
          Organizational Realignment Tool v1.0 —{" "}
          <a
            href="mailto:feedback@northpath.io"
            className="font-medium underline"
          >
            Send Feedback
          </a>
        </footer>
      </body>
    </html>
  );
}