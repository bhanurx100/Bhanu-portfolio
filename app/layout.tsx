import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import MobileNav from '@/components/navigation/MobileNav'
import StarCanvas from '@/components/backgrounds/StarCanvas';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Gaurav Patel - Software Developer | MERN Stack Developer',
  description: 'Full Stack Engineer with 2+ years of experience building high-performance applications using React.js, Next.js, Node.js, and TypeScript. Specialized in creating scalable web solutions.',
  keywords: ['full-stack developer', 'mern stack', 'react', 'nextjs', 'nodejs', 'typescript', 'software developer', 'gaurav patel', 'web developer', 'javascript', 'portfolio'],
  authors: [{ name: 'Gaurav Patel' }],
  openGraph: {
    title: 'Gaurav Patel - Software Developer | MERN Stack Developer',
    description: 'Building high-performance, scalable applications with React, Next.js, and Node.js',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaurav Patel - Software Developer',
    description: 'Building high-performance, scalable applications with modern web technologies',
    images: ['/og-image.png'],
  },
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#fcf3f8' },
      { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <MobileNav />
            <SmoothScrollProvider>
              <StarCanvas />
              {children}
            </SmoothScrollProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
