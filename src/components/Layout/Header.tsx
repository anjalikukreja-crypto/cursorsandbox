import { Link } from 'react-router-dom'
import './Header.css'

export function Header() {

  return (
    <header className="analytics-header">
      <div className="analytics-header__left">
        <Link to="/" className="analytics-header__brand">
          <img
            src="/eltropy-logo.png"
            alt="Eltropy"
            className="analytics-header__logo-img"
          />
        </Link>
        <div className="analytics-header__aht">
          <span className="analytics-header__aht-label">AHT:</span>
          <span className="analytics-header__aht-value">00:06:42</span>
        </div>
        <div className="analytics-header__category-pills">
          <div className="analytics-header__pill">
            <span className="analytics-header__pill-label">Account opening</span>
            <span className="analytics-header__pill-badges">
              <span>3</span>
              <span>2</span>
              <span>1</span>
            </span>
          </div>
          <div className="analytics-header__pill">
            <span className="analytics-header__pill-label">Auto Loans</span>
            <span className="analytics-header__pill-badges">
              <span>3</span>
              <span>2</span>
              <span>1</span>
            </span>
          </div>
        </div>
      </div>
      <div className="analytics-header__right">
        <Link to="/all-apps" className="analytics-header__icon-btn" aria-label="All apps">
          ⊞
        </Link>
        <Link to="/settings" className="analytics-header__icon-btn" aria-label="Settings">
          ⚙
        </Link>
        <div className="analytics-header__available">
          <span className="analytics-header__available-dot" />
          Available
        </div>
      </div>
    </header>
  )
}
