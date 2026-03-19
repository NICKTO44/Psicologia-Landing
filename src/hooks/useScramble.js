import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

// ─── Hook: useScramble ────────────────────────────────────────────
// Cada letra pasa por caracteres aleatorios antes de revelarse
// Efecto usado por Vercel, Linear, empresas tech premium

export function useScramble(text, { speed = 40, scrambleCycles = 6, delay = 0 } = {}) {
  const [output, setOutput]   = useState('')
  const [done,   setDone]     = useState(false)
  const frameRef = useRef(null)

  useEffect(() => {
    setOutput('')
    setDone(false)
    let revealed = 0          // cuántas letras ya están fijas
    let cycles   = {}         // ciclos restantes por posición

    const tick = () => {
      // Inicializar ciclos para la siguiente letra a revelar
      if (cycles[revealed] === undefined) {
        cycles[revealed] = scrambleCycles
      }

      let result = ''

      for (let i = 0; i < text.length; i++) {
        if (i < revealed) {
          // Ya revelada — mostrar la letra real
          result += text[i]
        } else if (i === revealed) {
          // En proceso — mostrar caracter aleatorio o espacio
          if (text[i] === ' ') {
            cycles[revealed] = 0  // los espacios no scramblean
            result += ' '
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          cycles[revealed]--
          if (cycles[revealed] <= 0) revealed++
        } else {
          // Aún no llegamos — vacío
          result += ''
        }
      }

      setOutput(result)

      if (revealed >= text.length) {
        setOutput(text)
        setDone(true)
        return
      }

      frameRef.current = setTimeout(tick, speed)
    }

    const startTimeout = setTimeout(tick, delay)
    return () => {
      clearTimeout(startTimeout)
      clearTimeout(frameRef.current)
    }
  }, [text, speed, scrambleCycles, delay])

  return { output, done }
}
