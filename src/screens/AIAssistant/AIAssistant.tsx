import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { UpgradeProModal } from '../../components/UpgradeProModal/UpgradeProModal'
import './AIAssistant.css'

/** Sample chart data: Unique Count User Id by Weekly Date Created (increasing trend) */
const CHART_DATA = [
  { x: '01/01/2020', y: 3 },
  { x: '04/01/2020', y: 12 },
  { x: '07/01/2020', y: 99 },
  { x: '10/01/2020', y: 113 },
  { x: '01/01/2021', y: 245 },
  { x: '04/01/2021', y: 412 },
  { x: '07/01/2021', y: 680 },
  { x: '10/01/2021', y: 890 },
  { x: '01/01/2022', y: 1230 },
  { x: '04/01/2022', y: 1560 },
  { x: '07/01/2022', y: 1890 },
  { x: '10/01/2022', y: 2390 },
  { x: '01/01/2023', y: 3390 },
  { x: '04/01/2023', y: 3450 },
  { x: '07/01/2023', y: 3760 },
  { x: '10/01/2023', y: 4070 },
  { x: '01/01/2024', y: 4380 },
  { x: '04/01/2024', y: 4750 },
  { x: '07/01/2024', y: 5040 },
  { x: '10/01/2024', y: 5370 },
  { x: '01/01/2025', y: 4990 },
]

function formatTimestamp() {
  const d = new Date()
  return d.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function AIAssistant() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') || 'Show the weekly active users'
  const [query, setQuery] = useState(initialQuery)
  const [newQuestion, setNewQuestion] = useState('')
  const [chartView, setChartView] = useState<'line' | 'table'>('line')
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const [upgradeBannerDismissed, setUpgradeBannerDismissed] = useState(false)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)

  const handleSend = () => {
    if (!newQuestion.trim()) return
    setQuery(newQuestion)
    setNewQuestion('')
    setFeedback(null)
  }

  const handleReset = () => {
    setQuery(initialQuery)
    setNewQuestion('')
    setFeedback(null)
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleNewChat = () => {
    navigate('/homepage')
  }

  const clarifyText =
    query.toLowerCase().includes('weekly') && query.toLowerCase().includes('user')
      ? 'You want to know the number of active users for each week.'
      : `You want to know: "${query}"`

  const minY = 0
  const maxY = 6000
  const chartHeight = 180
  const chartWidth = 560
  const padding = { top: 16, right: 16, bottom: 32, left: 44 }

  const drawHeight = chartHeight - padding.top - padding.bottom
  const scaleY = (v: number) =>
    padding.top + drawHeight * (1 - (v - minY) / (maxY - minY))

  const scaleX = (i: number) =>
    padding.left + (i / Math.max(CHART_DATA.length - 1, 1)) * (chartWidth - padding.left - padding.right)

  const pathData = CHART_DATA.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(p.y)}`
  ).join(' ')

  const areaPath = `${pathData} L ${scaleX(CHART_DATA.length - 1)} ${chartHeight - padding.bottom} L ${scaleX(0)} ${chartHeight - padding.bottom} Z`

  const suggestedPrompts = [
    'Which Product Type decreased the most?',
    'Which Subcategory decreased the most?',
    'Which Category decreased the most?',
  ]

  const handlePromptClick = (prompt: string) => {
    setNewQuestion(prompt)
  }

  return (
    <div className="ai-assistant">
      <header className="ai-assistant__header">
        <button type="button" className="ai-assistant__back" onClick={handleBack} aria-label="Go back">
          <span className="ai-assistant__back-arrow" aria-hidden>←</span>
          Back
        </button>
        <div className="ai-assistant__header-actions">
          <button type="button" className="ai-assistant__header-btn">
            Show conversation summary
          </button>
          <button type="button" className="ai-assistant__header-btn" onClick={handleNewChat}>
            <span className="ai-assistant__header-btn-icon" aria-hidden>+</span>
            New chat
          </button>
        </div>
      </header>

      {!upgradeBannerDismissed && (
        <div className="ai-assistant__upgrade-banner" role="alert">
          <div className="ai-assistant__upgrade-banner-icon" aria-hidden>
            <span>!</span>
          </div>
          <p className="ai-assistant__upgrade-banner-text">
            Upgrade to a pro version, since you have reached the maximum limit of free AI prompts.
          </p>
          <button
            type="button"
            className="ai-assistant__upgrade-banner-btn"
            onClick={() => setUpgradeModalOpen(true)}
          >
            Upgrade Now
          </button>
          <button
            type="button"
            className="ai-assistant__upgrade-banner-close"
            onClick={() => setUpgradeBannerDismissed(true)}
            aria-label="Dismiss notification"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="ai-assistant__conversation">
        {/* User message */}
        <div className="ai-assistant__message">
          <div className="ai-assistant__avatar ai-assistant__avatar--user">A</div>
          <div className="ai-assistant__message-body">
            <div className="ai-assistant__message-meta">
              <span className="ai-assistant__message-author">Anjali Kukreja</span>
              <span className="ai-assistant__message-time">{formatTimestamp()}</span>
            </div>
            <div className="ai-assistant__message-content">
              <p>{query}</p>
              <div className="ai-assistant__message-actions">
                <button type="button" className="ai-assistant__icon-btn" aria-label="Edit">✎</button>
                <button type="button" className="ai-assistant__icon-btn" aria-label="Delete">🗑</button>
              </div>
            </div>
          </div>
        </div>

        {/* AI response */}
        <div className="ai-assistant__message ai-assistant__message--ai">
          <div className="ai-assistant__avatar ai-assistant__avatar--ai">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" />
              <path d="M7 14l4-4 4 4 5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="ai-assistant__message-body">
            <div className="ai-assistant__message-meta">
              <span className="ai-assistant__message-author">AI Assistant</span>
              <span className="ai-assistant__message-time">{formatTimestamp()}</span>
            </div>
            <p className="ai-assistant__clarify">{clarifyText}</p>

            <div className="ai-assistant__chart-card">
              <div className="ai-assistant__chart-header">
                <h3 className="ai-assistant__chart-title">Unique Count User Id by Weekly Date Created</h3>
                <div className="ai-assistant__chart-controls">
                  <button
                    type="button"
                    className={`ai-assistant__chart-view-btn ${chartView === 'table' ? 'ai-assistant__chart-view-btn--active' : ''}`}
                    onClick={() => setChartView('table')}
                    aria-label="Table view"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`ai-assistant__chart-view-btn ${chartView === 'line' ? 'ai-assistant__chart-view-btn--active' : ''}`}
                    onClick={() => setChartView('line')}
                    aria-label="Line chart view"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 17l6-6 4 4 8-12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className="ai-assistant__chart-view-btn" aria-label="Expand">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3m0 0V8" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ai-assistant__chart-chips">
                <span className="ai-assistant__chip ai-assistant__chip--green">unique count User Id</span>
                <span className="ai-assistant__chip ai-assistant__chip--purple">weekly</span>
              </div>

              {chartView === 'line' ? (
                <div className="ai-assistant__chart-wrapper">
                  <svg
                    className="ai-assistant__chart-svg"
                    width={chartWidth}
                    height={chartHeight}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    aria-label="Line chart: Unique Count User Id by Weekly Date Created"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5B4BCC" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#5B4BCC" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={areaPath} fill="url(#chartGradient)" />
                    <path d={pathData} fill="none" stroke="#5B4BCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {CHART_DATA.map((p, i) => (
                      <circle key={i} cx={scaleX(i)} cy={scaleY(p.y)} r="4" fill="#5B4BCC" />
                    ))}
                    <line x1={padding.left} y1={padding.top} x2={padding.left} y2={chartHeight - padding.bottom} stroke="#D9D9DE" strokeWidth="1" />
                    <line x1={padding.left} y1={chartHeight - padding.bottom} x2={chartWidth - padding.right} y2={chartHeight - padding.bottom} stroke="#D9D9DE" strokeWidth="1" />
                    {[0, 2000, 4000, 6000].map((v, i) => (
                      <text key={i} x={padding.left - 8} y={scaleY(v) + 4} fontSize="11" fill="#5E5E6B" textAnchor="end">
                        {v >= 1000 ? `${v / 1000}K` : v}
                      </text>
                    ))}
                    {[0, 5, 10, 15, 20, 21].filter((i) => i < CHART_DATA.length).map((i) => (
                      <text key={i} x={scaleX(i)} y={chartHeight - 8} fontSize="10" fill="#5E5E6B" textAnchor="middle">
                        {CHART_DATA[i].x}
                      </text>
                    ))}
                  </svg>
                </div>
              ) : (
                <div className="ai-assistant__table-wrap">
                  <table className="ai-assistant__table">
                    <thead>
                      <tr>
                        <th>Weekly Date Created</th>
                        <th>Unique Count User Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CHART_DATA.slice(-10).map((row, i) => (
                        <tr key={i}>
                          <td>{row.x}</td>
                          <td>{row.y >= 1000 ? `${(row.y / 1000).toFixed(2)}K` : row.y}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="ai-assistant__chart-footer">
                <div className="ai-assistant__chart-actions">
                  <button type="button" className="ai-assistant__chart-action">
                    <span aria-hidden>📌</span> Pin
                  </button>
                  <button type="button" className="ai-assistant__chart-action">
                    <span aria-hidden>+</span> Save
                  </button>
                  <button type="button" className="ai-assistant__chart-action">
                    <span aria-hidden>↓</span> Download
                  </button>
                  <button type="button" className="ai-assistant__chart-action">
                    <span aria-hidden>✎</span> Edit
                  </button>
                  <button type="button" className="ai-assistant__chart-action">
                    <span aria-hidden>+</span> Add to coaching
                  </button>
                </div>
                <div className="ai-assistant__feedback">
                  <span className="ai-assistant__feedback-label">Is this useful?</span>
                  <button
                    type="button"
                    className={`ai-assistant__feedback-btn ${feedback === 'up' ? 'ai-assistant__feedback-btn--active' : ''}`}
                    onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                    aria-label="Yes, useful"
                  >
                    👍
                  </button>
                  <button
                    type="button"
                    className={`ai-assistant__feedback-btn ${feedback === 'down' ? 'ai-assistant__feedback-btn--active' : ''}`}
                    onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                    aria-label="No, not useful"
                  >
                    👎
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="ai-assistant__suggested-prompts">
          {suggestedPrompts.map((prompt, i) => (
            <li key={i}>
              <button
                type="button"
                className="ai-assistant__suggested-prompt"
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer className="ai-assistant__input-area">
        <div className="ai-assistant__input-top">
          <div className="ai-assistant__model-selector">
            <span className="ai-assistant__model-icon" aria-hidden>⊞</span>
            <span className="ai-assistant__model-name">dn_interaction_insights_colab_model</span>
            <span className="ai-assistant__model-chevron">▾</span>
            <a href="#" className="ai-assistant__preview-link">Preview data</a>
          </div>
          <button type="button" className="ai-assistant__reset-btn" onClick={handleReset}>
            <span aria-hidden>↻</span> Reset
          </button>
        </div>
        <div className="ai-assistant__input-wrapper">
          <div className="ai-assistant__avatar ai-assistant__avatar--user ai-assistant__avatar--sm">A</div>
          <input
            type="text"
            className="ai-assistant__input"
            placeholder="Enter your question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            aria-label="Enter your question"
          />
          <button type="button" className="ai-assistant__send-btn" onClick={handleSend} aria-label="Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <p className="ai-assistant__disclaimer">
          AI Assistant should be reviewed to ensure they align with your expectations.{' '}
          <a href="#">Learn more</a>
        </p>
      </footer>

      <UpgradeProModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onInterested={() => setUpgradeModalOpen(false)}
        title="Upgrade to get full access to our intelligent AI assistant"
        bodyText="Upgrade to Eltropy Pro for unlimited AI prompts and full access to our intelligent AI assistant. Get in touch with your Eltropy account manager to discover how Pro can help you."
      />
    </div>
  )
}
