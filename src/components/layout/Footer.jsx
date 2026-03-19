import { motion } from 'framer-motion'
import { Brain, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { useReserva } from '../../context/ReservaContext'

export default function Footer() {
  const { abrirModal } = useReserva()

  return (
    <footer id="contacto" className="border-t bg-[#050505]" style={{ borderColor: '#1E293B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Columna marca — desde izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF007A] to-[#9B00FF] flex items-center justify-center">
                <Brain size={17} className="text-white" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Nuero<span className="gradient-text">Vida</span>
              </span>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs mb-6">
              Centro especializado en terapias psicológicas. Más de 15 modalidades.
              Sesiones online y presenciales con psicólogos certificados.
            </p>
            <motion.button
              onClick={() => abrirModal()}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}
            >
              <MessageCircle size={16} /> Reservar consulta
            </motion.button>
            <div className="flex gap-3 mt-5">
              {[{ icon: Instagram, label: 'Instagram' }, { icon: Facebook, label: 'Facebook' }].map(({ icon: Icon, label }) => (
                <motion.a key={label} href="https://www.facebook.com/cristhian.q.challco"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(255,0,122,0.5)' }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1E293B' }} aria-label={label}>
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columna terapias — desde abajo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Terapias</h4>
            <ul className="space-y-2.5">
              {['Ansiedad', 'Depresión', 'Pareja', 'Familia', 'Adolescentes', 'Estrés', 'Autoestima'].map((t) => (
                <li key={t}>
                  <a href="#terapias" className="text-[#9CA3AF] hover:text-white text-sm transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#FF007A]/40 group-hover:bg-[#FF007A] transition-colors" />
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna contacto — desde derecha */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-[#9CA3AF] text-sm">
                <MapPin size={15} className="mt-0.5 text-[#FF007A] shrink-0" />
                Lima, Perú — Sede presencial y online
              </li>
              <li className="flex items-center gap-2.5 text-[#9CA3AF] text-sm">
                <Phone size={15} className="text-[#FF007A] shrink-0" />
                +51 927 391 918
              </li>
              <li className="flex items-center gap-2.5 text-[#9CA3AF] text-sm">
                <Mail size={15} className="text-[#FF007A] shrink-0" />
                contacto@psicoperu.pe
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E293B' }}>
              <p className="text-white text-xs font-semibold mb-2">Horarios de atención</p>
              <p className="text-[#9CA3AF] text-xs">Lun–Vie: 8am – 9pm</p>
              <p className="text-[#9CA3AF] text-xs">Sáb–Dom: 9am – 6pm</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar — fade desde abajo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: '#1E293B' }}
        >
          <p className="text-[#9CA3AF] text-xs">© {new Date().getFullYear()} PsicoPerú — Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#9CA3AF] hover:text-white text-xs transition-colors">Privacidad</a>
            <a href="#" className="text-[#9CA3AF] hover:text-white text-xs transition-colors">Términos</a>
            <span className="text-[#9CA3AF] text-xs">Furion</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}