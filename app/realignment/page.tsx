/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Client-side page that displays survey data after realignment.
------------------------------------------------------------------- */
"use client";

import { useEffect, useState } from "react";
import { loadSurveyData }      from "@/lib/storage";

/** Shape of the data saved by `saveSurveyData` */
interface OrgData {
  name:    string;
  orgType: string;
  /** keep any extra keys without losing type-safety */
  [key: string]: unknown;
}

export default function RealignmentPage() {
  const [orgData, setOrgData] = useState<OrgData | null>(null);

  /* Load data once on mount */
  useEffect(() => {
    loadSurveyData().then((data) => {
      setOrgData(data as OrgData | null);
    });
  }, []);

  if (!orgData) {
    return <p className="text-center">Loading…</p>;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Organisational realignment</h1>

      <pre className="rounded bg-gray-50 p-4 text-sm">
        {JSON.stringify(orgData, null, 2)}
      </pre>
    </main>
  );
}