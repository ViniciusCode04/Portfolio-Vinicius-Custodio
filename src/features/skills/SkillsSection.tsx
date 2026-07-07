import { motion } from 'framer-motion'
import { skillCategories } from '@/data'
import { accentStyles } from '@/shared/lib/accents'
import { cn } from '@/shared/lib/cn'
import { staggerContainer, fadeUp } from '@/shared/lib/motion'

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      label="03 · Stack"
      title="Ferramentas de engenharia"
      description="Backend, cloud e sistemas distribuídos — a stack que uso para construir software em escala."
      className="border-t border-border/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer(0.1)}
        className="grid gap-4 md:grid-cols-2"
      >
        {skillCategories.map((category) => {
          const styles = accentStyles[category.accent]

          return (
            <motion.div
              key={category.label}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-surface/40 p-6 transition duration-500 hover:border-border-strong hover:bg-surface/70"
            >
              <div className="flex items-center gap-3">
                <span className={cn('h-2 w-2 rounded-full', styles.dot)} />
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-secondary">{category.label}</h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.items.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className={cn(
                      'cursor-default rounded-lg border px-3 py-2 font-mono text-[11px] tracking-wide transition duration-300',
                      'border-border text-secondary',
                      'group-hover:border-border-strong',
                      'hover:-translate-y-0.5 hover:border-opacity-100',
                      styles.border,
                      styles.bg,
                      'hover:text-foreground',
                    )}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}
