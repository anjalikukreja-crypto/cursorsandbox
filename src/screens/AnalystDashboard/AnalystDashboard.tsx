import { TryAsking } from '../../components/TryAsking/TryAsking'
import { SectionHeader } from '../../components/SectionHeader/SectionHeader'
import { ConversationList } from '../../components/ConversationList/ConversationList'
import { tryAskingPrompts } from '../../data/tryAskingPrompts'
import { conversations } from '../../data/conversations'
import './AnalystDashboard.css'

export function AnalystDashboard() {
  return (
    <div className="analyst-dashboard">
      <section className="analyst-dashboard__try-asking">
        <TryAsking prompts={tryAskingPrompts.dataAnalysts} showExport />
      </section>
      <section className="analyst-dashboard__conversations">
        <SectionHeader title="Conversations History" linkLabel="View all" />
        <ConversationList items={conversations} table showCategory />
      </section>
      <section className="analyst-dashboard__starred">
        <SectionHeader title="Starred Conversations" linkLabel="View all" />
        <ConversationList items={conversations.slice(0, 3)} table showCategory />
      </section>
    </div>
  )
}
