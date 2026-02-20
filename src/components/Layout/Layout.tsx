import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SecondaryHeader } from '../SecondaryHeader/SecondaryHeader'
import { CustomiseModal } from '../CustomiseModal/CustomiseModal'
import { UpgradeProModal } from '../UpgradeProModal/UpgradeProModal'
import { getSecondaryHeaderConfig } from '../../config/secondaryHeaderConfig'
import './Layout.css'

export function Layout() {
  const location = useLocation()
  const [customiseOpen, setCustomiseOpen] = useState(false)
  const [upgradeProOpen, setUpgradeProOpen] = useState(false)
  const isFullScreen = location.pathname.includes('quality-intelligence')
  const headerConfig = getSecondaryHeaderConfig(location.pathname)
  const isBusinessIntelligence = location.pathname === '/analytics/my-dashboards' || location.pathname === '/transition/business-intelligence' || location.pathname === '/beta/business-intelligence'
  const showCustomise = location.pathname === '/analytics/quality-intelligence' || location.pathname === '/beta/quality-intelligence'
  const isReportsPage = location.pathname === '/analytics/reports'

  const getHeaderActions = () => {
    if (location.pathname === '/analytics/my-dashboards' || location.pathname === '/beta/business-intelligence') {
      return (
        <>
          <button
            type="button"
            className="secondary-header__action-btn secondary-header__action-btn--secondary"
          >
            Set up BI instance
          </button>
          <button
            type="button"
            className="secondary-header__action-btn secondary-header__action-btn--primary"
            onClick={() => setUpgradeProOpen(true)}
          >
            Create custom dashboard
          </button>
        </>
      )
    }
    if (showCustomise) {
      return (
        <button
          type="button"
          className="secondary-header__customise-btn"
          onClick={() => setCustomiseOpen(true)}
        >
          Customise
        </button>
      )
    }
    if (isReportsPage) {
      return (
        <button
          type="button"
          className="secondary-header__action-btn secondary-header__action-btn--primary"
          onClick={() => setUpgradeProOpen(true)}
        >
          Create custom report
        </button>
      )
    }
    return undefined
  }

  return (
    <div className="analytics-layout">
      <Header />
      <div className="analytics-layout__body">
        <Sidebar />
        <main className={`analytics-layout__main ${isFullScreen ? 'analytics-layout__main--full' : ''}`}>
          <div className="analytics-layout__main-inner">
            {headerConfig && (
              <SecondaryHeader
                breadcrumbs={headerConfig.breadcrumbs}
                title={headerConfig.title}
                subtitle={headerConfig.subtitle}
                searchPlaceholder={headerConfig.searchPlaceholder}
                dropdownLabel={headerConfig.dropdownLabel}
                hideDefaultDropdown={isBusinessIntelligence}
                customActions={getHeaderActions()}
              />
            )}
            <Outlet />
          </div>
        </main>
      </div>
      <CustomiseModal
        isOpen={customiseOpen}
        onClose={() => setCustomiseOpen(false)}
        onSave={() => setCustomiseOpen(false)}
      />
      <UpgradeProModal
        isOpen={upgradeProOpen}
        onClose={() => setUpgradeProOpen(false)}
        onInterested={() => setUpgradeProOpen(false)}
      />
    </div>
  )
}
