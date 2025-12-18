'use client';

import { useEffect, useState, useMemo } from 'react';

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Shared hook for observing element intersections
 * Used by navigation components to track active sections
 */
export function useIntersectionObserver(
  sectionIds: string[],
  options: UseIntersectionObserverOptions = {}
) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  
  // Memoize section IDs string for dependency array
  const sectionIdsKey = useMemo(() => sectionIds.join(','), [sectionIds]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: options.root || null,
      rootMargin: options.rootMargin || '-50% 0px -50% 0px',
      threshold: options.threshold || 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIdsKey, options.root, options.rootMargin, options.threshold]);

  return activeSection;
}

