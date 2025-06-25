/* shadcn/ui-style button with a typed `variant` prop
   (outline | default) — extend as you like                                */
import * as React from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'default' | 'outline'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <button
      ref={ref}
      data-variant={variant}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm',
        variant === 'outline'
          ? 'border bg-transparent hover:bg-neutral-100'
          : 'bg-neutral-800 text-white hover:bg-neutral-700',
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'