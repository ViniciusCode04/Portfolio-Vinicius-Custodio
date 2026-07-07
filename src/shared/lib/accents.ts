export const accentStyles = {
  cyan: {
    text: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/25',
    glow: 'shadow-glow-cyan',
    dot: 'bg-accent-cyan',
  },
  indigo: {
    text: 'text-accent-indigo',
    bg: 'bg-accent-indigo/10',
    border: 'border-accent-indigo/25',
    glow: 'shadow-glow-indigo',
    dot: 'bg-accent-indigo',
  },
  emerald: {
    text: 'text-accent-emerald',
    bg: 'bg-accent-emerald/10',
    border: 'border-accent-emerald/25',
    glow: 'shadow-glow-emerald',
    dot: 'bg-accent-emerald',
  },
  amber: {
    text: 'text-accent-amber',
    bg: 'bg-accent-amber/10',
    border: 'border-accent-amber/25',
    glow: 'shadow-glow-amber',
    dot: 'bg-accent-amber',
  },
  violet: {
    text: 'text-accent-violet',
    bg: 'bg-accent-violet/10',
    border: 'border-accent-violet/25',
    glow: 'shadow-glow-violet',
    dot: 'bg-accent-violet',
  },
} as const

export type AccentKey = keyof typeof accentStyles
