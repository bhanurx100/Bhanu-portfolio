'use client';

import { useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  shine?: boolean;
}

/**
 * 3D card with tilt effect
 * Card tilts based on mouse position
 * Includes optional shine effect
 */
export function Card3D({
  children,
  className,
  intensity = 15,
  shine = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [shinePosition, setShinePosition] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );

    if (shine) {
      setShinePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative transition-transform duration-200 ease-out', className)}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Shine effect */}
      {shine && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          style={{
            background: `radial-gradient(600px circle at ${shinePosition.x}% ${shinePosition.y}%, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
