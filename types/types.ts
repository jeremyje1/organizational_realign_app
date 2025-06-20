export type Role = {
  id: string;
  name: string;
  tag: "critical" | "open" | "redundant" | "";
};

export type OrgData = {
  name: string;
  orgType: string;
};