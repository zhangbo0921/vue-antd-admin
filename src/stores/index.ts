import type { App } from 'vue'
import { createPinia } from 'pinia'
import { userStore } from '@/stores/modules/userStore'
import { appStore } from '@/stores/modules/appStore'
import { tabStore } from '@/stores/modules/tabStore'

const pinia = createPinia()

export const setupStore = (app: App) => {
  app.use(pinia)
}

export { userStore as useUserStore, appStore as useAppStore, tabStore as useTabStore }
