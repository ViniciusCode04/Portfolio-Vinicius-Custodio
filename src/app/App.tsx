import { Suspense, lazy } from 'react'
import { Navigation } from '@/features/navigation/Navigation'
import { HeroSection } from '@/features/hero/HeroSection'
import { CustomCursor } from '@/shared/components/CustomCursor'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { Footer } from '@/features/footer/Footer'

const ProjectsSection = lazy(() =>
  import('@/features/projects/ProjectsSection').then((m) => ({ default: m.ProjectsSection })),
)
const ExperienceSection = lazy(() =>
  import('@/features/experience/ExperienceSection').then((m) => ({ default: m.ExperienceSection })),
)
const SkillsSection = lazy(() =>
  import('@/features/skills/SkillsSection').then((m) => ({ default: m.SkillsSection })),
)
const ContactSection = lazy(() =>
  import('@/features/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
)

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />
}

export default function App() {
  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Pular para conteúdo
      </a>

      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ExperienceSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  )
}
