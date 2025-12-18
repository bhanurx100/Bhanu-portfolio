'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SurfaceCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  depth?: 1 | 2 | 3;
  hover?: boolean;
  spotlight?: boolean;
  className?: string;
}

/**
 * Modern surface card primitive
 * Standardized glass surface with elevation levels
 * Based on REDESIGN_ADDENDUM.md specifications
 */
export function SurfaceCard({
  children,
  depth = 2,
  hover = false,
  spotlight = false,
  className,
  ...props
}: SurfaceCardProps) {
  const depthClasses = {
    1: 'bg-surface-1',
    2: 'bg-surface-2',
    3: 'bg-surface-3',
  };

  return (
    <div
      className={cn(
        'backdrop-blur-xl border border-border rounded-2xl p-6',
        depthClasses[depth],
        hover && 'hover:border-border-hover hover:shadow-glow-sm transition-all duration-300',
        spotlight && 'spotlight-container',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
