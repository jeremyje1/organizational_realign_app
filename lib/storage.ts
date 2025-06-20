// lib/storage.ts

import type { Role, OrgData } from "@/types/types";

export function saveSurveyData(data: OrgData) {
  localStorage.setItem("survey", JSON.stringify(data));
}

export function loadSurveyData(): OrgData | null {
  try {
    const stored = localStorage.getItem("survey");
    const parsed = stored ? JSON.parse(stored) : null;
    if (parsed && typeof parsed.name === "string" && typeof parsed.orgType === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveRoleData(roles: Role[]) {
  localStorage.setItem("org_roles", JSON.stringify(roles));
}

export function loadRoleData(): Role[] {
  try {
    const stored = localStorage.getItem("org_roles");
    const parsed = stored ? JSON.parse(stored) : [];
    if (Array.isArray(parsed)) {
      return parsed.filter(role =>
        typeof role.id === "string" &&
        typeof role.name === "string" &&
        ["critical", "open", "redundant", ""].includes(role.tag)
      );
    }
    return [];
  } catch {
    return [];
  }
}