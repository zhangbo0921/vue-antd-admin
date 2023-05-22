import type { App } from 'vue'
import { createPinia } from 'pinia'
import { userStore } from '@/stores/modules/userStore'

const pinia = createPinia()

export const setupStore = (app: App) => {
  app.use(pinia)
}

export { userStore as useUserStore }
