export interface ExperienceEntry {
  company: string
  role: string
  period: string
  badge: string
  accent: 'cyan' | 'indigo' | 'emerald' | 'amber'
  bullets: string[]
  tags: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Recovery — Grupo Itaú',
    role: 'Estagiário em Engenharia de Software',
    period: '06/2025 — 06/2026',
    badge: 'LIVE',
    accent: 'cyan',
    bullets: [
      'Migração de módulos de sistema legado → arquitetura de microsserviços',
      'Pipeline ETL com Azure Data Factory · múltiplas fontes · triggers agendados',
      'Automação de fluxos com Azure Logic Apps · integração com APIs externas',
      'Microsserviço de base veicular com +1M de registros — queries otimizadas',
      'CI/CD com Azure DevOps · squad ágil Scrum/Kanban',
    ],
    tags: ['Pipeline ETL', 'Azure Data Factory', 'Logic Apps', 'Microsserviços', 'SQL Server', 'C#/.NET', 'Scrum'],
  },
  {
    company: 'Azurion — Plataforma Educacional',
    role: 'Desenvolvedor Full Stack',
    period: '2024',
    badge: 'TCC',
    accent: 'indigo',
    bullets: [
      'Sistema educacional com IA integrada via OpenAI GPT-3',
      'Recomendação personalizada de trilhas de aprendizado por aluno',
      'Interface projetada no Figma · backend em C#',
    ],
    tags: ['C#', 'OpenAI GPT-3', 'Figma', 'SQL Server'],
  },
  {
    company: 'Instituições Estaduais — SP',
    role: 'Monitor de Programação Python',
    period: '2023',
    badge: 'EDU',
    accent: 'emerald',
    bullets: [
      'Ensino de fundamentos de Python para alunos do ensino técnico',
      'Lógica, estruturas de controle, funções e resolução de problemas',
    ],
    tags: ['Python', 'Ensino', 'Lógica'],
  },
]

export interface EducationEntry {
  school: string
  degree: string
  period: string
  status: string
  accent: 'cyan' | 'emerald'
}

export const education: EducationEntry[] = [
  {
    school: 'UNICID',
    degree: 'Análise e Desenvolvimento de Sistemas',
    period: '2025–2026',
    status: 'Cursando',
    accent: 'cyan',
  },
  {
    school: 'Etec São Mateus',
    degree: 'Técnico em ADS + Ensino Médio',
    period: '2022–2024',
    status: 'Concluído',
    accent: 'emerald',
  },
]
