import { profile } from '@/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="font-mono text-[11px] text-muted">
          © {year} {profile.name} · Engenharia de Software
        </p>
        <p className="font-mono text-[11px] text-muted">
          Construído com React · TypeScript · Framer Motion
        </p>
      </div>
    </footer>
  )
}
