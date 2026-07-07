import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { accentStyles, type AccentKey } from '@/shared/lib/accents'

interface TagProps {
  children: ReactNode
  accent?: AccentKey
  className?: string
}

export function Tag({ children, accent = 'cyan', className }: TagProps) {
  const styles = accentStyles[accent]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide',
        styles.bg,
        styles.border,
        styles.text,
        className,
      )}
    >
      {children}
    </span>
  )
}
