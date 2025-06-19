import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational Realignment Tool",
  description:
    "Wizard for proposing and tracking organizational realignment scenarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}