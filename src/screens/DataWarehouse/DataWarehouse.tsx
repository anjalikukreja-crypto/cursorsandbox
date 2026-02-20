import { useState } from 'react'
import './DataWarehouse.css'

const STEPS = [
  'Link data warehouse',
  'Data modelling',
  'BI Assistant Training',
  'Publish model',
]

export function DataWarehouse() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="data-warehouse">
      <div className="data-warehouse__stepper" role="progressbar" aria-valuenow={activeStep + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
        {STEPS.map((label, index) => {
          const isActive = index === activeStep
          const isCompleted = index < activeStep
          return (
            <div
              key={label}
              className={`data-warehouse__step ${isActive ? 'data-warehouse__step--active' : ''} ${isCompleted ? 'data-warehouse__step--completed' : ''}`}
            >
              <button
                type="button"
                className="data-warehouse__step-trigger"
                onClick={() => setActiveStep(index)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${label}, step ${index + 1} of ${STEPS.length}`}
              >
                <span className="data-warehouse__step-number">{index + 1}</span>
                <span className="data-warehouse__step-label">{label}</span>
              </button>
              {index < STEPS.length - 1 && <div className="data-warehouse__step-connector" aria-hidden />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
