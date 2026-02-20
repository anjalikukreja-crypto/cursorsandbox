import { useState, useMemo } from 'react'
import { AISearchBar } from '../../components/AISearchBar/AISearchBar'
import { generateCreditUnionReports } from '../../data/creditUnionReports'
import './Reports.css'

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100]
const ALL_REPORTS = generateCreditUnionReports()

export function Reports() {
  const [search, setSearch] = useState('')
  const [dateRange] = useState('2/12/2021 - 2/28/2021')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredReports = useMemo(() => {
    if (!search.trim()) return ALL_REPORTS
    const q = search.toLowerCase()
    return ALL_REPORTS.filter(
      (r) =>
        r.reportName.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.contactEmail.toLowerCase().includes(q)
    )
  }, [search])

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage) || 1
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages)
  const startIdx = (clampedPage - 1) * itemsPerPage
  const pageReports = filteredReports.slice(startIdx, startIdx + itemsPerPage)

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === pageReports.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pageReports.map((r) => r.id)))
    }
  }

  const allSelected = pageReports.length > 0 && selected.size === pageReports.length

  return (
    <div className="reports-page">
      <AISearchBar defaultSkill="Intelligence" />
      <div className="reports-toolbar">
        <div className="reports-search-wrap">
          <svg className="reports-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            className="reports-search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <div className="reports-controls">
          <button
            type="button"
            className="reports-export-btn"
            disabled={selected.size === 0}
            aria-label="Export selected reports"
          >
            Export
          </button>
          <button type="button" className="reports-date-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {dateRange}
          </button>
          <button type="button" className="reports-icon-btn" aria-label="List view">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
          </button>
          <button type="button" className="reports-icon-btn" aria-label="Calendar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          </button>
          <button type="button" className="reports-icon-btn" aria-label="User">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </button>
          <button type="button" className="reports-icon-btn" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </div>

      <div className="reports-table-wrap">
        <table className="reports-table">
          <thead className="reports-thead">
            <tr>
              <th className="reports-th reports-th--cb">
                <input
                  type="checkbox"
                  className="reports-checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th className="reports-th">
                <span className="reports-th__content">
                  Report Name
                  <svg className="reports-sort-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
                </span>
              </th>
              <th className="reports-th">
                <span className="reports-th__content">
                  Auto Generate
                  <svg className="reports-sort-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
                </span>
              </th>
              <th className="reports-th">
                <span className="reports-th__content">
                  Scheduled
                  <svg className="reports-sort-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
                </span>
              </th>
              <th className="reports-th">
                <span className="reports-th__content">
                  Category
                  <svg className="reports-sort-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
                </span>
              </th>
              <th className="reports-th">
                <span className="reports-th__content">
                  Status
                  <svg className="reports-sort-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
                </span>
              </th>
              <th className="reports-th">
                <span className="reports-th__content">
                  Contact Email
                  <svg className="reports-sort-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
                </span>
              </th>
              <th className="reports-th reports-th--actions">
                <span className="reports-th__content">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageReports.map((report) => (
              <tr key={report.id} className="reports-row">
                <td className="reports-td reports-td--cb">
                  <input
                    type="checkbox"
                    className="reports-checkbox"
                    checked={selected.has(report.id)}
                    onChange={() => toggleSelect(report.id)}
                    aria-label={`Select ${report.reportName}`}
                  />
                </td>
                <td className="reports-td reports-td--name" title={report.reportName}>
                  {report.reportName.length > 45 ? `${report.reportName.slice(0, 45)}...` : report.reportName}
                </td>
                <td className="reports-td">
                  <label className="reports-toggle">
                    <input type="checkbox" checked={report.autoGenerate} readOnly className="reports-toggle__input" />
                    <span className="reports-toggle__track">
                      <span className="reports-toggle__thumb" />
                    </span>
                    <span className="reports-toggle__label">On</span>
                  </label>
                </td>
                <td className="reports-td">
                  <label className="reports-check-label">
                    <input type="checkbox" checked={report.scheduled} readOnly className="reports-checkbox" />
                    <span>On</span>
                  </label>
                </td>
                <td className="reports-td">
                  <button type="button" className="reports-label-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Label
                  </button>
                </td>
                <td className="reports-td">
                  <span className="reports-status-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    {report.status}
                    <button type="button" className="reports-tag-remove" aria-label="Remove">×</button>
                  </span>
                </td>
                <td className="reports-td">{report.contactEmail}</td>
                <td className="reports-td reports-td--actions">
                  <div className="reports-action-btns">
                    <button type="button" className="reports-action-btn" aria-label="More options">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>
                    <button type="button" className="reports-action-btn" aria-label="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button type="button" className="reports-action-btn" aria-label="Refresh">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reports-pagination">
        <label className="reports-per-page">
          Items per page
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="reports-per-page__select"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        {totalPages > 10 && (
          <label className="reports-goto">
            Go to
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder="e.g. 102"
              className="reports-goto__input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt((e.target as HTMLInputElement).value, 10)
                  if (!isNaN(val)) setCurrentPage(Math.min(Math.max(1, val), totalPages))
                }
              }}
            />
          </label>
        )}
        <div className="reports-pagination__nav">
          <button
            type="button"
            className="reports-pagination__btn"
            disabled={clampedPage <= 1}
            onClick={() => setCurrentPage(clampedPage - 1)}
          >
            &lt; Previous
          </button>
          <div className="reports-pagination__nums">
            {(() => {
              const nums: (number | 'ellipsis')[] = []
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) nums.push(i)
              } else {
                nums.push(1)
                if (clampedPage <= 4) {
                  nums.push('ellipsis', 3, 4, 5, 'ellipsis')
                } else if (clampedPage >= totalPages - 2) {
                  const wStart = Math.max(2, totalPages - 10)
                  const wEnd = Math.min(totalPages - 1, wStart + 2)
                  nums.push('ellipsis')
                  for (let p = wStart; p <= wEnd; p++) nums.push(p)
                  nums.push('ellipsis')
                } else {
                  nums.push('ellipsis', clampedPage - 1, clampedPage, clampedPage + 1, 'ellipsis')
                }
                const lastNum = nums.filter((n): n is number => n !== 'ellipsis').pop()
                if (lastNum !== totalPages) nums.push(totalPages)
              }
              return nums.map((item, i) =>
                item === 'ellipsis' ? (
                  <span key={`e-${i}`} className="reports-pagination__ellipsis">...</span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`reports-pagination__num ${item === clampedPage ? 'reports-pagination__num--current' : ''}`}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </button>
                )
              )
            })()}
          </div>
          <button
            type="button"
            className="reports-pagination__btn"
            disabled={clampedPage >= totalPages}
            onClick={() => setCurrentPage(clampedPage + 1)}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
