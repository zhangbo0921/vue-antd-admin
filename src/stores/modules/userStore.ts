import type { MenuInfo } from '@/types/types'
import { defineStore } from 'pinia'
import settings from '@/config/setting'
import { baseRoutes } from '@/config/route.config'
import { login, getMenus } from '@/api/system/user'
import type { LoginParams } from '@/api/model/system'

interface UserState {
  menus: MenuInfo[]
  showMenus: MenuInfo[]
}

export const userStore = defineStore('user', {
  state: (): UserState => {
    return { menus: [], showMenus: [] }
  },
  actions: {
    // 登录
    async login(params: LoginParams) {
      const loginData = (await login(params)).data
      console.log(loginData)
    },
    // 登录后逻辑
    afterLogin() {},
    // 退出
    logout() {},
    // 退出后逻辑
    afterLogout() {},
    async getMenu() {
      console.log(settings.localRoutes)
      if (settings.localRoutes) {
        this.menus = baseRoutes
      } else {
        this.menus = (await getMenus()).data
      }
    },
    // 设置前端菜单
    setFrontMenus(menus: MenuInfo[]) {},
    // 设置动态路由
    setDynamicRoute(menus: MenuInfo[]) {},
    // 过滤跟路径和不显示菜单
    filterMenus(menus: MenuInfo[]): MenuInfo[] {
      return menus.filter((menu) => {
        // 过滤掉根路径 & 过滤隐藏路由
        if (menu.path === '/' || menu.meta?.hideMenu) {
          return false
        } else {
          return true
        }
      })
    }
  }
})
