import { useCallback, useRef } from 'react'
import type { MouseEvent } from 'react'

interface MagneticOptions {
  strength?: number
}

export function useMagneticEffect({ strength = 0.35 }: MagneticOptions = {}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
