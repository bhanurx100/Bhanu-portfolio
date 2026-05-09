'use client';

/**
 * MarqueeScroll — performance-optimized rewrite
 * ─────────────────────────────────────────────
 * Root cause of jitter in original:
 *  - useAnimationFrame + useMotionValue x.set() on every frame forces
 *    Framer to reconcile the motion value through its scheduler, which
 *    adds overhead and can produce micro-stutters at high DPI.
 *
 * Fix: pure CSS `@keyframes` translate animation.
 *  - Runs entirely on the compositor thread (no JS per frame).
 *  - Zero layout recalculation — only `transform` is animated.
 *  - `will-change: transform` hints the GPU to promote the layer.
 *  - Pause-on-hover via CSS `animation-play-state`.
 *  - Seamless loop: duplicate the item list once, translate by exactly 50%.
 *
 * Result: buttery 60fps with zero JS per frame, no jitter.
 */

import { useEffect, useRef, useState } from 'react';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface MarqueeItem {
  id: string;
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'accent';
}

interface MarqueeScrollProps {
  items: MarqueeItem[];
  speed?: number;          // pixels per second (default 60)
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function MarqueeScroll({
  items,
  speed = 60,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  /**
   * Calculate animation duration from the measured pixel width of ONE set.
   * duration = pixels / (speed px/s)
   * Only recalculate on mount + resize — not on every frame.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      // The track contains two copies; each copy is exactly half the scroll width.
      const halfWidth = track.scrollWidth / 2;
      setDuration(halfWidth / speed);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [speed, items]);

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      // Respect user preference — disable animation entirely for reduced-motion
      style={
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? { overflow: 'auto' }
          : undefined
      }
    >
      {/* Gradient fade edges — cheap composited overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10
          bg-gradient-to-r from-background-dark to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10
          bg-gradient-to-l from-background-dark to-transparent"
      />

      {/*
        Outer wrapper controls pause-on-hover via CSS custom property.
        We set --play-state so the inner track can reference it.
      */}
      <div
        className={cn(
          'marquee-outer',
          pauseOnHover && 'group'
        )}
      >
        {/*
          The track holds TWO identical copies of the items.
          CSS animation translates by -50% (= one full copy width),
          then jumps back to 0 — creating a seamless infinite loop.
        */}
        <div
          ref={trackRef}
          className="marquee-track flex gap-4 w-max"
          style={
            duration > 0
              ? {
                  animationName,
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationPlayState: 'var(--marquee-play, running)',
                  willChange: 'transform',
                }
              : undefined
          }
          aria-label="Tech stack marquee"
          role="region"
        >
          {/* Copy 1 */}
          {items.map((item, i) => (
            <div key={`a-${item.id}-${i}`} className="flex-shrink-0">
              <Badge variant={item.color ?? 'default'}>{item.label}</Badge>
            </div>
          ))}
          {/* Copy 2 — identical, enables seamless loop */}
          {items.map((item, i) => (
            <div key={`b-${item.id}-${i}`} aria-hidden="true" className="flex-shrink-0">
              <Badge variant={item.color ?? 'default'}>{item.label}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/*
        Inject keyframes + pause logic via a style tag.
        Avoids adding to globals.css while keeping SSR-safe.
        The group-hover selector sets --marquee-play to "paused".
      */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-outer:hover .marquee-track {
          --marquee-play: paused;
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}