import { motion } from 'framer-motion'
import { MessageCircle, User, Users, Baby, Heart } from 'lucide-react'
import { useReserva } from '../../context/ReservaContext'

const TIPOS_CONSULTA = [
  { id: 'individual',  icon: User,   titulo: 'Consulta Individual',  descripcion: 'Una sesión personalizada centrada en ti y tu proceso.',          precio: 'Desde S/120', terapia: 'Consulta Individual',         color: '#FF007A' },
  { id: 'pareja',      icon: Heart,  titulo: 'Consulta de Pareja',   descripcion: 'Sesión para dos, enfocada en la relación y comunicación.',        precio: 'Desde S/180', terapia: 'Terapia de Pareja',            color: '#9B00FF' },
  { id: 'familiar',    icon: Users,  titulo: 'Consulta Familiar',    descripcion: 'Para toda la familia. Trabajo en dinámicas y vínculos.',          precio: 'Desde S/220', terapia: 'Terapia Familiar',             color: '#3A00FF' },
  { id: 'adolescente', icon: Baby,   titulo: 'Consulta Adolescente', descripcion: 'Especializada para jóvenes entre 12 y 17 años.',                  precio: 'Desde S/120', terapia: 'Terapia para Adolescentes',    color: '#FF007A' },
]

export default function Reservas() {
  const { abrirModal } = useReserva()

  return (
    <section id="reservas" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4 w-fit">
            <MessageCircle size={12} /> Reservas vía WhatsApp
          </div>
          <h2 className="section-title mx-auto">
            ¿Qué tipo de consulta{' '}
            <span className="gradient-text">necesitas?</span>
          </h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            Elige la modalidad que mejor se adapte a tu situación.
            Completa tus datos y te respondemos en menos de 1 hora.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIPOS_CONSULTA.map((tipo, i) => {
            const Icon = tipo.icon
            return (
              <motion.button
                key={tipo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -6,
                  borderColor: `${tipo.color}55`,
                  boxShadow: `0 12px 40px ${tipo.color}18`,
                  transition: { duration: 0.25 },
                }}
                onClick={() => abrirModal({ terapia: tipo.terapia })}
                className="flex flex-col gap-4 p-6 rounded-2xl text-left cursor-pointer"
                style={{ background: '#0F172A', border: '1px solid #1E293B' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${tipo.color}15`, border: `1px solid ${tipo.color}35` }}
                >
                  <Icon size={22} style={{ color: tipo.color }} />
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">{tipo.titulo}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{tipo.descripcion}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
                  <span className="text-white font-semibold text-sm">{tipo.precio}</span>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#25D366' }}>
                    <MessageCircle size={13} />
                    Reservar
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-[#9CA3AF] text-sm mt-8"
        >
          Al hacer clic abrirás un formulario rápido → se enviará por WhatsApp 📱
        </motion.p>
      </div>
    </section>
  )
}