'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';
import { FiMapPin, FiZap, FiAward, FiUsers } from 'react-icons/fi';

/**
 * IMPORTANT:
 * react-icons components accept `className`
 * so we must type icon strictly as a React component with className
 */
type IconType = FC<{ className?: string }>;

interface Badge {
  id: string;
  icon: IconType;
  label: string;
  value: string;
}

const badges: Badge[] = [
  {
    id: 'location',
    icon: FiMapPin,
    label: 'Based in',
    value: 'Remote',
  },
  {
    id: 'response',
    icon: FiZap,
    label: 'Response',
    value: '< 48 hrs',
  },
  {
    id: 'projects',
    icon: FiAward,
    label: 'Projects',
    value: '20+ Shipped',
  },
  {
    id: 'clients',
    icon: FiUsers,
    label: 'Users Served',
    value: '5K+',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function TrustBadges() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-4 justify-center lg:justify-start"
    >
      {badges.map((badge) => {
        const Icon = badge.icon;

        return (
          <motion.div
            key={badge.id}
            variants={badgeVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
          >
            {/* Icon */}
            <Icon className="w-4 h-4 text-primary" />

            {/* Text */}
            <div className="flex items-center gap-1.5">
              <span className="text-text-secondary text-sm">
                {badge.label}:
              </span>
              <span className="text-text-primary text-sm font-medium">
                {badge.value}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
