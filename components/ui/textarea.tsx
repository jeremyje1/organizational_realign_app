import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={
        "min-h-[6rem] w-full rounded-md border border-gray-300 px-3 py-2 " +
        "text-sm shadow-sm placeholder:text-gray-500 focus:outline-none " +
        "focus:ring-2 focus:ring-primary disabled:cursor-not-allowed " +
        "disabled:opacity-50 " +
        (className ?? "")
      }
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";