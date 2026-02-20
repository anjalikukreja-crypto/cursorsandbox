import type { StatMetric } from './executiveStats'

export const managerStats: StatMetric[] = [
  {
    id: 'session-completion',
    label: 'Session Completion Rate',
    value: '75%',
    change: '-3.24%',
    changeDirection: 'down',
    trend: [78, 77, 76, 76, 75, 75, 75],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'fcr',
    label: 'First Contact Resolution',
    value: '71%',
    change: '+2.00%',
    changeDirection: 'up',
    trend: [68, 69, 69, 70, 70, 71, 71],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'unique-members',
    label: 'Unique Member Reached',
    value: '46,967',
    change: '-1.85%',
    changeDirection: 'down',
    trend: [47000, 47500, 47200, 46800, 46900, 46800, 46967],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: '46,967',
    change: '+12%',
    changeDirection: 'up',
    trend: [38000, 40000, 42000, 43000, 44000, 45000, 46967],
    subtitle: 'AI Voice Agents Insights',
  },
]
