'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope, FaTimes, FaBars } from 'react-icons/fa';
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
  const sectionIds = navigationItems.map(item => item.id);
  const activeSection = useIntersectionObserver(sectionIds);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  const menuVariants = {
    closed: { x: '100%' },
    open: { x: 0 },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] lg:hidden p-3 rounded-xl bg-background border shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[55] lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-background z-[56] lg:hidden"
            >
              <div className="flex flex-col px-6 py-20 gap-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.href)}
                      className={cn(
                        'flex items-center gap-4 px-5 py-4 rounded-xl',
                        isActive && 'bg-primary/10 text-primary'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
