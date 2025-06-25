"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSurveyData } from "@/lib/storage";

export default function SurveyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("");

  const handleSubmit = () => {
    if (!name || !orgType) {
      alert("Please complete all fields before continuing.");
      return;
    }

    saveSurveyData({ name, orgType });
    router.push("/realignment");
  };

  return (
    <main className="px-4 py-6 sm:px-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Begin Your Realignment</h1>
      <p className="text-sm text-gray-600 mb-6">Tell us about the organization you&apos;re restructuring.</p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Organization Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Division of Instruction"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Organization Type:</label>
        <select
          className="w-full p-2 border rounded"
          value={orgType}
          onChange={(e) => setOrgType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="college">College</option>
          <option value="division">Division</option>
          <option value="department">Department</option>
        </select>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Continue to Realignment
      </button>
    </main>
  );
}
