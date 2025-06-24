import React from 'react'

type Cell = { label: string; value: number }
type Props = {
  grid?: Cell[][]
  title?: string
}

export default function PriorityMatrix({
  grid = [
    [
      { label: 'Q1', value: 0 },
      { label: 'Q2', value: 0 },
    ],
    [
      { label: 'Q3', value: 0 },
      { label: 'Q4', value: 0 },
    ],
  ],
  title = 'Priority Matrix',
}: Props) {
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {grid.flat().map((c, i) => (
          <div
            key={i}
            className="flex h-24 flex-col items-center justify-center rounded border"
          >
            <span>{c.label}</span>
            <span className="text-xl font-semibold">{c.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}