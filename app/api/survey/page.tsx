

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("");

  const handleSubmit = () => {
    if (!name || !orgType) {
      alert("Please complete all fields.");
      return;
    }

    const orgData = { name, orgType };
    localStorage.setItem("survey", JSON.stringify(orgData));
    router.push("/realignment");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Organization Setup</h1>
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Continue to Realignment
      </button>
    </main>
  );
}