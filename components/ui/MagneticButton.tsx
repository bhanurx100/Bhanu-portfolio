'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMagneticEffect } from '@/hooks/animations/useMagneticEffect';
import type { IconType } from 'react-icons';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode | IconType;
  magneticStrength?: number;
}

/**
 * Enhanced button with magnetic effect
 * Follows cursor when hovering nearby
 * Inspired by Apple's design patterns
 */
export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  magneticStrength = 0.4,
  ...props
}: MagneticButtonProps) {
  const magneticRef = useMagneticEffect<HTMLDivElement>({
    strength: magneticStrength,
  });

  const baseStyles =
    'font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden';

  const variants = {
    primary:
      'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105',
    secondary:
      'bg-secondary hover:bg-secondary-dark text-background-dark shadow-lg shadow-secondary/50 hover:shadow-secondary/70 hover:scale-105',
    glass:
      'bg-gray-50/90 dark:bg-white/5 hover:bg-gray-100/95 dark:hover:bg-white/10 backdrop-blur-lg border border-gray-400/60 dark:border-white/10 hover:border-gray-500/80 dark:hover:border-white/20 text-gray-900 dark:text-text-primary shadow-md hover:shadow-lg ring-1 ring-gray-300/40 dark:ring-white/10 hover:ring-gray-400/60 dark:hover:ring-white/20',
    ghost: 'hover:bg-white/5 text-text-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'function') {
      const IconComponent = icon as IconType;
      return <IconComponent className="text-lg" />;
    }

    return <span className="text-lg">{icon}</span>;
  };

  return (
    <div ref={magneticRef} className="inline-block">
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Ripple effect overlay */}
        <span className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity bg-gray-600/20 dark:bg-white/20 rounded-lg" />

        {renderIcon()}
        <span className="relative z-10">{children}</span>
      </button>
    </div>
  );
}
