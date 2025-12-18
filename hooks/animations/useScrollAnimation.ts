'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-config';
import { useReducedMotion } from './useReducedMotion';

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

/**
 * Hook to create scroll-triggered animations
 * Automatically handles cleanup and reduced motion
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions
) {
  const {
    from,
    to,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    // Set initial state if provided
    if (from) {
      gsap.set(element, from);
    }

    // Create animation
    const animation = gsap.to(element, {
      ...to,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [from, to, start, end, scrub, markers, once, prefersReducedMotion]);

  return ref;
}
