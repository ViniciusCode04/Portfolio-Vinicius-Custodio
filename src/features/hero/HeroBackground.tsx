import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { useMousePosition } from '@/shared/hooks/useMousePosition'

export function HeroBackground() {
  const reduced = useReducedMotion()
  const { x, y } = useMousePosition(!reduced)
  const [viewport, setViewport] = useState({ w: 1, h: 1 })

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const parallax = (factor: number) => ({
    x: reduced ? 0 : (x - viewport.w / 2) * factor,
    y: reduced ? 0 : (y - viewport.h / 2) * factor,
  })

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

      <motion.div
        className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent-indigo/10 blur-[100px]"
        animate={parallax(-0.02)}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-accent-cyan/8 blur-[120px]"
        animate={parallax(-0.03)}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent-emerald/5 blur-[100px]"
        animate={parallax(-0.015)}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </div>
  )
}
