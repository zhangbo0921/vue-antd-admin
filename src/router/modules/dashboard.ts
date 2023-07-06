import ProLayout from '@/components/layout/ProLayout.vue'
import type { MenuInfo } from '@/types/types'

const dashboardRoutes: MenuInfo = {
  path: '/dashboard',
  name: 'Dashboard',
  component: ProLayout,
  meta: {
    title: '仪表盘',
    icon: 'dashboard-outlined'
  },
  children: [
    {
      key: 'analysis',
      path: 'analysis',
      name: 'Analysis',
      meta: {
        title: '分析页'
      },
      component: () => import('@/views/dashboard/Dashboard.vue')
    },
    {
      key: 'settings',
      path: 'settings',
      name: 'Settings',
      meta: {
        title: '系统设置'
      },
      component: () => import('@/views/dashboard/Workspace.vue')
    }
  ]
}

export default dashboardRoutes
