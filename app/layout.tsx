import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import MobileNav from '@/components/navigation/MobileNav';
import StarCanvas from '@/components/backgrounds/StarCanvas';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Bhanuprasad L | Frontend Developer (React & Next.js)',
  description:
    'Frontend Developer specializing in React and Next.js, building scalable, high-performance web applications.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ErrorBoundary>
          {/* ✅ Dark-only, hydration-safe */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <MobileNav />
            <SmoothScrollProvider>
              <StarCanvas />
              {children}
            </SmoothScrollProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
