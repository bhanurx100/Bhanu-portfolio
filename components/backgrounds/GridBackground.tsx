'use client';

import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gridSize?: number;
  fadeEdges?: boolean;
}

/**
 * OpenAI-style grid background with dots
 * Creates a subtle technical aesthetic
 */
export function GridBackground({
  className,
  dotColor = 'rgba(113, 60, 188, 0.15)',
  dotSize = 1,
  gridSize = 40,
  fadeEdges = true,
}: GridBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          ...(fadeEdges && {
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }),
        }}
      />

      {/* Gradient overlay for depth */}
      {fadeEdges && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      )}
    </div>
  );
}
