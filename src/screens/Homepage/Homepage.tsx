import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { KPICard } from '../../components/KPICard/KPICard'
import { AISearchBar } from '../../components/AISearchBar/AISearchBar'
import { homepageStats, dashboardsData } from '../../data/homepageStats'
import type { StatMetric } from '../../data/executiveStats'
import './Homepage.css'

const PERIOD_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 60 days'] as const
type PeriodOption = (typeof PERIOD_OPTIONS)[number]

interface HomepageProps {
  /** When false, hides the Smart insights section. Default: true */
  showSmartInsights?: boolean
  /** Title for the dashboards section. Default: "My frequently used dashboards" */
  dashboardsTitle?: string
}

export function Homepage({ showSmartInsights = true, dashboardsTitle = 'My frequently used dashboards' }: HomepageProps) {
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('Last 7 days')
  const [visibleKPIs, setVisibleKPIs] = useState<StatMetric[]>(homepageStats)
  const periodDropdownRef = useRef<HTMLDivElement>(null)
  const dashboardTypeRef = useRef<HTMLDivElement>(null)

  const handleRemoveKPI = useCallback((id: string) => {
    setVisibleKPIs((prev) => prev.filter((s) => s.id !== id))
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (periodDropdownRef.current && !periodDropdownRef.current.contains(e.target as Node)) {
        setPeriodDropdownOpen(false)
      }
      if (dashboardTypeRef.current && !dashboardTypeRef.current.contains(e.target as Node)) {
        setDashboardTypeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [dashboardSearch, setDashboardSearch] = useState('')
  const [dashboardTypeFilter, setDashboardTypeFilter] = useState('All type')
  const [dashboardTypeOpen, setDashboardTypeOpen] = useState(false)

  const filteredDashboards = useMemo(() => {
    const q = dashboardSearch.trim().toLowerCase()
    return dashboardsData.filter(
      (d) =>
        (!q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) &&
        (dashboardTypeFilter === 'All type' || d.type === dashboardTypeFilter)
    )
  }, [dashboardSearch, dashboardTypeFilter])

  return (
    <div className={`homepage ${!showSmartInsights ? 'homepage--no-insights' : ''}`}>
      <AISearchBar defaultSkill="Intelligence" />

      <section className="homepage__dashboard">
        <div className="homepage__dashboard-col homepage__dashboard-col--kpis">
          <header className="homepage__kpis-header">
            <div className="homepage__kpis-header-top">
              <h2 className="homepage__kpis-title">My KPIs</h2>
              <span className="homepage__kpis-updated">Last updated yesterday</span>
            </div>
            <div className="homepage__kpis-actions">
            <div className="homepage__date-dropdown-wrap" ref={periodDropdownRef}>
            <button
              type="button"
              className="homepage__date-dropdown"
              onClick={() => setPeriodDropdownOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={periodDropdownOpen}
            >
              <span className="homepage__date-icon" aria-hidden>📅</span>
              {selectedPeriod}
              <span className={`homepage__date-chevron ${periodDropdownOpen ? 'homepage__date-chevron--open' : ''}`}>▾</span>
            </button>
            {periodDropdownOpen && (
              <ul className="homepage__date-menu" role="listbox" aria-label="Period options">
                {PERIOD_OPTIONS.map((opt) => (
                  <li key={opt} role="option">
                    <button
                      type="button"
                      className={`homepage__date-menu-item ${selectedPeriod === opt ? 'homepage__date-menu-item--active' : ''}`}
                      onClick={() => {
                        setSelectedPeriod(opt)
                        setPeriodDropdownOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            </div>
            <button type="button" className="homepage__view-details-btn">
              View details
            </button>
          </div>
        </header>

        <div className="homepage__kpis-grid">
          {visibleKPIs.map((stat) => (
            <KPICard key={stat.id} metric={stat} showTrend onRemove={handleRemoveKPI} variant="dashboard" />
          ))}
        </div>
        </div>

        {showSmartInsights && (
        <aside className="homepage__dashboard-col homepage__dashboard-col--insights">
          <header className="homepage__insights-header">
            <h2 className="homepage__insights-title">Smart insights</h2>
            <button type="button" className="homepage__insights-view-all">View all</button>
          </header>
          <div className="homepage__insights-list">
            <div className="homepage__insights-card">
              <h3 className="homepage__insights-card-title">Conversation metrics</h3>
              <div className="homepage__insights-metrics">
                <div className="homepage__insights-metric">
                  <span className="homepage__insights-metric-label">Total AI Resolved</span>
                  <span className="homepage__insights-metric-value">68%</span>
                </div>
                <div className="homepage__insights-metric">
                  <span className="homepage__insights-metric-label">Resolution Trend</span>
                  <span className="homepage__insights-metric-value homepage__insights-metric-value--down">-5.2%</span>
                </div>
              </div>
              <p className="homepage__insights-desc">
                AI resolution rate reflects conversations fully handled without agent escalation.
              </p>
            </div>
            <div className="homepage__insights-card">
              <h3 className="homepage__insights-card-title">Agent performance</h3>
              <div className="homepage__insights-metrics">
                <div className="homepage__insights-metric">
                  <span className="homepage__insights-metric-label">Avg AHT</span>
                  <span className="homepage__insights-metric-value">4m 32s</span>
                </div>
                <div className="homepage__insights-metric">
                  <span className="homepage__insights-metric-label">Utilization</span>
                  <span className="homepage__insights-metric-value">82%</span>
                </div>
              </div>
              <p className="homepage__insights-desc">
                Average handle time and utilization indicate agent efficiency and workload distribution.
              </p>
            </div>
          </div>
        </aside>
        )}
      </section>

      <section className="homepage__dashboards">
        <header className="homepage__dashboards-header">
          <h2 className="homepage__dashboards-title">{dashboardsTitle}</h2>
          <button type="button" className="homepage__dashboards-view-all">View all</button>
        </header>
        <div className="homepage__dashboards-toolbar">
          <div className="homepage__dashboards-search">
            <svg className="homepage__dashboards-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              className="homepage__dashboards-search-input"
              placeholder="Search by dashboard name"
              value={dashboardSearch}
              onChange={(e) => setDashboardSearch(e.target.value)}
              aria-label="Search by dashboard name"
            />
          </div>
          <div className="homepage__dashboards-type" ref={dashboardTypeRef}>
            <button
              type="button"
              className="homepage__dashboards-type-btn"
              onClick={() => setDashboardTypeOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dashboardTypeOpen}
            >
              {dashboardTypeFilter}
              <span className={`homepage__dashboards-type-chevron ${dashboardTypeOpen ? 'homepage__dashboards-type-chevron--open' : ''}`}>▾</span>
            </button>
            {dashboardTypeOpen && (
              <ul className="homepage__dashboards-type-menu" role="listbox">
                <li role="option">
                  <button
                    type="button"
                    className={`homepage__dashboards-type-item ${dashboardTypeFilter === 'All type' ? 'homepage__dashboards-type-item--active' : ''}`}
                    onClick={() => {
                      setDashboardTypeFilter('All type')
                      setDashboardTypeOpen(false)
                    }}
                  >
                    All type
                  </button>
                </li>
                <li role="option">
                  <button
                    type="button"
                    className={`homepage__dashboards-type-item ${dashboardTypeFilter === 'Standard' ? 'homepage__dashboards-type-item--active' : ''}`}
                    onClick={() => {
                      setDashboardTypeFilter('Standard')
                      setDashboardTypeOpen(false)
                    }}
                  >
                    Standard
                  </button>
                </li>
                <li role="option">
                  <button
                    type="button"
                    className={`homepage__dashboards-type-item ${dashboardTypeFilter === 'Custom' ? 'homepage__dashboards-type-item--active' : ''}`}
                    onClick={() => {
                      setDashboardTypeFilter('Custom')
                      setDashboardTypeOpen(false)
                    }}
                  >
                    Custom
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="homepage__dashboards-table-wrap">
          <table className="homepage__dashboards-table">
            <thead>
              <tr>
                <th className="homepage__dashboards-th homepage__dashboards-th--checkbox">
                  <input type="checkbox" aria-label="Select all" />
                </th>
                <th className="homepage__dashboards-th">Dashboard name</th>
                <th className="homepage__dashboards-th">Type</th>
                <th className="homepage__dashboards-th">Last updated date</th>
                <th className="homepage__dashboards-th homepage__dashboards-th--actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDashboards.map((dashboard) => (
                <tr key={dashboard.id} className="homepage__dashboards-row">
                  <td className="homepage__dashboards-td homepage__dashboards-td--checkbox">
                    <input type="checkbox" aria-label={`Select ${dashboard.name}`} />
                  </td>
                  <td className="homepage__dashboards-td homepage__dashboards-td--name">
                    <div>
                      <strong className="homepage__dashboards-name">{dashboard.name}</strong>
                      <p className="homepage__dashboards-desc">{dashboard.description}</p>
                    </div>
                  </td>
                  <td className="homepage__dashboards-td">
                    <span className="homepage__dashboards-tag">{dashboard.type}</span>
                  </td>
                  <td className="homepage__dashboards-td">{dashboard.lastUpdated}</td>
                  <td className="homepage__dashboards-td homepage__dashboards-td--actions">
                    <div className="homepage__dashboards-actions">
                      <button type="button" className="homepage__dashboards-action-btn" aria-label="Favorite">
                        ♡
                      </button>
                      <button type="button" className="homepage__dashboards-action-btn" aria-label="Share">
                        ↗
                      </button>
                      <button type="button" className="homepage__dashboards-view-btn">
                        View dashboard
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
