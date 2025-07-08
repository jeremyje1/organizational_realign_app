import type { ReactNode } from "react";

export const metadata = {
  title: "Realignment Wizard | Organizational Assessment",
  description: "Complete our comprehensive organizational realignment survey to receive customized improvement strategies.",
};

export default function RealignmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}