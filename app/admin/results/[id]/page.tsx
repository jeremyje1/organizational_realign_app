"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SummaryCard from "@/components/results/SummaryCard";
import RoleList from "@/components/results/RoleList";
import PriorityMatrix from "@/components/results/PriorityMatrix";

export default async function AdminResultsPage({ params }: { params: { id: string } }) {
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("realignments")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Failed to fetch record:", error);
      } else {
        setRecord(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!record) return <div className="p-6 text-red-600">No record found.</div>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Institution Report: {record.name}</h1>
      <p className="text-sm text-gray-600 mb-4">Org Type: {record.org_type}</p>

      <SummaryCard
        redundancy={record.redundancy || 70}
        aiReadiness={record.ai_readiness || 60}
        savings={record.estimated_savings || 150000}
      />

      <PriorityMatrix />

      <RoleList roles={record.roles || []} />

      {record.loom_video_url && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-1">Consultant Briefing</h3>
          <iframe
            src={record.loom_video_url.includes("loom.com/share")
              ? record.loom_video_url.replace("share", "embed")
              : record.loom_video_url}
            allowFullScreen
            className="w-full h-64 rounded-md"
          />
        </div>
      )}
    </main>
  );
}