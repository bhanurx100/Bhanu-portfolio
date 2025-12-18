import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easing functions
export const easings = {
  power1: 'power1.out',
  power2: 'power2.out',
  power3: 'power3.out',
  power4: 'power4.out',
  elastic: 'elastic.out(1, 0.3)',
  back: 'back.out(1.7)',
  expo: 'expo.out',
  circ: 'circ.out',
} as const;

// Animation durations
export const durations = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.5,
  slow: 0.8,
  verySlow: 1.2,
} as const;

// Default GSAP settings
export const defaultGSAPConfig = {
  force3D: true,
  transformOrigin: 'center center',
} as const;

// Scroll trigger defaults
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
} as const;

// Animation variants for common patterns
export const fadeInUp = {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0, duration: durations.medium, ease: easings.power3 },
};

export const fadeInDown = {
  from: { opacity: 0, y: -50 },
  to: { opacity: 1, y: 0, duration: durations.medium, ease: easings.power3 },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: durations.medium },
};

export const scaleIn = {
  from: { scale: 0.8, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: durations.medium, ease: easings.back },
};

export const slideInLeft = {
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1, duration: durations.medium, ease: easings.power3 },
};

export const slideInRight = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1, duration: durations.medium, ease: easings.power3 },
};

// Stagger configuration
export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  verySlow: 0.2,
} as const;

// Helper function to create scroll-triggered animation
export const createScrollTrigger = (
  element: gsap.TweenTarget,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element as any,
      ...scrollTriggerDefaults,
      ...options,
    },
  });
};

// Helper to batch scroll animations
export const batchScrollTrigger = (
  elements: string,
  animation: gsap.TweenVars,
  options?: any
) => {
  const { stagger = staggerConfig.normal, ...scrollOptions } = options || {};

  return ScrollTrigger.batch(elements, {
    ...scrollTriggerDefaults,
    ...scrollOptions,
    onEnter: (batch: any) =>
      gsap.to(batch, {
        ...animation,
        stagger,
      }),
  } as any);
};

// Helper to kill all scroll triggers
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Helper to refresh scroll triggers
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };
