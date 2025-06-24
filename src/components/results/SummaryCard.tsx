import React from 'react'

type Props = {
  redundancy: number
  aiReadiness: number
  savings: number
}

export default function SummaryCard({
  redundancy,
  aiReadiness,
  savings,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 rounded-lg border p-4 shadow-sm">
      <Metric label="Redundancy" value={`${redundancy}%`} />
      <Metric label="AI Readiness" value={`${aiReadiness}%`} />
      <Metric
        label="Savings"
        value={`$${savings.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`}
      />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-xl font-semibold text-neutral-800">{value}</p>
    </div>
  )
}