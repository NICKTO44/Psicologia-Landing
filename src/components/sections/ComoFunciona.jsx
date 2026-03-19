import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, MessageCircle, Calendar, Video } from 'lucide-react'

const PASOS = [
  { num: '01', icon: Search,        titulo: 'Elige tu terapia',      descripcion: 'Explora nuestras más de 15 especialidades y encuentra la que mejor se adapta a lo que necesitas.', color: '#FF007A' },
  { num: '02', icon: MessageCircle, titulo: 'Reserva por WhatsApp',  descripcion: 'Completa el formulario con tus datos. Te respondemos en menos de 1 hora para confirmar tu cita.', color: '#C800D8' },
  { num: '03', icon: Calendar,      titulo: 'Confirma tu horario',   descripcion: 'Elige el día y hora que mejor te acomode. Disponemos de turnos mañana, tarde y noche.',            color: '#9B00FF' },
  { num: '04', icon: Video,         titulo: 'Inicia tu sesión',      descripcion: 'Conéctate online o asiste de forma presencial. Comienza tu proceso de bienestar emocional.',        color: '#3A00FF' },
]

export default function ComoFunciona() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF007A]/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#FF007A]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header desde derecha */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="section-title mx-auto">
            Empieza en <span className="gradient-text">4 pasos simples</span>
          </h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            Reservar tu consulta es tan fácil como enviar un mensaje.
            Sin formularios complicados, sin esperas largas.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Línea conectora animada */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+40px)] right-[calc(12.5%+40px)] h-px overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
              className="h-full origin-left"
              style={{ background: 'linear-gradient(90deg, #FF007A, #9B00FF, #3A00FF)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PASOS.map((paso, i) => {
              const Icon = paso.icon
              // Pasos 1 y 3 desde izquierda, 2 y 4 desde derecha
              const fromLeft = i % 2 === 0
              return (
                <motion.div
                  key={paso.num}
                  initial={{ opacity: 0, x: fromLeft ? -60 : 60, y: 30 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <motion.div className="relative" whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: `${paso.color}15`, border: `1px solid ${paso.color}40` }}>
                      <Icon size={30} style={{ color: paso.color }} />
                    </div>
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 300 }}
                      className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${paso.color}, ${paso.color}cc)` }}
                    >
                      {parseInt(paso.num)}
                    </motion.span>
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{paso.titulo}</h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{paso.descripcion}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Banner — desde izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(255,0,122,0.08), rgba(155,0,255,0.08))', border: '1px solid rgba(255,0,122,0.15)' }}
        >
          <div>
            <p className="text-white font-semibold">¿Tienes dudas antes de reservar?</p>
            <p className="text-[#9CA3AF] text-sm">Escríbenos y te asesoramos sin compromiso.</p>
          </div>
          <a
            href="https://wa.me/51927391918?text=Hola%2C+tengo+algunas+dudas+antes+de+reservar."
            target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm shrink-0"
          >
            <MessageCircle size={16} /> Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}