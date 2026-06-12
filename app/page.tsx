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
        className="py-12 border-y border-white/5 bg-transparent"
        aria-label="Technologies"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-white text-[14px] uppercase tracking-[0.4em] font-mono mb-8">
            Technologies I work with
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center p-4">
            {[
              'React', 'Next.js', 'TypeScript', 'JavaScript',
              'Tailwind CSS', 'Node.js', 'Express', 'MongoDB',
              'HTML5', 'CSS3', 'Redux', 'Framer Motion',
              'Three.js', 'Firebase', 'Git', 'REST API',
              'PostgreSQL',
            ].map((skill) => (
              <span
                key={skill}
                className="
                  /* Size & Spacing */
                  px-5 py-2.5 rounded-xl text-[17px] font-medium tracking-wide
                  
                  /* Background & Base State */
                  bg-zinc-900/40 backdrop-blur-md
                  text-zinc-400
                  
                  /* Normal State Blue Ring (Subtle light blue border) */
                  border border-sky-600/80
                  
                  /* Hover State: Shift to Pink Ring + pink glow + blue inner tint */
                  hover:scale-[1.03] 
                  hover:text-sky-200
                  hover:bg-sky-500/[0.08]
                  hover:border-pink-800/60
                  hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]
                  
                  /* Transitions */
                  transition-all duration-200 ease-out cursor-default
                "
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