'use client';

/**
 * Projects section
 * ────────────────
 * Layout:
 *  • Section header with gradient label + subtitle
 *  • Featured projects — stacked full-width cards (one per row)
 *  • Regular projects — responsive 3-col grid
 *  • Project detail modal at section level (rendered in portal)
 *
 * State:
 *  selectedProject → null means modal closed, ProjectDetail means open
 */

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from '@/components/ui/ProjectCard';
import ProjectDetailModal from '@/components/ui/ProjectDetailModal';
import { getFeaturedProjects, getRegularProjects, ProjectDetail } from '@/data/projects';

/* ── Section header animation ────────────────────────────────────────────── */
const headerV = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const gridV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Projects() {
  const featuredProjects = getFeaturedProjects() as ProjectDetail[];
  const regularProjects = getRegularProjects() as ProjectDetail[];

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const handleOpen = useCallback((p: Project) => {
    setSelectedProject(p as ProjectDetail);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      
      <section
        id="projects"
        className="relative py-16 md:py-32 px-4 md:px-8
          bg-background dark:bg-gradient-to-b
          dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
      >
        {/* Ambient top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
            w-[700px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />

        <div className="max-w-7xl mx-auto">
          {/* ── Section header ──────────────────────────────────────────── */}
          <motion.div
            variants={headerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-16 md:mb-20 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                border border-white/10 bg-white/[0.04] backdrop-blur-xl
                text-xs uppercase tracking-[0.35em] text-foreground/50 font-mono">
                Selected Work
              </span>
            </div>

            <div className="space-y-3 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50
                  bg-clip-text">
                  Projects that ship.
                </span>
              </h2>
              <p className="text-base md:text-lg text-foreground/50 leading-relaxed">
                End-to-end builds — from architecture decisions to production deployments.
                Click any card to read the full case study.
              </p>
            </div>
          </motion.div>

          {/* ── Featured projects — stacked ──────────────────────────────── */}
          {featuredProjects.length > 0 && (
            <div className="space-y-5 md:space-y-6 mb-8 md:mb-10">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                  onOpenDetail={handleOpen}
                />
              ))}
            </div>
          )}

          {/* Divider between featured and grid */}
          {regularProjects.length > 0 && featuredProjects.length > 0 && (
            <div className="relative my-10 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/8" />
              <span className="text-xs uppercase tracking-widest text-foreground/25 font-mono shrink-0">
                More projects
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/8" />
            </div>
          )}

          {/* ── Regular projects — 3-col grid ─────────────────────────── */}
          {regularProjects.length > 0 && (
            <motion.div
              variants={gridV}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {regularProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetail={handleOpen}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal rendered outside section via portal */}
      <ProjectDetailModal project={selectedProject} onClose={handleClose} />
    </>
  );
}