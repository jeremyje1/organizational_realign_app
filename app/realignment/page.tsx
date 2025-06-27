/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Server page that fetches and displays the institution chosen for
   the organisational‑realignment workflow.
------------------------------------------------------------------- */

import { createClient } from "@/lib/supabase-client";

export default async function RealignmentPage() {
  // Server‑side Supabase client (no API keys exposed in the browser)
  const supabase = createClient();

  // Pull the first institution record — adjust the query as needed
  const { data: institution, error } = await supabase
    .from("institutions")
    .select("name, orgType")
    .limit(1)
    .single();

  if (error) {
    // Basic fallback; you could surface a prettier error component
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-4 text-2xl font-semibold">Organisational realignment</h1>
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
          {institution?.orgType ?? "—"}
        </p>
      </div>
    </section>
  );
}