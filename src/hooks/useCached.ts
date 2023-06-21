import { useTabStore } from '@/stores'
import { onMounted, onUnmounted, type Ref, unref } from 'vue'

export function useCached(fullPath: string, data: Ref<any>) {
  const tabStore = useTabStore()

  onMounted(() => {
    const cacheData = tabStore.getCachedData(fullPath)
    if (cacheData) {
      data.value = cacheData
    }
  })
  onUnmounted(() => {
    tabStore.addCachedData({ fullPath: fullPath, data: unref(data) })
  })
}
