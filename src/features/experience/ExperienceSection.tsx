import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experience, education } from '@/data'
import { SectionShell } from '@/shared/components/SectionShell'
import { Badge } from '@/shared/components/Badge'
import { Tag } from '@/shared/components/Tag'
import { ScrollReveal } from '@/shared/components/ScrollReveal'
import { accentStyles } from '@/shared/lib/accents'
import { cn } from '@/shared/lib/cn'
export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <SectionShell
      id="experience"
      label="02 · Experiência"
      title="Onde eu aplico engenharia"
      description="Modernização de legados, pipelines em nuvem e sistemas distribuídos em ambientes de produção."
      className="border-t border-border/50"
    >
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {experience.map((entry, index) => {
            const styles = accentStyles[entry.accent]
            const isActive = index === activeIndex

            return (
              <ScrollReveal key={entry.company} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'w-full rounded-2xl border p-4 text-left transition duration-300',
                    isActive
                      ? cn('bg-elevated/80', styles.border, styles.glow)
                      : 'border-border bg-surface/40 hover:border-border-strong',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge accent={entry.accent} pulse={entry.badge === 'LIVE'}>
                      {entry.badge}
                    </Badge>
                    <span className="font-mono text-[10px] text-muted">{entry.period}</span>
                  </div>
                  <p className="mt-3 font-display text-base font-semibold text-foreground">{entry.company}</p>
                  <p className="mt-1 font-mono text-[11px] text-secondary">{entry.role}</p>
                </button>
              </ScrollReveal>
            )
          })}
        </div>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            {experience.map((entry, index) => {
              if (index !== activeIndex) return null
              const styles = accentStyles[entry.accent]

              return (
                <motion.div
                  key={entry.company}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-foreground">{entry.company}</h3>
                      <p className="mt-1 font-mono text-sm text-secondary">{entry.role}</p>
                    </div>
                    <span className={cn('font-mono text-xs', styles.text)}>{entry.period}</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-secondary">
                        <span className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', styles.dot)} />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Tag key={tag} accent={entry.accent}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-20">
        <ScrollReveal>
          <div className="mb-8 flex items-center gap-3">
            <h3 className="font-display text-xl font-semibold text-foreground">Formação</h3>
            <span className="h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((item, index) => {
            const styles = accentStyles[item.accent]

            return (
              <ScrollReveal key={item.school} delay={index * 0.08}>
                <article className="rounded-2xl border border-border bg-surface/40 p-6 transition hover:border-border-strong">
                  <div className="flex items-center justify-between gap-3">
                    <Badge accent={item.accent}>{item.status}</Badge>
                    <span className="font-mono text-[10px] text-muted">{item.period}</span>
                  </div>
                  <h4 className="mt-4 font-display text-lg font-semibold text-foreground">{item.school}</h4>
                  <p className="mt-2 text-sm text-secondary">{item.degree}</p>
                  <div className={cn('mt-4 h-px w-12', styles.bg)} />
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
