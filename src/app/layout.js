import './globals.css'
import { Inter } from 'next/font/google'
import StarCanvas from './components/StarCanvas'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bhanuprasad L | Portfolio",
  description: "Portfolio of Bhanuprasad L, a full-stack web developer.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/icon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <StarCanvas />
        {children}
      </body>
    </html>
  )
}