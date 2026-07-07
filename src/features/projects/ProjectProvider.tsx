import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface ProjectContextValue {
  activeId: string | null
  toggle: (id: string) => void
  deepDiveId: string | null
  openDeep: (id: string) => void
  closeDeep: () => void
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [deepDiveId, setDeepDiveId] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }, [])

  const openDeep = useCallback((id: string) => {
    setDeepDiveId(id)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeDeep = useCallback(() => {
    setDeepDiveId(null)
    document.body.style.overflow = ''
  }, [])

  const value = useMemo(
    () => ({ activeId, toggle, deepDiveId, openDeep, closeDeep }),
    [activeId, toggle, deepDiveId, openDeep, closeDeep],
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export function useProjectContext() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjectContext must be used within ProjectProvider')
  return ctx
}
