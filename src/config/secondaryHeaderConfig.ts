export interface SecondaryHeaderConfig {
  breadcrumbs: string[]
  title: string
  subtitle?: string
  searchPlaceholder?: string
  dropdownLabel?: string
}

const ROUTE_CONFIG: Record<string, SecondaryHeaderConfig> = {
  '/analytics/my-dashboards': {
    breadcrumbs: ['Analytics', 'Business Intelligence'],
    title: 'Business Intelligence',
    subtitle: 'View all favorite past conversations',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/analytics/quality-intelligence': {
    breadcrumbs: ['Analytics', 'Quality Intelligence'],
    title: 'Quality Intelligence',
    subtitle: '360° view of service quality, drivers, and recommendations',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/analytics/reports': {
    breadcrumbs: ['Analytics', 'Reports'],
    title: 'Reports',
    subtitle: 'View and manage credit union reports',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/analytics/my-team-performance': {
    breadcrumbs: ['Analytics', 'My Team Performance'],
    title: 'My Team Performance',
    subtitle: 'Team metrics and analytics',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/ai-assistant': {
    breadcrumbs: ['AI Assistant'],
    title: 'AI Assistant',
    subtitle: 'Get instant answers powered by AI',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/transition': {
    breadcrumbs: ['Insights'],
    title: 'Insights',
    subtitle: 'Analytics and insights dashboards',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/transition/business-intelligence': {
    breadcrumbs: ['Insights', 'Business Intelligence'],
    title: 'Business Intelligence',
    subtitle: 'View all favorite past conversations',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/beta/business-intelligence': {
    breadcrumbs: ['Analytics 2.0', 'Business Intelligence'],
    title: 'Business Intelligence',
    subtitle: 'View all favorite past conversations',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/beta/quality-intelligence': {
    breadcrumbs: ['Analytics 2.0', 'Quality Intelligence'],
    title: 'Quality Intelligence',
    subtitle: '360° view of service quality, drivers, and recommendations',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/conversations': {
    breadcrumbs: ['Conversations'],
    title: 'Conversations',
    subtitle: 'View all conversations',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/analytics': {
    breadcrumbs: ['Analytics'],
    title: 'Analytics',
    subtitle: 'Analytics overview',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/executives': {
    breadcrumbs: ['Executives'],
    title: 'Executive Dashboard',
    subtitle: 'Executive overview',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/managers': {
    breadcrumbs: ['Managers'],
    title: 'Manager Dashboard',
    subtitle: 'Manager overview',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/data-analysts': {
    breadcrumbs: ['Data Analysts'],
    title: 'Data Analyst Homepage',
    subtitle: 'Data analytics overview',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
  '/data-warehouse': {
    breadcrumbs: ['Data Analysts', 'Data Warehouse'],
    title: 'Data Warehouse',
    subtitle: 'Link data warehouse, model data, train BI assistant, and publish',
    searchPlaceholder: 'Search',
    dropdownLabel: 'Default',
  },
}

function getPathBreadcrumbs(pathname: string): string[] {
  const parts = pathname.split('/').filter(Boolean)
  return parts.map((p) => p.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
}

const ROUTES_WITHOUT_HEADER = ['/homepage']

export function getSecondaryHeaderConfig(pathname: string): SecondaryHeaderConfig | null {
  if (ROUTES_WITHOUT_HEADER.includes(pathname)) {
    return null
  }
  if (ROUTE_CONFIG[pathname]) {
    return ROUTE_CONFIG[pathname]
  }

  const sortedRoutes = Object.keys(ROUTE_CONFIG).sort((a, b) => b.length - a.length)
  for (const route of sortedRoutes) {
    if (pathname.startsWith(route + '/')) {
      return ROUTE_CONFIG[route]
    }
  }

  const parts = pathname.split('/').filter(Boolean)
  if (parts.length > 0) {
    const title = parts[parts.length - 1]
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    return {
      breadcrumbs: getPathBreadcrumbs(pathname),
      title,
      subtitle: undefined,
      searchPlaceholder: 'Search',
      dropdownLabel: 'Default',
    }
  }

  return null
}
