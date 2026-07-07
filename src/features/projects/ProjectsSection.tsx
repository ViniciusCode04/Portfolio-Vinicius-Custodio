import { projects } from '@/data'
import { SectionShell } from '@/shared/components/SectionShell'
import { ProjectProvider } from './ProjectProvider'
import { ProjectCard } from './ProjectCard'
import { ArchitectureModal } from './ArchitectureModal'

export function ProjectsSection() {
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <ProjectProvider>
      <SectionShell
        id="projects"
        label="01 · Projetos"
        title="Sistemas que eu construo"
        description="Arquiteturas distribuídas, pipelines de dados e plataformas em produção — com foco em engenharia, não em aparência."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featured && <ProjectCard project={featured} featured />}
          {others.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </SectionShell>
      <ArchitectureModal />
    </ProjectProvider>
  )
}
