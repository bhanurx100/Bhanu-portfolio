'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from './useReducedMotion';

interface MagneticEffectOptions {
  strength?: number;
  duration?: number;
  ease?: string;
}

/**
 * Hook to create magnetic effect on elements
 * Elements follow cursor when nearby
 * Inspired by Apple's design patterns
 */
export function useMagneticEffect<T extends HTMLElement = HTMLDivElement>(
  options: MagneticEffectOptions = {}
) {
  const {
    strength = 0.3,
    duration = 0.3,
    ease = 'power2.out',
  } = options;

  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration,
        ease,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, duration, ease, prefersReducedMotion]);

  return ref;
}
