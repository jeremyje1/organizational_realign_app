export const metadata = {
  title: "Realignment Wizard",
};

export default function RealignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl py-10 px-4">{children}</div>
  );
}