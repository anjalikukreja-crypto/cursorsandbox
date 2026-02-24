import { useState } from 'react'
import { KPICard } from '../../components/KPICard/KPICard'
import { AISearchBar } from '../../components/AISearchBar/AISearchBar'
import {
  executiveKpis,
  cesTrendData,
  qaScoreTrendData,
  channelSplitData,
  cesComparisonData,
  recommendations,
  topTopicsByVolume,
  topTopicsPoorCes,
  agentScorecardData,
  knowledgeGapsData,
  channelVolumeData,
  alertsData,
} from '../../data/qualityIntelligence'
import './QualityIntelligence.css'

const TABS = [
  { id: 'executive', label: 'Executive Summary' },
  { id: 'interaction', label: 'Interaction Analysis' },
  { id: 'agent', label: 'My team' },
  { id: 'training', label: 'Training & Coaching' },
  { id: 'multi-channel', label: 'Multi-Channel Quality' },
] as const

type TabId = (typeof TABS)[number]['id']

function SimpleLineChart({ data, valueKey, color = '#4541FE' }: { data: { day: number }[]; valueKey: string; color?: string }) {
  const values = data.map((d) => (d as Record<string, number>)[valueKey])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const w = 280
  const h = 120
  const pad = 16
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * (w - pad * 2)
    const y = pad + (h - pad * 2) * (1 - (v - min) / range)
    return `${x},${y}`
  })
  const pathD = `M ${pts.join(' L ')}`
  const areaD = `${pathD} L ${pad + w - pad * 2},${h - pad} L ${pad},${h - pad} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="qi-chart-svg">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function QualityIntelligence() {
  const [activeTab, setActiveTab] = useState<TabId>('executive')

  return (
    <div className="quality-intelligence">
      <AISearchBar defaultSkill="Intelligence" />
      <nav className="quality-intelligence__tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`quality-intelligence__tab ${activeTab === tab.id ? 'quality-intelligence__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="quality-intelligence__content">
        {activeTab === 'executive' && (
          <div className="quality-intelligence__panel">
            <section className="qi-section">
              <h2 className="qi-section__title">Key Metrics</h2>
              <div className="qi-kpis">
                {executiveKpis.map((kpi) => (
                  <KPICard key={kpi.id} metric={kpi} showTrend variant="dashboard" />
                ))}
              </div>
            </section>
            <div className="qi-executive-layout">
              <div className="qi-executive-main">
                <div className="qi-grid qi-grid--2">
                  <section className="qi-card">
                    <h3 className="qi-card__title">CES Trend (30 days)</h3>
                    <SimpleLineChart data={cesTrendData} valueKey="ces" color="#00796B" />
                  </section>
                  <section className="qi-card">
                    <h3 className="qi-card__title">QA Score Trend</h3>
                    <SimpleLineChart data={qaScoreTrendData} valueKey="qa" />
                  </section>
                </div>
                <div className="qi-grid qi-grid--2">
                  <section className="qi-card">
                    <h3 className="qi-card__title">Channel Split</h3>
                    <div className="qi-donut-legend">
                      {channelSplitData.map((d, i) => (
                        <div key={i} className="qi-legend-item">
                          <span className="qi-legend-dot" style={{ background: d.color }} />
                          <span>{d.label}: {d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="qi-card">
                    <h3 className="qi-card__title">CES Comparison (AI vs Human)</h3>
                    <div className="qi-bar-chart">
                      {cesComparisonData.map((d, i) => (
                        <div key={i} className="qi-bar-row">
                          <span className="qi-bar-label">{d.channel}</span>
                          <div className="qi-bar-track">
                            <div className="qi-bar-fill" style={{ width: `${d.ces}%` }} />
                          </div>
                          <span className="qi-bar-value">{d.ces}%</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <section className="qi-card">
                  <h3 className="qi-card__title">Root-Cause Narrative</h3>
                  <p className="qi-narrative">
                    CES decline of 3% is primarily driven by <strong>Loan Rates</strong> and <strong>Payment Issues</strong> topics.
                    Agent handling time increased 12% in these areas. AI containment improved but fallback latency contributed to effort.
                    Recommended: targeted training on rate inquiry scripting + AI response optimization for payment FAQs.
                  </p>
                </section>
              </div>
              <aside className="qi-executive-sidebar">
                <section className="qi-card">
                  <h3 className="qi-card__title">Alerts</h3>
                  <ul className="qi-alerts-list">
                    {alertsData.map((a) => (
                      <li key={a.id} className={`qi-alert qi-alert--${a.severity.toLowerCase()}`}>
                        <span className="qi-alert__severity">{a.severity}</span>
                        <p className="qi-alert__title">{a.title}</p>
                        <span className="qi-alert__time">{a.time}</span>
                        <button type="button" className="qi-alert__action">View</button>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="qi-card">
                  <h3 className="qi-card__title">Executive Recommendations</h3>
                  <ul className="qi-rec-list">
                    {recommendations.map((r) => (
                      <li key={r.id} className="qi-rec-item">
                        <span className={`qi-rec-impact qi-rec-impact--${r.impact.toLowerCase()}`}>{r.impact}</span>
                        <p>{r.title}</p>
                        <button type="button" className="qi-rec-assign">Assign</button>
                      </li>
                    ))}
                  </ul>
                  <div className="qi-alerts-recs__metrics">
                    <div className="qi-gauge-wrap">
                      <div className="qi-gauge">
                        <div className="qi-gauge__fill" style={{ width: '62%' }} />
                      </div>
                      <p className="qi-gauge__label">62% of recommendations applied</p>
                    </div>
                    <div className="qi-kpi-large qi-kpi-large--inline">
                      <span className="qi-kpi-large__value qi-kpi-large__value--success">$89K</span>
                      <span className="qi-kpi-large__label">Saved from applied recommendations</span>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        )}

        {activeTab === 'interaction' && (
          <div className="quality-intelligence__panel">
            <section className="qi-card">
              <h3 className="qi-card__title">Top Topics by Volume</h3>
              <div className="qi-table-wrap">
                <table className="qi-table">
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th className="qi-th--right">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTopicsByVolume.map((r, i) => (
                      <tr key={i}>
                        <td>{r.topic}</td>
                        <td className="qi-td--right">{r.volume.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="qi-card">
              <h3 className="qi-card__title">Top Topics by Poor CES (Frustration Hotspots)</h3>
              <div className="qi-bar-chart">
                {topTopicsPoorCes.map((d, i) => (
                  <div key={i} className="qi-bar-row">
                    <span className="qi-bar-label">{d.topic}</span>
                    <div className="qi-bar-track">
                      <div className="qi-bar-fill qi-bar-fill--alert" style={{ width: `${d.ces}%` }} />
                    </div>
                    <span className="qi-bar-value qi-bar-value--alert">{d.ces}%</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="qi-card qi-card--wide">
              <h3 className="qi-card__title">Interaction Flag Table</h3>
              <div className="qi-table-wrap">
                <table className="qi-table">
                  <thead>
                    <tr>
                      <th>Interaction ID</th>
                      <th>Agent</th>
                      <th>CES</th>
                      <th>Flags</th>
                      <th>Transcript</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>INT-2847</td><td>E. Watson</td><td>52%</td><td>Accuracy, Tone</td><td><button type="button" className="qi-link">View</button></td></tr>
                    <tr><td>INT-2912</td><td>M. Torres</td><td>58%</td><td>Compliance</td><td><button type="button" className="qi-link">View</button></td></tr>
                    <tr><td>INT-2956</td><td>L. Martinez</td><td>61%</td><td>Resolution</td><td><button type="button" className="qi-link">View</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'agent' && (
          <div className="quality-intelligence__panel">
            <section className="qi-card qi-card--wide">
              <h3 className="qi-card__title">Agent Scorecard</h3>
              <div className="qi-table-wrap">
                <table className="qi-table">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>QA</th>
                      <th>CES</th>
                      <th>Compliance %</th>
                      <th>AHT</th>
                      <th>Flags</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentScorecardData.map((a) => (
                      <tr key={a.id}>
                        <td><strong>{a.name}</strong></td>
                        <td>{a.qa}%</td>
                        <td>{a.ces}%</td>
                        <td>{a.compliance}%</td>
                        <td>{a.aht}</td>
                        <td>{a.flags}</td>
                        <td><button type="button" className="qi-link">Profile</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="qi-card">
              <h3 className="qi-card__title">Top vs Bottom Agents</h3>
              <div className="qi-ranking">
                <div className="qi-ranking__top">
                  <span className="qi-ranking__label">Top</span>
                  <span className="qi-ranking__name">Sarah Chen</span>
                  <span className="qi-ranking__score">94</span>
                </div>
                <div className="qi-ranking__bottom">
                  <span className="qi-ranking__label">Bottom</span>
                  <span className="qi-ranking__name">Emily Watson</span>
                  <span className="qi-ranking__score">82</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="quality-intelligence__panel">
            <section className="qi-card">
              <h3 className="qi-card__title">Knowledge Gap (Topics Agents Fail At)</h3>
              <div className="qi-bar-chart qi-bar-chart--vertical">
                {knowledgeGapsData.map((d, i) => {
                  const maxCount = Math.max(...knowledgeGapsData.map((x) => x.count))
                  const pct = maxCount ? (d.count / maxCount) * 100 : 0
                  return (
                    <div key={i} className="qi-bar-col">
                      <div className="qi-bar-col-track">
                        <div className="qi-bar-col-fill" style={{ height: `${pct}%` }} />
                      </div>
                      <span className="qi-bar-col-value">{d.count}</span>
                      <span className="qi-bar-col-label">{d.topic}</span>
                    </div>
                  )
                })}
              </div>
            </section>
            <section className="qi-card qi-card--wide">
              <h3 className="qi-card__title">Recommended Modules</h3>
              <div className="qi-table-wrap">
                <table className="qi-table">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Assigned Agents</th>
                      <th>Status</th>
                      <th>Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Mortgage Refi Training</td><td>12</td><td><span className="qi-status qi-status--pending">Pending</span></td><td>Mar 1</td></tr>
                    <tr><td>Overdraft Policy Update</td><td>8</td><td><span className="qi-status qi-status--inprogress">In Progress</span></td><td>Feb 28</td></tr>
                    <tr><td>ACH Dispute Handling</td><td>5</td><td><span className="qi-status qi-status--done">Complete</span></td><td>Feb 20</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'multi-channel' && (
          <div className="quality-intelligence__panel">
            <section className="qi-card qi-card--wide">
              <h3 className="qi-card__title">Volume Split by Channel (Human vs AI vs Self-Serve)</h3>
              <div className="qi-table-wrap">
                <table className="qi-table">
                  <thead>
                    <tr>
                      <th>Channel</th>
                      <th>Human</th>
                      <th>AI</th>
                      <th>Self-Serve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelVolumeData.map((d, i) => (
                      <tr key={i}>
                        <td>{d.channel}</td>
                        <td>{d.human.toLocaleString()}</td>
                        <td>{d.ai.toLocaleString()}</td>
                        <td>{d.self.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="qi-grid qi-grid--2">
              <section className="qi-card">
                <h3 className="qi-card__title">AI Containment Rate</h3>
                <div className="qi-kpi-large">
                  <span className="qi-kpi-large__value">68%</span>
                  <span className="qi-kpi-large__label">AI handled without human transfer</span>
                </div>
              </section>
              <section className="qi-card">
                <h3 className="qi-card__title">Resolution Rate</h3>
                <div className="qi-kpi-large">
                  <span className="qi-kpi-large__value">89%</span>
                  <span className="qi-kpi-large__label">Resolved vs Escalated</span>
                </div>
              </section>
            </section>
          </div>
        )}

      </div>

      <section className="quality-intelligence__wip">
        <h2 className="quality-intelligence__wip-heading">Quality Intelligence is a work in progress</h2>
        <div className="quality-intelligence__wip-illustration" aria-hidden>
          <svg
            className="quality-intelligence__wip-svg"
            viewBox="0 0 260 200"
            role="img"
          >
            <defs>
              <linearGradient id="qiWipGround" x1="0" y1="1" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2F2FF" />
                <stop offset="100%" stopColor="#E4E4F5" />
              </linearGradient>
            </defs>
            <ellipse cx="130" cy="180" rx="110" ry="14" fill="url(#qiWipGround)" />

            <rect x="40" y="70" width="180" height="16" rx="4" fill="#E4E4F5" />
            <rect x="40" y="70" width="36" height="16" rx="4" fill="#C5C4F0" />
            <rect x="88" y="70" width="36" height="16" rx="4" fill="#C5C4F0" />
            <rect x="136" y="70" width="36" height="16" rx="4" fill="#C5C4F0" />
            <rect x="184" y="70" width="36" height="16" rx="4" fill="#C5C4F0" />

            <rect x="56" y="44" width="10" height="40" rx="4" fill="#E4E4F5" />
            <rect x="194" y="44" width="10" height="40" rx="4" fill="#E4E4F5" />

            <polygon points="122,140 138,140 154,180 106,180" fill="#DDDDF5" />
            <polygon points="122,140 138,140 146,160 114,160" fill="#BEBDEB" />

            <circle cx="67" cy="42" r="2" fill="#DDDDF5" />
            <circle cx="200" cy="40" r="2.5" fill="#DDDDF5" />
            <circle cx="180" cy="32" r="1.8" fill="#DDDDF5" />
          </svg>
        </div>
      </section>
    </div>
  )
}
