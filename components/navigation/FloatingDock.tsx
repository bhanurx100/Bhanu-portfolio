'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';

const navigationItems = [
  { id: 'home', label: 'Home', icon: FaHome, href: '#home' },
  { id: 'projects', label: 'Projects', icon: FaProjectDiagram, href: '#projects' },
  { id: 'about', label: 'About', icon: FaUser, href: '#about' },
  { id: 'contact', label: 'Contact', icon: FaEnvelope, href: '#contact' },
];

/**
 * Floating Dock Navigation
 * macOS-inspired dock with section navigation
 * Glassmorphic design, desktop only
 */
export default function FloatingDock() {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const sectionIds = navigationItems.map(item => item.id);
  const activeSection = useIntersectionObserver(sectionIds);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent SSR mismatch
  if (!mounted) return null;

  const springTransition = {
    type: 'spring',
    stiffness: 380,
    damping: 30,
  };

  const itemVariants = {
    idle: { scale: 1, y: 0 },
    hover: {
      scale: 1.2,
      y: -8,
      transition: prefersReducedMotion ? { duration: 0 } : springTransition,
    },
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-8 left-0 right-0 z-50 hidden lg:block pointer-events-none lg:pointer-events-auto"
      aria-label="Floating dock navigation"
    >
      <div className="relative mx-auto w-fit">
        {/* Dock container */}
        <div className="flex items-center gap-1 px-4 py-3 bg-background-elevated/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} className="relative">
                <motion.button
                  variants={itemVariants}
                  initial="idle"
                  whileHover="hover"
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  onClick={() => handleNavigate(item.href)}
                  className={cn(
                    'relative p-3 rounded-xl transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  )}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <Icon className="w-5 h-5" />

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary/20 rounded-xl"
                      style={{ zIndex: -1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
