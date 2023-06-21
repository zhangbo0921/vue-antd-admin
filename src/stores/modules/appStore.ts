import setting from '@/config/setting'
import type { AppConfig, RouterConfig } from '@/types/types'
import { defineStore } from 'pinia'

export type AppState = AppConfig & RouterConfig

export const appStore = defineStore('appStore', {
  state: (): AppState => {
    return setting
  },
  getters: {
    isKeepAlive: (state) => state.cacheType === 'keepAlive'
  }
})
