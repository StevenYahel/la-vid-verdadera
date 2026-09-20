import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Ministries from '@/components/sections/Ministries'
import Gallery from '@/components/sections/Gallery'
import Pastors, { VerseSection } from '@/components/sections/Pastors'
import Schedule from '@/components/sections/Schedule'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Ministries />
      <Gallery />
      <Pastors />
      <VerseSection />
      <Schedule />
      <Footer />
    </main>
  )
}