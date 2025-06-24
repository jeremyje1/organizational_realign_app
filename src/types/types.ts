export type Role = {
  id: string
  name: string
  tag?: string
  /** optional tally used in charts */
  count?: number
}