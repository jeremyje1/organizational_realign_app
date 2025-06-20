"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface FileDropProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FileDrop = React.forwardRef<HTMLInputElement, FileDropProps>(
  ({ className, label = "Choose file…", ...props }, ref) => (
    <label
      className={cn(
        "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/40 text-sm text-muted-foreground hover:border-ring hover:text-foreground",
        className
      )}
    >
      {label}
      <input
        ref={ref}
        type="file"
        className="sr-only"
        {...props}
      />
    </label>
  )
);
FileDrop.displayName = "FileDrop";
export default FileDrop;
export { FileDrop };