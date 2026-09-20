import type { Metadata } from 'next'
import Nosotros from '@/components/nosotros/nosotros'
import Historia from '@/components/nosotros/historia'
import Ubicacion from '@/components/nosotros/ubicacion'
import VisionMision from '@/components/nosotros/visionymision'
import Pilares from '@/components/nosotros/pilares'
import NosotrosCTA from '@/components/nosotros/nosotroscta'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Nuestra Historia — La Vid Verdadera',
  description:
    'Conoce la historia, visión y misión de la Iglesia Cristiana Cuadrangular La Vid Verdadera en Buritaca, Magdalena.',
}

export default function NosotrosPage() {
  return (
    <main>
      <Navbar />
      <Nosotros />
      <Historia />
      <Ubicacion />
      <VisionMision />
      <Pilares />
      <NosotrosCTA />
      <Footer />
    </main>
  )
}