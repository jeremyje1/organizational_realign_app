'use client';
export interface Role {
  id: string;
  name: string;
  /** Department or unit the role belongs to (optional) */
  department?: string;
  /** Suggested action for this role */
  tag: "retain" | "redundant" | "open";
}
function ResultsPage() {
  return <div>Results Page</div>;
}
export default ResultsPage;