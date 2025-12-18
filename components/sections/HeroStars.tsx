'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import TypingAnimation from '@/components/features/TypingAnimation';
import { slideInFromLeft, slideInFromRight } from '@/utils/motion';

const SkillsCloud = dynamic(
  () => import('@/components/animations/SkillsCloud'),
  { ssr: false }
);

const roles = [
  'Software Developer',
  'MERN Stack Developer',
  'Frontend Engineer',
  'Full-Stack Developer',
];

export default function HeroStars() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <motion.h1
            variants={slideInFromLeft(0.2)}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Hello, I&apos;m</span>
            <br />
            <span className="gradient-text">Bhanuprasad L</span>
          </motion.h1>

          <motion.div
            variants={slideInFromRight(0.4)}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-text-secondary mb-6"
          >
            <TypingAnimation
              words={roles}
              typingSpeed={80}
              deletingSpeed={50}
              pauseDuration={1500}
              className="gradient-text"
            />
          </motion.div>

          <p className="text-text-secondary max-w-xl mx-auto lg:mx-0">
            I build modern, performant web applications using React, Next.js,
            TypeScript, and scalable UI architectures.
          </p>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] z-20">
                <SkillsCloud />
            </div>

        </div>
      </div>
    </section>
  );
}
