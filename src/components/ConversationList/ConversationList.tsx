import type { ConversationItem } from '../../data/conversations'
import './ConversationList.css'

interface ConversationListProps {
  items: ConversationItem[]
  compact?: boolean
  showCategory?: boolean
  table?: boolean
}

export function ConversationList({
  items,
  compact,
  showCategory,
  table,
}: ConversationListProps) {
  if (table) {
    return (
      <div className="conversation-list conversation-list--table">
        <table className="conversation-list__table">
          <thead>
            <tr>
              <th>Title</th>
              {showCategory && <th>Category</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                {showCategory && <td>{item.category}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <ul className={`conversation-list ${compact ? 'conversation-list--compact' : ''}`}>
      {items.map((item) => (
        <li key={item.id} className="conversation-list__item">
          <span className="conversation-list__title">{item.title}</span>
          {showCategory && item.category && (
            <span className="conversation-list__category">{item.category}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
