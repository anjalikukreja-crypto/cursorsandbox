import { Routes, Route, Navigate } from 'react-router-dom'
import { AnalyticsOptions } from './screens/AnalyticsOptions'
import { Layout } from './components/Layout/Layout'
import { ExecutiveDashboard } from './screens/ExecutiveDashboard/ExecutiveDashboard'
import { DataAnalystHomepage } from './screens/DataAnalystHomepage/DataAnalystHomepage'
import { Homepage } from './screens/Homepage/Homepage'
import { AIAssistant } from './screens/AIAssistant/AIAssistant'
import { TeamPerformance } from './screens/TeamPerformance/TeamPerformance'
import { QualityIntelligence } from './screens/QualityIntelligence/QualityIntelligence'
import { Conversations } from './screens/Conversations/Conversations'
import { PlaceholderView } from './screens/PlaceholderView/PlaceholderView'
import { Transition } from './screens/Transition/Transition'
import { Reports } from './screens/Reports/Reports'
import { DataWarehouse } from './screens/DataWarehouse/DataWarehouse'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AnalyticsOptions />} />
      <Route element={<Layout />}>
        <Route path="executives" element={<ExecutiveDashboard />} />
        <Route path="managers" element={<Homepage />} />
        <Route path="data-analysts" element={<DataAnalystHomepage />} />
        <Route path="data-warehouse" element={<DataWarehouse />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="transition" element={<Transition />} />
        <Route path="transition/business-intelligence" element={<Homepage showSmartInsights={false} dashboardsTitle="All dashboards" />} />
        <Route path="beta" element={<Navigate to="/beta/business-intelligence" replace />} />
        <Route path="beta/business-intelligence" element={<Homepage />} />
        <Route path="beta/quality-intelligence" element={<QualityIntelligence />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="ai-assistants" element={<PlaceholderView />} />
        <Route path="ai-agents" element={<PlaceholderView />} />
        <Route path="ai-intelligence" element={<PlaceholderView />} />
        <Route path="conversations" element={<Conversations />} />
        <Route path="conversations/member-inbox" element={<Conversations />} />
        <Route path="conversations/interaction-list" element={<PlaceholderView />} />
        <Route path="conversations/back-office" element={<PlaceholderView />} />
        <Route path="conversations/live-dashboard" element={<PlaceholderView />} />
        <Route path="conversations/video-notary-journal" element={<PlaceholderView />} />
        <Route path="branch-operations" element={<PlaceholderView />} />
        <Route path="branch-operations/appointments" element={<PlaceholderView />} />
        <Route path="branch-operations/reputation-management" element={<PlaceholderView />} />
        <Route path="branch-operations/lobby-management" element={<PlaceholderView />} />
        <Route path="analytics" element={<PlaceholderView />} />
        <Route path="analytics/my-dashboards" element={<Homepage />} />
        <Route path="analytics/my-team-performance" element={<TeamPerformance />} />
        <Route path="analytics/quality-intelligence" element={<QualityIntelligence />} />
        <Route path="analytics/reports" element={<Reports />} />
        <Route path="analytics/conversation-insights" element={<PlaceholderView />} />
        <Route path="analytics/secure-data-export" element={<PlaceholderView />} />
        <Route path="analytics/check-register" element={<PlaceholderView />} />
        <Route path="marketing-campaigns" element={<PlaceholderView />} />
        <Route path="marketing-campaigns/text" element={<PlaceholderView />} />
        <Route path="marketing-campaigns/email" element={<PlaceholderView />} />
        <Route path="marketing-campaigns/voice" element={<PlaceholderView />} />
        <Route path="knowledge-hub" element={<PlaceholderView />} />
        <Route path="knowledge-hub/modules" element={<PlaceholderView />} />
        <Route path="knowledge-hub/ai-agent-knowledge" element={<PlaceholderView />} />
        <Route path="knowledge-hub/topics" element={<PlaceholderView />} />
        <Route path="support" element={<PlaceholderView />} />
        <Route path="audit-log" element={<PlaceholderView />} />
        <Route path="submissions" element={<PlaceholderView />} />
        <Route path="activity" element={<PlaceholderView />} />
        <Route path="collateral-map" element={<PlaceholderView />} />
        <Route path="flows" element={<PlaceholderView />} />
        <Route path="engagements" element={<PlaceholderView />} />
        <Route path="engagements/call-flow" element={<PlaceholderView />} />
        <Route path="engagements/workflows" element={<PlaceholderView />} />
        <Route path="all-apps" element={<PlaceholderView />} />
        <Route path="settings" element={<PlaceholderView />} />
      </Route>
    </Routes>
  )
}

export default App
