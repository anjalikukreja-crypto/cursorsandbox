import { KPICard } from '../../components/KPICard/KPICard'
import { TryAsking } from '../../components/TryAsking/TryAsking'
import { SectionHeader } from '../../components/SectionHeader/SectionHeader'
import { ConversationList } from '../../components/ConversationList/ConversationList'
import { executiveStats } from '../../data/executiveStats'
import { tryAskingPrompts } from '../../data/tryAskingPrompts'
import { conversations } from '../../data/conversations'
import './ExecutiveDashboard.css'

export function ExecutiveDashboard() {
  return (
    <div className="executive-dashboard">
      <section className="executive-dashboard__kpis">
        {executiveStats.map((stat) => (
          <KPICard key={stat.id} metric={stat} />
        ))}
      </section>
      <section className="executive-dashboard__try-asking">
        <TryAsking prompts={tryAskingPrompts.executives} />
      </section>
      <section className="executive-dashboard__conversations">
        <SectionHeader title="Conversations History" linkLabel="View all" />
        <ConversationList items={conversations} compact />
      </section>
      <section className="executive-dashboard__starred">
        <SectionHeader title="Starred Conversations" linkLabel="View all" />
        <ConversationList items={conversations.slice(0, 3)} compact />
      </section>
    </div>
  )
}
