import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from '@/router/base'

const routes = [...baseRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export const setupRouter = (app: App) => {
  app.use(router)
}
