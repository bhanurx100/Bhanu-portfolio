'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';

/**
 * Smooth scroll provider using Lenis
 * Provides buttery-smooth scrolling experience
 * Respects prefers-reduced-motion
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
