"use client";

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

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCode,
  FiTrendingUp,
  FiAward,
  FiZap,
  FiCpu,
  FiUsers,
  FiMapPin,
  FiCheck,
} from "react-icons/fi";
import { RevealCard } from "@/components/ui/RevealCard";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

/* ── Animation helpers ────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ── Data ─────────────────────────────────────────────────────────────────── */
const stats = [
  {
    icon: FiBriefcase,
    value: 2,
    suffix: "+",
    label: "Years Full-Stack",
    color: "text-sky-400",
  },
  {
    icon: FiCode,
    value: 15,
    suffix: "+",
    label: "End-to-End Projects",
    color: "text-cyan-400",
  },
  {
    icon: FiTrendingUp,
    value: 10,
    suffix: "+",
    label: "APIs Deployed",
    color: "text-sky-400",
  },
  {
    icon: FiAward,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    color: "text-cyan-400",
  },
];

const focusAreas = [
  {
    icon: FiCode,
    title: "Scalable Architecture",
    desc: "Building modular, type-safe systems with React, Next.js Server Components, and shared type libraries across monorepos.",
    tags: ["React", "Next.js", "TypeScript", "Monorepos"],
  },
  {
    icon: FiCpu,
    title: "Robust Backend Systems",
    desc: "Designing REST APIs, database schemas, and secure authentication flows with Node.js, Express, MongoDB, and PostgreSQL.",
    tags: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    icon: FiZap,
    title: "Performance & Infrastructure",
    desc: "Optimizing Core Web Vitals, bundle sizes, and CI/CD pipelines for reliable, secure deployments at scale.",
    tags: ["CI/CD", "Core Web Vitals", "Bundle Optimization"],
  },
  {
    icon: FiUsers,
    title: "End-to-End Delivery",
    desc: "Taking features from database design through to polished UI, collaborating across teams to ship complete solutions.",
    tags: ["Full-Stack", "API Design", "System Architecture"],
  },
];

const experiences = [
  {
    company: "Cynosure Software Solutions Pvt Ltd",
    role: "Full-Stack Software Engineer",
    period: "Dec 2023 — Present",
    location: "Hyderabad, India",
    desc: "Architecting and delivering end-to-end full-stack applications for clients across India and Southeast Asia. Building scalable multi-tenant SaaS platforms, analytics dashboards, and business workflow systems from database design through to polished UI.",

    highlights: [
      "Designed and implemented RESTful APIs with Node.js and Express, handling authentication, data validation, and complex business logic",
      "Built scalable database schemas using MongoDB and PostgreSQL, optimizing queries for performance and data integrity",
      "Developed full-stack analytics dashboards with real-time data visualization, combining React frontend with robust backend data pipelines",
      "Created modular component systems using Next.js Server Components and TypeScript, enabling code reuse across multiple client projects",
      "Implemented secure CI/CD deployment workflows, reducing deployment time by 40% and ensuring zero-downtime releases",
    ],
  },

  {
    company: "Webbers Labs Technologies LLP",
    role: "Full-Stack Developer — Intern",
    period: "March 2023 — June 2023",
    location: "Mysuru, India",
    desc: "Gained hands-on full-stack development experience building responsive web applications. Worked on both frontend interfaces and backend API endpoints, learning end-to-end delivery workflows.",
    highlights: [
      "Developed REST API endpoints using Node.js and Express for client data management and content delivery",
      "Built responsive React components with TypeScript, integrating with backend services for dynamic content",
      "Implemented database operations with MongoDB, including CRUD operations and data aggregation pipelines",
      "Collaborated with senior engineers on system architecture decisions and code reviews",
    ],
  },
];

/* ── Section component ────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-5 md:px-8 bg-transparent"
    >
      {/* Top ambient line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
          w-full max-w-[700px] h-px bg-gradient-to-r from-transparent via-sky-400/25 to-transparent"
      />

      <div className="max-w-6xl mx-auto space-y-20 md:space-y-24">
        {/* ── 1. Header ─────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4 max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm
              text-xs uppercase tracking-[0.35em] text-zinc-400 font-mono"
          >
            About
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="text-white">Full-Stack Engineer</span>
            <br />
            <span
              className="bg-gradient-to-r from-sky-400 via-cyan-400 to-pink-500
              bg-clip-text text-transparent"
            >
              delivering end-to-end solutions.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-zinc-300 leading-relaxed"
          >
            Two years of professional experience building complete applications — from database schemas and APIs to responsive interfaces that users love.
          </motion.p>
        </motion.div>

        {/* ── 2. Bento Grid: Bio + Focus areas ───────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Bio card - spans 2 columns on large screens */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl
              bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/80 p-7 md:p-9 space-y-6
              md:col-span-2 lg:col-span-2"
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full
              bg-sky-400/10 blur-3xl pointer-events-none"
            />

            <div className="relative space-y-5">
              <p className="text-base md:text-lg text-zinc-200 leading-relaxed">
                I&apos;m a{" "}
                <span className="text-white font-semibold">
                  Full-Stack Software Engineer
                </span>{" "}
                with 2 years of professional experience building end-to-end applications. I specialize in
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  scalable architecture
                </span>
                , from database design and API development to polished frontend interfaces.
              </p>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                I&apos;ve delivered complete full-stack solutions including multi-tenant SaaS platforms, analytics dashboards, and business workflow systems. I care about the entire development lifecycle — designing efficient database schemas, building secure REST APIs, optimizing performance, and ensuring reliable CI/CD deployments.
              </p>

              {/* Quick-info chips */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {[
                  { label: "Status", value: "Open to roles", accent: true },
                  { label: "Location", value: "India (Remote)", accent: false },
                  { label: "Stack", value: "Full-Stack", accent: false },
                  { label: "Focus", value: "End-to-End Delivery", accent: false },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    className={`rounded-2xl border px-4 py-3 space-y-0.5
                      ${
                        accent
                          ? "border-pink-500/30 bg-pink-500/10"
                          : "border-zinc-800/50 bg-zinc-900/30"
                      }`}
                  >
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                      {label}
                    </p>
                    <p
                      className={`text-sm font-semibold ${accent ? "text-pink-400" : "text-zinc-200"}`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Availability banner */}
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Available — Immediate Joiner
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Open to Full-Stack roles · Remote or Bengaluru ·
                    IST (UTC+5:30)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Focus areas - stacked bento cards */}
          <motion.div variants={stagger} className="space-y-3 md:col-span-2 lg:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-mono px-1">
              Focus Areas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {focusAreas.map((area, i) => (
                <motion.div key={area.title} custom={i} variants={fadeUp}>
                  <RevealCard className="p-4 border border-zinc-800/50 bg-zinc-900/30 rounded-2xl hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-xl
                        bg-cyan-400/12 text-cyan-400 shrink-0"
                      >
                        <area.icon className="w-4 h-4" />
                      </span>
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-zinc-100 leading-snug">
                          {area.title}
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {area.desc}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {area.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium
                              border border-zinc-700/50 text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </RevealCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── 3. Stats ──────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp}>
              <RevealCard className="p-5 md:p-6 text-center border border-zinc-800/50 bg-zinc-900/30 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300">
                <s.icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} />
                <AnimatedStat
                  value={s.value}
                  suffix={s.suffix}
                  className={`text-3xl md:text-4xl ${s.color}`}
                />
                <p className="text-xs text-zinc-400 mt-1.5 font-medium">
                  {s.label}
                </p>
              </RevealCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 4. Experience timeline ────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8"
        >
          {/* Sub-heading */}
          <motion.div variants={fadeUp} className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-mono">
              Journey
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Experience
            </h3>
          </motion.div>

          {/* Rail + cards */}
          <div className="relative pl-6 sm:pl-10 space-y-5">
            {/* Vertical rail */}
            <div
              aria-hidden
              className="absolute left-1 sm:left-2 top-2 bottom-2 w-px
                bg-gradient-to-b from-sky-400/50 via-cyan-400/30 to-transparent"
            />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                custom={i}
                variants={fadeUp}
                className="relative"
              >
                {/* Dot with pink glow on hover */}
                <span
                  aria-hidden
                  className="absolute -left-[1.375rem] sm:-left-[2.125rem] top-5
                    w-3 h-3 rounded-full border-2 border-pink-500 bg-zinc-950
                    shadow-[0_0_12px_rgba(236,72,153,0.5)]
                    group-hover:shadow-[0_0_20px_rgba(236,72,153,0.8)]
                    transition-shadow duration-300"
                />

                <RevealCard className="p-5 md:p-6 border border-zinc-800/50 bg-zinc-900/30 rounded-2xl hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono mb-1">
                        {exp.company}
                      </p>
                      <h4 className="text-lg font-bold text-white">
                        {exp.role}
                      </h4>
                    </div>
                    <div className="text-xs text-zinc-400 sm:text-right space-y-0.5 shrink-0">
                      <p className="font-medium text-zinc-300">
                        {exp.period}
                      </p>
                      <p className="flex items-center gap-1 sm:justify-end">
                        <FiMapPin className="w-3 h-3" /> {exp.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    {exp.desc}
                  </p>

                  {/* Vertical list with emerald checkmarks */}
                  <ul className="space-y-2">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-zinc-200"
                      >
                        <FiCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </RevealCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
