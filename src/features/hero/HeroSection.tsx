import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { profile, typewriterPhrases, heroStats } from '@/data'
import { HeroBackground } from './HeroBackground'
import { MagneticButton } from '@/shared/components/MagneticButton'
import { Badge } from '@/shared/components/Badge'
import { useTypewriter } from '@/shared/hooks/useTypewriter'
import { fadeUp, staggerContainer } from '@/shared/lib/motion'

export function HeroSection() {
  const typed = useTypewriter([...typewriterPhrases])

  return (
    <section aria-label="Introdução" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1, 0.15)} className="max-w-4xl">
          <motion.div variants={fadeUp}>
            <Badge pulse accent="emerald">
              Disponível · São Paulo, BR
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground"
          >
            {profile.name.split(' ')[0]}
            <br />
            <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-secondary md:text-xl">
            {profile.headline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex min-h-[2rem] items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">Especialidade</span>
            <span className="font-mono text-sm text-accent-cyan">
              {typed}
              <span className="animate-blink ml-0.5 text-accent-cyan">|</span>
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="#projects">Ver projetos</MagneticButton>
            <MagneticButton href={profile.github} external className="border-border/60">
              <Github className="h-4 w-4" />
              GitHub
            </MagneticButton>
            <MagneticButton href={profile.linkedin} external className="border-border/60">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </MagneticButton>
            <MagneticButton href={`mailto:${profile.email}`} className="border-border/60">
              <Mail className="h-4 w-4" />
              Email
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-surface/80 px-5 py-5 backdrop-blur-sm">
              <p className="font-mono text-lg font-semibold tracking-tight text-foreground">{stat.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        aria-label="Rolar para projetos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
