import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react'
import { useReserva } from '../../context/ReservaContext'

export default function CTAFinal() {
  const { abrirModal } = useReserva()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,0,122,0.07) 0%, rgba(155,0,255,0.07) 50%, rgba(58,0,255,0.07) 100%)' }} />
        <div className="absolute inset-0 border-y" style={{ borderColor: 'rgba(255,0,122,0.1)' }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FF007A]/10 blur-[80px]" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#9B00FF]/10 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

        {/* Badge desde arriba */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-badge mx-auto mb-6 w-fit"
        >
          💜 Da el primer paso
        </motion.div>

        {/* Título desde izquierda */}
        <motion.h2
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="section-title mx-auto mb-6"
        >
          Empieza tu proceso de{' '}
          <span className="gradient-text">bienestar hoy</span>
        </motion.h2>

        {/* Subtítulo desde derecha */}
        <motion.p
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="section-subtitle mx-auto text-center mb-10"
        >
          No esperes más. El primer paso es el más importante.
          Escríbenos y agendamos tu consulta en menos de 1 hora.
        </motion.p>

        {/* Botones desde abajo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => abrirModal()}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,0,122,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base px-10 py-4"
          >
            <MessageCircle size={20} /> Reservar por WhatsApp
          </motion.button>
          <motion.a
            href="#terapias"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="btn-secondary text-base px-10 py-4"
          >
            Ver todas las terapias <ArrowRight size={18} />
          </motion.a>
        </motion.div>

        {/* Trust pills — cada una desde un lado */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: Shield, label: '100% confidencial',   x: -40 },
            { icon: Clock,  label: 'Respuesta en < 1h',   x: 0   },
            { icon: Star,   label: '4.9/5 satisfacción',  x: 40  },
          ].map(({ icon: Icon, label, x }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#9CA3AF]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Icon size={14} className="text-[#FF007A]" />
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}