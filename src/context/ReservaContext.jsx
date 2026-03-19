import { createContext, useContext, useState } from 'react'

// ─── ReservaContext ───────────────────────────────────────────────
// Permite abrir el modal de reserva desde CUALQUIER componente
// Uso: const { abrirModal } = useReserva()
//      abrirModal()                     → modal vacío
//      abrirModal({ terapia: 'Ansiedad' }) → modal con terapia pre-seleccionada

const ReservaContext = createContext(null)

export function ReservaProvider({ children }) {
  const [isOpen, setIsOpen]       = useState(false)
  const [terapiaInicial, setTerapiaInicial] = useState('')

  const abrirModal = (opciones = {}) => {
    setTerapiaInicial(opciones.terapia || '')
    setIsOpen(true)
  }

  const cerrarModal = () => {
    setIsOpen(false)
    setTerapiaInicial('')
  }

  return (
    <ReservaContext.Provider value={{ isOpen, abrirModal, cerrarModal, terapiaInicial }}>
      {children}
    </ReservaContext.Provider>
  )
}

export function useReserva() {
  const ctx = useContext(ReservaContext)
  if (!ctx) throw new Error('useReserva debe usarse dentro de <ReservaProvider>')
  return ctx
}
