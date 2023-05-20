import * as Icons from '@ant-design/icons-vue'
import type { App } from 'vue'

export const setupIcons = (app: App) => {
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
  })
}
