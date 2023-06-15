import { useAppStore, useUserStore } from '@/stores'
import type { RouteLocationNormalized, RouteRecordRaw, Router } from 'vue-router'
import { setRouteChange } from '@/utils/routeChange'
import { RedirectName } from '@/types/constants'

export const initRouteGuard = (router: Router) => {
  createPermissionGuard(router)
  createPageGuard(router)
}

// 创建页面守卫
export function createPageGuard(router: Router) {
  router.beforeEach((to) => {
    if (to.name === RedirectName) return true
    setRouteChange(to)
    return true
  })
}

export const createPermissionGuard = (router: Router) => {
  const userStore = useUserStore()
  const appStore = useAppStore()
  // 允许不登录
  const allowList: string[] = appStore.noLoginPath
  // 登录页面路由
  const loginRoutePath: string = appStore.loginPath
  // 404页面
  const notFoundPage = appStore.pageNotFound

  router.beforeEach(async (to, from, next) => {
    // 1. 处理动态路由没加载成功前，找不到路由的问题（必须配合404页面，也就是基础路由必须有404页面）
    //    1.1. 动态路由，由于只有基础路由，第一次进入的时候，很可能会redirect到404页面
    //    1.2. 判断动态路由是否已经成功加载
    //    1.3. 如果没有，并且to.path是404，并且to.redirectedFrom.path不是404，将to改为to.redirectedFrom
    if (
      !userStore.isRoutesLoadSuccess &&
      to.path === notFoundPage &&
      to.redirectedFrom?.path &&
      to.redirectedFrom.path !== notFoundPage
    ) {
      to = to.redirectedFrom as RouteLocationNormalized
    }

    // 2. 处理没有token的逻辑
    //    2.1. 没有token
    //    2.2. 判断是否免登陆，如果是，直接放行
    //    2.3. 如果非免登录，直接跳转登录页面，query参数传递redirect到真实想访问的路由上，登录后跳转redirect（登录逻辑看登录代码）
    const token = userStore.tokenValue

    // 没有token
    if (!token) {
      // 免登陆
      if (to.meta.ignoreAuth || allowList.includes(to.path)) {
        next()
        return
      }
      // 非免登陆，跳转登录
      next({
        path: loginRoutePath,
        replace: true,
        query: { redirect: to.fullPath }
      })
      return
    }
    // 3. 有token
    //    3.1. 动态路由没有成功加载，开始加载
    //    3.2. 服务器获取routes，并缓存
    //    3.3. 添加路由
    //    3.4. 设置已经成功加载动态路由
    //    3.5. 跳转页面

    if (!userStore.isRoutesLoadSuccess) {
      // 4. 刷新后，重新获取用户、菜单、路由信息，并添加路由
      //    4.1. 调用afterLogin，重新获取用户信息和菜单
      //    4.2. 调用重新获取路由，并添加
      //    4.3. 设置路由加载状态为：成功
      await userStore.afterLogin()
      const addRoute = userStore.getAddRoutes()
      addRoute.forEach((r) => {
        router.addRoute(r as RouteRecordRaw)
      })
      userStore.setRoutesLoadSuccess(true)

      next({
        path: to.path,
        replace: true
      })
      return
    }
    next()
  })
}
