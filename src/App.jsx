import { ReservaProvider } from './context/ReservaContext'
import ReservaModal from './components/ui/ReservaModal'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Terapias from './components/sections/Terapias'
import Reservas from './components/sections/Reservas'
import ComoFunciona from './components/sections/ComoFunciona'
import Testimonios from './components/sections/Testimonios'
import Precios from './components/sections/Precios'
import CTAFinal from './components/sections/CTAFinal'

// ─── App principal ────────────────────────────────────────────────
export default function App() {
  return (
    <ReservaProvider>
      <div className="relative bg-[#050505] min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Terapias />
          <Reservas />
          <ComoFunciona />
          <Testimonios />
          <Precios />
          <CTAFinal />
        </main>
        <Footer />

        {/* Modal global — disponible desde cualquier sección */}
        <ReservaModal />
      </div>
    </ReservaProvider>
  )
}