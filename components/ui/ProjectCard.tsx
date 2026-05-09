'use client';

/**
 * ProjectCard
 * ───────────
 * Two variants:
 *  featured  → wide landscape card (full-width, side-by-side on lg)
 *  regular   → compact portrait card (3-col grid)
 *
 * Clicking anywhere on a card fires onOpenDetail — parent passes the
 * project object up so the modal can be rendered at page level.
 *
 * Micro-interactions:
 *  - Subtle border glow on hover (CSS box-shadow transition)
 *  - Image scales to 1.04 with overflow:hidden clipping
 *  - "View Case Study" CTA fades-in on hover (featured card only)
 *  - Spring scale on the entire card using Framer Motion
 */

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

/* ── Public types (re-exported so other files can import from here) ───────── */
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  video?: string;
  tech: string[];
  metrics?: Record<string, string>;
  links: { github?: string; live?: string };
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  /** Fires when the user clicks the card / "View Case Study" CTA */
  onOpenDetail?: (project: Project) => void;
}

/* ── Card entrance animation ─────────────────────────────────────────────── */
const cardV = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ── Shared metric pill ───────────────────────────────────────────────────── */
function MetricChip({ value }: { value: string }) {
  return (
    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold
      bg-primary/15 border border-primary/25 text-primary/90 leading-none">
      {value}
    </span>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function ProjectCard({ project, featured = false, onOpenDetail }: ProjectCardProps) {
  const handleOpen = () => onOpenDetail?.(project);

  /* ── FEATURED card ──────────────────────────────────────────────────────── */
  if (featured) {
    return (
      <motion.article
        variants={cardV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="group relative"
        aria-label={`${project.title} — featured project`}
      >
        <div
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
          aria-label={`Open ${project.title} case study`}
          className={cn(
            'relative overflow-hidden rounded-3xl cursor-pointer',
            'border border-white/8 bg-white/[0.03]',
            /* hover state */
            'hover:border-white/18 hover:bg-white/[0.05]',
            'hover:shadow-[0_0_40px_rgba(68,38,217,0.18),0_8px_32px_rgba(0,0,0,0.4)]',
            'transition-all duration-400 ease-out',
            /* layout */
            'flex flex-col lg:flex-row lg:items-stretch gap-0',
          )}
        >
          {/* Subtle glow orb — top-left, visible on hover */}
          <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full
            bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* ── Image panel ─────────────────────────────────────────────── */}
          <div className="relative lg:w-[52%] overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.tagline}`}
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              priority
            />
            {/* gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />

            {/* Metrics floating on image */}
            {project.metrics && (
              <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                {Object.values(project.metrics).map((v) => (
                  <span key={v} className="px-2.5 py-1 rounded-lg text-xs font-semibold
                    bg-black/55 backdrop-blur-md border border-white/15 text-white">
                    {v}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Content panel ───────────────────────────────────────────── */}
          <div className="flex flex-col justify-between flex-1 p-6 md:p-8 lg:p-8">
            {/* Top */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/40 font-mono">
                <span className="h-px w-6 bg-border/60" />
                {project.tagline}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight
                group-hover:text-primary/90 transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.tech.slice(0, 6).map((t) => (
                <Badge key={t} variant="secondary" className="text-[11px] px-2.5 py-0.5">
                  {t}
                </Badge>
              ))}
              {project.tech.length > 6 && (
                <span className="px-2.5 py-0.5 text-[11px] text-foreground/40 font-medium">
                  +{project.tech.length - 6}
                </span>
              )}
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/6">
              {/* Case study button */}
              <button
                onClick={handleOpen}
                className="flex items-center gap-2 text-sm font-semibold text-primary/80
                  hover:text-primary transition-colors duration-200 group/btn"
              >
                View Case Study
                <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>

              {/* Link icons */}
              <div className="flex items-center gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg border border-white/10 bg-white/4 text-foreground/50
                      hover:text-foreground hover:border-white/20 hover:bg-white/8
                      transition-all duration-200"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                )}
                {project.links.live && project.links.live !== '#' && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg border border-white/10 bg-white/4 text-foreground/50
                      hover:text-foreground hover:border-white/20 hover:bg-white/8
                      transition-all duration-200"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  /* ── REGULAR card ───────────────────────────────────────────────────────── */
  return (
    <motion.article
      variants={cardV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative h-full"
      aria-label={`${project.title} project card`}
    >
      <div
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
        aria-label={`Open ${project.title} case study`}
        className={cn(
          'relative h-full overflow-hidden rounded-2xl cursor-pointer flex flex-col',
          'border border-white/8 bg-white/[0.03]',
          'hover:border-white/16 hover:bg-white/[0.05]',
          'hover:shadow-[0_0_28px_rgba(68,38,217,0.14),0_4px_24px_rgba(0,0,0,0.3)]',
          'transition-all duration-350 ease-out',
        )}
      >
        {/* ── Image ─────────────────────────────────────────────────────── */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Hover overlay — "View Case Study" */}
          <div className="absolute inset-0 flex items-center justify-center
            bg-black/50 backdrop-blur-[2px]
            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
              bg-primary text-white shadow-[0_0_20px_rgba(68,38,217,0.5)]">
              View Case Study
              <FiArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5">
          {/* Tagline */}
          <p className="text-[11px] uppercase tracking-widest text-foreground/35 font-mono mb-2">
            {project.tagline}
          </p>

          {/* Title */}
          <h3 className="text-base font-bold text-foreground mb-2.5 group-hover:text-primary/90
            transition-colors duration-250 leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-foreground/55 leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {Object.values(project.metrics).map((v) => (
                <MetricChip key={v} value={v} />
              ))}
            </div>
          )}

          {/* Tech + links */}
          <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/6 gap-2">
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px] px-2 py-0.5">
                  {t}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <span className="text-[10px] text-foreground/35 self-center ml-0.5">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-foreground/40 hover:text-foreground
                    hover:bg-white/8 transition-all duration-200"
                >
                  <FiGithub className="w-3.5 h-3.5" />
                </a>
              )}
              {project.links.live && project.links.live !== '#' && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-foreground/40 hover:text-foreground
                    hover:bg-white/8 transition-all duration-200"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}