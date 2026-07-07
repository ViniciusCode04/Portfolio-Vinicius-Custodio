import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/shared/lib/motion'
import { cn } from '@/shared/lib/cn'

interface SectionShellProps {
  id: string
  label: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function SectionShell({ id, label, title, description, children, className }: SectionShellProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('relative scroll-mt-28 py-24 md:py-32', className)}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{label}</p>
          <h2 id={`${id}-title`} className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-secondary">{description}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
