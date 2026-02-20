import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Transition.css'

const TABS = [
  { id: 'interaction-list', label: 'Interaction List' },
  { id: 'observatory', label: 'Observatory' },
  { id: 'external-api', label: 'External Api Observatory' },
  { id: 'external-interactions', label: 'External Interactions' },
  { id: 'analytics', label: 'Insights 2.0' },
] as const

const FILTER_OPTIONS = [
  { id: 'message', label: 'Message Insights', selected: true },
  { id: 'interaction', label: 'Interaction Insights', selected: false },
  { id: 'collection', label: 'Collection Insights', selected: false },
  { id: 'ai-agents', label: 'AI Agents Insights', selected: false },
  { id: 'appointment-lobby', label: 'Appointment & Lobby Management', selected: false },
  { id: 'appointment', label: 'Appointment', selected: false },
]

const INSIGHT_CARDS = [
  { id: '1', title: 'Message Insights', created: '2023-02-19', updated: '2026-01-14' },
  { id: '2', title: 'Test Dashboard V6 (Previously called Test Dashboard V5)', created: '2025-07-04', updated: '2025-07-07' },
]

export function Transition() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('analytics')
  const [selectedFilter, setSelectedFilter] = useState('message')
  const [notificationDismissed, setNotificationDismissed] = useState(false)

  return (
    <div className="transition-page">
      {!notificationDismissed && (
        <div className="transition-notification">
          <div className="transition-notification__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="transition-notification__content">
            <h3 className="transition-notification__heading">The insights is getting a refresh</h3>
            <p className="transition-notification__text">
              You'll see an improved analytics powered by AI providing real time insights.
            </p>
          </div>
          <div className="transition-notification__actions">
            <button
              type="button"
              className="transition-notification__btn"
              onClick={() => navigate('/transition/business-intelligence')}
            >
              Try now
            </button>
            <button
              type="button"
              className="transition-notification__close"
              onClick={() => setNotificationDismissed(true)}
              aria-label="Dismiss"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <nav className="transition-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`transition-tab ${activeTab === tab.id ? 'transition-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="transition-filters">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`transition-filter-chip ${selectedFilter === opt.id ? 'transition-filter-chip--selected' : ''}`}
            onClick={() => setSelectedFilter(opt.id)}
          >
            <span className="transition-filter-chip__dot" />
            {opt.label}
          </button>
        ))}
      </div>

      <div className="transition-cards">
        {INSIGHT_CARDS.map((card) => (
          <article key={card.id} className="transition-card">
            <h3 className="transition-card__title">{card.title}</h3>
            <p className="transition-card__meta">Created on {card.created}</p>
            <p className="transition-card__meta">Last updated {card.updated}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
