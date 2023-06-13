import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter, router } from './router'
import { setupStore } from './stores'
import { initRouteGuard } from './router/guard'
import { setupIcons } from '@/components/icon'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupIcons(app)
initRouteGuard(router)

app.mount('#app')
