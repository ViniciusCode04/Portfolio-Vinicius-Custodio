import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/shared/lib/motion'
import { cn } from '@/shared/lib/cn'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
