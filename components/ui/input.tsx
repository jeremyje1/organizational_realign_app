import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={
        "flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 " +
        "text-sm shadow-sm placeholder:text-gray-500 focus:outline-none " +
        "focus:ring-2 focus:ring-primary disabled:cursor-not-allowed " +
        "disabled:opacity-50 " +
        (className ?? "")
      }
      {...props}
    />
  ),
);
Input.displayName = "Input";