import { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AISearchBar } from '../../components/AISearchBar/AISearchBar'
import { dashboardsData } from '../../data/homepageStats'
import './DataAnalystHomepage.css'
import '../../screens/Homepage/Homepage.css'

export function DataAnalystHomepage() {
  const dashboardTypeRef = useRef<HTMLDivElement>(null)
  const [dashboardSearch, setDashboardSearch] = useState('')
  const [dashboardTypeFilter, setDashboardTypeFilter] = useState('All type')
  const [dashboardTypeOpen, setDashboardTypeOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dashboardTypeRef.current && !dashboardTypeRef.current.contains(e.target as Node)) {
        setDashboardTypeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredDashboards = useMemo(() => {
    const q = dashboardSearch.trim().toLowerCase()
    return dashboardsData.filter(
      (d) =>
        (!q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) &&
        (dashboardTypeFilter === 'All type' || d.type === dashboardTypeFilter)
    )
  }, [dashboardSearch, dashboardTypeFilter])

  return (
    <div className="data-analyst-homepage">
      <AISearchBar defaultSkill="Intelligence" />
      <section className="homepage__dashboards">
        <header className="homepage__dashboards-header">
          <h2 className="homepage__dashboards-title">All dashboards</h2>
          <div className="homepage__dashboards-header-actions">
            <Link to="/data-warehouse" className="data-analyst-homepage__data-warehouse-btn">
              Data warehouse
            </Link>
            <button type="button" className="homepage__dashboards-view-all">
              View all
            </button>
          </div>
        </header>
        <div className="homepage__dashboards-toolbar">
          <div className="homepage__dashboards-search">
            <svg
              className="homepage__dashboards-search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
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
              <span
                className={`homepage__dashboards-type-chevron ${dashboardTypeOpen ? 'homepage__dashboards-type-chevron--open' : ''}`}
              >
                ▾
              </span>
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
