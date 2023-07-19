import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter, router } from './router'
import { setupStore } from './stores'
import { initRouteGuard } from './router/guard'
import { setupIcons } from '@/components/icon'

/**
 * 设置dayjs
 */
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/zh-cn'
dayjs.extend(updateLocale)
dayjs.updateLocale('zh-cn', {
  weekStart: 0
})

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupIcons(app)
initRouteGuard(router)

dayjs.locale('zh-cn')

app.mount('#app')
