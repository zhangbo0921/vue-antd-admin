import { fileURLToPath, URL } from 'url'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const port = Number(loadEnv(mode, process.cwd()).VITE_PORT)
  const proxy = loadEnv(mode, process.cwd()).VITE_PROXY
  const VITE_USE_MOCK = loadEnv(mode, process.cwd()).VITE_USE_MOCK
  const VITE_PUBLIC_PATH = loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH
  return {
    base: VITE_PUBLIC_PATH,
    plugins: createVitePlugins({ VITE_USE_MOCK }, command),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      port,
      proxy: createProxy(JSON.parse(proxy))
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: ['ant-design-vue']
    }
  }
}
