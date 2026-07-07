import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../data/portfolio'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function ProjectCard({ project, large }: { project: typeof projects[0]; large?: boolean }) {
  return (
    <motion.article
      variants={item}
      className={`group gradient-border relative overflow-hidden rounded-xl bg-card transition-colors hover:bg-card-hover ${
        large ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-opacity group-hover:opacity-80`} />
      <div className="absolute inset-0 shine animate-shimmer opacity-0 transition-opacity group-hover:opacity-100" />

      <div className={`relative flex h-full flex-col p-6 ${large ? 'md:p-8' : ''}`}>
        <div className="mb-auto">
          {project.featured && (
            <span className="mb-3 inline-block rounded-full border border-border bg-background/50 px-2.5 py-0.5 font-mono text-xs text-muted backdrop-blur-sm">
              featured
            </span>
          )}
          <h3 className={`font-semibold tracking-tight ${large ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {project.title}
          </h3>
          <p className={`mt-2 text-muted ${large ? 'text-base md:max-w-md' : 'text-sm'}`}>
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/50 bg-background/30 px-2 py-0.5 font-mono text-xs text-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-accent"
            >
              Live <ArrowUpRight size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-accent">// projetos</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Desenvolvimentos recentes
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Uma seleção dos meus trabalhos — de APIs escaláveis a interfaces modernas.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]"
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} large={i === 0} />
          ))}
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
