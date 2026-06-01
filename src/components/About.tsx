import { motion } from 'framer-motion'
import { Cloud, GitBranch, Layers, Cpu } from 'lucide-react'
import { profile } from '../data/portfolio'

const highlights = [
  {
    icon: Layers,
    title: 'Microsserviços',
    description: 'Arquiteturas distribuídas com comunicação assíncrona via RabbitMQ e APIs REST com .NET 8.',
    color: 'text-cyan-400',
    border: 'group-hover:border-cyan-400/30',
  },
  {
    icon: Cloud,
    title: 'Azure Cloud',
    description: 'Data Factory, Logic Apps, App Service, Key Vault e Application Insights em produção.',
    color: 'text-violet-400',
    border: 'group-hover:border-violet-400/30',
  },
  {
    icon: GitBranch,
    title: 'Clean Architecture',
    description: 'Domain, Application, Infrastructure e API separados com injeção de dependência e testes.',
    color: 'text-emerald-400',
    border: 'group-hover:border-emerald-400/30',
  },
  {
    icon: Cpu,
    title: 'Pipelines de Dados',
    description: 'ETL com Azure Data Factory integrando múltiplas fontes, transformações e triggers.',
    color: 'text-orange-400',
    border: 'group-hover:border-orange-400/30',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-accent">// sobre</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Quem sou eu</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-muted">{profile.bio}</p>

            <div className="mt-8 gradient-border rounded-xl bg-card p-6 font-mono text-sm">
              <p className="text-muted">
                <span className="text-violet-400">const</span>{' '}
                <span className="text-foreground">engineer</span> = {'{'}
              </p>
              <p className="ml-4 text-muted">
                name: <span className="text-orange-300">'{profile.name}'</span>,
              </p>
              <p className="ml-4 text-muted">
                role: <span className="text-orange-300">'{profile.role}'</span>,
              </p>
              <p className="ml-4 text-muted">
                stack: <span className="text-cyan-300">['C#', '.NET', 'Azure', 'React']</span>,
              </p>
              <p className="ml-4 text-muted">
                cloud: <span className="text-violet-300">['ADF', 'Logic Apps', 'App Service']</span>,
              </p>
              <p className="ml-4 text-muted">
                messaging: <span className="text-emerald-300">'RabbitMQ'</span>,
              </p>
              <p className="text-muted">{'};'}</p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, description, color, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`gradient-border group flex flex-col gap-3 rounded-xl bg-card p-5 transition-all hover:bg-card-hover`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors ${border}`}>
                  <Icon size={18} className={`${color} transition-colors`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
