export default function LoadingStatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      {children}
    </div>
  );
}
