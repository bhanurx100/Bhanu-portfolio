'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import {
  getFeaturedProjects,
  getRegularProjects,
} from '@/data/projects';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Projects() {
  const featuredProjects = getFeaturedProjects();
  const regularProjects = getRegularProjects();

  return (
    <section
      id="projects"
      className="py-20 px-6 bg-background dark:bg-gradient-to-b dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A selection of projects that demonstrate my frontend development
            skills, UI design approach, and problem-solving ability.
          </p>
        </motion.div>

        {/* ================= FEATURED ================= */}
        {featuredProjects.length > 0 && (
          <div className="mb-14 space-y-10">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured
              />
            ))}
          </div>
        )}

        {/* ================= GRID ================= */}
        {regularProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
