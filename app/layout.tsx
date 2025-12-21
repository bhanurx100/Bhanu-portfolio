import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import MobileNav from '@/components/navigation/MobileNav';
import StarCanvas from '@/components/backgrounds/StarCanvas';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

/* ===================== METADATA ===================== */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'Bhanuprasad L | Frontend Developer (React & Next.js)',

  description:
    'Frontend Developer specializing in React and Next.js, experienced in building scalable, responsive, and performance-focused web applications with clean architecture and production-ready UI.',

  keywords: [
    'frontend developer',
    'react developer',
    'nextjs developer',
    'typescript',
    'javascript',
    'tailwind css',
    'shadcn ui',
    'web developer',
    'bhanuprasad l',
    'portfolio',
  ],

  authors: [{ name: 'Bhanuprasad L' }],

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  openGraph: {
    title: 'Bhanuprasad L | Frontend Developer',
    description:
      'Frontend Developer focused on building modern, responsive, and high-performance web applications using React, Next.js, and TypeScript.',
    type: 'website',
    url: siteUrl,
    images: ['/og-image.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Bhanuprasad L | Frontend Developer',
    description:
      'Frontend Developer specializing in React, Next.js, and modern UI development.',
    images: ['/og-image.png'],
  },
};

/* ===================== VIEWPORT ===================== */
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#0d1117',
  };
}

/* ===================== ROOT LAYOUT ===================== */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
      >
        {/* Accessibility skip link */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        <ErrorBoundary>
          <MobileNav />
          <SmoothScrollProvider>
            <StarCanvas />
            {children}
          </SmoothScrollProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
