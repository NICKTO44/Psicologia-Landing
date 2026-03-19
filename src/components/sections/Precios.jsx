import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, MessageCircle, Zap, Star } from 'lucide-react'
import { planes } from '../../data/precios'
import { useReserva } from '../../context/ReservaContext'

export default function Precios() {
  const { abrirModal } = useReserva()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="precios" className="py-24 relative overflow-hidden">
      {/* Fondos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF007A]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
         
          <h2 className="section-title mx-auto">
            Elije la <span className="gradient-text">la mejor opción</span>
          </h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            Sin costos ocultos. Precios justos por sesión.
            Descuentos disponibles para paquetes de sesiones.
          </p>
        </motion.div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {planes.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: plan.popular ? 1.04 : 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlanCard plan={plan} onReservar={() => abrirModal({ terapia: plan.nombre })} />
            </motion.div>
          ))}
        </div>

        {/* Nota */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[#9CA3AF] text-sm mt-10"
        >
          💳 También disponibles paquetes de sesiones con descuento · Consulta por WhatsApp
        </motion.p>
      </div>
    </section>
  )
}

function PlanCard({ plan, onReservar }) {
  const isPopular = plan.popular

  return (
    <motion.div
      className="relative rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: isPopular
          ? 'linear-gradient(160deg, #1a0a14, #0F172A)'
          : '#0F172A',
        border: isPopular
          ? '2px solid rgba(255,0,122,0.45)'
          : '1px solid #1E293B',
        boxShadow: isPopular
          ? '0 0 40px rgba(255,0,122,0.15), 0 20px 60px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(0,0,0,0.3)',
      }}
      whileHover={{
        y: -4,
        boxShadow: isPopular
          ? '0 0 60px rgba(255,0,122,0.25), 0 24px 80px rgba(0,0,0,0.5)'
          : '0 8px 40px rgba(255,0,122,0.1)',
        transition: { duration: 0.25 },
      }}
    >
      {/* Badge Más popular */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF007A] to-[#FF3DAA] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow-pink">
            <Star size={10} fill="white" /> Más popular
          </span>
        </div>
      )}

      {/* Encabezado */}
      <div className="pt-2">
        <h3 className={`font-bold text-lg mb-1 ${isPopular ? 'text-[#FF007A]' : 'text-white'}`}>
          {plan.nombre}
        </h3>
        <p className="text-[#9CA3AF] text-sm">{plan.descripcion}</p>
      </div>

      {/* Precio */}
      <div className="flex items-end gap-1">
        <span className="text-[#9CA3AF] text-xl font-medium">S/</span>
        <span className="text-white text-5xl font-extrabold tracking-tight leading-none">
          {plan.precio}
        </span>
        <span className="text-[#9CA3AF] text-sm mb-1">/ sesión</span>
      </div>

      {/* Duración */}
      <div
        className="text-xs font-medium px-3 py-2 rounded-xl w-fit"
        style={{
          background: isPopular ? 'rgba(255,0,122,0.08)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isPopular ? 'rgba(255,0,122,0.2)' : '#1E293B'}`,
          color: isPopular ? '#FF007A' : '#9CA3AF',
        }}
      >
        ⏱ {plan.duracion} por sesión
      </div>

      {/* Incluye */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.incluye.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: isPopular ? 'rgba(255,0,122,0.15)' : 'rgba(255,255,255,0.05)' }}
            >
              <Check size={10} className={isPopular ? 'text-[#FF007A]' : 'text-[#9CA3AF]'} />
            </div>
            <span className="text-[#D1D5DB]">{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        onClick={onReservar}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          isPopular
            ? 'bg-gradient-to-r from-[#FF007A] to-[#FF3DAA] text-white shadow-glow-pink hover:shadow-[0_0_30px_rgba(255,0,122,0.6)]'
            : 'bg-transparent border border-[#1E293B] text-white hover:border-[#FF007A]/50 hover:bg-[#FF007A]/5'
        }`}
      >
        <MessageCircle size={15} />
        {plan.cta}
      </motion.button>
    </motion.div>
  )
}