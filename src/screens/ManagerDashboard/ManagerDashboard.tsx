import { KPICard } from '../../components/KPICard/KPICard'
import { TryAsking } from '../../components/TryAsking/TryAsking'
import { SectionHeader } from '../../components/SectionHeader/SectionHeader'
import { ConversationList } from '../../components/ConversationList/ConversationList'
import { managerStats } from '../../data/managerStats'
import { tryAskingPrompts } from '../../data/tryAskingPrompts'
import { conversations } from '../../data/conversations'
import './ManagerDashboard.css'

export function ManagerDashboard() {
  return (
    <div className="manager-dashboard">
      <section className="manager-dashboard__kpis">
        {managerStats.map((stat) => (
          <KPICard key={stat.id} metric={stat} />
        ))}
      </section>
      <section className="manager-dashboard__try-asking">
        <TryAsking prompts={tryAskingPrompts.managers} />
      </section>
      <section className="manager-dashboard__conversations">
        <SectionHeader title="Conversations History" linkLabel="View all" />
        <ConversationList items={conversations} showCategory />
      </section>
      <section className="manager-dashboard__starred">
        <SectionHeader title="Starred Conversations" linkLabel="View all" />
        <ConversationList items={conversations.slice(0, 3)} showCategory />
      </section>
    </div>
  )
}
