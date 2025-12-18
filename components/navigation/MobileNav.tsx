'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaEnvelope,
  FaTimes,
  FaBars,
} from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/animations/useReducedMotion';

const navigationItems = [
  { id: 'home', label: 'Home', icon: FaHome, href: '#home' },
  { id: 'projects', label: 'Projects', icon: FaProjectDiagram, href: '#projects' },
  { id: 'about', label: 'About', icon: FaUser, href: '#about' },
  { id: 'contact', label: 'Contact', icon: FaEnvelope, href: '#contact' },
];

export default function MobileNav() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme(); // theme only for styling
  const sectionIds = navigationItems.map(item => item.id);
  const activeSection = useIntersectionObserver(sectionIds);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
    open: {
      x: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
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
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed top-6 right-6 z-[60] lg:hidden',
          'p-3 rounded-xl backdrop-blur-xl border shadow-lg',
          theme === 'dark'
            ? 'bg-gray-800/90 border-white/20 text-gray-100'
            : 'bg-white/90 border-gray-800/20 text-gray-900'
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />

            {/* Slide-out Menu */}
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                'fixed top-0 right-0 bottom-0 w-[280px] backdrop-blur-xl border-l z-[56] lg:hidden',
                theme === 'dark'
                  ? 'bg-gray-900/95 border-white/10'
                  : 'bg-slate-100/95 border-gray-800/10'
              )}
            >
              <div className="flex flex-col h-full px-6 py-20">
                <div className="flex flex-col gap-2">
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
                          'flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all',
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : theme === 'dark'
                            ? 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-900/5'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-lg font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
