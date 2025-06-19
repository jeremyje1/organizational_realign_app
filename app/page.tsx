export default function HomePage() {
  return (
    <main className="max-w-xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Organizational Realignment App</h1>
      <p className="mb-6">Start your alignment assessment below.</p>
      <a
        href="/realignment"
        className="inline-block rounded bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
      >
        Launch Realignment Wizard
      </a>
    </main>
  );
}
