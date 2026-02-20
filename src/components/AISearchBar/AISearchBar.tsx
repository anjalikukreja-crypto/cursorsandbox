import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { cioCreditUnionPrompts } from '../../data/homepageStats'
import './AISearchBar.css'

const SKILL_OPTIONS = ['Knowledge', 'web search', 'Intelligence'] as const
export type SkillOption = (typeof SKILL_OPTIONS)[number]

interface AISearchBarProps {
  /** Skill selected by default. Intelligence on Business Intelligence, Quality Intelligence, Reports. */
  defaultSkill?: SkillOption
}

export function AISearchBar({ defaultSkill = 'Intelligence' }: AISearchBarProps) {
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillOption>(defaultSkill)
  const [searchValue, setSearchValue] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSend = useCallback(() => {
    const trimmed = searchValue.trim()
    if (!trimmed) return
    navigate(`/ai-assistant?q=${encodeURIComponent(trimmed)}`)
  }, [searchValue, navigate])

  const suggestedPrompts = useMemo(() => {
    const trimmed = searchValue.trim().toLowerCase()
    if (!trimmed) return []
    const filtered = cioCreditUnionPrompts.filter((p) =>
      p.toLowerCase().includes(trimmed)
    )
    return (filtered.length > 0 ? filtered : cioCreditUnionPrompts).slice(0, 5)
  }, [searchValue])

  const handleSelectPrompt = useCallback((prompt: string) => {
    setSearchValue(prompt)
  }, [])

  return (
    <section className="ai-search-bar">
      <div className="ai-search-bar__container">
        <div
          className={`ai-search-bar__wrapper ${suggestedPrompts.length > 0 ? 'ai-search-bar__wrapper--suggestions-open' : ''}`}
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest('button')) searchInputRef.current?.focus()
          }}
        >
          <span className="ai-search-bar__icon" aria-hidden>
            ✦
          </span>
          <div className="ai-search-bar__skills-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="ai-search-bar__skills-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Select skill"
            >
              {selectedSkill}
              <span className={`ai-search-bar__skills-chevron ${dropdownOpen ? 'ai-search-bar__skills-chevron--open' : ''}`}>▾</span>
            </button>
            {dropdownOpen && (
              <ul
                className="ai-search-bar__skills-menu"
                role="listbox"
                aria-label="Skill options"
              >
                {SKILL_OPTIONS.map((opt) => (
                  <li key={opt} role="option">
                    <button
                      type="button"
                      className={`ai-search-bar__skills-menu-item ${selectedSkill === opt ? 'ai-search-bar__skills-menu-item--active' : ''}`}
                      onClick={() => {
                        setSelectedSkill(opt)
                        setDropdownOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            ref={searchInputRef}
            type="text"
            className="ai-search-bar__input"
            placeholder="Ask Eltropy Anything..."
            aria-label="Ask Eltropy Anything"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <div className="ai-search-bar__actions">
            <button
              type="button"
              className="ai-search-bar__send-btn"
              aria-label="Send"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
        {suggestedPrompts.length > 0 && (
          <ul className="ai-search-bar__suggestions" role="listbox">
            {suggestedPrompts.map((prompt, i) => (
              <li key={i} role="option">
                <button
                  type="button"
                  className="ai-search-bar__suggestion-item"
                  onClick={() => handleSelectPrompt(prompt)}
                >
                  {prompt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
