import ProLayout from '@/components/layout/ProLayout.vue'
import RouteView from '@/components/layout/RouteView.vue'
import settings from '@/config/setting'
import { RedirectName } from '@/types/constants'

import dashboard from '@/router/modules/dashboard'
import type { MenuInfo } from '@/types/types'

export const syncRoute = [dashboard]

export const rootRoutes: MenuInfo = {
  path: '/',
  name: 'Root',
  component: RouteView,
  redirect: '/dashboard/analysis'
}

export const auth: MenuInfo = {
  path: '/auth',
  name: 'Auth',
  component: RouteView,
  redirect: '/auth/login',
  meta: {
    title: '安全认证',
    hideMenu: true
  },
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

export const redirect: MenuInfo = {
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

export const baseRoutes: MenuInfo[] = [rootRoutes, auth, redirect, PAGE_NOT_FOUND_ROUTE]
