/* Simple browser-side helpers until you wire these to a DB */

export type SurveyData = Record<string, unknown>
export type Role = { id: string; name: string; count?: number }

/* ------------- survey ------------- */
export function saveSurveyData(data: SurveyData) {
  if (typeof window !== "undefined")
    localStorage.setItem("survey-data", JSON.stringify(data))
}

export function loadSurveyData(): SurveyData | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("survey-data")
  return raw ? (JSON.parse(raw) as SurveyData) : null
}

/* ------------- roles -------------- */
export function saveRoleData(roles: Role[]) {
  if (typeof window !== "undefined")
    localStorage.setItem("roles-data", JSON.stringify(roles))
}

export function loadRoleData(): Role[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem("roles-data")
  return raw ? (JSON.parse(raw) as Role[]) : []
}