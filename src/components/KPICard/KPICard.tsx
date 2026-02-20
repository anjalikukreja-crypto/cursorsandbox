import { useRef, useEffect, useState } from 'react'
import type { StatMetric } from '../../data/executiveStats'
import './KPICard.css'

interface KPICardProps {
  metric: StatMetric
  showTrend?: boolean
  onRemove?: (id: string) => void
  onShareViaEmail?: (metric: StatMetric) => void
  variant?: 'default' | 'dashboard'
}

function EllipsisIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="5" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function KPICard({ metric, showTrend, onRemove, onShareViaEmail, variant = 'default' }: KPICardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeClass = `kpi-card__change kpi-card__change--${metric.changeDirection}`
  const hasChart = showTrend && metric.trend && metric.trend.length > 0
  const isNewFormat = metric.trendInsight !== undefined

  const changeText =
    isNewFormat && (metric.changeAbsolute || metric.changeSuffix)
      ? `${metric.change}${metric.changeAbsolute ? ` (${metric.changeAbsolute})` : ''}${metric.changeSuffix ? ` ${metric.changeSuffix}` : ''}`
      : metric.change

  const ArrowIcon = () =>
    metric.changeDirection === 'up' ? (
      <span className="kpi-card__arrow kpi-card__arrow--up" aria-hidden>↑</span>
    ) : metric.changeDirection === 'down' ? (
      <span className="kpi-card__arrow kpi-card__arrow--down" aria-hidden>↓</span>
    ) : null

  const renderTrendInsight = () => {
    if (!metric.trendInsight || !metric.trendInsightBold) return null
    const parts = metric.trendInsight.split(metric.trendInsightBold)
    return (
      <p className="kpi-card__insight">
        {parts[0]}
        <strong>{metric.trendInsightBold}</strong>
        {parts[1]}
      </p>
    )
  }

  const renderLineChart = () => {
    if (!metric.trend || metric.trend.length < 2) return null
    const values = metric.trend
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    const padding = 16
    const chartWidth = 200
    const chartHeight = 56
    const points = values.map((v, i) => {
      const x = padding + (i / (values.length - 1)) * (chartWidth - padding * 2)
      const y = padding + chartHeight - ((v - min) / range) * chartHeight
      return `${x},${y}`
    })
    const pathD = `M ${points.join(' L ')}`
    const lastPoint = points[points.length - 1]!.split(',')
    const lastX = Number(lastPoint[0])
    const lastY = Number(lastPoint[1])
    const areaPath = `M ${points[0]} L ${points.slice(1).join(' L ')} L ${lastX},${padding + chartHeight} L ${padding},${padding + chartHeight} Z`

    const formatY = (v: number) => {
      if (metric.value.startsWith('$')) return `$${v.toFixed(2)}`
      if (metric.value.endsWith('%')) return `${v.toFixed(0)}%`
      return v.toLocaleString()
    }

    return (
      <div className="kpi-card__chart">
        <div className="kpi-card__chart-y-axis">
          {formatY(min)}
        </div>
        <div className="kpi-card__chart-svg-wrap">
          <svg
            viewBox={`0 0 ${chartWidth + padding} ${chartHeight + padding * 2}`}
            className="kpi-card__chart-svg"
            preserveAspectRatio="none"
          >
            <line
              x1={padding}
              y1={padding + chartHeight}
              x2={padding}
              y2={padding}
              className="kpi-card__chart-grid"
            />
            <line
              x1={chartWidth - padding}
              y1={padding + chartHeight}
              x2={chartWidth - padding}
              y2={padding}
              className="kpi-card__chart-grid"
            />
            {variant === 'dashboard' && (
              <path d={areaPath} className="kpi-card__chart-area" fill="currentColor" />
            )}
            <path d={pathD} className="kpi-card__chart-line" fill="none" />
            <circle
              cx={lastX}
              cy={lastY}
              r="5"
              className="kpi-card__chart-endpoint"
            />
          </svg>
        </div>
        <div className="kpi-card__chart-x-labels">
          <span>Mon</span>
          <span>Sun</span>
        </div>
        <div className="kpi-card__chart-endpoint-value">
          {formatY(values[values.length - 1]!)}
        </div>
      </div>
    )
  }

  return (
    <article className={`kpi-card ${variant === 'dashboard' ? 'kpi-card--dashboard' : ''}`}>
      <header className="kpi-card__header">
        <div className="kpi-card__header-left">
          <h3 className="kpi-card__label">{metric.label}</h3>
        </div>
        <div className="kpi-card__menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="kpi-card__menu"
            aria-label="More options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <EllipsisIcon />
          </button>
          {menuOpen && (
            <ul className="kpi-card__menu-dropdown" role="menu">
              <li role="none">
                <button
                  type="button"
                  className="kpi-card__menu-item"
                  role="menuitem"
                  onClick={() => {
                    if (onShareViaEmail) {
                      onShareViaEmail(metric)
                    } else {
                      const subject = encodeURIComponent(`KPI: ${metric.label}`)
                      const body = encodeURIComponent(
                        `${metric.label}: ${metric.value}${metric.change ? ` (${metric.change})` : ''}`
                      )
                      window.location.href = `mailto:?subject=${subject}&body=${body}`
                    }
                    setMenuOpen(false)
                  }}
                >
                  Share via email
                </button>
              </li>
              <li role="none">
                <button
                  type="button"
                  className="kpi-card__menu-item kpi-card__menu-item--danger"
                  role="menuitem"
                  onClick={() => {
                    onRemove?.(metric.id)
                    setMenuOpen(false)
                  }}
                >
                  Remove KPI
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>

      <div className="kpi-card__metric">
        <span className="kpi-card__value">{metric.value}</span>
        <span className={changeClass}>
          {variant === 'dashboard' && <ArrowIcon />}
          {changeText}
        </span>
      </div>

      {metric.subtitle && !isNewFormat && (
        <span className="kpi-card__subtitle">{metric.subtitle}</span>
      )}

      {hasChart &&
        (isNewFormat ? (
          renderLineChart()
        ) : (
          <div className="kpi-card__sparkline">
            {metric.trend!.map((v, i) => {
              const max = Math.max(...metric.trend!)
              const height = max > 0 ? (v / max) * 100 : 0
              return (
                <span
                  key={i}
                  className="kpi-card__sparkline-bar"
                  style={{ height: `${height}%` }}
                />
              )
            })}
          </div>
        ))}

      {isNewFormat && variant !== 'dashboard' && renderTrendInsight()}

    </article>
  )
}
