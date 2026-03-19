import { motion } from 'framer-motion'
import { testimonios } from '../../data/testimonios'

const fila1 = [...testimonios, ...testimonios]
const fila2 = [...testimonios.slice(3), ...testimonios, ...testimonios.slice(0, 3)]

const AVATAR_GRADIENTS = [
  'from-[#FF007A] to-[#9B00FF]',
  'from-[#9B00FF] to-[#3A00FF]',
  'from-[#00B4FF] to-[#9B00FF]',
  'from-[#FF3CB4] to-[#FF007A]',
  'from-[#C800FF] to-[#FF007A]',
  'from-[#FF007A] to-[#FF6000]',
  'from-[#00DCA0] to-[#00B4FF]',
  'from-[#9B00FF] to-[#C800FF]',
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <h2 className="section-title mx-auto">
          Lo que dicen <span className="gradient-text">nuestros pacientes</span>
        </h2>
        <p className="section-subtitle mx-auto text-center mt-4">
          Más de 500 personas han encontrado su bienestar con nosotros.
          Estas son sus historias reales.
        </p>
      </motion.div>

      {/* ── Fila 1 → izquierda ── */}
      <div className="relative mb-5">
        {/* Mobile: fade 20%, Desktop: fade 60% */}
        <div className="absolute inset-y-0 left-0 z-10 pointer-events-none w-16 sm:w-32 lg:w-72"
          style={{ background: 'linear-gradient(to right, #050505 0%, #050505 40%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 z-10 pointer-events-none w-16 sm:w-32 lg:w-72"
          style={{ background: 'linear-gradient(to left, #050505 0%, #050505 40%, transparent 100%)' }} />

        <div
          className="flex gap-3 w-max"
          style={{ animation: 'scrollLeft 38s linear infinite' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {fila1.map((t, i) => (
            <TestimonioCard key={`f1-${i}`} testimonio={t} avatarIdx={i % AVATAR_GRADIENTS.length} />
          ))}
        </div>
      </div>

      {/* ── Fila 2 → derecha ── */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 pointer-events-none w-16 sm:w-32 lg:w-72"
          style={{ background: 'linear-gradient(to right, #050505 0%, #050505 40%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 z-10 pointer-events-none w-16 sm:w-32 lg:w-72"
          style={{ background: 'linear-gradient(to left, #050505 0%, #050505 40%, transparent 100%)' }} />

        <div
          className="flex gap-3 w-max"
          style={{ animation: 'scrollRight 45s linear infinite' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {fila2.map((t, i) => (
            <TestimonioCard key={`f2-${i}`} testimonio={t} avatarIdx={(i + 4) % AVATAR_GRADIENTS.length} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

function TestimonioCard({ testimonio, avatarIdx }) {
  const avatarGrad = AVATAR_GRADIENTS[avatarIdx]

  return (
    <div
      className="flex flex-col gap-4 p-5 rounded-2xl shrink-0"
      style={{
        width: 'clamp(220px, 70vw, 288px)', /* mobile: 70% pantalla, desktop: 288px */
        background: 'linear-gradient(145deg, #111827, #0d1220)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Avatar + nombre */}
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGrad} flex items-center justify-center text-white text-xs font-extrabold shrink-0`}>
          {testimonio.avatar}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-white font-semibold text-sm leading-tight truncate">{testimonio.nombre}</p>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <circle cx="8" cy="8" r="8" fill="#FF007A" fillOpacity="0.2"/>
              <path d="M5 8l2 2 4-4" stroke="#FF007A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[#6B7280] text-xs">{testimonio.ciudad}</p>
        </div>
      </div>

      {/* Texto */}
      <p className="text-[#9CA3AF] text-sm leading-relaxed">{testimonio.texto}</p>

      {/* Badge terapia */}
      <span
        className="text-[10px] font-medium px-2.5 py-1 rounded-md w-fit mt-auto"
        style={{
          background: 'rgba(255,255,255,0.05)',
          color: '#6B7280',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {testimonio.terapia}
      </span>
    </div>
  )
}