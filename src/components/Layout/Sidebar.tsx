import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  ConversationsIcon,
  BranchIcon,
  AnalyticsIcon,
  CampaignsIcon,
  KnowledgeIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LiveIcon,
  AiAssistantIcon,
  ReputationIcon,
  AppointmentsIcon,
  AiManagementIcon,
  ModulesIcon,
  InsightsIcon,
  ReportsIcon,
  SubmissionsIcon,
  ActivityIcon,
  CollateralMapIcon,
  FlowsIcon,
  HelpSupportIcon,
} from './SidebarIcons'
import './Sidebar.css'

interface SubNavItem {
  path: string
  label: string
  tag?: string
}

interface NavItem {
  id: string
  path?: string
  label: string
  icon: React.FC
  children?: SubNavItem[]
  tag?: string
}

const navItems: NavItem[] = [
  { id: 'home', path: '/homepage', label: 'Homepage', icon: HomeIcon },
  {
    id: 'conversations',
    path: '/conversations',
    label: 'Conversations',
    icon: ConversationsIcon,
    children: [
      { path: '/conversations/member-inbox', label: 'Member inbox' },
      { path: '/conversations/interaction-list', label: 'Interaction list' },
      { path: '/conversations/back-office', label: 'Back office' },
      { path: '/conversations/live-dashboard', label: 'Live dashboard' },
    ],
  },
  {
    id: 'branch-operations',
    path: '/branch-operations',
    label: 'Branch operations',
    icon: BranchIcon,
    children: [
      { path: '/branch-operations/appointments', label: 'Appointments' },
      { path: '/branch-operations/reputation-management', label: 'Reputation management' },
      { path: '/branch-operations/lobby-management', label: 'Lobby management' },
    ],
  },
  {
    id: 'analytics',
    path: '/analytics',
    label: 'Analytics',
    icon: AnalyticsIcon,
    tag: 'New',
    children: [
      { path: '/analytics/my-dashboards', label: 'Business Intelligence' },
      { path: '/analytics/quality-intelligence', label: 'Quality Intelligence' },
      { path: '/analytics/reports', label: 'Reports' },
    ],
  },
  {
    id: 'marketing-campaigns',
    path: '/marketing-campaigns',
    label: 'Marketing campaigns',
    icon: CampaignsIcon,
    children: [
      { path: '/marketing-campaigns/text', label: 'Text' },
      { path: '/marketing-campaigns/email', label: 'Email' },
      { path: '/marketing-campaigns/voice', label: 'Voice' },
    ],
  },
  {
    id: 'knowledge-hub',
    path: '/knowledge-hub',
    label: 'Knowledge hub',
    icon: KnowledgeIcon,
    children: [
      { path: '/knowledge-hub/modules', label: 'Modules' },
      { path: '/knowledge-hub/ai-agent-knowledge', label: 'AI agent knowledge' },
      { path: '/knowledge-hub/topics', label: 'Topics' },
    ],
  },
]

// Insights-style sidebar menu (used only on Transition page)
const transitionNavItems: NavItem[] = [
  { id: 'conversations', path: '/conversations', label: 'Conversations', icon: ConversationsIcon },
  { id: 'ai-assistant', path: '/ai-assistant', label: 'AI Assistant', icon: AiAssistantIcon },
  { id: 'reputation', path: '/branch-operations/reputation-management', label: 'Reputation Management', icon: ReputationIcon },
  { id: 'live', path: '/conversations/live-dashboard', label: 'Live!', icon: LiveIcon },
  { id: 'appointments', path: '/branch-operations/appointments', label: 'Appointments', icon: AppointmentsIcon },
  {
    id: 'ai-management',
    path: '/ai-assistant',
    label: 'AI Management',
    icon: AiManagementIcon,
    children: [
      { path: '/ai-assistants', label: 'AI Assistants' },
      { path: '/ai-agents', label: 'AI Agents' },
      { path: '/ai-intelligence', label: 'AI Intelligence' },
    ],
  },
  { id: 'modules', path: '/knowledge-hub/modules', label: 'Modules', icon: ModulesIcon },
  { id: 'insights', path: '/transition', label: 'Insights', icon: InsightsIcon },
  { id: 'business-intelligence', path: '/transition/business-intelligence', label: 'Business Intelligence', icon: AnalyticsIcon, tag: 'Alpha' },
  { id: 'reports', path: '/analytics/reports', label: 'Reports', icon: ReportsIcon },
  { id: 'submissions', path: '/submissions', label: 'Submissions', icon: SubmissionsIcon },
  { id: 'activity', path: '/activity', label: 'Activity', icon: ActivityIcon },
  { id: 'campaigns', path: '/marketing-campaigns', label: 'Campaigns', icon: CampaignsIcon },
  { id: 'collateral-map', path: '/collateral-map', label: 'Collateral Map', icon: CollateralMapIcon },
  { id: 'flows', path: '/flows', label: 'Flows', icon: FlowsIcon },
  { id: 'help-support', path: '/support', label: 'Help & Support', icon: HelpSupportIcon },
]

// Beta phase: same structure as transition/insights sidebar (from reference image)
const betaNavItems: NavItem[] = [
  { id: 'conversations', path: '/conversations', label: 'Conversations', icon: ConversationsIcon },
  { id: 'ai-assistant', path: '/ai-assistant', label: 'AI Assistant', icon: AiAssistantIcon },
  { id: 'reputation', path: '/branch-operations/reputation-management', label: 'Reputation Management', icon: ReputationIcon },
  { id: 'live', path: '/conversations/live-dashboard', label: 'Live!', icon: LiveIcon },
  { id: 'appointments', path: '/branch-operations/appointments', label: 'Appointments', icon: AppointmentsIcon },
  {
    id: 'ai-management',
    path: '/ai-assistant',
    label: 'AI Management',
    icon: AiManagementIcon,
    children: [
      { path: '/ai-assistants', label: 'AI Assistants' },
      { path: '/ai-agents', label: 'AI Agents' },
      { path: '/ai-intelligence', label: 'AI Intelligence' },
    ],
  },
  { id: 'modules', path: '/knowledge-hub/modules', label: 'Modules', icon: ModulesIcon },
  {
    id: 'insights',
    path: '/beta/business-intelligence',
    label: 'Insights',
    icon: InsightsIcon,
    children: [
      { path: '/beta/business-intelligence', label: 'Business Intelligence', tag: 'Alpha' },
      { path: '/beta/quality-intelligence', label: 'Quality Intelligence' },
    ],
  },
  { id: 'reports', path: '/analytics/reports', label: 'Reports', icon: ReportsIcon },
  { id: 'submissions', path: '/submissions', label: 'Submissions', icon: SubmissionsIcon },
  { id: 'activity', path: '/activity', label: 'Activity', icon: ActivityIcon },
  { id: 'campaigns', path: '/marketing-campaigns', label: 'Campaigns', icon: CampaignsIcon },
  { id: 'collateral-map', path: '/collateral-map', label: 'Collateral Map', icon: CollateralMapIcon },
  { id: 'flows', path: '/flows', label: 'Flows', icon: FlowsIcon },
]

function isChildActive(pathname: string, item: NavItem): boolean {
  if (!item.children) return false
  return item.children.some((child) => pathname === child.path || pathname.startsWith(child.path + '/'))
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const location = useLocation()
  const isTransitionPage = location.pathname === '/transition' || location.pathname.startsWith('/transition/')
  const isBetaPage = location.pathname.startsWith('/beta/')
  const items = isBetaPage ? betaNavItems : isTransitionPage ? transitionNavItems : navItems

  // Auto-expand parent when a child route is active or when on parent path
  useEffect(() => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      items.forEach((item) => {
        if (item.children && (isChildActive(location.pathname, item) || location.pathname === item.path)) {
          next.add(item.id)
        }
      })
      return next
    })
  }, [location.pathname, items])

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <aside className={`radiant-sidebar ${collapsed ? 'radiant-sidebar--collapsed' : ''}`}>
      <nav className="radiant-sidebar__nav">
        <ul className="radiant-sidebar__list">
          {items.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedIds.has(item.id)
            const hasActiveChild = hasChildren && (isChildActive(location.pathname, item) || location.pathname === item.path)

            if (hasChildren) {
              const firstChildPath = item.children![0].path
              return (
                <li key={item.id} className="radiant-sidebar__group">
                  {collapsed ? (
                    <NavLink
                      to={firstChildPath}
                      className={`radiant-sidebar__link radiant-sidebar__parent ${
                        hasActiveChild ? 'radiant-sidebar__link--active' : ''
                      }`}
                    >
                      <span className="radiant-sidebar__icon">
                        <Icon />
                      </span>
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      className={`radiant-sidebar__link radiant-sidebar__parent ${
                        hasActiveChild ? 'radiant-sidebar__link--active' : ''
                      }`}
                      onClick={() => toggleExpand(item.id)}
                    >
                    <span className="radiant-sidebar__icon">
                      <Icon />
                    </span>
                    {!collapsed && (
                      <>
                        <span className="radiant-sidebar__label">{item.label}</span>
                        {item.tag && (
                          <span className="radiant-sidebar__tag">{item.tag}</span>
                        )}
                        <span
                          className={`radiant-sidebar__chevron radiant-sidebar__chevron--expand ${
                            isExpanded ? 'radiant-sidebar__chevron--expanded' : ''
                          }`}
                        >
                          <ChevronDownIcon />
                        </span>
                      </>
                    )}
                  </button>
                  )}
                  {!collapsed && hasChildren && isExpanded && (
                    <ul className="radiant-sidebar__sublist">
                      {item.children!.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `radiant-sidebar__link radiant-sidebar__sublink ${
                                isActive ? 'radiant-sidebar__link--active' : ''
                              }`
                            }
                          >
                            <span className="radiant-sidebar__label">{child.label}</span>
                            {child.tag && <span className="radiant-sidebar__tag">{child.tag}</span>}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            }

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `radiant-sidebar__link ${isActive ? 'radiant-sidebar__link--active' : ''}`
                  }
                >
                  <span className="radiant-sidebar__icon">
                    <Icon />
                  </span>
                  {!collapsed && (
                    <>
                      <span className="radiant-sidebar__label">{item.label}</span>
                      {item.tag && <span className="radiant-sidebar__tag">{item.tag}</span>}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="radiant-sidebar__footer">
        <button
          type="button"
          className="radiant-sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>
    </aside>
  )
}
