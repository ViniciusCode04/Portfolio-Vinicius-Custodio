import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, MessageSquare } from 'lucide-react'
import { profile } from '../data/portfolio'

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-border/50 py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="gradient-border-neon gradient-border mx-auto max-w-2xl rounded-2xl bg-card p-8 text-center sm:p-12 neon-glow"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-neon">
            <MessageSquare size={22} className="text-background" />
          </div>
          <p className="font-mono text-sm text-accent">// contato</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Vamos construir algo juntos?
          </h2>
          <p className="mt-4 text-muted">
            Aberto a freelances, projetos cloud, microsserviços e oportunidades full-time.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-neon px-8 py-3 text-sm font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
          >
            <Mail size={16} />
            {profile.email}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border p-3 text-muted transition-all hover:border-accent/30 hover:text-accent hover:shadow-sm hover:shadow-accent/10"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border p-3 text-muted transition-all hover:border-accent/30 hover:text-accent hover:shadow-sm hover:shadow-accent/10"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} <span className="text-accent">{profile.name}</span>. Built with React + Vite.
        </p>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent/60">{'>'}</span> Deploy ready → Vercel
        </p>
      </div>
    </footer>
  )
}
