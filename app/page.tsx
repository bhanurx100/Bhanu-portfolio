/**
 * app/page.tsx — load-performance pass
 * ──────────────────────────────────────
 * Changes:
 *
 * 1. Hero, Projects, About, Contact → kept as static imports because they
 *    are above-the-fold or immediately below it and must hydrate quickly.
 *
 * 2. Navigation chrome (CommandPalette, ProgressNav, FloatingDock) →
 *    lazy-loaded with next/dynamic + ssr:false.
 *    These are never needed for FCP/LCP; deferring them removes ~12 KB
 *    from the critical JS bundle.
 *
 * 3. MarqueeScroll is a client component but lightweight; keeping it static
 *    avoids a waterfall for the tech-stack section.
 *
 * 4. getMarqueeSkills() is called once at the module level (server side)
 *    so the array is embedded in the RSC payload — no client fetch needed.
 */

// import dynamic from 'next/dynamic';
import HeroNew from '@/components/sections/HeroNew';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import MarqueeScroll from '@/components/ui/MarqueeScroll';
import { getMarqueeSkills } from '@/data/skills';
import DeferredNavigation from '@/components/navigation/DeferredNavigation';

// // ── Navigation chrome — deferred; not needed for first paint ──────────────
// const CommandPalette = dynamic(
//   () => import('@/components/navigation/CommandPalette').then((m) => ({ default: m.CommandPalette })),
//   { ssr: false }
// );
// const ProgressNav = dynamic(
//   () => import('@/components/navigation/ProgressNav').then((m) => ({ default: m.ProgressNav })),
//   { ssr: false }
// );
// const FloatingDock = dynamic(
//   () => import('@/components/navigation/FloatingDock'),
//   { ssr: false }
// );

// Pre-compute on the server — embedded in RSC payload, zero client work.
const skills = getMarqueeSkills();
const marqueeItems = skills.map(({ id, label, color }) => ({ id, label, color }));

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <HeroNew />

      {/* ── Tech stack marquee ── */}
      <section
        className="py-12 border-y border-white/5
          bg-background dark:bg-gradient-to-b
          dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
        aria-label="Technologies"
      >
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <h2 className="text-center text-foreground/30 text-xs uppercase tracking-[0.3em] font-mono">
            Technologies I work with
          </h2>
        </div>
        <MarqueeScroll
          items={marqueeItems}
          speed={55}
          pauseOnHover
        />
      </section>

      {/* ── Content sections ── */}
      <Projects />
      <About />
      <Contact />

      {/* ── Deferred navigation chrome ── */}
      <DeferredNavigation />
    </main>
  );
}