import ProLayout from '@/components/layout/ProLayout.vue'
import RouteView from '@/components/layout/RouteView.vue'
import settings from '@/config/setting'
import { RedirectName } from '@/types/constants'

import dashboard from '@/router/modules/dashboard'
import type { MenuInfo } from '@/types/types'

const localRoute = [dashboard]

const rootRoutes: MenuInfo = {
  path: '/',
  name: 'Root',
  component: RouteView,
  redirect: '/dashboard/analysis'
}

const auth: MenuInfo = {
  path: '/auth',
  name: 'Auth',
  component: RouteView,
  redirect: '/auth/login',
  children: [
    {
      path: 'login',
      name: 'LoginPage',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: 'register',
      name: 'RegisterPage',
      component: () => import('@/views/login/RegisterView.vue')
    }
  ]
}

const redirect: MenuInfo = {
  path: '/redirect',
  name: 'RedirectView',
  meta: {
    title: '路由跳转',
    hideMenu: true
  },
  component: ProLayout,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      meta: {
        keepAlive: false
      },
      component: () => import('@/components/page/RedirectView.vue')
    }
  ]
}
// 404路由
export const PAGE_NOT_FOUND_ROUTE: MenuInfo = {
  path: '/:path(.*)*',
  name: settings.pageNotFoundName,
  component: ProLayout,
  meta: {
    title: 'PageNotFound',
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      meta: {
        title: 'PageNotFound',
        hideMenu: true
      },
      component: () => import('@/views/exception/PageNotFoundView.vue')
    }
  ]
}

export const baseRoutes: MenuInfo[] = [
  rootRoutes,
  auth,
  ...(settings.localRoutes ? localRoute : []),
  redirect,
  PAGE_NOT_FOUND_ROUTE
]
