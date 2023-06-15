/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(useMock: boolean, isBuild: boolean) {
  return viteMockServe({
    mockPath: './mock',
    ignore: /^\_/,
    enable: useMock
  })
}
