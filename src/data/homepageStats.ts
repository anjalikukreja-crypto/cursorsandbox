import type { StatMetric } from './executiveStats'

// Interpolate trend data to 28 points for 4-week line chart
function weeklyTrend(values: number[]): number[] {
  if (values.length >= 28) return values
  const result: number[] = []
  for (let i = 0; i < 28; i++) {
    const t = i / 27
    const pos = t * (values.length - 1)
    const idx = Math.floor(pos)
    const next = Math.min(idx + 1, values.length - 1)
    const frac = pos - idx
    result.push(values[idx] * (1 - frac) + values[next] * frac)
  }
  return result
}

export const homepageStats: StatMetric[] = [
  {
    id: 'ai-resolved',
    label: '% of conversations fully resolved by AI',
    value: '68%',
    change: '-5.2%',
    changeAbsolute: '-3.2pp',
    changeSuffix: 'vs. prior period',
    changeDirection: 'down',
    trend: weeklyTrend([75, 74, 73, 72, 71, 70.5, 70, 69.5, 69, 68.5, 68]),
    trendInsight: 'An unfavorable trend has been detected for % of conversations fully resolved by AI that steepened 8 days ago.',
    trendInsightBold: 'unfavorable trend',
  },
  {
    id: 'aht-channel',
    label: 'Time (AHT) per channel',
    value: '4m 32s',
    change: '-8.1%',
    changeAbsolute: '-24s',
    changeSuffix: 'vs. prior period',
    changeDirection: 'up',
    trend: weeklyTrend([5.2, 5.0, 4.9, 4.85, 4.8, 4.78, 4.75, 4.72, 4.68, 4.62, 4.53]),
    trendInsight: 'A favorable trend has been detected for Time (AHT) per channel that improved 6 days ago.',
    trendInsightBold: 'favorable trend',
  },
  {
    id: 'fcr',
    label: 'First Contact Resolution (FCR) rate',
    value: '71%',
    change: '+2.0%',
    changeAbsolute: '+1.4pp',
    changeSuffix: 'vs. prior period',
    changeDirection: 'up',
    trend: weeklyTrend([68, 68.5, 69, 69.5, 70, 70.2, 70.5, 70.8, 71]),
    trendInsight: 'A favorable trend has been detected for First Contact Resolution (FCR) rate this month.',
    trendInsightBold: 'favorable trend',
  },
  {
    id: 'agent-utilization',
    label: 'Agent utilization rate',
    value: '82%',
    change: '+1.5%',
    changeAbsolute: '+1.2pp',
    changeSuffix: 'vs. prior period',
    changeDirection: 'up',
    trend: weeklyTrend([78, 79, 79.5, 80, 80.5, 81, 81.2, 81.5, 81.8, 82]),
    trendInsight: 'A favorable trend has been detected for Agent utilization rate over the past week.',
    trendInsightBold: 'favorable trend',
  },
]

// Suggested prompts for CIO of American credit union
export const cioCreditUnionPrompts = [
  'Digital transformation strategies for credit unions',
  'Compliance and regulatory requirements for credit unions',
  'Member experience improvements and personalization',
  'Core system modernization and migration',
  'Fraud detection and risk management best practices',
  'AI and automation for member services',
  'Branch network optimization and omnichannel strategy',
  'Data security and cybersecurity for financial institutions',
  'Loan origination and underwriting efficiency',
  'Member acquisition and retention strategies',
  'Cloud adoption and infrastructure for credit unions',
  'Payment systems and real-time transaction processing',
  'Member communication and engagement analytics',
  'IT budget prioritization for credit unions',
]

export interface Dashboard {
  id: string
  name: string
  description: string
  type: string
  lastUpdated: string
}

export const dashboardsData: Dashboard[] = [
  {
    id: '1',
    name: 'Conversation intelligence',
    description: 'Quantitative and qualitative conversation intelligence data',
    type: 'Standard',
    lastUpdated: '11/20/2025 09:00:00 AM',
  },
  {
    id: '2',
    name: 'AI voice 2.0',
    description: 'AI-powered voice analytics and insights',
    type: 'Custom',
    lastUpdated: '11/19/2025 02:30:00 PM',
  },
  {
    id: '3',
    name: 'Sales Performance',
    description: 'Sales metrics and pipeline performance tracking',
    type: 'Custom',
    lastUpdated: '11/18/2025 10:15:00 AM',
  },
  {
    id: '4',
    name: 'Conversation Panel Survey Scores',
    description: 'Member satisfaction and survey response analytics',
    type: 'Standard',
    lastUpdated: '11/17/2025 04:45:00 PM',
  },
  {
    id: '5',
    name: 'Interaction Insights',
    description: 'Omnichannel interaction and engagement metrics',
    type: 'Standard',
    lastUpdated: '11/16/2025 08:00:00 AM',
  },
]
