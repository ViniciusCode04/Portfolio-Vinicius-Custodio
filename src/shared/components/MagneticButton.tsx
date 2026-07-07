import type { ReactNode, RefObject } from 'react'
import { cn } from '@/shared/lib/cn'
import { useMagneticEffect } from '@/shared/hooks/useMagneticEffect'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}

export function MagneticButton({ children, href, onClick, className, external }: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticEffect({ strength: 0.25 })

  const shared = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/80 px-5 py-2.5',
    'font-mono text-xs uppercase tracking-wider text-foreground backdrop-blur-sm',
    'transition-[border-color,box-shadow,background-color] duration-300',
    'hover:border-accent-cyan/30 hover:bg-elevated hover:shadow-glow-cyan',
    className,
  )

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={shared}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={shared}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  )
}
