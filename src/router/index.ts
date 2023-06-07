import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { baseRoutes } from '@/config/route.config'

const routes = [...baseRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
})

export const setupRouter = (app: App) => {
  app.use(router)
}
