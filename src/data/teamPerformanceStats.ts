import type { StatMetric } from './executiveStats'

export const teamPerformanceStats: StatMetric[] = [
  {
    id: 'utilization',
    label: 'Team Utilization',
    value: '82%',
    change: '+4.2%',
    changeDirection: 'up',
    trend: [76, 77, 78, 79, 80, 81, 82],
    subtitle: 'Agent productivity',
  },
  {
    id: 'avg-aht',
    label: 'Avg Handle Time',
    value: '4m 32s',
    change: '-8%',
    changeDirection: 'up',
    trend: [320, 310, 295, 285, 278, 275, 272],
    subtitle: 'Across all channels',
  },
  {
    id: 'calls-handled',
    label: 'Calls Handled',
    value: '12,847',
    change: '+15%',
    changeDirection: 'up',
    trend: [9800, 10100, 10500, 11000, 11500, 12100, 12847],
    subtitle: 'Last 7 days',
  },
  {
    id: 'resolution-rate',
    label: 'Resolution Rate',
    value: '89%',
    change: '+2.1%',
    changeDirection: 'up',
    trend: [84, 85, 86, 87, 87, 88, 89],
    subtitle: 'First contact',
  },
]
