import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupIcons } from '@/components/icon'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupIcons(app)

app.mount('#app')
