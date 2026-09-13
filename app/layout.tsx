import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { SiteSplashScreen } from '@/components/SiteSplashScreen'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ShriNivas Enterprises | Heat Sinks, Stainless Steel Flasks & Industrial Piping',
  description: 'Top manufacturer, distributor, and supplier of Heat Sinks, Stainless Steel Perforated Flasks, 310 SS grade custom flasks, and industrial piping solutions in Dombivli, Maharashtra. Established in 2007.',
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
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#091122' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <SiteSplashScreen />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
