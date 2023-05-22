import type { MenuInfo } from '@/types/types'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return { count: 0 }
  },
  actions: {
    getMenu(): MenuInfo[] {
      return [
        {
          key: '1',
          path: '/dashboard',
          name: 'Dashboard',
          component: 'ProLayout',
          meta: {
            title: '仪表盘',
            icon: 'dashboard-outlined'
          },
          redirect: '/dashboard/analysis',
          children: [
            {
              key: '2',
              path: 'analysis',
              name: 'Analysis',
              component: 'Dashboard',
              meta: {
                title: '分析页'
              }
            },
            {
              key: '3',
              path: 'settings',
              name: 'Settings',
              component: 'Settings',
              meta: {
                title: '系统设置'
              }
            }
          ]
        }
      ]
    }
  }
})
