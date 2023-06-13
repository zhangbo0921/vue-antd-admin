import type { MenuInfo, UserInfo } from '@/types/types'
import { defineStore } from 'pinia'
import settings from '@/config/setting'
import { baseRoutes } from '@/config/route.config'
import { login, getMenus } from '@/api/system/user'
import type { LoginParams, Token } from '@/api/model/system'
import store from 'store2'
import { Constants } from '@/types/constants'
import jwtDecode from 'jwt-decode'
import { toRaw } from 'vue'

interface UserState {
  menus: MenuInfo[]
  showMenus: MenuInfo[]
  userInfo: UserInfo
  token: Token
  isRoutesLoadSuccess: boolean
}

export const userStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      menus: [],
      showMenus: [],
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
    tokenValue: (state) => state.token?.access_token || store.get(Constants.AccessToken),
    showMenuValue: (state) => {
      console.log(state.menus)
      console.log(toRaw(state.menus))
    }
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
    afterLogin() {
      // 获取用户信息
      this.getUserInfo()
      // 获取菜单信息
      this.getMenu()
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
        this.menus = baseRoutes
      } else {
        this.menus = (await getMenus()).data
      }
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
          return true
        }
      })
    }
  }
})
