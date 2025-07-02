/* app/(secure)/workspaces/page.tsx */
'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { TeamCollaboration } from '@/components/collaboration/TeamCollaboration';

export default function WorkspacesPage() {
  return (
    <div className="container mx-auto py-8">
      <TeamCollaboration />
    </div>
  );
}
