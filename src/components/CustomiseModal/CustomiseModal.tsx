import { useState } from 'react'
import './CustomiseModal.css'

export const ELTROPY_PRODUCTS = [
  'AI Assistant',
  'Text Messaging',
  'Video Banking',
  'Unified Conversations',
  'Chat',
  'Voice',
  'Collections',
  'Reputation Management',
  'Appointment Management',
  'Integrations Hub',
  'Co-browsing',
  'Document Collection',
]

export const CREDIT_UNION_DEPARTMENTS = [
  'Contact Center',
  'Lending',
  'Collections',
  'Marketing',
  'Back-Office Operations',
  'Branch Operations',
  'Member Services',
  'Compliance',
  'IT',
  'Finance & Accounting',
  'Human Resources',
  'Risk Management',
]

interface CustomiseModalProps {
  isOpen: boolean
  onClose: () => void
  initialProducts?: string[]
  initialDepartments?: string[]
  onSave?: (products: string[], departments: string[]) => void
}

export function CustomiseModal({
  isOpen,
  onClose,
  initialProducts = [],
  initialDepartments = [],
  onSave,
}: CustomiseModalProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    () => new Set(initialProducts)
  )
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(
    () => new Set(initialDepartments)
  )

  const toggleProduct = (name: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const toggleDepartment = (name: string) => {
    setSelectedDepartments((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const handleSave = () => {
    onSave?.(Array.from(selectedProducts), Array.from(selectedDepartments))
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="customise-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="customise-modal-title"
    >
      <div className="customise-modal">
        <header className="customise-modal__header">
          <h2 id="customise-modal-title" className="customise-modal__title">
            Customise your view
          </h2>
          <button
            type="button"
            className="customise-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="customise-modal__body">
          <section className="customise-modal__section">
            <h3 className="customise-modal__section-title">Products</h3>
            <p className="customise-modal__section-desc">Select the products you are interested in</p>
            <div className="customise-modal__checkgrid">
              {ELTROPY_PRODUCTS.map((product) => (
                <label key={product} className="customise-modal__checkitem">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product)}
                    onChange={() => toggleProduct(product)}
                  />
                  <span className="customise-modal__checklabel">{product}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="customise-modal__section">
            <h3 className="customise-modal__section-title">Departments</h3>
            <p className="customise-modal__section-desc">Select the departments you are interested in</p>
            <div className="customise-modal__checkgrid">
              {CREDIT_UNION_DEPARTMENTS.map((dept) => (
                <label key={dept} className="customise-modal__checkitem">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.has(dept)}
                    onChange={() => toggleDepartment(dept)}
                  />
                  <span className="customise-modal__checklabel">{dept}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <footer className="customise-modal__footer">
          <button type="button" className="customise-modal__btn customise-modal__btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="customise-modal__btn customise-modal__btn--primary" onClick={handleSave}>
            <span className="customise-modal__btn-primary-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Apply
            </span>
            <span className="customise-modal__btn-primary-divider" />
            <span className="customise-modal__btn-primary-right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </span>
          </button>
        </footer>
      </div>
    </div>
  )
}
