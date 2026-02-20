import './TryAsking.css'

interface TryAskingProps {
  prompts: string[]
  showExport?: boolean
}

export function TryAsking({ prompts, showExport }: TryAskingProps) {
  return (
    <div className="try-asking">
      <h3 className="try-asking__title">Try Asking</h3>
      <div className="try-asking__chips">
        {prompts.map((prompt, i) => (
          <button
            key={i}
            type="button"
            className="try-asking__chip"
            onClick={() => console.log('Prompt:', prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
      {showExport && (
        <button type="button" className="try-asking__export">
          Export data
        </button>
      )}
    </div>
  )
}
