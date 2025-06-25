// components/ui/file-drop.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FileDropProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Fires when files are selected or dropped */
  onFiles?: (files: FileList) => void;
}

export function FileDrop({ onFiles, className, ...props }: FileDropProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && onFiles?.(e.target.files);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) onFiles?.(e.dataTransfer.files);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={cn(
        'flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 text-center text-sm text-neutral-500 hover:bg-neutral-50',
        className,
      )}
    >
      <p>Drag & drop or click to upload</p>
      <input
        ref={inputRef}
        type="file"
        onChange={handleSelect}
        className="hidden"
        {...props}
      />
    </div>
  );
}