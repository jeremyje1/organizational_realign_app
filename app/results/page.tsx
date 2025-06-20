"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { loadSurveyData, loadRoleData, saveSurveyData, saveRoleData } from "@/lib/storage";
import { supabase } from "@/lib/supabase";

export default function ResultsPage() {
  if (typeof window === "undefined") return null; // ✅ Guard for build time

  const { data: session } = useSession();
  const surveyData = loadSurveyData();
  const roles = loadRoleData();

  const filteredRef = useRef<HTMLDivElement>(null);
  const [sortedRoles, setSortedRoles] = useState(roles);

  useEffect(() => {
    const sorted = [...roles].sort((a, b) => a.name.localeCompare(b.name));
    setSortedRoles(sorted);
  }, [roles]);

  const handleSave = async () => {
    if (!session?.user?.email || !surveyData) {
      alert("Login and survey data are required to save.");
      return;
    }

    const { error } = await supabase.from("realignments").insert([
      {
        user_email: session.user.email,
        name: surveyData.name,
        org_type: surveyData.orgType,
        roles,
      },
    ]);

    if (error) {
      alert("Save failed.");
    } else {
      alert("Saved to Supabase!");
    }
  };

  return (
    <main className="px-4 py-6 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Organizational Structure</h1>
      <p className="text-sm text-gray-500 mb-4">
        {surveyData?.name} — {surveyData?.orgType}
      </p>

      {session?.user && (
        <button
          className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save to My Workspaces
        </button>
      )}

      <div ref={filteredRef}>
        {sortedRoles.map((role) => (
          <div key={role.id} className="mb-2">
            <p className="text-sm font-medium">{role.name}</p>
            <p className="text-xs text-gray-500">
              <span className={`inline-block px-2 py-1 rounded text-white text-xs ${
                role.tag === "critical" ? "bg-red-600" :
                role.tag === "open" ? "bg-yellow-500" :
                role.tag === "redundant" ? "bg-gray-600" : "bg-gray-300 text-gray-700"
              }`}>
                {role.tag || "Uncategorized"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}