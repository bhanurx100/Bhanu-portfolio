'use client';

import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Badge } from './Badge';

interface MarqueeItem {
  id: string;
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'accent';
}

interface MarqueeScrollProps {
  items: MarqueeItem[];
  speed?: number;
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
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  // Motion state
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Measure content width (half of duplicated content)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setHalfWidth(el.scrollWidth / 2);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [items]);

  // Drive marquee via animation frame for precise control and hover pause
  useAnimationFrame((_, delta) => {
    if (!halfWidth) return;
    if (pauseOnHover && isHovered) return;

    const dir = direction === 'left' ? -1 : 1;
    const pxPerMs = speed / 1000; // speed in px/sec
    let next = x.get() + dir * pxPerMs * delta;

    // Wrap seamlessly across half width since items are duplicated
    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;

    x.set(next);
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        className="flex gap-4"
        style={{ x, willChange: 'transform' }}
        onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
        aria-label="skills-marquee"
        role="region"
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0">
            <Badge variant={item.color || 'default'}>{item.label}</Badge>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
