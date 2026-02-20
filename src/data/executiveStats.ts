export interface StatMetric {
  id: string
  label: string
  value: string
  change: string
  changeDirection: 'up' | 'down' | 'neutral'
  changeAbsolute?: string
  changeSuffix?: string
  trend?: number[]
  periodLabel?: string
  subtitle?: string
  trendInsight?: string
  trendInsightBold?: string
}

export const executiveStats: StatMetric[] = [
  {
    id: 'active-users',
    label: 'Active Users',
    value: '46,967',
    change: '+12%',
    changeDirection: 'up',
    trend: [38000, 40000, 42000, 43000, 44000, 45000, 46967],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'ai-adoption',
    label: 'AI Adoption Rate',
    value: '78%',
    change: '+5%',
    changeDirection: 'up',
    trend: [72, 74, 75, 76, 77, 77, 78],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'revenue-impact',
    label: 'Revenue Impact',
    value: '$2.4M',
    change: '+18%',
    changeDirection: 'up',
    trend: [180, 195, 205, 210, 220, 228, 240],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'customer-satisfaction',
    label: 'Customer Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    changeDirection: 'up',
    trend: [4.4, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8],
    subtitle: 'AI Voice Agents Insights',
  },
]
