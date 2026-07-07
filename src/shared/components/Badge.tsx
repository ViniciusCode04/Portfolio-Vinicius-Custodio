import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { accentStyles, type AccentKey } from '@/shared/lib/accents'

interface BadgeProps {
  children: ReactNode
  accent?: AccentKey
  pulse?: boolean
  className?: string
}

export function Badge({ children, accent = 'cyan', pulse, className }: BadgeProps) {
  const styles = accentStyles[accent]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider',
        styles.bg,
        styles.border,
        styles.text,
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-40', styles.dot)} />
          <span className={cn('relative inline-flex h-2 w-2 rounded-full', styles.dot)} />
        </span>
      )}
      {children}
    </span>
  )
}
