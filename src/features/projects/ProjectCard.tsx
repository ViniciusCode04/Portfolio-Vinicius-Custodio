import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Layers } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useProjectContext } from './ProjectProvider'
import { Tag } from '@/shared/components/Tag'
import { Badge } from '@/shared/components/Badge'
import { ScrollReveal } from '@/shared/components/ScrollReveal'
import { accentStyles } from '@/shared/lib/accents'
import { cn } from '@/shared/lib/cn'
import { springSnappy } from '@/shared/lib/motion'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const { activeId, toggle, openDeep } = useProjectContext()
  const isActive = activeId === project.id
  const styles = accentStyles[project.accent]

  return (
    <ScrollReveal className={cn(featured && 'md:col-span-2')}>
      <article
        className={cn(
          'group relative overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500',
          isActive ? cn('border-opacity-100 -translate-y-0.5', styles.border, styles.glow) : 'border-border hover:border-border-strong',
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100',
            styles.bg,
            isActive && 'opacity-100',
          )}
        />

        <div className="relative p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_12px_currentColor]', styles.dot, styles.text)} />
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">{project.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {project.proLabel && <Badge accent={project.accent}>{project.proLabel}</Badge>}
              {project.featured && project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition',
                    styles.border,
                    styles.bg,
                    styles.text,
                    'hover:brightness-110',
                  )}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className={cn('absolute h-full w-full animate-ping rounded-full opacity-50', styles.dot)} />
                    <span className={cn('relative h-1.5 w-1.5 rounded-full', styles.dot)} />
                  </span>
                  Live
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.hasDeepDive && (
              <button
                type="button"
                onClick={() => openDeep(project.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition',
                  styles.border,
                  styles.bg,
                  styles.text,
                  'hover:brightness-110',
                )}
              >
                <Layers className="h-3.5 w-3.5" />
                Ver arquitetura
              </button>
            )}
            <button
              type="button"
              onClick={() => toggle(project.id)}
              aria-expanded={isActive}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-secondary transition hover:border-border-strong hover:text-foreground"
            >
              {isActive ? 'Recolher' : 'Detalhes'}
              <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={springSnappy}>
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm leading-relaxed text-secondary">{project.description}</p>

                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">// stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag} accent={project.accent}>
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className={cn('rounded-xl border px-3 py-3 text-center', styles.border, styles.bg)}
                      >
                        <p className={cn('font-mono text-base font-semibold', styles.text)}>{metric.value}</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </ScrollReveal>
  )
}
