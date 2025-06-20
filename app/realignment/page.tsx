"use client";

import { useEffect, useState } from "react";
import OrgEditor from "@/components/OrgEditor";
import { useRouter } from "next/navigation";
import { loadSurveyData } from "@/lib/storage";

export default function RealignmentPage() {
  const [orgData, setOrgData] = useState<{ name: string; orgType: string }>({
    name: "",
    orgType: "",
  });
  const router = useRouter();

  useEffect(() => {
    const data = loadSurveyData();
    if (data?.name && data?.orgType) {
      setOrgData({ name: data.name, orgType: data.orgType });
    }
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Realign: {orgData.name}</h1>
      <p className="text-sm text-gray-600 mb-6">Type: {orgData.orgType}</p>
      <OrgEditor />
      <button
        className="mt-8 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/results")}
      >
        Continue to Results
      </button>
    </main>
  );
}