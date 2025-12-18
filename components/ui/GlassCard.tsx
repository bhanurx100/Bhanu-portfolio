import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

export function GlassCard({
  children,
  className,
  blur = 'md',
  hover = false
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  }

  return (
    <div
      className={cn(
        'bg-white/5 border border-white/10 rounded-xl shadow-xl shadow-black/50',
        blurClasses[blur],
        hover && 'hover:bg-white/10 hover:border-white/20 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
