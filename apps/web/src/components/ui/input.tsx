import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-9 w-full rounded-md bg-card-foreground px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-card-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-input focus-visible:ring-1 focus-visible:ring-ring shadow-sm',
        secondary: 'bg-slate-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
