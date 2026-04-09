import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'TriviTurbo | Stop met Platformkosten Betalen',
  description: 'Het Directe Boekingskanaal-systeem dat in 90 dagen 3 directe boekingen oplevert voor vakantiehuiseigenaren. Bespaar €2.000–€5.000 per jaar aan platformkosten.',
  generator: 'TriviTurbo',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'TriviTurbo | Stop met Platformkosten Betalen',
    description: 'Het Directe Boekingskanaal-systeem dat in 90 dagen 3 directe boekingen oplevert voor vakantiehuiseigenaren. Bespaar €2.000–€5.000 per jaar aan platformkosten.',
    url: 'https://triviturbo.nl',
    siteName: 'TriviTurbo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1456,
        height: 816,
        alt: 'TriviTurbo - Stop met geld verliezen aan Airbnb en Booking.com',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TriviTurbo | Stop met Platformkosten Betalen',
    description: 'Het Directe Boekingskanaal-systeem dat in 90 dagen 3 directe boekingen oplevert voor vakantiehuiseigenaren.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#072AC8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
