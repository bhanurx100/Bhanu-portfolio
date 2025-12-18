'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiChevronDown } from 'react-icons/fi';
import TypingAnimation from '@/components/features/TypingAnimation';
import TrustBadges from '@/components/features/TrustBadges';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GridBackground } from '@/components/backgrounds/GridBackground';
import { TextReveal } from '@/components/animations/TextReveal';

const roles = [
  'Software Developer',
  'Frontend Engineer',
  'React Specialist',
  'Full-Stack Engineer',
];

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
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Resume link - using Google Drive link
    window.open('https://drive.google.com/file/d/1uyl3ln8eifxrHdoMOzt5YfBOC_MKp_02/view?usp=sharing', '_blank');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-background dark:bg-gradient-to-b dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
    >
      {/* Background effects container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid background */}
        <GridBackground />

        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Main headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-text-primary">
              Hi, I'm{' '}
            </span>
            <span className="gradient-text">
              Gaurav Patel
            </span>
            <br />
            <span className="text-text-primary">
              <TypingAnimation
                words={roles}
                className="gradient-text"
                typingSpeed={80}
                deletingSpeed={50}
                pauseDuration={2000}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8 lg:mx-0 mx-auto"
          >
            Building high-performance, scalable applications with 2+ years of experience
            in React.js, Next.js, and Node.js. Passionate about creating exceptional
            user experiences and solving complex technical challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              icon={FiArrowRight}
              onClick={scrollToProjects}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              variant="glass"
              size="lg"
              icon={FiDownload}
              onClick={downloadResume}
            >
              Download Resume
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeInUp}>
            <TrustBadges />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToProjects}
        >
          <span className="text-text-secondary text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
