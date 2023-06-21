<template>
  <div class="page-layout">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </RouterView>
    <FramePage :frameList="frameTabList"></FramePage>
  </div>
</template>
<script lang="ts" setup>
import { useTabStore } from '@/stores'
import { computed } from 'vue'
import FramePage from '@/components/frame/FramePage.vue'
const tabStore = useTabStore()

const frameTabList = computed(() => tabStore.getFrameTabsAction())
</script>

<style lang="less">
.page-layout {
  padding: 8px;
}
</style>
