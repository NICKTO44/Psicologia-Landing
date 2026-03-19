import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { terapias } from '../../data/terapias'
import { useReserva } from '../../context/ReservaContext'

export default function Terapias() {
  const { abrirModal } = useReserva()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="terapias" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9B00FF]/4 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — entra desde abajo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4 w-fit">🧠 Más de 15 especialidades</div>
          <h2 className="section-title mx-auto">
            Terapias para cada <span className="gradient-text">necesidad</span>
          </h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            Cada persona es única. Por eso ofrecemos múltiples modalidades de terapia
            para acompañarte exactamente donde lo necesitas.
          </p>
        </motion.div>

        {/* Grid — cards alternan izquierda/derecha */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {terapias.map((terapia, i) => {
            // Par → entra desde izquierda, impar → desde derecha
            const fromLeft = i % 2 === 0
            return (
              <motion.div
                key={terapia.id}
                initial={{ opacity: 0, x: fromLeft ? -80 : 80, y: 20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <TerapiaCard
                  terapia={terapia}
                  onReservar={() => abrirModal({ terapia: terapia.nombre })}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TerapiaCard({ terapia, onReservar }) {
  return (
    <motion.div
      className="relative flex flex-col gap-4 p-6 rounded-2xl h-full"
      style={{ background: '#0F172A', border: '1px solid #1E293B' }}
      whileHover={{ y: -6, borderColor: `${terapia.color}55`, boxShadow: `0 12px 40px ${terapia.color}20`, transition: { duration: 0.25 } }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${terapia.color}08, transparent 60%)` }} />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
        style={{ background: `${terapia.color}15`, border: `1px solid ${terapia.color}35` }}>
        {terapia.icon}
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-white font-bold text-[15px] leading-snug">{terapia.nombre}</h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">{terapia.descripcion}</p>
      </div>
      <button onClick={onReservar}
        className="flex items-center gap-1.5 text-sm font-semibold mt-auto w-fit group/btn"
        style={{ color: terapia.color }}>
        Reservar sesión
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}