import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { AdminProvider } from '@/components/providers/AdminProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://catgeoku.com'),
  title: {
    default: 'catgeoku — Engineering Tools & Knowledge Platform',
    template: '%s | catgeoku'
  },
  description: 'Advanced engineering tools and knowledge platform for geological, geophysical, drilling, and petroleum engineers. Interactive 3D visualizations, technical articles, and professional resources.',
  keywords: ['geology', 'geophysics', 'drilling engineering', 'petroleum engineering', 'engineering tools', 'geological visualization', '3D modeling', 'petrophysics'],
  authors: [{ name: 'catgeoku' }],
  creator: 'catgeoku',
  publisher: 'catgeoku',
  icons: {
    icon: '/Logo_catgeoku-removebg-preview.png',
    apple: '/Logo_catgeoku-removebg-preview.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://catgeoku.com',
    title: 'catgeoku — Engineering Tools & Knowledge Platform',
    description: 'Advanced engineering tools and knowledge platform for geological, geophysical, drilling, and petroleum engineers.',
    siteName: 'catgeoku',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'catgeoku Engineering Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'catgeoku — Engineering Tools & Knowledge Platform',
    description: 'Advanced engineering tools and knowledge platform for engineers.',
    creator: '@catgeoku',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AdminProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </AdminProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
