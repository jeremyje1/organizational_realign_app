"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { loadSurveyData, loadRoleData, saveSurveyData, saveRoleData } from "@/lib/storage";
import type { Role, OrgData } from "@/types/types";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

export default function ResultsPage() {
  const { data: session } = useSession();
  const [surveyData, setSurveyData] = useState<OrgData | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name-asc");
  const [previewData, setPreviewData] = useState<{ organization: any; roles: Role[] } | null>(null);
  const filteredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const survey = loadSurveyData();
    const roles = loadRoleData();
    if (survey) setSurveyData(survey);
    setRoles(roles);
  }, []);
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
      console.error("Save failed:", error);
      alert("Save failed.");
    } else {
      alert("Realignment saved to Supabase!");
    }
  };

  const tagCounts = roles.reduce(
    (acc, role) => {
      if (role.tag === "critical") acc.critical++;
      else if (role.tag === "open") acc.open++;
      else if (role.tag === "redundant") acc.redundant++;
      return acc;
    },
    { critical: 0, open: 0, redundant: 0 }
  );

  const filteredRoles = roles.filter((role) =>
    filter === "all" ? true : role.tag === filter
  );

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    if (sort === "name-desc") return b.name.localeCompare(a.name);
    if (sort === "tag") return a.tag.localeCompare(b.tag);
    return 0;
  });

  const downloadPDF = async () => {
    if (!filteredRef.current) return;
    const canvas = await html2canvas(filteredRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("filtered-results.pdf");
  };

  const downloadJSON = () => {
    const exportData = {
      organization: surveyData,
      roles: sortedRoles,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "realignment-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const uploadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = JSON.parse(reader.result as string);
        const validOrg = result.organization?.name && result.organization?.orgType;
        const validRoles =
          Array.isArray(result.roles) &&
          result.roles.every(
            (r: any) =>
              typeof r.id === "string" &&
              typeof r.name === "string" &&
              ["critical", "open", "redundant", ""].includes(r.tag)
          );

        if (validOrg && validRoles) {
          setPreviewData({ organization: result.organization, roles: result.roles });
        } else {
          alert("Invalid JSON structure. Please check required fields.");
        }
      } catch {
        alert("Failed to parse JSON. Please ensure the file is correctly formatted.");
      }
    };
    reader.readAsText(file);
  };

  const applyPreview = () => {
    if (!previewData) return;
    setSurveyData(previewData.organization);
    setRoles(previewData.roles);
    saveSurveyData(previewData.organization);
    saveRoleData(previewData.roles);
    setPreviewData(null);
    alert("Data imported successfully!");
  };

  return (
    <main className="px-4 py-6 sm:px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Realignment Results</h1>

      {surveyData ? (
        <>
          {/* ORG SUMMARY */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Organization Summary</h2>
            <p><strong>Organization:</strong> {surveyData.name}</p>
            <p><strong>Type:</strong> {surveyData.orgType}</p>
          </section>

          <hr className="my-6" />
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tag Summary Overview</h2>

          {/* TAG STATS */}
          <section className="mb-4">
            <ul className="list-disc list-inside text-sm text-gray-800">
              <li>Mission-Critical Roles: {tagCounts.critical}</li>
              <li>Open Roles: {tagCounts.open}</li>
              <li>Redundant Roles: {tagCounts.redundant}</li>
            </ul>
          </section>

          {/* FILTER + SORT */}
          <section className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Tag:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="all">All</option>
                <option value="critical">Mission-Critical</option>
                <option value="open">Open</option>
                <option value="redundant">Redundant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="tag">Tag</option>
              </select>
            </div>
          </section>

          {/* EXPORT/IMPORT BUTTONS */}
          <section className="mb-6 flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={downloadPDF}>
              Download Filtered PDF
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" onClick={downloadJSON}>
              Download JSON
            </button>
            <label htmlFor="upload-json">
              <span className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-600 transition">
                Upload JSON
              </span>
            </label>
            <input
              type="file"
              accept=".json"
              onChange={uploadJSON}
              className="hidden"
              id="upload-json"
            />
          </section>

          {/* IMPORT PREVIEW */}
          {previewData && (
            <section className="p-4 mt-4 border rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Preview Import</h3>
              <p><strong>Org Name:</strong> {previewData.organization.name}</p>
              <p><strong>Org Type:</strong> {previewData.organization.orgType}</p>
              <p><strong>Roles:</strong> {previewData.roles.length}</p>
              <div className="mt-3">
                <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition" onClick={applyPreview}>
                  Confirm Import
                </button>
                <button className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => setPreviewData(null)}>
                  Cancel
                </button>
              </div>
            </section>
          )}

          {/* SAVE BUTTON FOR AUTHENTICATED USERS */}
          {session?.user && (
            <button
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              onClick={handleSave}
            >
              Save to My Workspaces
            </button>
          )}

          {/* ROLE LIST */}
          <section ref={filteredRef} className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Roles Summary</h2>
            <p className="text-sm text-gray-500 mb-2">
              Exported on: {new Date().toLocaleString()} — {sortedRoles.length} roles
            </p>
            {sortedRoles.length > 0 ? (
              <ul className="space-y-3">
                {sortedRoles.map((role) => (
                  <li key={role.id} className="p-3 border rounded hover:shadow-md transition bg-white">
                    <p><strong>{role.name}</strong></p>
                    <p className="text-sm mt-1">
                      <span className={`inline-block px-2 py-1 rounded text-white text-xs ${
                        role.tag === "critical" ? "bg-red-600" :
                        role.tag === "open" ? "bg-yellow-500" :
                        role.tag === "redundant" ? "bg-gray-600" : "bg-gray-300 text-gray-700"
                      }`}>
                        {role.tag || "Uncategorized"}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No roles to display for this filter.</p>
            )}
          </section>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </main>
  );
}