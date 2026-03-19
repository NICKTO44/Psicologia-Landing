import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Shield, Users, CheckCircle } from 'lucide-react'
import { useReserva } from '../../context/ReservaContext'
import psicologaImg from '../../assets/psicologa-hero.avif'

function WordReveal({ text, delay = 0, className = '' }) {
  return (
    <span className={className} style={{ display: 'block' }}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.1 }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const { abrirModal } = useReserva()
  const line1End = 0.25

  return (
    <section id="inicio" className="relative min-h-screen flex overflow-hidden">

      {/* ══════════════════════════════════════════════
          MOBILE ONLY — imagen como fondo con overlay
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <img
          src={psicologaImg}
          alt=""
          className="w-full h-full object-cover object-top"
        />
        {/* Overlay mobile — un poco más claro que antes */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(6,8,24,0.72) 0%, rgba(6,8,24,0.65) 50%, rgba(6,8,24,0.90) 100%)' }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          COLUMNA IZQUIERDA — texto (60% en desktop)
      ══════════════════════════════════════════════ */}
      <div
        className="relative z-10 flex flex-col justify-center w-full lg:w-[60%] px-8 sm:px-12 lg:px-16 pt-28 pb-16 min-h-screen"
        style={{ background: 'transparent' }}
      >
        {/* Fondo oscuro SOLO en desktop para la columna izquierda */}
        <div className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(135deg, #060818 0%, #0a0f20 70%, #0d1128 100%)' }}
        />

        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF007A]/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#9B00FF]/5 blur-[110px] pointer-events-none" />

        <div className="relative max-w-xl">

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[#FF007A] font-bold text-xl mb-4 tracking-wide"
          >
            ¡Bienvenido!
          </motion.p>

          <h1 className="text-[clamp(2.4rem,4.2vw,3.4rem)] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5">
            <WordReveal text="Escuchamos," delay={0.25} className="text-white" />
            <WordReveal text="Comprendemos y te ayudamos a avanzar" delay={0.30} className="gradient-text" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: line1End + 0.5, duration: 0.5 }}
            className="text-[#9CA3AF] text-lg font-medium mb-5"
          >
            ¡Y queremos ayudarte!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: line1End + 0.65, duration: 0.5 }}
            className="text-[#9CA3AF] text-base leading-relaxed max-w-md"
          >
            Más de{' '}
            <span className="text-white font-semibold">15 terapias especializadas</span>{' '}
            para mejorar tu bienestar emocional. Sesiones{' '}
            <span className="text-white font-semibold">online y presenciales</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: line1End + 0.85, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <motion.button
              onClick={() => abrirModal()}
              className="btn-primary text-base px-8 py-4"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={18} /> Reservar cita
            </motion.button>
            <motion.a
              href="#terapias"
              className="btn-secondary text-base px-8 py-4"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Nuestros servicios <ArrowRight size={17} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: line1End + 1.1, duration: 0.6 }}
            className="flex flex-wrap gap-5 mt-10 pt-8 border-t border-white/10"
          >
            {[
              { icon: Shield,      label: '100% confidencial'      },
              { icon: Users,       label: 'Psicólogos certificados' },
              { icon: CheckCircle, label: '4.9/5 satisfacción'      },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} className="text-[#FF007A]" />
                <span className="text-[#9CA3AF] text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          COLUMNA DERECHA — imagen (40%, solo desktop)
      ══════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-[40%] overflow-hidden">
        <motion.img
          src={psicologaImg}
          alt="Psicóloga del consultorio"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.15 }}
          className="absolute inset-0 w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        {/* Overlay izquierdo para integrar con columna oscura */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to right, rgba(6,8,24,0.5) 0%, transparent 40%)' }} />
        {/* Funde hacia abajo */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #050505 100%)' }} />

        {/* Card flotante */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="absolute bottom-40 left-8 z-20"
        >
          <div className="rounded-2xl px-5 py-4" style={{
            background: 'rgba(10,15,32,0.90)',
            border: '1px solid rgba(155,0,255,0.3)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <p className="text-white font-bold text-sm">Online y Presencial</p>
            <p className="text-[#9CA3AF] text-xs mt-0.5">Horarios flexibles 🕐</p>
          </div>
        </motion.div>
      </div>

    </section>
  )
}