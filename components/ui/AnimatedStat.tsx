'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';
import { cn } from '@/lib/utils';

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated stat counter component
 * Counts up from 0 to target value when in view
 * Inspired by Groww's design patterns
 */
export function AnimatedStat({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: AnimatedStatProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (inView && numberRef.current && !prefersReducedMotion) {
      gsap.to(numberRef.current, {
        textContent: value,
        duration,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          if (numberRef.current) {
            const currentValue = Math.round(
              parseFloat(numberRef.current.textContent || '0')
            );
            numberRef.current.textContent =
              prefix + currentValue.toLocaleString() + suffix;
          }
        },
      });
    } else if (inView && numberRef.current && prefersReducedMotion) {
      // Skip animation, show final value
      numberRef.current.textContent = prefix + value.toLocaleString() + suffix;
    }
  }, [inView, value, suffix, prefix, duration, prefersReducedMotion]);

  return (
    <div ref={inViewRef} className={cn('text-4xl font-bold text-primary', className)}>
      <span ref={numberRef}>
        {prefix}0{suffix}
      </span>
    </div>
  );
}
