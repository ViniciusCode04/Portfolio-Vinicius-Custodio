export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  accent: 'cyan' | 'indigo' | 'emerald' | 'amber'
  link?: string
  featured?: boolean
  hasDeepDive?: boolean
  proLabel?: string
  metrics: ProjectMetric[]
}

export const projects: Project[] = [
  {
    id: 'eventra',
    title: 'Eventra',
    subtitle: 'Event-Driven Platform',
    description:
      'Sistema distribuído de gestão de eventos com arquitetura orientada a mensagens. RabbitMQ, workers .NET escaláveis, MongoDB, notificações SendGrid e dashboard React com polling em tempo real.',
    tags: ['.NET 8', 'RabbitMQ', 'MongoDB', 'React', 'Docker', 'SendGrid', 'JWT'],
    accent: 'cyan',
    link: 'https://eventra-frontend-259f.onrender.com/',
    featured: true,
    hasDeepDive: true,
    metrics: [
      { value: '99.9%', label: 'Uptime' },
      { value: '<8ms', label: 'P50 API' },
      { value: 'Live', label: 'Status' },
    ],
  },
  {
    id: 'pipeline',
    title: 'Pipeline ETL',
    subtitle: 'Azure Data Engineering',
    description:
      'Pipeline de ingestão e transformação de dados com Azure Data Factory. Múltiplas fontes, triggers agendados, monitoramento em tempo real e Logic Apps para alertas.',
    tags: ['Azure Data Factory', 'Azure Blob', 'SQL Server', 'Logic Apps'],
    accent: 'indigo',
    proLabel: 'Produção · Recovery',
    metrics: [
      { value: '1M+', label: 'Registros' },
      { value: '12/h', label: 'Runs' },
      { value: 'PRD', label: 'Env' },
    ],
  },
  {
    id: 'microservices',
    title: 'Microsserviços .NET',
    subtitle: 'Distributed Architecture',
    description:
      'Migração de sistema legado para microsserviços com API Gateway, JWT, comunicação assíncrona e CI/CD no Azure DevOps.',
    tags: ['.NET 8', 'RabbitMQ', 'Docker', 'JWT', 'API Gateway', 'Azure DevOps'],
    accent: 'emerald',
    proLabel: 'Produção · Recovery',
    metrics: [
      { value: '4', label: 'Serviços' },
      { value: 'JWT', label: 'Auth' },
      { value: 'K8s', label: 'Infra' },
    ],
  },
  {
    id: 'azurion',
    title: 'Azurion',
    subtitle: 'AI Educational Platform',
    description:
      'Plataforma educacional com IA via OpenAI GPT-3 para identificação de déficits, recomendação de trilhas personalizadas e exercícios adaptativos.',
    tags: ['C#', '.NET', 'OpenAI GPT-3', 'Angular', 'SQL Server', 'Figma'],
    accent: 'amber',
    metrics: [
      { value: 'GPT-3', label: 'Modelo' },
      { value: '2024', label: 'Ano' },
      { value: 'TCC', label: 'Tipo' },
    ],
  },
]

export interface ArchitectureLayer {
  name: string
  icon: string
  accent: 'cyan' | 'indigo' | 'emerald' | 'amber' | 'violet'
  role: string
  description: string
  details: string[]
  metric: string
  metricLabel: string
}

export const eventraArchitecture: ArchitectureLayer[] = [
  {
    name: 'ASP.NET Core API',
    icon: '◈',
    accent: 'indigo',
    role: 'Gateway',
    description:
      'API REST com Clean Architecture (Domain / Application / Infrastructure). Valida, autentica via JWT e publica jobs na fila.',
    details: ['Minimal APIs + Controllers híbridos', 'Clean Architecture 4 camadas', 'JWT Bearer + refresh token'],
    metric: '< 8ms',
    metricLabel: 'Resposta média',
  },
  {
    name: 'RabbitMQ',
    icon: '⬡',
    accent: 'amber',
    role: 'Mensageria',
    description:
      'Exchange Direct com dead-letter queue e retry automático. Garante desacoplamento total entre produtores e workers.',
    details: ['Exchange Direct + DLQ', 'Prefetch count para controle de concorrência', 'Retry exponencial até 3 tentativas'],
    metric: '~2k',
    metricLabel: 'Msgs/min',
  },
  {
    name: 'Workers .NET',
    icon: '⚙',
    accent: 'cyan',
    role: 'Processamento',
    description:
      'BackgroundService escaláveis horizontalmente via Docker. Consomem filas, processam jobs e atualizam status de forma atômica.',
    details: ['IHostedService + BackgroundService', 'Escalabilidade horizontal via replicas Docker', 'Estado atômico no MongoDB com transações'],
    metric: '×N',
    metricLabel: 'Escalável',
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    accent: 'emerald',
    role: 'Persistência',
    description:
      'NoSQL para jobs, histórico de execuções e estados. Schema flexível ideal para eventos variados com TTL automático.',
    details: ['Coleções por tipo de job', 'Índices compostos em status + createdAt', 'TTL index para expiração automática de logs'],
    metric: 'O(1)',
    metricLabel: 'Read by id',
  },
  {
    name: 'SendGrid',
    icon: '✉',
    accent: 'violet',
    role: 'Notificações',
    description:
      'Envio transacional de e-mails ao concluir ou falhar jobs. Templates dinâmicos por tipo de evento com retry em falha.',
    details: ['SDK oficial + templates dinâmicos', 'Retry automático em falha de entrega', 'Webhook de status para tracking'],
    metric: '99.5%',
    metricLabel: 'Delivery rate',
  },
  {
    name: 'React Dashboard',
    icon: '⚛',
    accent: 'cyan',
    role: 'Frontend',
    description:
      'Painel em tempo real com TanStack Query (polling 3s), gráficos de status por tipo, badges animados e filtros.',
    details: ['TanStack Query · polling 3s', 'Recharts para visualização de status', 'Tailwind + glassmorphism'],
    metric: '3s',
    metricLabel: 'Refresh rate',
  },
]
