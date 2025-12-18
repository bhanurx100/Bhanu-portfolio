'use client';

import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiAward,
  FiCode,
  FiTrendingUp,
  FiZap,
  FiCpu,
  FiUsers,
} from 'react-icons/fi';
import { RevealCard } from '@/components/ui/RevealCard';
import { AnimatedStat } from '@/components/ui/AnimatedStat';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* ===================== STATS ===================== */
const stats = [
  {
    icon: FiBriefcase,
    value: 2,
    suffix: '+',
    label: 'Years Experience',
    color: 'text-primary',
  },
  {
    icon: FiCode,
    value: 15,
    suffix: '+',
    label: 'Projects Built',
    color: 'text-secondary',
  },
  {
    icon: FiTrendingUp,
    value: 10,
    suffix: '+',
    label: 'UI Features Shipped',
    color: 'text-primary',
  },
  {
    icon: FiAward,
    value: 100,
    suffix: '%',
    label: 'Requirements Delivered',
    color: 'text-secondary',
  },
];

/* ===================== EXPERIENCE ===================== */
const experiences = [
  {
    company: 'Microline Information Systems Pvt Ltd',
    role: 'Frontend Developer',
    period: 'July 2023 - Present',
    location: 'Remote, India',
    description:
      'Developing and maintaining frontend features for internal and client-facing web applications using React.',
    highlights: [
      'Reusable component development',
      'UI performance improvements',
      'Cross-team collaboration',
    ],
  },
  {
    company: 'Webbers Labs Technologies LLP',
    role: 'Frontend Developer Intern',
    period: 'March 2023 - June 2023',
    location: 'Mysuru, India',
    description:
      'Built responsive web pages and UI features using JavaScript and WordPress for client websites.',
    highlights: [
      'JavaScript-based UI enhancements',
      'WordPress theme customization',
      'Responsive layout implementation',
    ],
  },
];

/* ===================== QUICK INFO ===================== */
const quickHighlights = [
  { label: 'Current Role', value: 'Frontend Developer' },
  { label: 'Tech Stack', value: 'React · Next.js · JavaScript' },
  { label: 'Location', value: 'India (Remote)' },
  { label: 'Focus', value: 'Frontend · UI Development' },
];

/* ===================== FOCUS AREAS ===================== */
const focusAreas = [
  {
    icon: FiCode,
    title: 'Frontend Development',
    description:
      'Building clean, responsive, and reusable UI components for modern web applications.',
    tags: ['React', 'Next.js', 'JavaScript'],
  },
  {
    icon: FiZap,
    title: 'UI Performance',
    description:
      'Improving rendering efficiency, layout stability, and overall user experience.',
    tags: ['Lazy loading', 'Code splitting', 'Responsive UI'],
  },
  {
    icon: FiCpu,
    title: 'Modern UI Practices',
    description:
      'Following component-driven architecture and consistent styling patterns.',
    tags: ['Tailwind CSS', 'Reusable components', 'Design consistency'],
  },
  {
    icon: FiUsers,
    title: 'Team Collaboration',
    description:
      'Collaborating with designers and backend developers to deliver complete features.',
    tags: ['Agile workflow', 'Code reviews', 'Team collaboration'],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-background dark:bg-gradient-to-b dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* ===================== HEADER ===================== */}
          <motion.div variants={fadeInUp} className="text-center space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-400 dark:border-slate-500 bg-surface-1/50 px-4 py-1 text-xs uppercase tracking-[0.35em] text-foreground/70">
              ABOUT
            </span>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-primary via-secondary to-foreground bg-clip-text text-transparent">
                  Frontend developer building modern web interfaces
                </span>
              </h2>
              <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto">
                I focus on turning designs into responsive, maintainable, and user-friendly web experiences.
              </p>
            </div>
          </motion.div>

          {/* ===================== BIO + FOCUS ===================== */}
          <motion.div
            variants={fadeInUp}
            className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start"
          >
            {/* BIO */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-400 dark:border-slate-500 bg-surface-1/40 p-8 backdrop-blur-xl">
              <div className="relative z-10 space-y-6">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  I’m a <span className="text-foreground font-semibold">Frontend Developer</span> specializing in
                  building clean and responsive user interfaces using
                  <span className="text-secondary font-semibold"> React and Next.js</span>.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  My experience includes working on real-world projects, collaborating with cross-functional teams,
                  and improving UI quality, usability, and performance.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {quickHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-gray-400 dark:border-slate-500 bg-surface-2/50 p-4"
                    >
                      <p className="text-xs uppercase tracking-wide text-foreground/60">
                        {item.label}
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOCUS AREAS */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">
                Focus Areas
              </p>
              {focusAreas.map((area) => (
                <RevealCard
                  key={area.title}
                  className="p-5 border border-gray-400 dark:border-slate-500 bg-surface-1/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <area.icon className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="text-foreground font-semibold">
                        {area.title}
                      </p>
                      <p className="text-foreground/60 text-sm">
                        {area.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full border border-gray-400 dark:border-slate-500 text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </RevealCard>
              ))}
            </div>
          </motion.div>

          {/* ===================== STATS ===================== */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat) => (
              <RevealCard
                key={stat.label}
                className="p-6 text-center border border-gray-400 dark:border-slate-500 bg-surface-1/50"
              >
                <stat.icon
                  className={`w-7 h-7 mx-auto mb-3 ${stat.color}`}
                />
                <AnimatedStat
                  value={stat.value}
                  suffix={stat.suffix}
                  className={`text-3xl md:text-4xl ${stat.color}`}
                />
                <p className="text-foreground/70 text-sm mt-1">
                  {stat.label}
                </p>
              </RevealCard>
            ))}
          </motion.div>

          {/* ===================== EXPERIENCE ===================== */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                Journey
              </p>
              <h3 className="text-3xl font-bold text-foreground">
                Experience
              </h3>
            </div>

            <div className="relative pl-4 sm:pl-8">
              <div className="absolute left-1 sm:left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <RevealCard
                    key={exp.role}
                    className="p-6 md:p-7 border border-gray-400 dark:border-slate-500 bg-surface-1/40 relative"
                  >
                    <span className="absolute -left-3 top-6 h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(68,38,217,0.6)]" />
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-foreground/60">
                          {exp.company}
                        </p>
                        <h4 className="text-xl font-semibold text-foreground">
                          {exp.role}
                        </h4>
                      </div>
                      <div className="text-foreground/60 text-sm md:text-right">
                        <p>{exp.period}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>

                    <p className="text-foreground/70 mt-3 mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 rounded-full border border-gray-400 dark:border-slate-500 text-xs text-foreground/70"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </RevealCard>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
