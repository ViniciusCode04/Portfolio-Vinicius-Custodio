import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

const categories = {
  frontend: { label: 'Frontend', color: 'text-cyan-400', glow: 'shadow-cyan-400/20', dot: 'bg-cyan-400' },
  backend: { label: 'Backend & APIs', color: 'text-emerald-400', glow: 'shadow-emerald-400/20', dot: 'bg-emerald-400' },
  cloud: { label: 'Azure & Cloud', color: 'text-violet-400', glow: 'shadow-violet-400/20', dot: 'bg-violet-400' },
  tools: { label: 'DevOps & Tools', color: 'text-orange-400', glow: 'shadow-orange-400/20', dot: 'bg-orange-400' },
} as const

export function Skills() {
  const grouped = Object.entries(categories).map(([key, meta]) => ({
    key,
    ...meta,
    items: skills.filter((s) => s.category === key),
  }))

  return (
    <section id="skills" className="relative border-t border-border/50 py-24">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/3 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-accent">// stack</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Tecnologias & Cloud
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Do backend ao cloud — ferramentas que uso para construir sistemas robustos e escaláveis.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {grouped.map(({ key, label, color, dot, items }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="gradient-border group rounded-xl bg-card p-6 transition-all hover:bg-card-hover"
            >
              <div className="mb-5 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${dot} animate-pulse`} />
                <h3 className={`font-mono text-sm font-semibold ${color}`}>{label}</h3>
              </div>
              <ul className="space-y-2.5">
                {items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <span className={`h-px w-3 ${dot} opacity-50`} />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* All skills pill cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-2.5"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-default rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted transition-all hover:border-accent/30 hover:text-accent hover:shadow-sm hover:shadow-accent/10"
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
