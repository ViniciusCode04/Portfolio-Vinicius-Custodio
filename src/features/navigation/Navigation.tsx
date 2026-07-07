import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile, sectionIds } from '@/data'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { cn } from '@/shared/lib/cn'

export function Navigation() {
  const active = useActiveSection([...sectionIds])
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
      >
        <a
          href="#"
          className="group flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/80 font-mono text-xs text-accent-cyan backdrop-blur-md">
            VC
          </span>
          <span className="hidden font-mono text-xs text-secondary transition group-hover:text-foreground sm:block">
            {profile.role}
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-xl md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors',
                    isActive ? 'text-foreground' : 'text-muted hover:text-secondary',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-border bg-elevated/80"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/80 text-foreground backdrop-blur-md md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-b border-border bg-background/95 px-6 py-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-wider text-secondary transition hover:bg-elevated hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </header>
  )
}
