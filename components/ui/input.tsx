import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export default Input;