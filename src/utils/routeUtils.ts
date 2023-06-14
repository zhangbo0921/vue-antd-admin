import { Layout } from '@/types/constants'
import type { MenuInfo } from '@/types/types'

declare type Recordable<T = any> = Record<string, T>
declare type ViewType = Record<string, () => Promise<Recordable>>

const ProLayout = () => import('@/components/layout/ProLayout.vue')
const RouteView = () => import('@/components/layout/RouteView.vue')

export const asyncImportRoute = (menus: MenuInfo[]) => {
  const views: ViewType = import.meta.glob('../views/**/*.vue')
  if (!menus) return
  menus.forEach((menu) => {
    const { component, children } = menu
    if (component) {
      const layout = importLayout(component)
      if (layout) {
        menu.component = layout
      } else {
        menu.component = importView(views, component as string)
      }
    }
    children && asyncImportRoute(children)
  })
}

const importLayout = (component: string) => {
  if (component === Layout.ProLayout) {
    return ProLayout
  }
  if (component === Layout.RouteView) {
    return RouteView
  }
}
const importView = (views: ViewType, component: string) => {
  const keys = Object.keys(views)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return views[matchKey]
  } else {
    console.error('在src/views/下找不到`' + component + '.vue`!')
    return
  }
}
