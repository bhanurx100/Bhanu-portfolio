'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

/**
 * Skeleton loader component for loading states
 */
export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-surface-2 rounded';
  
  const variantClasses = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      aria-hidden="true"
    />
  );
}


