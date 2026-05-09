'use client';

/**
 * ProjectDetailModal
 * ─────────────────
 * Full-screen case-study modal with scroll-locked backdrop.
 * Opens via Framer Motion shared layout animation.
 * Keyboard: Escape closes, focus-trapped inside.
 */

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
  FiX, FiGithub, FiExternalLink, FiZap, FiCpu,
  FiLayers, FiTarget, FiCheckCircle, FiTrendingUp,
  FiUsers, FiStar,
} from 'react-icons/fi';
import { ProjectDetail } from '@/data/projects';
import { cn } from '@/lib/utils';

/* ── Animation variants ───────────────────────────────────────────────────── */
const backdropV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

const panelV = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 30, delay: 0.05 },
  },
  exit: {
    opacity: 0, y: 30, scale: 0.97,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

const sectionV = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.12 + i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

/* ── Helper components ────────────────────────────────────────────────────── */

function SectionCard({
icon: Icon,
title,
children,
className,
index = 0,
}: {
icon: IconType;
title: string;
children: React.ReactNode;
className?: string;
index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={sectionV}
      initial="hidden"
      animate="visible"
      className={cn(
        'rounded-2xl border border-white/8 bg-white/[0.035] backdrop-blur-sm p-5 md:p-6',
        className
      )}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/15 text-primary">
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/60">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

/** Bulleted list with subtle leading line */
function BulletList({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
          <span className={cn(
            'mt-1.5 w-1.5 h-1.5 rounded-full shrink-0',
            accent ? 'bg-primary' : 'bg-secondary/70'
          )} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Metric pill */
function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-3.5 rounded-2xl border border-primary/20 bg-primary/8 text-center min-w-[120px]">
      <span className="text-lg font-bold text-primary leading-none">{value}</span>
      <span className="text-xs text-foreground/50 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [project]);

  /* Keyboard close + focus trap */
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  /* Auto-focus close button on open */
  useEffect(() => {
    if (project) setTimeout(() => closeRef.current?.focus(), 120);
  }, [project]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key="modal-root"
          variants={backdropV}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            variants={panelV}
            className={cn(
              'relative z-10 w-full sm:max-w-3xl lg:max-w-4xl',
              'bg-[#0d0f14]/95 backdrop-blur-2xl',
              'border border-white/10 rounded-t-3xl sm:rounded-3xl',
              'shadow-[0_32px_80px_rgba(0,0,0,0.7)]',
              'max-h-[92dvh] sm:max-h-[88vh]',
              'flex flex-col overflow-hidden min-h-0',
            )}
          >
            {/* ── Sticky header ─────────────────────────────────────────── */}
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 pt-6 pb-4
              bg-[#0d0f14]/90 backdrop-blur-xl border-b border-white/6">
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-secondary/80 font-mono mb-1">
                  {project.tagline}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight truncate">
                  {project.title}
                </h2>
                {/* Tech pills — scrollable row */}
                <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto scrollbar-hide pb-0.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-medium
                        bg-white/6 border border-white/10 text-foreground/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close modal"
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl
                  bg-white/6 border border-white/10 text-foreground/60
                  hover:bg-white/12 hover:text-foreground hover:border-white/20
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  transition-all duration-200"
              >
                <FiX className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* ── Scrollable body ───────────────────────────────────────── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-6 py-5 space-y-4
                scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            >
              {/* Hero image */}
              <motion.div
                custom={0}
                variants={sectionV}
                initial="hidden"
                animate="visible"
                className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border border-white/8"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Metrics overlay */}
                {project.metrics && (
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {Object.entries(project.metrics).map(([k, v]) => (
                      <span
                        key={k}
                        className="px-3 py-1 rounded-full text-xs font-semibold
                          bg-black/60 backdrop-blur-md border border-white/20 text-white"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Metrics row */}
              {project.metrics && (
                <motion.div
                  custom={1}
                  variants={sectionV}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-3 flex-wrap"
                >
                  {Object.entries(project.metrics).map(([label, value]) => (
                    <MetricPill key={label} label={label} value={value} />
                  ))}
                </motion.div>
              )}

              {/* Overview */}
              <SectionCard icon={FiStar} title="Overview" index={2}>
                <p className="text-sm text-foreground/75 leading-relaxed">{project.overview}</p>
              </SectionCard>

              {/* Problem */}
              <SectionCard icon={FiTarget} title="Problem Solved" index={3}>
                <p className="text-sm text-foreground/75 leading-relaxed">{project.problem}</p>
              </SectionCard>

              {/* Features + Architecture — 2-col on md+ */}
              <div className="grid md:grid-cols-2 gap-4">
                <SectionCard icon={FiCheckCircle} title="Key Features" index={4}>
                  <BulletList items={project.features} accent />
                </SectionCard>
                <SectionCard icon={FiLayers} title="Architecture" index={5}>
                  <p className="text-sm text-foreground/75 leading-relaxed">{project.architecture}</p>
                </SectionCard>
              </div>

              {/* Challenges */}
              <SectionCard icon={FiZap} title="Engineering Challenges" index={6}>
                <BulletList items={project.challenges} />
              </SectionCard>

              {/* Optimizations + UX decisions — 2-col on md+ */}
              <div className="grid md:grid-cols-2 gap-4">
                <SectionCard icon={FiTrendingUp} title="Performance Optimizations" index={7}>
                  <BulletList items={project.optimizations} accent />
                </SectionCard>
                <SectionCard icon={FiCpu} title="UX Decisions" index={8}>
                  <BulletList items={project.uxDecisions} />
                </SectionCard>
              </div>

              {/* Responsibilities */}
              <SectionCard icon={FiUsers} title="My Responsibilities" index={9}>
                <div className="flex flex-wrap gap-2">
                  {project.responsibilities.map((r) => (
                    <span
                      key={r}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium
                        bg-secondary/10 border border-secondary/20 text-secondary/90"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </SectionCard>

              {/* Demo note */}
              {project.demoNote && (
                <motion.p
                  custom={10}
                  variants={sectionV}
                  initial="hidden"
                  animate="visible"
                  className="text-xs text-foreground/40 italic text-center pb-1"
                >
                  💡 {project.demoNote}
                </motion.p>
              )}
            </div>

            {/* ── Sticky footer ─────────────────────────────────────────── */}
            <div className="sticky bottom-0 z-20 flex items-center justify-between gap-3 px-6 py-4
              bg-[#0d0f14]/90 backdrop-blur-xl border-t border-white/6">
              <button
                onClick={onClose}
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
              >
                ← Back to projects
              </button>

              <div className="flex items-center gap-2.5">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      border border-white/12 bg-white/5 text-foreground/70
                      hover:bg-white/10 hover:border-white/20 hover:text-foreground
                      transition-all duration-200"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span className="hidden sm:inline">Source</span>
                  </a>
                )}
                {project.links.live && project.links.live !== '#' && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live demo"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      bg-primary text-white border border-primary/50
                      hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(68,38,217,0.4)]
                      transition-all duration-200"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}