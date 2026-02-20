import './SecondaryHeader.css'

interface SecondaryHeaderProps {
  breadcrumbs: string[]
  title: string
  subtitle?: string
  searchPlaceholder?: string
  dropdownLabel?: string
  /** When true, hides the Default dropdown button in the top right */
  hideDefaultDropdown?: boolean
  onRefresh?: () => void
  /** Rendered before refresh/filter icons in the controls area */
  customActions?: React.ReactNode
}

export function SecondaryHeader({
  breadcrumbs,
  title,
  subtitle,
  searchPlaceholder = 'Search',
  dropdownLabel = 'Default',
  hideDefaultDropdown = false,
  onRefresh,
  customActions,
}: SecondaryHeaderProps) {
  return (
    <header className="secondary-header">
      {breadcrumbs.length > 0 && (
        <nav className="secondary-header__breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb} className="secondary-header__breadcrumb">
              {i > 0 && <span className="secondary-header__breadcrumb-sep"> / </span>}
              {crumb}
            </span>
          ))}
        </nav>
      )}

      <div className="secondary-header__main">
        <div className="secondary-header__left">
          <div className="secondary-header__title-block">
            <h1 className="secondary-header__title">{title}</h1>
            {subtitle && <p className="secondary-header__subtitle">{subtitle}</p>}
          </div>
        </div>

        <div className="secondary-header__controls">
          {customActions}
          <button
            type="button"
            className="secondary-header__icon-btn"
            onClick={onRefresh}
            aria-label="Refresh"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 2v6h-6" />
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M3 22v-6h6" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
            </svg>
          </button>
          <button
            type="button"
            className="secondary-header__icon-btn"
            aria-label="Filter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="12" y1="18" x2="12" y2="18" />
            </svg>
          </button>
          <div className="secondary-header__search">
            <svg className="secondary-header__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              className="secondary-header__search-input"
              placeholder={searchPlaceholder}
              aria-label="Search"
            />
          </div>
          {!hideDefaultDropdown && (
            <button
              type="button"
              className="secondary-header__dropdown"
              aria-haspopup="listbox"
              aria-expanded="false"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              <span>{dropdownLabel}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
