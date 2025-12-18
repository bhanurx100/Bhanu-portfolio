'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope, FaSun, FaMoon, FaTimes, FaBars } from 'react-icons/fa';
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
 * Mobile Navigation
 * Hamburger menu with slide-out overlay for mobile and tablet devices
 * Shows only on screens smaller than lg breakpoint (< 1024px)
 */
export default function MobileNav() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const sectionIds = navigationItems.map(item => item.id);
  const activeSection = useIntersectionObserver(sectionIds);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close menu after navigation
    }
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Don't render on server
  if (!mounted) return null;

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    }),
  };

  return (
    <>
      {/* Hamburger Button - Fixed top right with theme-aware styling */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed top-6 right-6 z-[60] lg:hidden',
          'p-3 rounded-xl',
          'backdrop-blur-xl border shadow-lg',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          // Theme-aware styling: different bg, border, and text for light vs dark mode
          theme === 'dark'
            ? 'bg-gray-800/90 border-white/20 text-gray-100 hover:bg-gray-700/90 hover:text-primary focus-visible:ring-offset-gray-900'
            : 'bg-white/90 border-gray-800/20 text-gray-900 hover:bg-gray-100/90 hover:text-primary focus-visible:ring-offset-white'
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </motion.button>

      {/* Overlay and Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-out menu with theme-aware background */}
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "fixed top-0 right-0 bottom-0 w-[280px] backdrop-blur-xl border-l z-[56] lg:hidden overflow-y-auto",
                // Theme-aware sidebar background and border
                theme === 'dark'
                  ? 'bg-gray-900/95 border-white/10'
                  : 'bg-slate-100/95 border-gray-800/10'
              )}
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full px-6 py-20">
                {/* Navigation items */}
                <div className="flex flex-col gap-2 flex-1">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        onClick={() => handleNavigate(item.href)}
                        className={cn(
                          'flex items-center gap-4 px-5 py-4 rounded-xl',
                          'text-left transition-all duration-200',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : theme === 'dark'
                            ? 'text-gray-400 hover:text-gray-100 hover:bg-white/5 focus-visible:ring-offset-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-900/5 focus-visible:ring-offset-slate-100'
                        )}
                        aria-label={`Navigate to ${item.label}`}
                        aria-current={isActive ? 'true' : 'false'}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-lg font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Separator - theme-aware */}
                <motion.div
                  custom={4}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className={cn(
                    "h-px my-4",
                    theme === 'dark' ? 'bg-white/10' : 'bg-gray-800/10'
                  )}
                />

                {/* Theme toggle - styled to match navigation items */}
                <motion.button
                  custom={5}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  onClick={handleThemeToggle}
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 rounded-xl',
                    'text-left transition-all duration-200',
                    'border',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    // Different styling for light vs dark mode
                    theme === 'dark'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/30 focus-visible:ring-offset-gray-900'
                      : 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/30 focus-visible:ring-offset-slate-100'
                  )}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {theme === 'dark' ? (
                      <FaSun className="w-5 h-5" />
                    ) : (
                      <FaMoon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className="text-lg font-medium">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </motion.button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
