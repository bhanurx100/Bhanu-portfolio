/**
 * lib/motion.ts — shared Framer Motion presets
 * ─────────────────────────────────────────────
 * Centralising variants here means:
 *  - One place to tune easing/duration for the whole site.
 *  - Components import the preset instead of re-declaring inline,
 *    which eliminates object re-creation on every render.
 *  - All animations use only `opacity` + `transform` (y/scale) —
 *    GPU-composited properties that never trigger layout.
 *
 * Easing philosophy:
 *  - Entrances → easeOut (fast start, gentle settle)
 *  - Exits / hover → easeIn or spring
 *  - Spring configs: moderate stiffness (300-380) + damping (28-32)
 *    to avoid bouncing on functional UI elements.
 */

import type { Variants, Transition } from 'framer-motion';

/* ── Base transitions ─────────────────────────────────────────────────────── */

export const ease = {
  out:    [0.16, 1, 0.3, 1]  as const,   // custom ease-out, feels snappy
  in:     [0.4, 0, 1, 1]     as const,
  inOut:  [0.4, 0, 0.2, 1]   as const,
} as const;

export const duration = {
  fast:   0.18,
  normal: 0.32,
  slow:   0.5,
} as const;

/** Standard spring for interactive elements (dock, magnetic, active indicators) */
export const spring: Transition = {
  type: 'spring',
  stiffness: 360,
  damping: 30,
};

/** Gentler spring for layout animations (modal, drawer) */
export const springModal: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
};

/* ── Scroll-reveal variants ───────────────────────────────────────────────── */

/** Simple fade-up — used by most sections */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/** Stagger container */
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Card entrance — slightly less travel than fadeUp */
export const cardEnter: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/** Fade-only — for overlays / backdrops */
export const fadeOnly: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal } },
  exit:    { opacity: 0, transition: { duration: duration.fast } },
};

/* ── Common viewport options ──────────────────────────────────────────────── */

/** Use `once: true` for most scroll reveals — avoids re-triggering */
export const viewport = { once: true, margin: '-80px' } as const;
export const viewportLazy = { once: true, margin: '-40px' } as const;