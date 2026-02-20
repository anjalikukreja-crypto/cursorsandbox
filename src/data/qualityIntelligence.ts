import type { StatMetric } from './executiveStats'

export const executiveKpis: StatMetric[] = [
  { id: 'qa-score', label: 'Overall QA Score', value: '87%', change: '+2.1%', changeDirection: 'up', trend: [82, 84, 85, 85, 86, 86, 87], subtitle: 'Org-wide average' },
  { id: 'ces', label: 'Customer Effort Score', value: '72%', change: '-3%', changeDirection: 'down', trend: [75, 74, 73, 73, 72, 72, 72], subtitle: 'Below 75% threshold' },
  { id: 'compliance-risk', label: 'Compliance Risk Index', value: '0.24', change: '-0.05', changeDirection: 'up', trend: [0.32, 0.30, 0.28, 0.27, 0.26, 0.25, 0.24], subtitle: 'Weighted risk score' },
  { id: 'revenue-risk', label: 'Revenue at Risk', value: '$142K', change: '+$18K', changeDirection: 'down', trend: [95, 105, 118, 125, 132, 138, 142], subtitle: 'Est. LTV loss' },
]

export const cesTrendData = [...Array(30)].map((_, i) => ({ day: i + 1, ces: 68 + Math.sin(i / 5) * 8 + (i * 0.3) }))
export const qaScoreTrendData = [...Array(30)].map((_, i) => ({ day: i + 1, qa: 82 + (i * 0.18) + Math.random() * 2 }))

export const channelSplitData = [
  { label: 'Human', value: 45, color: '#4541FE' },
  { label: 'AI', value: 38, color: '#00796B' },
  { label: 'Self-Serve', value: 17, color: '#92939E' },
]

export const cesComparisonData = [
  { channel: 'AI', ces: 76 },
  { channel: 'Human', ces: 71 },
  { channel: 'Self-Serve', ces: 68 },
]

export const recommendations = [
  { id: '1', title: 'Roll out empathy training for Loan agents', impact: 'High', priority: 1, type: 'training' },
  { id: '2', title: 'Update disclosure script for Credit Card upsell', impact: 'Medium', priority: 2, type: 'compliance' },
  { id: '3', title: 'Review AI fallback for rate inquiry topics', impact: 'High', priority: 1, type: 'ai' },
]

export const topTopicsByVolume = [
  { topic: 'Loan Rates', volume: 2847 },
  { topic: 'Account Balance', volume: 2123 },
  { topic: 'Payment Issues', volume: 1892 },
  { topic: 'Credit Card', volume: 1567 },
  { topic: 'Fraud Disputes', volume: 1123 },
]

export const topTopicsPoorCes = [
  { topic: 'Loan Rates', ces: 58 },
  { topic: 'Fraud Disputes', ces: 62 },
  { topic: 'Payment Issues', ces: 65 },
]

export const agentScorecardData = [
  { id: '1', name: 'Sarah Chen', qa: 94, ces: 82, compliance: 98, aht: '3m 45s', flags: 0 },
  { id: '2', name: 'Michael Torres', qa: 89, ces: 78, compliance: 95, aht: '4m 12s', flags: 1 },
  { id: '3', name: 'Emily Watson', qa: 82, ces: 71, compliance: 88, aht: '4m 55s', flags: 3 },
]

export const knowledgeGapsData = [
  { topic: 'Mortgage Refi', count: 89 },
  { topic: 'Overdraft Policy', count: 67 },
  { topic: 'ACH Disputes', count: 54 },
]

export const channelVolumeData = [
  { channel: 'Voice', human: 3200, ai: 800, self: 0 },
  { channel: 'Chat', human: 1800, ai: 2200, self: 400 },
  { channel: 'SMS', human: 500, ai: 1500, self: 600 },
]

export const alertsData = [
  { id: '1', title: 'CES dropped below 70% - Loan Rates', severity: 'High', time: '2h ago' },
  { id: '2', title: 'Compliance breach - 3 agents missed disclosure', severity: 'Critical', time: '4h ago' },
  { id: '3', title: 'Volume spike 40% above forecast', severity: 'Medium', time: '6h ago' },
]
