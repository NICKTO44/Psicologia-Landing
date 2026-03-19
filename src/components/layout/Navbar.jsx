import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Brain } from 'lucide-react'
import { useReserva } from '../../context/ReservaContext'

// ─── Links de navegación ──────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Inicio',        href: '#inicio'        },
  { label: 'Terapias',      href: '#terapias'      },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Testimonios',   href: '#testimonios'   },
  { label: 'Precios',       href: '#precios'       },
  { label: 'Contacto',      href: '#contacto'      },
]

const mobileMenuVariants = {
  hidden:  { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: 'auto', y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, height: 0, y: -10,
    transition: { duration: 0.2, ease: 'easeIn' } },
}

const linkItemVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
}

// ─── Navbar ──────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('#inicio')
  const { abrirModal } = useReserva()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scrolled = false → estamos en Hero → navbar 60%
  // scrolled = true  → fuera del Hero → navbar 100%

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Link activo según scroll
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1  }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 z-50 transition-all duration-500 ${scrolled ? "w-full" : "lg:w-[60%] w-full"} ${
        scrolled || menuOpen
          ? 'bg-[#050505]/85 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <a href="#inicio" onClick={() => handleNavClick('#inicio')} className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF007A] to-[#9B00FF] flex items-center justify-center shadow-glow-pink"
            >
              <Brain size={17} className="text-white" />
            </motion.div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              Psico<span className="gradient-text">Perú</span>
            </span>
          </a>

          {/* ── Links Desktop ── */}
          <div className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/5 border border-white/8"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </div>

          {/* ── CTA Desktop ── */}
          <div className="hidden lg:flex">
            <motion.button
              onClick={() => abrirModal()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary text-xs px-4 py-2"
            >
              Reservar consulta
            </motion.button>
          </div>

          {/* ── Hamburger Mobile ── */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white rounded-xl border border-white/10 bg-white/5"
            aria-label="Menú"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="open"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden" animate="visible" exit="exit"
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pb-6 pt-3 flex flex-col gap-1 border-t border-white/5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={linkItemVariants}
                  initial="hidden" animate="visible" custom={i}
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeLink === link.href
                      ? 'bg-white/5 text-white border border-white/8'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A]" />
                  )}
                </motion.a>
              ))}
              <motion.button
                variants={linkItemVariants} initial="hidden" animate="visible"
                custom={NAV_LINKS.length}
                onClick={() => { setMenuOpen(false); abrirModal() }}
                className="btn-primary w-full justify-center mt-3 py-3.5"
              >
                Reservar consulta
              </motion.button>
              <motion.div
                variants={linkItemVariants} initial="hidden" animate="visible"
                custom={NAV_LINKS.length + 1}
                className="flex justify-center gap-4 pt-4 border-t border-white/5"
              >
                <span className="text-[#9CA3AF] text-xs"> Respuesta en menos de 1h</span>
                <span className="text-[#9CA3AF] text-xs"> Confidencial</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}