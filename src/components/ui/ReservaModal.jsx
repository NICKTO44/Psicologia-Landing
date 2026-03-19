import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, User, Phone, MessageSquare, CheckCircle,
  Calendar, Monitor, MapPin, ChevronDown, Send
} from 'lucide-react'
import { useReserva } from '../../context/ReservaContext'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import { terapias } from '../../data/terapias'

// ─── ReservaModal ─────────────────────────────────────────────────
// Formulario de reserva. Al enviar genera un mensaje estructurado
// con todos los datos del cliente y abre WhatsApp.

const MODALIDADES = [
  { value: 'online',      label: 'Online (videollamada)', icon: Monitor },
  { value: 'presencial',  label: 'Presencial',            icon: MapPin  },
]

const HORARIOS = [
  'Mañana (8am – 12pm)',
  'Tarde (12pm – 6pm)',
  'Noche (6pm – 9pm)',
  'Sin preferencia',
]

const INITIAL = {
  nombre:    '',
  telefono:  '',
  terapia:   '',
  modalidad: '',
  horario:   '',
  mensaje:   '',
}

export default function ReservaModal() {
  const { isOpen, cerrarModal, terapiaInicial } = useReserva()
  const { abrirWhatsApp } = useWhatsApp()

  const [form, setForm]       = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [enviado, setEnviado] = useState(false)

  // Pre-rellenar terapia si viene de un botón específico
  useEffect(() => {
    if (isOpen) {
      setForm({ ...INITIAL, terapia: terapiaInicial })
      setErrors({})
      setEnviado(false)
    }
  }, [isOpen, terapiaInicial])

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ── Validación ──
  const validar = () => {
    const e = {}
    if (!form.nombre.trim())   e.nombre   = 'Tu nombre es requerido'
    if (!form.telefono.trim()) e.telefono = 'Tu teléfono es requerido'
    if (!form.terapia)         e.terapia  = 'Selecciona un tipo de terapia'
    if (!form.modalidad)       e.modalidad = 'Elige una modalidad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Generar mensaje WhatsApp ──
  const generarMensaje = () => {
    const lineas = [
      `Hola! 👋 Quiero reservar una consulta psicológica.`,
      ``,
      `📋 *Mis datos:*`,
      `• Nombre: ${form.nombre}`,
      `• Teléfono: ${form.telefono}`,
      `• Tipo de terapia: ${form.terapia}`,
      `• Modalidad: ${form.modalidad === 'online' ? 'Online (videollamada)' : 'Presencial'}`,
      `• Horario preferido: ${form.horario || 'Sin preferencia'}`,
      form.mensaje ? `• Mensaje: ${form.mensaje}` : null,
      ``,
      `¿Tienen disponibilidad? 😊`,
    ].filter(l => l !== null).join('\n')
    return lineas
  }

  // ── Submit ──
  const handleSubmit = () => {
    if (!validar()) return
    setEnviado(true)
    setTimeout(() => {
      abrirWhatsApp(generarMensaje())
      cerrarModal()
    }, 1200)
  }

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={cerrarModal}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* ── Panel modal ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.94, y: 24  }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: 'linear-gradient(160deg, #0d1526, #0F172A)',
                border: '1px solid rgba(255,0,122,0.2)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              {/* ── Header ── */}
              <div className="flex items-start justify-between p-6 pb-0">
                <div>
                  <div className="section-badge w-fit mb-3 text-xs">
                    📅 Reserva tu cita
                  </div>
                  <h2 className="text-white text-xl font-extrabold tracking-tight">
                    Completa tus datos
                  </h2>
                  <p className="text-[#9CA3AF] text-sm mt-1">
                    Te contactaremos por WhatsApp para confirmar.
                  </p>
                </div>
                <button
                  onClick={cerrarModal}
                  className="text-[#9CA3AF] hover:text-white transition-colors mt-1 p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* ── Formulario ── */}
              {!enviado ? (
                <div className="p-6 flex flex-col gap-4">

                  {/* Nombre */}
                  <Field
                    icon={User}
                    label="Nombre completo *"
                    error={errors.nombre}
                  >
                    <input
                      type="text"
                      placeholder="Ej: María González"
                      value={form.nombre}
                      onChange={e => set('nombre', e.target.value)}
                      className={inputClass(errors.nombre)}
                    />
                  </Field>

                  {/* Teléfono */}
                  <Field
                    icon={Phone}
                    label="Teléfono / WhatsApp *"
                    error={errors.telefono}
                  >
                    <input
                      type="tel"
                      placeholder="Ej: 987 654 321"
                      value={form.telefono}
                      onChange={e => set('telefono', e.target.value)}
                      className={inputClass(errors.telefono)}
                    />
                  </Field>

                  {/* Tipo de terapia */}
                  <Field
                    icon={MessageSquare}
                    label="Tipo de terapia *"
                    error={errors.terapia}
                  >
                    <div className="relative">
                      <select
                        value={form.terapia}
                        onChange={e => set('terapia', e.target.value)}
                        className={selectClass(errors.terapia)}
                      >
                        <option value="">Selecciona una terapia...</option>
                        {terapias.map(t => (
                          <option key={t.id} value={t.nombre}>{t.icon} {t.nombre}</option>
                        ))}
                        <option value="No estoy seguro/a">🤔 No estoy seguro/a</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </Field>

                  {/* Modalidad */}
                  <Field
                    icon={Monitor}
                    label="Modalidad de sesión *"
                    error={errors.modalidad}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {MODALIDADES.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => set('modalidad', value)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            form.modalidad === value
                              ? 'border-[#FF007A] bg-[#FF007A]/10 text-white'
                              : 'border-[#1E293B] text-[#9CA3AF] hover:border-[#FF007A]/40 hover:text-white'
                          }`}
                        >
                          <Icon size={15} />
                          {label}
                        </button>
                      ))}
                    </div>
                    {errors.modalidad && <p className="text-[#FF007A] text-xs mt-1">{errors.modalidad}</p>}
                  </Field>

                  {/* Horario preferido */}
                  <Field
                    icon={Calendar}
                    label="Horario preferido"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {HORARIOS.map(h => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => set('horario', h)}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 text-left ${
                            form.horario === h
                              ? 'border-[#9B00FF] bg-[#9B00FF]/10 text-white'
                              : 'border-[#1E293B] text-[#9CA3AF] hover:border-[#9B00FF]/40 hover:text-white'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Mensaje adicional */}
                  <Field
                    icon={MessageSquare}
                    label="¿Quieres contarnos algo más? (opcional)"
                  >
                    <textarea
                      rows={3}
                      placeholder="Cuéntanos brevemente lo que necesitas..."
                      value={form.mensaje}
                      onChange={e => set('mensaje', e.target.value)}
                      className={`${inputClass()} resize-none`}
                    />
                  </Field>

                  {/* Divider */}
                  <div className="border-t border-[#1E293B] pt-2" />

                  {/* Nota de privacidad */}
                  <p className="text-[#9CA3AF] text-xs text-center">
                    🔒 Tus datos son confidenciales y solo se usarán para coordinar tu cita.
                  </p>

                  {/* Botón enviar */}
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    <Send size={18} />
                    Enviar por WhatsApp
                  </motion.button>
                </div>
              ) : (
                /* ── Estado de éxito ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 flex flex-col items-center text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle size={56} className="text-[#25D366]" />
                  </motion.div>
                  <h3 className="text-white text-xl font-bold">¡Listo!</h3>
                  <p className="text-[#9CA3AF] text-sm max-w-xs">
                    Abriendo WhatsApp con tu información. Te responderemos a la brevedad. 💜
                  </p>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-2 h-2 rounded-full bg-[#FF007A]"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Helper: Field wrapper ────────────────────────────────────────
function Field({ icon: Icon, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[#D1D5DB] text-sm font-medium">
        <Icon size={14} className="text-[#FF007A]" />
        {label}
      </label>
      {children}
      {error && <p className="text-[#FF007A] text-xs">{error}</p>}
    </div>
  )
}

// ─── Helper: clases de input ──────────────────────────────────────
const inputClass = (error) =>
  `w-full bg-[#050505] border ${error ? 'border-[#FF007A]/60' : 'border-[#1E293B]'} 
  text-white placeholder-[#4B5563] rounded-xl px-4 py-3 text-sm 
  focus:outline-none focus:border-[#FF007A]/60 focus:ring-1 focus:ring-[#FF007A]/30 
  transition-all duration-200`

const selectClass = (error) =>
  `w-full bg-[#050505] border ${error ? 'border-[#FF007A]/60' : 'border-[#1E293B]'} 
  text-white rounded-xl px-4 py-3 text-sm appearance-none pr-10
  focus:outline-none focus:border-[#FF007A]/60 focus:ring-1 focus:ring-[#FF007A]/30 
  transition-all duration-200`
