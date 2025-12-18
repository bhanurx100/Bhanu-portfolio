import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconType } from 'react-icons'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode | IconType
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105',
    secondary: 'bg-secondary hover:bg-secondary-dark text-background-dark shadow-lg shadow-secondary/50 hover:shadow-secondary/70 hover:scale-105',
    glass: 'bg-gray-50/90 dark:bg-white/5 hover:bg-gray-100/95 dark:hover:bg-white/10 backdrop-blur-lg border border-gray-400/60 dark:border-white/10 hover:border-gray-500/80 dark:hover:border-white/20 text-gray-900 dark:text-white shadow-md hover:shadow-lg ring-1 ring-gray-300/40 dark:ring-white/10 hover:ring-gray-400/60 dark:hover:ring-white/20',
    ghost: 'hover:bg-white/5 text-text-primary dark:text-white',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const renderIcon = () => {
    if (!icon) return null

    if (typeof icon === 'function') {
      const IconComponent = icon as IconType
      return <IconComponent className="text-lg" />
    }

    return <span className="text-lg">{icon}</span>
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {renderIcon()}
      {children}
    </button>
  )
}
