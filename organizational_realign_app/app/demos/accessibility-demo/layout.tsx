export const metadata = {
  title: 'Loading States Accessibility Demo',
  description: 'Demonstration of accessible loading states components',
}

export default function AccessibilityDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {children}
    </div>
  )
}
