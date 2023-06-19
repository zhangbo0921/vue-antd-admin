import { useTabStore } from '@/stores/modules/tabStore'
import type { TabInfo } from '@/types/types'
import { useRouter, type Router } from 'vue-router'

export const useGo = (router?: Router) => {
  if (!router) {
    router = useRouter()
  }
  const { push } = router
  const tabStore = useTabStore()
  const go = async (tabinfo: TabInfo) => {
    await push(tabinfo.path)
    tabStore.updateTabinfo(tabinfo)
  }
  return {
    go
  }
}
