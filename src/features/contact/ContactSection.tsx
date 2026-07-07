import { useState } from 'react'
import { Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { profile } from '@/data'
import { SectionShell } from '@/shared/components/SectionShell'
import { MagneticButton } from '@/shared/components/MagneticButton'
import { ScrollReveal } from '@/shared/components/ScrollReveal'

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-5 transition hover:border-border-strong">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="truncate font-mono text-sm text-foreground">{value}</p>
        <button
          type="button"
          aria-label={`Copiar ${label}`}
          onClick={copy}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-secondary transition hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4 text-accent-emerald" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      label="04 · Contato"
      title="Vamos construir algo sólido"
      description="Aberto a oportunidades em engenharia de software, backend e arquitetura de sistemas distribuídos."
      className="border-t border-border/50"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-elevated/30 p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Disponível para</p>
            <ul className="mt-6 space-y-3 text-sm text-secondary">
              <li>· Engenharia de Software · Backend · .NET</li>
              <li>· Arquitetura de Microsserviços</li>
              <li>· Pipelines de Dados · Azure</li>
              <li>· Sistemas Event-Driven</li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                Enviar email
              </MagneticButton>
              <MagneticButton href={profile.linkedin} external className="border-border/60">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </MagneticButton>
              <MagneticButton href={profile.github} external className="border-border/60">
                <Github className="h-4 w-4" />
                GitHub
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            <CopyField label="Email" value={profile.email} />
            <CopyField label="Telefone" value={profile.phone} />
            <CopyField label="Localização" value={profile.location} />

            <a
              href={`tel:${profile.phone.replace(/\D/g, '')}`}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-border px-5 py-4 font-mono text-xs uppercase tracking-wider text-muted transition hover:border-border-strong hover:text-secondary"
            >
              <Phone className="h-4 w-4" />
              Preferir ligação? Toque aqui
            </a>
          </div>
        </ScrollReveal>
      </div>
    </SectionShell>
  )
}
