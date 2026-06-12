"use client";

/**
 * Projects section
 * ────────────────
 * Layout:
 * • Section header with gradient label + subtitle
 * • Featured projects — stacked full-width cards (one per row)
 * • Regular projects — responsive 3-col grid
 * • "Explore More on GitHub" central section call-to-action
 * • Project detail modal at section level (rendered in portal)
 *
 * State:
 * selectedProject → null means modal closed, ProjectDetail means open
 */

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";
import {
  getFeaturedProjects,
  getRegularProjects,
  ProjectDetail,
} from "@/data/projects";

/* ── Section header animation ────────────────────────────────────────────── */
const headerV = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const gridV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Projects() {
  const featuredProjects = getFeaturedProjects() as ProjectDetail[];
  const regularProjects = getRegularProjects() as ProjectDetail[];

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(
    null,
  );

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
        className="relative py-24 md:py-32 px-5 md:px-8 bg-transparent"
      >
        {/* Ambient top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
            w-full max-w-[700px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />

        <div className="max-w-7xl mx-auto">
          {/* ── Section header ──────────────────────────────────────────── */}
          <motion.div
            variants={headerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16 md:mb-20 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                border border-white/10 bg-white/[0.04] backdrop-blur-xl
                text-xs uppercase tracking-[0.35em] text-foreground/50 font-mono"
              >
                Selected Work
              </span>
            </div>

            <div className="space-y-3 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span
                  className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50
                  bg-clip-text"
                >
                  Projects that ship.
                </span>
              </h2>
              <p className="text-base md:text-lg text-foreground/50 leading-relaxed">
                End-to-end builds — from architecture decisions to production
                deployments. Click any card to read the full case study.
              </p>
            </div>
          </motion.div>

          {/* ── Featured projects — stacked ──────────────────────────────── */}
          {featuredProjects.length > 0 && (
            <div className="space-y-5 md:space-y-6 mb-8 md:mb-10">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-zinc-950 border border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <ProjectCard
                    project={project}
                    featured
                    onOpenDetail={handleOpen}
                  />
                </div>
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
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {regularProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-zinc-950 border border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl"
                >
                  <ProjectCard
                    project={project}
                    onOpenDetail={handleOpen}
                  />
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Global GitHub Call-to-Action Button ── */}
          <div className="mt-16 md:mt-20 flex justify-center">
            <a
              href="https://github.com/bhanurx100" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-xl
                text-sm font-mono uppercase tracking-wider font-semibold
                bg-zinc-900/50 backdrop-blur-md border border-sky-500/20 text-zinc-300
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:text-white hover:border-pink-500/60
                hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
            >
              {/* GitHub SVG Icon */}
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              
              <span>See More on GitHub</span>

              {/* Arrow Icon */}
              <svg 
                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Modal rendered outside section via portal */}
      <ProjectDetailModal project={selectedProject} onClose={handleClose} />
    </>
  );
}