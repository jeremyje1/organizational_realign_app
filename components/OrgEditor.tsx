import React from 'react';
import type { Role, RoleTag } from '@/types/types';

import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface OrgEditorProps {
  roles: Role[];
  onChange: (roles: Role[]) => void;
}

const TAGS: RoleTag[] = ['critical', 'nice-to-have', 'optional'];

export default function OrgEditor({ roles, onChange }: OrgEditorProps) {
  const updateRole = <K extends keyof Role>(
    idx: number,
    key: K,
    value: Role[K],
  ) => {
    const next = [...roles];
    next[idx] = { ...next[idx], [key]: value };
    onChange(next);
  };

  const addRole = () =>
    onChange([
      ...roles,
      { id: crypto.randomUUID(), name: '', tag: 'optional' },
    ]);

  return (
    <div className="space-y-4">
      {roles.map((role, idx) => (
        <div key={role.id} className="flex items-center gap-4">
          <input
            className="flex-1 rounded border px-3 py-2"
            value={role.name}
            placeholder="Role title"
            onChange={(e) => updateRole(idx, 'name', e.target.value)}
          />

          <Select
            value={role.tag}
            onValueChange={(v) => updateRole(idx, 'tag', v as RoleTag)}
          >
            <SelectItem value="">Select tag…</SelectItem>
            {TAGS.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </Select>
        </div>
      ))}

      <Button onClick={addRole}>+ Add role</Button>
    </div>
  );
}