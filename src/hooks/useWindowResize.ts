import { useDebounceFn, tryOnMounted, tryOnUnmounted } from '@vueuse/core'

export type WindowSizeOptions = {
  once?: boolean
  immediate?: boolean
  listenerOptions?: AddEventListenerOptions | boolean
}

export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export function useWindowSizeFn<T>(fn: Fn<T>, wait = 150, options?: WindowSizeOptions) {
  let handler = () => {
    fn()
  }
  const handleSize = useDebounceFn(handler, wait)
  handler = handleSize

  const start = () => {
    if (options && options.immediate) {
      handler()
    }
    window.addEventListener('resize', handler)
  }
  const stop = () => {
    window.removeEventListener('resize', handler)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })
  return [start, stop]
}
