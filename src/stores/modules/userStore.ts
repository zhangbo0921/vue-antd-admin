import type { MenuInfo, UserInfo } from '@/types/types'
import { defineStore } from 'pinia'
import settings from '@/config/setting'
import { syncRoute, baseRoutes } from '@/config/route.config'
import { login, getMenus } from '@/api/system/auth'
import type { LoginParams, Token } from '@/api/model/system'
import store from 'store2'
import { Constants } from '@/types/constants'
import jwtDecode from 'jwt-decode'
import { toRaw } from 'vue'
import { asyncImportRoute } from '@/utils/routeUtils'

interface UserState {
  menus: MenuInfo[]
  showMenus: MenuInfo[]
  addRoutes: MenuInfo[]
  userInfo: UserInfo
  token: Token
  isRoutesLoadSuccess: boolean
}

export const userStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      menus: [],
      showMenus: [],
      addRoutes: [],
      token: {
        access_token: '',
        token_type: '',
        refresh_token: '',
        expires_in: 0,
        scope: ''
      },
      userInfo: {
        userId: 0,
        tenantId: 0,
        userName: '',
        nickName: '',
        avatar: '',
        deptId: 0,
        deptPid: 0,
        deptPids: '',
        deptName: '',
        homePath: ''
      },
      isRoutesLoadSuccess: false
    }
  },
  getters: {
    tokenValue: (state) => state.token?.access_token || store.get(Constants.AccessToken)
  },
  actions: {
    // 登录
    async login(params: LoginParams) {
      this.token = (await login(params)).data
      if (this.token.access_token) {
        // 添加token
        store.set(Constants.AccessToken, this.token.access_token)
      }
      this.afterLogin()
    },
    // 登录后逻辑
    async afterLogin() {
      // 获取用户信息
      await this.getUserInfo()
      // 获取菜单信息
      await this.getMenu()
    },
    getUserInfo() {
      this.userInfo = jwtDecode(store.get(Constants.AccessToken)) as UserInfo
      if (!this.userInfo.homePath) {
        this.userInfo.homePath = settings.homePath
      }
    },
    async getMenu() {
      console.debug('localRoutes:', settings.localRoutes)
      if (settings.localRoutes) {
        this.menus = [...baseRoutes, ...syncRoute]
        this.addRoutes = syncRoute
      } else {
        const syncMenu = (await getMenus()).data
        asyncImportRoute(syncMenu)
        this.menus = [...baseRoutes, ...syncMenu]
        this.addRoutes = syncMenu
      }
    },
    getShowMenu(): MenuInfo[] {
      const menus = toRaw(this.menus)
      const showMenu = this.filterMenus(menus)
      console.debug('showMenu', showMenu)
      return showMenu
    },
    getAddRoutes() {
      const addRoutes = toRaw(this.addRoutes)
      console.debug('addRoute', addRoutes)
      return addRoutes
    },
    setRoutesLoadSuccess(flag: boolean) {
      this.isRoutesLoadSuccess = flag
    },
    // 退出
    logout() {},
    // 过滤跟路径和不显示菜单
    filterMenus(menus: MenuInfo[]): MenuInfo[] {
      return menus.filter((menu) => {
        // 过滤掉根路径 & 过滤隐藏路由
        if (menu.path === '/' || menu.meta?.hideMenu) {
          return false
        } else {
          if (menu.meta?.hideChildren) {
            menu.children = []
          } else if (menu.children && menu.children.length > 0) {
            menu.children = this.filterMenus(menu.children)
          }
          return true
        }
      })
    },
    clearAll() {
      this.$reset()
      store.clearAll()
    }
  }
})
