import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { eventraArchitecture } from '@/data'
import { useProjectContext } from './ProjectProvider'
import { Tag } from '@/shared/components/Tag'
import { accentStyles } from '@/shared/lib/accents'
import { cn } from '@/shared/lib/cn'

export function ArchitectureModal() {
  const { deepDiveId, closeDeep } = useProjectContext()
  const [activeIndex, setActiveIndex] = useState(0)
  const isOpen = deepDiveId === 'eventra'

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDeep()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeDeep])

  useEffect(() => {
    if (isOpen) setActiveIndex(0)
  }, [isOpen])

  const layer = eventraArchitecture[activeIndex]
  const styles = accentStyles[layer?.accent ?? 'cyan']

  return (
    <AnimatePresence>
      {isOpen && layer && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="arch-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end justify-center bg-background/90 p-0 backdrop-blur-xl sm:items-center sm:p-6"
          onClick={closeDeep}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-border bg-surface sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Deep dive</p>
                <h2 id="arch-title" className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  Eventra — Arquitetura Distribuída
                </h2>
                <p className="mt-2 max-w-xl text-sm text-secondary">
                  Sistema event-driven com mensageria, workers escaláveis e persistência NoSQL.
                </p>
              </div>
              <button
                type="button"
                aria-label="Fechar modal"
                onClick={closeDeep}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-secondary transition hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid flex-1 overflow-hidden md:grid-cols-[240px_1fr]">
              <nav aria-label="Camadas da arquitetura" className="border-b border-border p-4 md:border-b-0 md:border-r md:p-6">
                <ul className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
                  {eventraArchitecture.map((item, index) => {
                    const itemStyles = accentStyles[item.accent]
                    const isActive = index === activeIndex

                    return (
                      <li key={item.name} className="shrink-0 md:shrink">
                        <button
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition',
                            isActive
                              ? cn(itemStyles.border, itemStyles.bg, 'text-foreground')
                              : 'border-transparent text-muted hover:border-border hover:text-secondary',
                          )}
                        >
                          <span className="font-mono text-sm">{item.icon}</span>
                          <span className="font-mono text-[11px] uppercase tracking-wide">{item.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="overflow-y-auto p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={layer.name}
                    initial={{ opacity: 0, x: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-2xl">{layer.icon}</span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground">{layer.name}</h3>
                        <p className={cn('font-mono text-xs uppercase tracking-wider', styles.text)}>{layer.role}</p>
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-secondary">{layer.description}</p>

                    <ul className="mt-6 space-y-2">
                      {layer.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm text-secondary">
                          <span className={cn('mt-2 h-1 w-1 shrink-0 rounded-full', styles.dot)} />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className={cn('mt-8 inline-flex flex-col rounded-2xl border px-6 py-5', styles.border, styles.bg)}>
                      <span className={cn('font-mono text-3xl font-semibold', styles.text)}>{layer.metric}</span>
                      <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{layer.metricLabel}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                  {['Event-Driven', 'RabbitMQ', 'Clean Architecture', 'MongoDB', '.NET 8'].map((tag) => (
                    <Tag key={tag} accent="cyan">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
