// ─── Hook: useWhatsApp ───────────────────────────────────────────
// Centraliza todos los links de WhatsApp del sitio
// Cambia WHATSAPP_NUMBER por el número real del terapeuta

// ⚠️ REEMPLAZA con el número real (formato internacional sin + ni espacios)
const WHATSAPP_NUMBER = '51927301918'

/**
 * Genera un link de WhatsApp con mensaje pre-escrito
 * @param {string} mensaje - Mensaje que se enviará automáticamente
 * @returns {string} URL de WhatsApp lista para usar en href
 */
export const useWhatsApp = () => {
  const generarLink = (mensaje) => {
    const msgEncoded = encodeURIComponent(mensaje)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msgEncoded}`
  }

  const abrirWhatsApp = (mensaje) => {
    const link = generarLink(mensaje)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return { generarLink, abrirWhatsApp, numero: WHATSAPP_NUMBER }
}

// ─── Mensajes predefinidos ───────────────────────────────────────
export const MENSAJES_WA = {
  general: 'Hola, quiero más información sobre las terapias disponibles.',
  reservaGeneral: 'Hola, quiero reservar una consulta psicológica.',
  individual: 'Hola, quiero reservar una consulta individual (S/120).',
  pareja: 'Hola, quiero reservar una consulta de pareja (S/180).',
  familiar: 'Hola, quiero reservar una consulta familiar (S/220).',
  adolescente: 'Hola, quiero reservar una consulta para adolescentes.',
}
