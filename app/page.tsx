import dynamic from 'next/dynamic';
import HeroNew from '@/components/sections/HeroNew';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import MarqueeScroll from '@/components/ui/MarqueeScroll';
import { getMarqueeSkills } from '@/data/skills';

// Lazy load client-only navigation components
const CommandPalette = dynamic(() => import('@/components/navigation/CommandPalette').then(mod => ({ default: mod.CommandPalette })));

const ProgressNav = dynamic(() => import('@/components/navigation/ProgressNav').then(mod => ({ default: mod.ProgressNav })));

const FloatingDock = dynamic(() => import('@/components/navigation/FloatingDock'));

export default function Home() {
  const skills = getMarqueeSkills();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroNew />

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-white/5 bg-background dark:bg-gradient-to-b dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark" aria-label="Technologies">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <h2 className="text-center text-text-secondary text-sm uppercase tracking-wider">
            Technologies I Work With
          </h2>
        </div>
        <MarqueeScroll
          items={skills.map((skill) => ({
            id: skill.id,
            label: skill.label,
            color: skill.color,
          }))}
          speed={100}
          pauseOnHover
        />
      </section>

      {/* Projects Section */}
      <Projects />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette />

      {/* Progress Navigation */}
      <ProgressNav />

      {/* Floating Dock */}
      <FloatingDock />
    </main>
  );
}
