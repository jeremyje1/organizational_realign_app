import type { ReactNode } from "react";

export const metadata = {
  title: "Realignment Wizard",
};

export default function RealignmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl py-10 px-4">{children}</div>
  );
}