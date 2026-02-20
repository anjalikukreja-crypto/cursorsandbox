export interface TeamMemberMetric {
  id: string
  name: string
  utilization: string
  aht: string
  callsHandled: number
  resolutionRate: string
  status: 'available' | 'busy' | 'away'
  trend: 'up' | 'down' | 'neutral'
}

export const teamMembers: TeamMemberMetric[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    utilization: '91%',
    aht: '3m 45s',
    callsHandled: 142,
    resolutionRate: '94%',
    status: 'available',
    trend: 'up',
  },
  {
    id: '2',
    name: 'Michael Torres',
    utilization: '88%',
    aht: '4m 12s',
    callsHandled: 128,
    resolutionRate: '92%',
    status: 'busy',
    trend: 'up',
  },
  {
    id: '3',
    name: 'Emily Watson',
    utilization: '85%',
    aht: '4m 55s',
    callsHandled: 118,
    resolutionRate: '88%',
    status: 'available',
    trend: 'neutral',
  },
  {
    id: '4',
    name: 'James Park',
    utilization: '82%',
    aht: '4m 20s',
    callsHandled: 135,
    resolutionRate: '91%',
    status: 'away',
    trend: 'up',
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    utilization: '79%',
    aht: '5m 02s',
    callsHandled: 102,
    resolutionRate: '85%',
    status: 'available',
    trend: 'down',
  },
]
