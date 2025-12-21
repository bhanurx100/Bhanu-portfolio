'use client';

import dynamic from 'next/dynamic';
import { FiDownload } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { TypeAnimation } from 'react-type-animation';

// Skill cloud (client-only)
const SkillsCloud = dynamic(
  () => import('@/components/animations/SkillsCloud'),
  { ssr: false }
);

export default function HeroNew() {
  const downloadResume = () => {
    window.open(
      'https://drive.google.com/file/d/1u7Gv0iC6zhEn4moXJUWWbBq7yXRNUBFQ/view?usp=sharing',
      '_blank'
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 py-20 lg:py-32 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 border border-border">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-gray-900 dark:text-white font-mono">
                Available for new opportunities
              </span>
            </div>

            {/* HELLO + NAME + ROLES (TypeAnimation) */}
            <h1 className="mb-6 text-3xl sm:text-4xl lg:text-7xl lg:leading-normal font-extrabold drop-shadow-lg">
              {/* Static line */}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                Hello, I&apos;m
              </span>


              {/* Animated name + roles */}
              <TypeAnimation
                sequence={[
                  'Bhanuprasad L',
                  1200,
                  'Frontend Engineer',
                  200,
                  'Bhanuprasad L',
                  1200,
                ]}
                wrapper="span"
                speed={50}
                repeat={0}
                className="block text-blue-500 mt-2"
              />
            </h1>

            {/* Description */}
            <p className="text-lg text-text-tertiary max-w-xl">
              Building performant, scalable web applications using React,
              Next.js, TypeScript, and modern frontend architectures.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="glass"
                size="lg"
                icon={FiDownload}
                onClick={downloadResume}
              >
                Download Resume
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold gradient-text">2+</div>
                <div className="text-sm text-text-secondary">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-text-secondary">
                  Projects Built
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">5K+</div>
                <div className="text-sm text-text-secondary">
                  Active Users
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (SKILL CLOUD) ================= */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] z-20">
              <SkillsCloud />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-text-tertiary font-mono hidden sm:block">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
