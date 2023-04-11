import type { RouteRecordRaw } from 'vue-router'
import ProLayout from '@/components/layout/ProLayout.vue'

const rootRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: ProLayout,
  redirect: '/dashboard/analysis',
  children: []
}

const dashboardRoutes: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: ProLayout,
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/Dashboard.vue')
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/Settings.vue')
    }
  ]
}

export const baseRoutes = [rootRoutes, dashboardRoutes]
