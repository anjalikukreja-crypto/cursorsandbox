import { useState } from 'react'
import './Conversations.css'

const SAMPLE_THREADS = [
  { id: '1', name: 'sahilll', channel: 'Text', tags: ['central'], snippet: "Updated user name to 'sahil...", time: '10h' },
  { id: '2', name: 'spam21', channel: 'Text', tags: ['central'], snippet: 'all party text Valid tags:...', time: '12d' },
  { id: '3', name: '1aa', channel: 'Text', tags: ['central'], snippet: 'all party text Valid tags:...', time: '13d' },
  { id: '4', name: 'spam11', channel: 'Text', tags: ['central'], snippet: 'all party text Valid tags:...', time: '13d' },
  { id: '5', name: 'sudheer', channel: 'Text', tags: ['Collection'], snippet: 'Hi sudheer, you can sign...', time: '26d' },
]

const CONV_TABS = ['Conversations', 'Workflows', 'Co-browse', 'Content Sharing', 'Envelopes', 'Consumer details']

export function Conversations() {
  const [inboxTab, setInboxTab] = useState<'inbox' | 'departments'>('inbox')
  const [chatOpen, setChatOpen] = useState(false)
  const [textOpen, setTextOpen] = useState(true)
  const [convTab, setConvTab] = useState('Conversations')
  const [selectedId, setSelectedId] = useState('1')

  const selected = SAMPLE_THREADS.find((t) => t.id === selectedId)

  return (
    <div className="conv-page">
      <header className="conv-page__header">
        <h1 className="conv-page__title">Conversations</h1>
        <div className="conv-page__header-actions">
          <button type="button" className="conv-page__icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button type="button" className="conv-page__icon-btn" aria-label="More">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
          <button type="button" className="conv-page__new-btn" aria-label="New conversation">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </header>

      <div className="conv-layout">
        <aside className="conv-sidebar">
          <div className="conv-sidebar__tabs">
            <button
              type="button"
              className={`conv-sidebar__tab ${inboxTab === 'inbox' ? 'conv-sidebar__tab--active' : ''}`}
              onClick={() => setInboxTab('inbox')}
            >
              Inbox
            </button>
            <button
              type="button"
              className={`conv-sidebar__tab ${inboxTab === 'departments' ? 'conv-sidebar__tab--active' : ''}`}
              onClick={() => setInboxTab('departments')}
            >
              Departments
            </button>
          </div>

          <div className="conv-sidebar__sections">
            <button
              type="button"
              className="conv-sidebar__section-head"
              onClick={() => setChatOpen(!chatOpen)}
            >
              <span>Chat (0)</span>
              <span className={`conv-sidebar__section-chevron ${chatOpen ? 'conv-sidebar__section-chevron--open' : ''}`}>▾</span>
            </button>
            {chatOpen && <div className="conv-sidebar__section-placeholder" />}

            <button
              type="button"
              className="conv-sidebar__section-head"
              onClick={() => setTextOpen(!textOpen)}
            >
              <span>Text (16)</span>
              <span className={`conv-sidebar__section-chevron ${textOpen ? 'conv-sidebar__section-chevron--open' : ''}`}>▾</span>
            </button>
            {textOpen && (
              <ul className="conv-thread-list">
                {SAMPLE_THREADS.map((t) => (
                  <li
                    key={t.id}
                    className={`conv-thread-list__item ${selectedId === t.id ? 'conv-thread-list__item--active' : ''}`}
                    onClick={() => setSelectedId(t.id)}
                  >
                    <div className="conv-thread-list__avatar">{t.name[0].toUpperCase()}</div>
                    <div className="conv-thread-list__meta">
                      <div className="conv-thread-list__row">
                        <span className="conv-thread-list__name">{t.name}</span>
                        <span className="conv-thread-list__time">{t.time}</span>
                      </div>
                      <div className="conv-thread-list__row">
                        <span className="conv-thread-list__snippet">{t.snippet}</span>
                      </div>
                      <div className="conv-thread-list__row conv-thread-list__row--tag">
                        <span className="conv-thread-list__tag-pill">{t.tags[0]}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <main className="conv-main">
          <header className="conv-main__header">
            <div className="conv-main__party">
              <span className="conv-main__header-icon" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </span>
              <div>
                <div className="conv-main__name">{selected?.name ?? 'sahilll'}</div>
                <div className="conv-main__id">chudegbfcuydegbcuyebgduybheudihcbnuiedbhiudebhnuivchbrefdiushfcbn</div>
                <div className="conv-main__phone">+1 983-918-8565</div>
              </div>
            </div>
            <div className="conv-main__header-actions">
              <button type="button" className="conv-main__icon-btn" aria-label="Edit">✎</button>
              <button type="button" className="conv-main__icon-btn" aria-label="Copy">⎘</button>
            </div>
          </header>

          <nav className="conv-main__tabs">
            {CONV_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`conv-main__tab ${convTab === tab ? 'conv-main__tab--active' : ''}`}
                onClick={() => setConvTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <section className="conv-main__body">
            <div className="conv-main__timeline">
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-icon">👁</span>
                <div>
                  <span className="conv-main__event-text">Viewed &apos;Remote Check Deposit&apos;</span>
                  <span className="conv-main__event-time">Today at 12:01:56 PM</span>
                  <a href="#" className="conv-main__event-link">View details</a>
                </div>
              </div>
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-icon">📄</span>
                <div>
                  <span className="conv-main__event-text">Submitted response for &apos;Remote Check Deposit&apos;</span>
                  <span className="conv-main__event-time">Today at 12:01:55 PM</span>
                  <a href="#" className="conv-main__event-link">View details</a>
                </div>
              </div>
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-icon">✓</span>
                <div>
                  <span className="conv-main__event-text">Check Sent For Processing</span>
                  <span className="conv-main__event-time">Today at 12:01:54 PM</span>
                </div>
              </div>
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-icon">🖼</span>
                <div>
                  <span className="conv-main__event-text">Image Processing Completed</span>
                  <span className="conv-main__event-time">Today at 12:01:53 PM</span>
                </div>
              </div>
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-text">Remote Check Deposit Request Accepted by Eltropy Admin User</span>
                <span className="conv-main__event-time">Today at 12:01:52 PM</span>
              </div>
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-text">Remote Check Deposit Complete</span>
                <span className="conv-main__event-time">Today at 12:01:51 PM</span>
              </div>
              <div className="conv-main__event conv-main__event--from-agent">
                <div className="conv-main__bubble conv-main__bubble--agent">
                  <div className="conv-main__bubble-author">Eltropy Admin User (You)</div>
                  <p>hiii sahilll, Admin, https://abhishek.uateltropy.com/ssu/qjkvX, Eltropy</p>
                  <span className="conv-main__bubble-time">12:05 PM</span>
                </div>
              </div>
              <div className="conv-main__event conv-main__event--system">
                <span className="conv-main__event-text">Updated user name to &apos;sahilll chudegbfcuydegbcuyebgduybheudihcbnuiedbhiudebhnuivchbrefdiushfcbn&apos;</span>
                <span className="conv-main__event-time">Today at 12:00 PM</span>
              </div>
            </div>
          </section>

          <footer className="conv-main__composer">
            <div className="conv-main__composer-toolbar conv-main__composer-toolbar--top">
              <button type="button" className="conv-main__composer-mode conv-main__composer-mode--active">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Text
              </button>
              <button type="button" className="conv-main__composer-mode">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                </svg>
              </button>
              <button type="button" className="conv-main__composer-mode">📞</button>
              <button type="button" className="conv-main__composer-mode">📹</button>
            </div>
            <div className="conv-main__composer-input-wrap">
              <textarea
                className="conv-main__input"
                placeholder="Type your message | Tip: Press Enter to send the message or Shift + Enter to switch to a new line | Max 1000 characters"
                rows={3}
              />
            </div>
            <div className="conv-main__composer-toolbar conv-main__composer-toolbar--bottom">
              <button type="button" className="conv-main__composer-tool-btn">≡</button>
              <button type="button" className="conv-main__composer-tool-btn">👤</button>
              <button type="button" className="conv-main__composer-tool-btn">📎</button>
              <button type="button" className="conv-main__composer-tool-btn">🔗</button>
              <button type="button" className="conv-main__composer-tool-btn">💬</button>
              <button type="button" className="conv-main__composer-tool-btn">ℹ</button>
              <button type="button" className="conv-main__composer-tool-btn">$</button>
              <button type="button" className="conv-main__composer-tool-btn">Transfer</button>
              <button type="button" className="conv-main__composer-tool-btn">Aa</button>
              <div className="conv-main__composer-right">
                <button type="button" className="conv-main__composer-lang">English ▾</button>
                <button type="button" className="conv-main__composer-tool-btn">⚙</button>
                <button type="button" className="conv-main__composer-ai">AI Compose</button>
                <button type="button" className="conv-main__new-btn conv-main__new-btn--sm" aria-label="Attach">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
