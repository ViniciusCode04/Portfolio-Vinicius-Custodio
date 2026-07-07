export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
  gradient: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'cloud' | 'tools'
}

export const profile = {
  name: 'Vinicius Custodio',
  role: 'Software Engineer & Cloud Architect',
  tagline: 'Construo sistemas distribuídos, pipelines de dados e interfaces que escalam.',
  bio: 'Engenheiro de software focado em arquiteturas de microsserviços, integração de dados em nuvem e desenvolvimento full-stack. Experiência com .NET, Azure, mensageria assíncrona e automação de pipelines — do backend à infraestrutura.',
  email: 'custodiovinicius22@gmail.com',
  github: 'https://github.com/custodiovinicius',
  linkedin: 'https://linkedin.com/in/custodiovinicius',
  location: 'São Paulo, Brasil',
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Eventra — Job Processor',
    description: 'Sistema distribuído de processamento assíncrono de jobs com RabbitMQ, MongoDB e workers escaláveis horizontalmente. Retry automático, controle de concorrência atômico e envio de email via SMTP.',
    tags: ['.NET 8', 'RabbitMQ', 'MongoDB', 'Docker', 'Clean Architecture'],
    github: '#',
    featured: true,
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: '2',
    title: 'Pipeline ETL — Azure Data Factory',
    description: 'Pipeline de ingestão e transformação de dados com Azure Data Factory, integrando múltiplas fontes, agendamento por triggers e monitoramento de execução em tempo real.',
    tags: ['Azure Data Factory', 'Azure Blob', 'SQL Server', 'Logic Apps'],
    featured: true,
    gradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    id: '3',
    title: 'Microsserviços com .NET',
    description: 'Arquitetura de microsserviços com comunicação via mensageria, API Gateway, autenticação centralizada e deploy em containers.',
    tags: ['.NET 8', 'RabbitMQ', 'Docker', 'JWT', 'API Gateway'],
    github: '#',
    gradient: 'from-emerald-500/20 to-green-500/10',
  },
  {
    id: '4',
    title: 'Automação com Logic Apps',
    description: 'Fluxos de automação empresarial com Azure Logic Apps integrando APIs externas, envio de notificações e orquestração de processos de negócio.',
    tags: ['Logic Apps', 'Azure', 'REST APIs', 'Automation'],
    gradient: 'from-orange-500/20 to-amber-500/10',
  },
  {
    id: '5',
    title: 'Dashboard Eventra',
    description: 'Interface React moderna com glassmorphism, efeitos neon e monitoramento em tempo real de jobs — polling automático, gráficos e badges animados por status.',
    tags: ['React', 'TypeScript', 'TanStack Query', 'Framer Motion', 'Tailwind'],
    github: '#',
    gradient: 'from-pink-500/20 to-rose-500/10',
  },
  {
    id: '6',
    title: 'Infraestrutura Azure Cloud',
    description: 'Provisionamento e gerenciamento de recursos Azure com foco em alta disponibilidade, segurança e monitoramento via Azure Monitor e Application Insights.',
    tags: ['Azure Cloud', 'App Service', 'Key Vault', 'Application Insights'],
    gradient: 'from-slate-500/20 to-zinc-500/10',
  },
]

export const skills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },

  { name: 'C# / .NET 8', category: 'backend' },
  { name: 'ASP.NET Core', category: 'backend' },
  { name: 'Clean Architecture', category: 'backend' },
  { name: 'RabbitMQ', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'SQL Server', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },

  { name: 'Azure Cloud', category: 'cloud' },
  { name: 'Azure Data Factory', category: 'cloud' },
  { name: 'Azure Logic Apps', category: 'cloud' },
  { name: 'Azure App Service', category: 'cloud' },
  { name: 'Azure Key Vault', category: 'cloud' },
  { name: 'Application Insights', category: 'cloud' },

  { name: 'Docker', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Swagger / OpenAPI', category: 'tools' },
  { name: 'xUnit', category: 'tools' },
]

export const navLinks = [
  { label: 'Projetos', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
]
