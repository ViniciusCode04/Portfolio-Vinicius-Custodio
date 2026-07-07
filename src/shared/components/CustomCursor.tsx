import { motion } from 'framer-motion'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { useMousePosition } from '@/shared/hooks/useMousePosition'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const { x, y } = useMousePosition(!reduced)

  if (reduced) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/30 md:block"
        animate={{ x, y }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan md:block"
        animate={{ x, y }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
      />
    </>
  )
}
