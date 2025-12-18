import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
  className?: string
  icon?: ReactNode
}

export function Badge({
  children,
  variant = 'default',
  className,
  icon
}: BadgeProps) {
  const variants = {
    default: 'bg-blue-slate-900/60 text-blue-slate-100 border-blue-slate-700 hover:bg-blue-slate-800/70 hover:border-blue-slate-600',
    primary: 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 hover:border-primary/50',
    secondary: 'bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 hover:border-secondary/50',
    accent: 'bg-accent/20 text-accent border-accent/30 hover:bg-accent/30 hover:border-accent/50',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm select-none transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 ring-0 hover:ring-2 ring-current',
        variants[variant],
        className
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </span>
  )
}
