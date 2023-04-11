import type { App } from 'vue'
import { createPinia } from 'pinia'
import { counterStore } from '@/stores/counter'

const pinia = createPinia()

export const setupStore = (app: App) => {
  app.use(pinia)
}

export { counterStore as useCounterStore }
