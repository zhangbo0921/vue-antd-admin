<template>
  <div class="page-layout">
    <RouterView v-slot="{ Component, route }">
      <KeepAlive :include="cacheTabList" v-if="isKeepAlive">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
      <component v-else :is="Component" :key="route.fullPath" />
    </RouterView>
    <FramePage :frameList="frameTabList"></FramePage>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore, useTabStore } from '@/stores'
import { computed, type ComputedRef } from 'vue'
import FramePage from '@/components/frame/FramePage.vue'
const tabStore = useTabStore()
const appStore = useAppStore()

// 是否启用keepalive
const isKeepAlive = computed(() => appStore.isKeepAlive)
let cacheTabList: ComputedRef<string[]>
if (isKeepAlive) {
  cacheTabList = computed(() => tabStore.cachedTabList)
}
const frameTabList = computed(() => tabStore.getFrameTabsAction())
</script>

<style lang="less">
.page-layout {
  padding: 8px;
}
</style>
