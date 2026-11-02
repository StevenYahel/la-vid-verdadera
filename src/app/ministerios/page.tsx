import type { Metadata } from 'next'
import MinistriesPage from '@/components/ministerios/MinistriesPage'

export const metadata: Metadata = {
  title: 'Ministerios',
  description:
    'Conoce los ministerios de Niños, Jóvenes, Damas, Caballeros y Música de la Iglesia Cristiana Cuadrangular La Vid Verdadera en Buritaca, Magdalena.',
  alternates: { canonical: '/ministerios' },
}

export default function Page() {
  return <MinistriesPage />
}