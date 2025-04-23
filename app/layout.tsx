import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'SortlyTask – Organize Your Tasks with Style',
  description: 'SortlyTask is a modern to-do app to help you manage your tasks quickly, visually, and efficiently.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://sortlytask.vercel.app/',
    title: 'SortlyTask – Organize Your Tasks with Style',
    description: 'SortlyTask is a modern to-do app to help you manage your tasks quickly, visually, and efficiently.',
    siteName: 'SortlyTask',
    images: [
      {
        url: '/SortlyTask-Banner.png',
        secureUrl: 'https://sortlytask.vercel.app/SortlyTask-Banner.png',
        width: 1200,
        height: 630,
        alt: 'SortlyTask Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SortlyTask – Organize Your Tasks with Style',
    description: 'SortlyTask is a modern to-do app to help you manage your tasks quickly, visually, and efficiently.',
    images: ['/SortlyTask-Banner.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  )
}
