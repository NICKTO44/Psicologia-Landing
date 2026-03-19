// ─── Planes de precios ───────────────────────────────────────────
// Modifica precios, nombres e incluidos aquí

export const planes = [
  {
    id: 1,
    nombre: 'Individual',
    precio: 120,
    duracion: '50 minutos',
    popular: false,
    descripcion: 'Ideal para comenzar tu proceso de bienestar personal.',
    incluye: [
      'Consulta individual',
      'Duración 50 minutos',
      'Sesión online o presencial',
      'Seguimiento por WhatsApp',
      'Material de apoyo digital',
    ],
    whatsappMsg: 'Hola, quiero reservar una consulta individual (S/120).',
    cta: 'Reservar consulta',
  },
  {
    id: 2,
    nombre: 'Pareja',
    precio: 180,
    duracion: '60 minutos',
    popular: true,
    descripcion: 'Sesiones diseñadas para fortalecer el vínculo de pareja.',
    incluye: [
      'Sesión para 2 personas',
      'Duración 60 minutos',
      'Sesión online o presencial',
      'Seguimiento por WhatsApp',
      'Plan de trabajo conjunto',
      'Material de apoyo digital',
    ],
    whatsappMsg: 'Hola, quiero reservar una consulta de pareja (S/180).',
    cta: 'Reservar consulta',
  },
  {
    id: 3,
    nombre: 'Familiar',
    precio: 220,
    duracion: '60 minutos',
    popular: false,
    descripcion: 'Para toda la familia con enfoque en la dinámica grupal.',
    incluye: [
      'Sesión para toda la familia',
      'Duración 60 minutos',
      'Sesión online o presencial',
      'Seguimiento por WhatsApp',
      'Plan familiar personalizado',
      'Material de apoyo digital',
    ],
    whatsappMsg: 'Hola, quiero reservar una consulta familiar (S/220).',
    cta: 'Reservar consulta',
  },
]
