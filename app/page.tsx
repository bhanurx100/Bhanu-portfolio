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


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <HeroNew />

      {/* ── Tech stack badges ── */}
      <section
        className="py-8 border-y border-white/5
          bg-background dark:bg-gradient-to-b
          dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
        aria-label="Technologies"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-foreground/30 text-[10px] uppercase tracking-[0.3em] font-mono mb-5">
            Technologies I work with
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              'React','Next.js','TypeScript','JavaScript',
              'Tailwind CSS','Node.js','Express','MongoDB',
              'HTML5','CSS3','Redux','Framer Motion',
              'Three.js','Firebase','Git','REST API',
              'PostgreSQL','Figma',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-[11px] font-medium
                border border-cyan-500/10
                bg-gradient-to-br from-slate-900/80 to-slate-800/40
                text-slate-300
                hover:border-cyan-400/30
                hover:text-cyan-300
                hover:bg-cyan-500/5
                transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
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