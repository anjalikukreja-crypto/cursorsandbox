import type { StatMetric } from './executiveStats'

export const analystStats: StatMetric[] = [
  {
    id: 'segment-count',
    label: 'Segments Analyzed',
    value: '24',
    change: '+3',
    changeDirection: 'up',
    trend: [18, 19, 20, 21, 22, 23, 24],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'data-points',
    label: 'Data Points (7d)',
    value: '328K',
    change: '+8%',
    changeDirection: 'up',
    trend: [280, 290, 300, 305, 310, 318, 328],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'export-count',
    label: 'Exports Generated',
    value: '156',
    change: '+22%',
    changeDirection: 'up',
    trend: [110, 120, 128, 135, 142, 148, 156],
    subtitle: 'AI Voice Agents Insights',
  },
  {
    id: 'avg-query-time',
    label: 'Avg Query Time',
    value: '1.2s',
    change: '-0.3s',
    changeDirection: 'up',
    trend: [1.8, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2],
    subtitle: 'AI Voice Agents Insights',
  },
]
