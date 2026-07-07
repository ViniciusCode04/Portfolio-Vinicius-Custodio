export interface SkillCategory {
  label: string
  accent: 'cyan' | 'indigo' | 'emerald' | 'amber'
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Backend & Architecture',
    accent: 'cyan',
    items: ['C#/.NET 8', 'ASP.NET Core', 'Clean Architecture', 'RabbitMQ', 'MongoDB', 'Elasticsearch', 'SQL Server', 'REST APIs'],
  },
  {
    label: 'Cloud & Azure',
    accent: 'indigo',
    items: ['Azure Cloud', 'Azure Data Factory', 'Logic Apps', 'App Service', 'Key Vault', 'Application Insights'],
  },
  {
    label: 'Distributed Systems',
    accent: 'emerald',
    items: ['Event-Driven', 'Microsserviços', 'Message Queues', 'Docker', 'CI/CD', 'API Gateway'],
  },
  {
    label: 'Engineering Practices',
    accent: 'amber',
    items: ['Azure DevOps', 'Git', 'Scrum', 'Kanban', 'TypeScript', 'React'],
  },
]
