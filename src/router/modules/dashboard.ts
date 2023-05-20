import ProLayoutVue from '@/components/layout/ProLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const dashboardRoutes: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: ProLayoutVue,
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/welcome/Dashboard.vue')
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/welcome/Settings.vue')
    }
  ]
}

export default dashboardRoutes
