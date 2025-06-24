import React from 'react'
import type { Role } from '@/types/types'

export default function RoleList({ roles }: { roles: Role[] }) {
  if (!roles.length) return null

  return (
    <ul className="divide-y rounded border">
      {roles.map((r) => (
        <li key={r.id} className="flex items-center justify-between px-3 py-2">
          <span>{r.name}</span>
          {r.count !== undefined && (
            <span className="text-sm text-neutral-500">{r.count}</span>
          )}
        </li>
      ))}
    </ul>
  )
}