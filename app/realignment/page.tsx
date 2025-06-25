"use client";

import { useEffect, useState } from "react";
import { loadSurveyData }       from "@/lib/storage";

type OrgData = { name: string; orgType: string };

export default function RealignmentPage() {
  const [orgData, setOrgData] = useState<OrgData | null>(null);

  /* hydrate once on mount */
  useEffect(() => {
    setOrgData(loadSurveyData() ?? null);
  }, []);

  if (!orgData) {
    return (
      <main className="p-6 text-neutral-500">
        No survey data yet.
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        Realignment – {orgData.name}
      </h1>

      <p className="text-neutral-600">
        Organisation type: {orgData.orgType}
      </p>

      {/* …rest of the UI… */}
    </main>
  );
}