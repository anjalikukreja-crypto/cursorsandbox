import { useState, useRef, useEffect } from 'react'
import { KPICard } from '../../components/KPICard/KPICard'
import { teamPerformanceStats } from '../../data/teamPerformanceStats'
import { teamMembers } from '../../data/teamMembers'
import './TeamPerformance.css'

const PERIOD_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 60 days'] as const
type PeriodOption = (typeof PERIOD_OPTIONS)[number]

const TEAM_OPTIONS = ['All teams', 'Support Team', 'Sales Team', 'Retention Team'] as const
type TeamOption = (typeof TEAM_OPTIONS)[number]

export function TeamPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('Last 7 days')
  const [selectedTeam, setSelectedTeam] = useState<TeamOption>('All teams')
  const [periodOpen, setPeriodOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const periodRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setPeriodOpen(false)
      }
      if (teamRef.current && !teamRef.current.contains(e.target as Node)) {
        setTeamOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="team-performance__status team-performance__status--available">Available</span>
      case 'busy':
        return <span className="team-performance__status team-performance__status--busy">Busy</span>
      case 'away':
        return <span className="team-performance__status team-performance__status--away">Away</span>
      default:
        return <span className="team-performance__status">{status}</span>
    }
  }

  return (
    <div className="team-performance">
      <header className="team-performance__header">
        <div className="team-performance__header-top">
          <span className="team-performance__updated">Last updated today</span>
        </div>
        <div className="team-performance__filters">
          <div className="team-performance__filter" ref={teamRef}>
            <label htmlFor="team-filter" className="team-performance__filter-label">Team</label>
            <button
              id="team-filter"
              type="button"
              className="team-performance__filter-btn"
              onClick={() => setTeamOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={teamOpen}
            >
              {selectedTeam}
              <span className={`team-performance__filter-chevron ${teamOpen ? 'team-performance__filter-chevron--open' : ''}`}>▾</span>
            </button>
            {teamOpen && (
              <ul className="team-performance__filter-menu" role="listbox">
                {TEAM_OPTIONS.map((opt) => (
                  <li key={opt} role="option">
                    <button
                      type="button"
                      className={`team-performance__filter-item ${selectedTeam === opt ? 'team-performance__filter-item--active' : ''}`}
                      onClick={() => {
                        setSelectedTeam(opt)
                        setTeamOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="team-performance__filter" ref={periodRef}>
            <label htmlFor="period-filter" className="team-performance__filter-label">Period</label>
            <button
              id="period-filter"
              type="button"
              className="team-performance__filter-btn"
              onClick={() => setPeriodOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={periodOpen}
            >
              <span className="team-performance__filter-icon" aria-hidden>📅</span>
              {selectedPeriod}
              <span className={`team-performance__filter-chevron ${periodOpen ? 'team-performance__filter-chevron--open' : ''}`}>▾</span>
            </button>
            {periodOpen && (
              <ul className="team-performance__filter-menu" role="listbox">
                {PERIOD_OPTIONS.map((opt) => (
                  <li key={opt} role="option">
                    <button
                      type="button"
                      className={`team-performance__filter-item ${selectedPeriod === opt ? 'team-performance__filter-item--active' : ''}`}
                      onClick={() => {
                        setSelectedPeriod(opt)
                        setPeriodOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" className="team-performance__export-btn">
            Export
          </button>
        </div>
      </header>

      <section className="team-performance__kpis">
        {teamPerformanceStats.map((stat) => (
          <KPICard key={stat.id} metric={stat} showTrend variant="dashboard" />
        ))}
      </section>

      <section className="team-performance__table-section">
        <header className="team-performance__table-header">
          <h2 className="team-performance__table-title">Team Member Performance</h2>
          <button type="button" className="team-performance__view-all">View all</button>
        </header>
        <div className="team-performance__table-wrap">
          <table className="team-performance__table">
            <thead>
              <tr>
                <th className="team-performance__th">Agent</th>
                <th className="team-performance__th">Status</th>
                <th className="team-performance__th team-performance__th--right">Utilization</th>
                <th className="team-performance__th team-performance__th--right">AHT</th>
                <th className="team-performance__th team-performance__th--right">Calls</th>
                <th className="team-performance__th team-performance__th--right">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="team-performance__row">
                  <td className="team-performance__td team-performance__td--name">
                    <strong>{member.name}</strong>
                  </td>
                  <td className="team-performance__td">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="team-performance__td team-performance__td--right">
                    <span className={member.trend === 'up' ? 'team-performance__value--up' : member.trend === 'down' ? 'team-performance__value--down' : ''}>
                      {member.utilization}
                    </span>
                  </td>
                  <td className="team-performance__td team-performance__td--right">{member.aht}</td>
                  <td className="team-performance__td team-performance__td--right">{member.callsHandled.toLocaleString()}</td>
                  <td className="team-performance__td team-performance__td--right">{member.resolutionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
