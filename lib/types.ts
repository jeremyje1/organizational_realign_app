/** ──────────────────────────────────────────────────────────────
 *  Centralised domain types
 *  (keep **one** RealignmentFormData definition – delete duplicates)
 *  ──────────────────────────────────────────────────────────────*/

export type Scalar = string | number | File | null

export interface RealignmentFormData {
  orgName:  string
  unitName: string
  scenario: string
  notes:    string
  /* add more keyed answers here as you expand the form */
  [k: string]: Scalar                // allows extra dynamic keys
}

export const emptyForm: RealignmentFormData = {
  orgName:  "",
  unitName: "",
  scenario: "",
  notes:    "",
}

export interface Question {
  /** key into RealignmentFormData */
  key: keyof RealignmentFormData
  label: string
  type: "text" | "number" | "textarea" | "select" | "file"
  /** only for “select” questions */
  options?: string[]
}

export interface Pillar {
  id:    string
  title: string
  questions: Question[]
}