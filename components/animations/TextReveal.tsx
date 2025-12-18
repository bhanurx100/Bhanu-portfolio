'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-config';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  triggerOnScroll?: boolean;
}

/**
 * Text reveal animation component
 * Reveals text word by word with smooth animation
 * Inspired by GSAP ScrollTrigger patterns
 */
export function TextReveal({
  children,
  className,
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  triggerOnScroll = true,
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!textRef.current || prefersReducedMotion) return;

    const words = textRef.current.querySelectorAll('.word');

    if (triggerOnScroll) {
      // Animate on scroll
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    } else {
      // Animate immediately on mount
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [stagger, duration, delay, triggerOnScroll, prefersReducedMotion]);

  // Split text into words
  const words = children.split(' ');

  return (
    <div ref={textRef} className={cn('overflow-hidden', className)}>
      {words.map((word, index) => (
        <span key={index} className="word inline-block mr-2 opacity-0">
          {word}
        </span>
      ))}
    </div>
  );
}
