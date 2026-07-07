import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Portfolio Error]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[40vh] items-center justify-center px-6">
            <div className="max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Erro inesperado</p>
              <p className="mt-3 text-sm text-secondary">Algo falhou ao renderizar esta seção.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition hover:border-accent-cyan/40"
              >
                Recarregar
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
