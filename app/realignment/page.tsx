/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Server page that fetches and displays the institution chosen for
   the organisational‑realignment workflow.
------------------------------------------------------------------- */


import { createSupabaseServerClient } from '@/lib/supabase-server';

/**
 * Accepts an optional `slug` via URL query: /realignment?slug=hcc
 */
export default async function RealignmentPage({
  searchParams,
}: {
  searchParams?: { slug?: string };
}) {
  const slug = searchParams?.slug;

  // Build query: if slug provided, filter by it; else take first record
  const supabase = createSupabaseServerClient();
  const query = supabase
    .from("institutions")
    .select("name, org_type")
    .limit(1);

  const { data: institution, error } = slug
    ? await query.eq("slug", slug).single()
    : await query.single();

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-4 text-2xl font-semibold">
          Organisational realignment
        </h1>
        <p className="rounded bg-red-50 p-4 text-red-700">
          Could not load data: {error.message}
        </p>
      </main>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold">Organisational realignment</h1>

      <div className="space-y-2 rounded-lg bg-white p-6 shadow">
        <p>
          <span className="font-semibold">Institution:&nbsp;</span>
          {institution?.name ?? "—"}
        </p>
        <p>
          <span className="font-semibold">Type:&nbsp;</span>
          {institution?.org_type ?? "—"}
        </p>
      </div>
    </section>
  );
}