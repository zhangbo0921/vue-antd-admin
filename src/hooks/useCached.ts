import { useTabStore } from '@/stores'
import { RedirectName } from '@/types/constants'
import { onMounted, onUnmounted, type Ref, unref, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export function useCached(fullPath: string, data: Ref<any>) {
  const tabStore = useTabStore()
  const enableCached = ref(true)

  onMounted(() => {
    const cacheData = tabStore.getCachedData(fullPath)
    if (cacheData) {
      data.value = cacheData
    }
  })
  onUnmounted(() => {
    const exists = tabStore.tabList.filter((tab) => tab.fullPath === fullPath)
    if (enableCached.value && exists && exists.length > 0) {
      tabStore.addCachedData({ fullPath: fullPath, data: unref(data) })
    }
  })
  onBeforeRouteLeave((to, from) => {
    if (to.name === RedirectName) {
      enableCached.value = false
    }
  })
}
