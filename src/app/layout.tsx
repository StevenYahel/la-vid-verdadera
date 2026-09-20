// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import { SITE, SCHEDULES } from '@/data/site'
import Script from 'next/script'
import './globals.css'

// ─── Typography ───────────────────────────────────────────────────────────────

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
}

// ─── Base URL ─────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// ─── Schema.org JSON-LD ───────────────────────────────────────────────────────

// Genera los horarios en formato schema.org (openingHours)
// Formato: "Mo 18:00-19:00", "We 00:00-23:59", "Th 19:00-20:00", "Su 07:30-09:30"
const schemaOpeningHours = [
  'Mo 18:00-19:00',   // Lunes - Culto de Oración
  'We 00:00-23:59',   // Miércoles - Día de Ayuno (todo el día)
  'Th 19:00-20:00',   // Jueves - Culto Formal
  'Su 07:30-09:30',   // Domingo - Escuela Dominical + Culto Principal
]

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: SITE.fullName,
  alternateName: SITE.name,
  url: BASE_URL,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Buritaca',
    addressRegion: 'Magdalena',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 11.23,
    longitude: -73.98,
  },
  email: SITE.contact.email,
  sameAs: [
    SITE.contact.facebook,
    SITE.contact.instagram,
  ].filter(Boolean),
  openingHours: schemaOpeningHours,
  founder: [
    { '@type': 'Person', name: 'Juvenal Flórez Romero', jobTitle: 'Pastor Principal' },
    { '@type': 'Person', name: 'Luz Dary Polo Lerma',   jobTitle: 'Pastora' },
  ],
  foundingDate: `${new Date().getFullYear() - SITE.years}`,
  image: `${BASE_URL}/og-image.jpg`,
  logo: `${BASE_URL}/images/logo.png`,
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  applicationName: SITE.name,

  title: {
    default: `${SITE.name} — Iglesia Cristiana Cuadrangular en Buritaca, Magdalena`,
    template: `%s — ${SITE.name}`,
  },

  description: SITE.description,

  keywords: [
    'iglesia cuadrangular Buritaca',
    'iglesia cristiana Magdalena',
    'iglesia Buritaca Colombia',
    'iglesia evangélica Santa Marta',
    'iglesia cristiana Santa Marta',
    'iglesia Magdalena Colombia',
    SITE.name,
    SITE.fullName,
  ],

  authors: [{ name: SITE.name, url: BASE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'religion',

  // ─── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  alternates: {
    canonical: BASE_URL,
  },

  // ─── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: BASE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — Iglesia Cristiana Cuadrangular en Buritaca, Magdalena`,
    description: SITE.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE.fullName} — Buritaca, Magdalena`,
      },
    ],
  },

  // ─── Twitter Card ────────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Iglesia Cristiana Cuadrangular en Buritaca, Magdalena`,
    description: SITE.description,
    images: ['/og-image.jpg'],
  },

  // ─── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE.name,
  },

  // ─── Google Search Console ───────────────────────────────────────────────────
  verification: {
    google: '0brbBx3pW76GdwCKnG3uMtyK5UTtU_okK5yQmTpG3P0',
  },
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-white text-neutral-900">
        {children}

        {/* ── Schema.org JSON-LD (SEO estructurado) ── */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}