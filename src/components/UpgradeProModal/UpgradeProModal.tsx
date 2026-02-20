import './UpgradeProModal.css'

interface UpgradeProModalProps {
  isOpen: boolean
  onClose: () => void
  onInterested?: () => void
}

export function UpgradeProModal({
  isOpen,
  onClose,
  onInterested,
}: UpgradeProModalProps) {
  const handleInterested = () => {
    onInterested?.()
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="upgrade-pro-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-pro-modal-title"
    >
      <div className="upgrade-pro-modal">
        <div className="upgrade-pro-modal__icon" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
          </svg>
        </div>
        <h2 id="upgrade-pro-modal-title" className="upgrade-pro-modal__title">
          Unlock custom reports & dashboards
        </h2>
        <p className="upgrade-pro-modal__text">
          Upgrade to Eltropy Pro to create custom reports and dashboards tailored to your needs. 
          Get in touch with your Eltropy account manager to discover how Pro can help you make better, data-driven decisions.
        </p>
        <div className="upgrade-pro-modal__actions">
          <button
            type="button"
            className="upgrade-pro-modal__btn upgrade-pro-modal__btn--secondary"
            onClick={onClose}
          >
            No thanks
          </button>
          <button
            type="button"
            className="upgrade-pro-modal__btn upgrade-pro-modal__btn--primary"
            onClick={handleInterested}
          >
            I'm interested to learn more
          </button>
        </div>
        <button
          type="button"
          className="upgrade-pro-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
