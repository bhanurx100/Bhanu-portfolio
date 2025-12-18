'use client';

import { motion } from 'framer-motion';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function BorderBeam({
  size = 200,
  duration = 15,
  delay = 0,
  className = '',
}: BorderBeamProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-xl ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,
            transparent,
            var(--primary-color, #713cbc),
            var(--secondary-color, #00F0FF),
            var(--accent-color, #FF006E),
            transparent
          )`,
          backgroundSize: `${size}% 100%`,
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
