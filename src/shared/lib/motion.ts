import type { Transition, Variants } from 'framer-motion'

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
}

export const springSmooth: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
}

export const easeOut: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}
