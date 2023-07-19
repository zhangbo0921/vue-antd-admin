import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter, router } from './router'
import { setupStore } from './stores'
import { initRouteGuard } from './router/guard'
import { setupIcons } from '@/components/icon'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupIcons(app)
initRouteGuard(router)

dayjs.locale('zh-cn')

app.mount('#app')
