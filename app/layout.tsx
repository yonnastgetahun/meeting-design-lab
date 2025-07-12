import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from './components/Analytics/GoogleAnalytics'
import MetaPixel from './components/Analytics/MetaPixel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meeting Design Lab - Strategic Sync Framework Analyzer',
  description: 'Transform your meeting culture. Research shows 71% of meetings waste money, morale & lead to burnout.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`${inter.className} bg-pulse-navy text-white`}>
        <GoogleAnalytics />
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}