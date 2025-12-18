'use client';

import { useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';

interface RevealCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  onClick?: () => void;
}

/**
 * Card with cursor-following glow effect
 * Inspired by Microsoft Fluent Design's Reveal effect
 */
export function RevealCard({
  children,
  className,
  glowColor = 'rgba(113, 60, 188, 0.15)',
  glowSize = 600,
  onClick,
}: RevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        'relative group p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden',
        className
      )}
    >
      {/* Reveal glow effect */}
      {!prefersReducedMotion && (
        <div
          className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${glowSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
            inset: 0,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
