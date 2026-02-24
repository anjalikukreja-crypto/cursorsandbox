import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AnalyticsOptions.css'

const phaseOptions = [
  { id: 'alpha', path: '/transition', title: 'Alpha phase' },
  { id: 'beta', path: '/beta/business-intelligence', title: 'Beta phase' },
  {
    id: 'ga',
    title: 'GA phase',
    subOptions: [
      { id: 'executives', path: '/homepage', title: 'Executives' },
      { id: 'managers', path: '/managers', title: 'Managers' },
      { id: 'data-analysts', path: '/data-analysts', title: 'Data analysts' },
      { id: 'contact-center-agents', path: '/conversations', title: 'Contact center agents' },
    ],
  },
]

export function AnalyticsOptions() {
  const navigate = useNavigate()
  const [gaExpanded, setGaExpanded] = useState(false)

  return (
    <div className="analytics-options">
      <header className="analytics-options__header">
        <img
          src="/analytics-illustration.png"
          alt="Analytics growth illustration"
          className="analytics-options__illustration"
        />
        <h1 className="analytics-options__heading">
          The new Eltropy Analytics 2.0
        </h1>
      </header>
      <div className="analytics-options__grid">
        {phaseOptions.map((option) => (
          <div key={option.id} className="analytics-options__phase-wrap">
            {option.subOptions ? (
              <>
                <article
                  className="analytics-options__card analytics-options__card--parent"
                  onClick={() => setGaExpanded((e) => !e)}
                >
                  <h3 className="analytics-options__title">{option.title}</h3>
                  <span
                    className={`analytics-options__chevron ${gaExpanded ? 'analytics-options__chevron--open' : ''}`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </article>
                {gaExpanded && (
                  <div className="analytics-options__sub-grid">
                    {option.subOptions.map((sub) => (
                      <article
                        key={sub.id}
                        className="analytics-options__card analytics-options__card--sub"
                        onClick={() => navigate(sub.path)}
                      >
                        <h3 className="analytics-options__title">{sub.title}</h3>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <article
                className="analytics-options__card"
                onClick={() => navigate(option.path)}
              >
                <h3 className="analytics-options__title">{option.title}</h3>
              </article>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
