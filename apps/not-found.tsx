// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 – Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        Sorry, we couldn’t find that page.
      </p>
    </main>
  );
}