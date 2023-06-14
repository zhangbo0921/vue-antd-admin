import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { configMockPlugin } from './mock'

export interface ViteConfig {
  VITE_USE_MOCK: string
}

export function createVitePlugins(env: ViteConfig, command: string) {
  const { VITE_USE_MOCK } = env
  const isBuild = command === 'build'
  const useMock = VITE_USE_MOCK === 'true'

  const vitePlugins = [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia']
    })
  ]
  useMock && vitePlugins.push(configMockPlugin(useMock, isBuild))
  return vitePlugins
}
