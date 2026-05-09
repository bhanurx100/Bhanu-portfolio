'use client';

/**
 * About section
 * ─────────────
 * Layout (top → bottom):
 *  1. Section label + headline
 *  2. Bio card (left) + Focus areas (right)
 *  3. Stats row — animated counters
 *  4. Experience timeline
 *
 * Design upgrades over the original:
 *  - Bio rewritten to be confident, product-engineering-focused, specific
 *  - Quick-info grid replaced with a cleaner 2×2 chip layout
 *  - Timeline uses a proper left-border rail with pulse dots
 *  - Stats use color-coded icons that don't over-rely on "gradient text"
 *  - Focus cards are compact and scannable (icon + title + tag pills)
 *  - All spacing normalized to the 4/8-point grid
 */

import { motion } from 'framer-motion';
import {
  FiBriefcase, FiCode, FiTrendingUp, FiAward,
  FiZap, FiCpu, FiUsers, FiMapPin,
} from 'react-icons/fi';
import { RevealCard } from '@/components/ui/RevealCard';
import { AnimatedStat } from '@/components/ui/AnimatedStat';

/* ── Animation helpers ────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ── Data ─────────────────────────────────────────────────────────────────── */
const stats = [
  { icon: FiBriefcase, value: 2,   suffix: '+', label: 'Years Building',     color: 'text-primary'   },
  { icon: FiCode,      value: 15,  suffix: '+', label: 'Projects Shipped',   color: 'text-secondary' },
  { icon: FiTrendingUp,value: 10,  suffix: '+', label: 'Features Delivered', color: 'text-primary'   },
  { icon: FiAward,     value: 100, suffix: '%', label: 'Completion Rate',    color: 'text-secondary' },
];

const focusAreas = [
  {
    icon: FiCode,
    title: 'React & Next.js Interfaces',
    desc: 'Component-driven UIs that are fast, accessible, and maintainable at scale.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    icon: FiZap,
    title: 'Runtime Performance',
    desc: 'Profiling, virtualization, code-splitting — shipping experiences that feel instant.',
    tags: ['Core Web Vitals', 'SWR', 'Lazy Loading'],
  },
  {
    icon: FiCpu,
    title: 'Design Engineering',
    desc: 'Translating Figma into pixel-accurate, animated UIs without sacrificing a11y.',
    tags: ['Framer Motion', 'GSAP', 'Tailwind'],
  },
  {
    icon: FiUsers,
    title: 'Cross-Functional Delivery',
    desc: 'Comfortable working directly with designers, PMs, and backend engineers.',
    tags: ['Agile', 'Code Review', 'Pair Programming'],
  },
];

const experiences = [
  {
    company: 'Cynosure Software Solutions Pvt Ltd',
    role: 'Software Engineer',
    period: 'Dec 2023 — Present',
    location: 'Hyderabad, India',
    desc: 'Developing scalable React.js and Next.js applications for clients across India and Southeast Asia, delivering responsive dashboards, reusable component systems, full-stack business workflows, and performance-optimized user experiences for production environments.',

    highlights: [
    'Built scalable React.js / Next.js component architectures and reusable design systems',
    'Optimized application performance, Core Web Vitals, rendering efficiency, and API-driven workflows',
    'Delivered full-stack features including analytics dashboards, transaction systems, and responsive SaaS interfaces',
    'Collaborated across cross-functional teams to ship client-facing products with maintainable and modular architecture'],
  },

  {
    company: 'Webbers Labs Technologies LLP',
    role: 'Frontend Developer — Intern',
    period: 'March 2023 — June 2023',
    location: 'Mysuru, India',
    desc: 'Shipped responsive landing pages and interactive UI enhancements for client websites. Gained real production exposure to WordPress theme architecture and vanilla JS DOM work.',
    highlights: ['JavaScript UI enhancements', 'WordPress customisation', 'Responsive layouts'],
  },
];

/* ── Section component ────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-5 md:px-8
        bg-background dark:bg-gradient-to-b
        dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
    >
      {/* Top ambient line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
          w-[700px] h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent"
      />

      <div className="max-w-6xl mx-auto space-y-20 md:space-y-24">

        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-4 max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-white/10 bg-white/[0.04] backdrop-blur-sm
              text-xs uppercase tracking-[0.35em] text-foreground/50 font-mono"
          >
            About
          </motion.span>

          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-foreground">I build interfaces</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-foreground/70
              bg-clip-text text-transparent">
              engineers are proud to ship.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/50 leading-relaxed">
            Two years in, I&apos;ve gone from intern to the person other devs ask when something
            needs to look right <em>and</em> perform right.
          </motion.p>
        </motion.div>

        {/* ── 2. Bio + Focus areas ──────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-start"
        >
          {/* Bio card */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl
              border border-white/8 bg-white/[0.03] backdrop-blur-xl p-7 md:p-9 space-y-6"
          >
            {/* Ambient glow */}
            <div aria-hidden className="absolute -top-10 -right-10 w-40 h-40 rounded-full
              bg-primary/8 blur-3xl pointer-events-none" />

            <div className="relative space-y-5">
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                I&apos;m a <span className="text-foreground font-semibold">Software Engineer</span> who
                cares about the full chain — from design tokens to deploy pipelines. My focus is
                <span className="text-secondary font-semibold"> React and Next.js</span>, but I&apos;m
                equally comfortable debugging a Node API or setting up a CI workflow.
              </p>
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                I&apos;ve shipped features used by thousands of real users, cut page-load times by
                over 60% on live products, and built component libraries that other developers
                actually want to use. I believe the best UIs are invisible — fast, accessible,
                and out of the user&apos;s way.
              </p>

              {/* Quick-info chips */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {[
                  { label: 'Status',    value: 'Open to roles',        accent: true  },
                  { label: 'Location',  value: 'India (Remote)',        accent: false },
                  { label: 'Stack',     value: 'React · Next · TS',    accent: false },
                  { label: 'Focus',     value: 'Frontend + UI Eng',    accent: false },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    className={`rounded-2xl border px-4 py-3 space-y-0.5
                      ${accent
                        ? 'border-primary/25 bg-primary/8'
                        : 'border-white/8 bg-white/[0.03]'
                      }`}
                  >
                    <p className="text-[10px] uppercase tracking-wider text-foreground/40">{label}</p>
                    <p className={`text-sm font-semibold ${accent ? 'text-primary/90' : 'text-foreground'}`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Availability banner */}
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-green-500/20 bg-green-500/5">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-green-400">Available — Immediate Joiner</p>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    Open to Frontend / Full-Stack roles · Remote or Bengaluru · IST (UTC+5:30)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Focus areas */}
          <motion.div variants={stagger} className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/35 font-mono px-1">
              Focus Areas
            </p>
            {focusAreas.map((area, i) => (
              <motion.div key={area.title} custom={i} variants={fadeUp}>
                <RevealCard
                  className="p-4 border border-white/8 bg-white/[0.03] rounded-2xl"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-xl
                      bg-secondary/12 text-secondary shrink-0">
                      <area.icon className="w-4 h-4" />
                    </span>
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-foreground leading-snug">{area.title}</p>
                      <p className="text-xs text-foreground/50 leading-relaxed">{area.desc}</p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {area.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium
                            border border-white/8 text-foreground/45">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </RevealCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── 3. Stats ──────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp}>
              <RevealCard className="p-5 md:p-6 text-center border border-white/8 bg-white/[0.03]">
                <s.icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} />
                <AnimatedStat
                  value={s.value}
                  suffix={s.suffix}
                  className={`text-3xl md:text-4xl ${s.color}`}
                />
                <p className="text-xs text-foreground/45 mt-1.5 font-medium">{s.label}</p>
              </RevealCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 4. Experience timeline ────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          {/* Sub-heading */}
          <motion.div variants={fadeUp} className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/35 font-mono">
              Journey
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Experience</h3>
          </motion.div>

          {/* Rail + cards */}
          <div className="relative pl-6 sm:pl-10 space-y-5">
            {/* Vertical rail */}
            <div
              aria-hidden
              className="absolute left-1 sm:left-2 top-2 bottom-2 w-px
                bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent"
            />

            {experiences.map((exp, i) => (
              <motion.div key={exp.role} custom={i} variants={fadeUp} className="relative">
                {/* Dot */}
                <span
                  aria-hidden
                  className="absolute -left-[1.375rem] sm:-left-[2.125rem] top-5
                    w-3 h-3 rounded-full border-2 border-primary bg-background-dark
                    shadow-[0_0_12px_rgba(68,38,217,0.5)]"
                />

                <RevealCard className="p-5 md:p-6 border border-white/8 bg-white/[0.03] rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-foreground/40 font-mono mb-1">
                        {exp.company}
                      </p>
                      <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
                    </div>
                    <div className="text-xs text-foreground/40 sm:text-right space-y-0.5 shrink-0">
                      <p className="font-medium text-foreground/55">{exp.period}</p>
                      <p className="flex items-center gap-1 sm:justify-end">
                        <FiMapPin className="w-3 h-3" /> {exp.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">{exp.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full text-xs font-medium
                          border border-white/10 text-foreground/55
                          hover:border-white/20 hover:text-foreground/75
                          transition-colors duration-200"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </RevealCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}