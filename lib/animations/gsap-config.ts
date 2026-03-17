/* ========= GSAP LAZY LOADER (PERF OPTIMIZED) ========= */

type GSAPType = typeof import("gsap").default;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let gsapInstance: GSAPType | null = null;
let scrollTriggerInstance: ScrollTriggerType | null = null;

export const loadGSAP = async () => {
  if (typeof window === "undefined") return null;

  if (!gsapInstance) {
    const gsapModule = await import("gsap");
    const scrollModule = await import("gsap/ScrollTrigger");

    gsapInstance = gsapModule.default;
    scrollTriggerInstance = scrollModule.ScrollTrigger;

    gsapInstance.registerPlugin(scrollTriggerInstance);
  }

  return {
    gsap: gsapInstance,
    ScrollTrigger: scrollTriggerInstance,
  };
};

/* ========= EASINGS ========= */

export const easings = {
  power1: "power1.out",
  power2: "power2.out",
  power3: "power3.out",
  power4: "power4.out",
  elastic: "elastic.out(1, 0.3)",
  back: "back.out(1.7)",
  expo: "expo.out",
  circ: "circ.out",
} as const;

/* ========= DURATIONS ========= */

export const durations = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.5,
  slow: 0.8,
  verySlow: 1.2,
} as const;

/* ========= DEFAULT CONFIG ========= */

export const defaultGSAPConfig = {
  force3D: true,
  transformOrigin: "center center",
} as const;

/* ========= SCROLL TRIGGER DEFAULTS ========= */

export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
} as const;

/* ========= ANIMATION VARIANTS ========= */

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

/* ========= STAGGER ========= */

export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  verySlow: 0.2,
} as const;

/* ========= SAFE HELPERS ========= */

const ensureGSAP = async () => {
  const lib = await loadGSAP();
  if (!lib) throw new Error("GSAP not available on server");
  return lib;
};

/* ========= SCROLL TRIGGER HELPERS ========= */

export const createScrollTrigger = async (
  element: Element | string,
  animation: gsap.TweenVars,
  options?: Partial<gsap.ScrollTriggerVars>,
) => {
  const { gsap } = await ensureGSAP();

  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      ...scrollTriggerDefaults,
      ...options,
    },
  });
};

export const batchScrollTrigger = async (
  elements: string,
  animation: Record<string, any>,
  options?: Record<string, any>,
) => {
  const { gsap, ScrollTrigger } = await ensureGSAP();

  const { stagger = staggerConfig.normal, ...scrollOptions } = options || {};

  return ScrollTrigger.batch(elements, {
    ...scrollTriggerDefaults,
    ...scrollOptions,
    onEnter: (batch: Element[]) =>
      gsap.to(batch, {
        ...animation,
        stagger,
      }),
  });
};

/* ========= UTIL FUNCTIONS ========= */

export const killAllScrollTriggers = async () => {
  const { ScrollTrigger } = await ensureGSAP();
  ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
};

export const refreshScrollTriggers = async () => {
  const { ScrollTrigger } = await ensureGSAP();
  ScrollTrigger.refresh();
};

/* ========= PUBLIC ACCESS ========= */

export const getGSAP = async () => {
  return await ensureGSAP();
};
