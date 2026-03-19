import { motion } from 'framer-motion'

// ─── ScrollReveal ─────────────────────────────────────────────────
// Envuelve cualquier elemento y lo anima al entrar en el viewport
// Props:
//   delay     — retraso en segundos (default 0)
//   direction — 'up' | 'down' | 'left' | 'right' (default 'up')
//   distance  — píxeles de desplazamiento (default 30)
//   duration  — duración en segundos (default 0.6)
//   className — clases adicionales

const getInitial = (direction, distance) => {
  switch (direction) {
    case 'up':    return { opacity: 0, y:  distance }
    case 'down':  return { opacity: 0, y: -distance }
    case 'left':  return { opacity: 0, x:  distance }
    case 'right': return { opacity: 0, x: -distance }
    default:      return { opacity: 0, y:  distance }
  }
}

export default function ScrollReveal({
  children,
  delay     = 0,
  direction = 'up',
  distance  = 30,
  duration  = 0.6,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={getInitial(direction, distance)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}