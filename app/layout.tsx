import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RPmonitus - Free Blood Pressure Monitoring for Medicare Patients',
  description: 'Get a free blood pressure monitor and 24/7 health monitoring covered 100% by Medicare. No cost to you. Improve your health from home.',
  keywords: 'Medicare, RPM, remote patient monitoring, blood pressure, hypertension, free medical device',
  openGraph: {
    title: 'RPmonitus - Free Blood Pressure Monitoring',
    description: 'Medicare covers 100% of remote monitoring. Get your free device today.',
    url: 'https://rpmonitus.com',
    siteName: 'RPmonitus',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
