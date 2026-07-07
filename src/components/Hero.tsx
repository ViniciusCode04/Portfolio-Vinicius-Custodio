import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Terminal, Zap } from 'lucide-react'
import { profile, navLinks } from '../data/portfolio'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-mono text-sm font-medium">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-gradient-neon text-background text-xs font-bold shadow-lg">
            {profile.name.charAt(0)}
          </span>
          <span className="hidden sm:inline text-gradient font-semibold">{profile.name.split(' ')[0]}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-accent font-mono"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-muted transition-colors hover:text-accent"
          >
            <Github size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent transition-all hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/10 sm:inline-flex"
          >
            Contato
          </a>
        </div>
      </div>
    </motion.header>
  )
}

const floatingTags = [
  { text: 'RabbitMQ', x: '10%', y: '20%', delay: 0 },
  { text: 'Azure ADF', x: '80%', y: '15%', delay: 0.5 },
  { text: '.NET 8', x: '75%', y: '70%', delay: 1 },
  { text: 'Docker', x: '15%', y: '75%', delay: 1.5 },
  { text: 'Logic Apps', x: '88%', y: '42%', delay: 0.8 },
  { text: 'MongoDB', x: '5%', y: '50%', delay: 1.2 },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-14">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="animate-scan absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      {/* Blobs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />

      {/* Floating tech tags */}
      {floatingTags.map((tag, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden lg:block"
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: tag.delay + 1, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="gradient-border rounded-full bg-card px-3 py-1 font-mono text-xs text-accent/60"
          >
            {tag.text}
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Disponível para projetos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          <span className="text-gradient">{profile.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex items-center justify-center gap-2 font-mono text-base text-muted sm:text-lg"
        >
          <Terminal size={16} className="text-accent" />
          <span>{profile.role}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted/80"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-neon px-6 py-2.5 text-sm font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
          >
            <Zap size={15} />
            Ver projetos
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-all hover:border-accent/30 hover:text-accent"
          >
            <Github size={16} />
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent/60" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={14} className="text-accent/60" />
            {profile.email}
          </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <Linkedin size={14} className="text-accent/60" />
            LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-accent/20 p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-accent/50"
          />
        </div>
      </motion.div>
    </section>
  )
}
