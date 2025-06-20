"use client";

import { useState, useEffect } from "react";
import { loadRoleData, saveRoleData } from "@/lib/storage";
import type { Role } from "@/types/types";

export default function OrgEditor() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loaded = loadRoleData();
    setRoles(loaded.length ? loaded : [
      { id: "1", name: "Dean of Instruction", tag: "critical" },
      { id: "2", name: "Director of Advising", tag: "" },
    ]);
  }, []);

  useEffect(() => {
    saveRoleData(roles);
  }, [roles]);

  const updateRole = (index: number, key: keyof Role, value: string) => {
    const updated = [...roles];
    if (key === "tag") {
      updated[index][key] = value as Role["tag"];
    } else {
      updated[index][key] = value;
    }
    setRoles(updated);
  };

  const addRole = () => {
    setRoles([
      ...roles,
      { id: Date.now().toString(), name: "", tag: "" as Role["tag"] },
    ]);
  };

  const removeRole = (index: number) => {
    const updated = [...roles];
    updated.splice(index, 1);
    setRoles(updated);
  };

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Roles</h2>
      {roles.map((role, index) => (
        <div key={role.id} className="mb-3 p-3 border rounded bg-white">
          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Role name"
            value={role.name}
            onChange={(e) => updateRole(index, "name", e.target.value)}
          />
          <select
            className="w-full p-2 mb-2 border rounded"
            value={role.tag}
            onChange={(e) => updateRole(index, "tag", e.target.value)}
          >
            <option value="">Select tag</option>
            <option value="critical">Mission-Critical</option>
            <option value="open">Open</option>
            <option value="redundant">Redundant</option>
          </select>
          <button
            className="text-red-600 text-sm underline"
            onClick={() => removeRole(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={addRole}
      >
        Add Role
      </button>
    </section>
  );
}