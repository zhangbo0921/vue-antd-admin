import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from '@/config/route.config'

const routes = [...baseRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export const setupRouter = (app: App) => {
  app.use(router)
}
