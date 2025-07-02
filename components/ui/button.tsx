/* shadcn/ui-style button with a typed `variant` prop
   (outline | default | ghost) — extend as you like                                */
import * as React from 'react'
import { Slot } from "@radix-ui/react-slot"
import { cn } from '@/lib/utils'

export type ButtonVariant = 'default' | 'outline' | 'ghost'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        data-variant={variant}
        data-size={size}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          // Variants
          variant === 'default' && 'bg-neutral-800 text-white hover:bg-neutral-700',
          variant === 'outline' && 'border border-input hover:bg-accent hover:text-accent-foreground',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          // Sizes
          size === 'default' && 'h-10 py-2 px-4',
          size === 'sm' && 'h-9 px-3 text-xs',
          size === 'lg' && 'h-11 px-8',
          size === 'icon' && 'h-10 w-10',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'