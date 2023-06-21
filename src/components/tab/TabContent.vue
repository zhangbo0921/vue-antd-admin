<template>
  <ADropdown :trigger="!isExtra ? ['contextmenu'] : ['hover']">
    <div v-if="!isExtra">
      {{ getTabInfo.query.title ? getTabInfo.query.title : getTabInfo.title }}
      <Icon
        v-if="showReLoad && tabinfo.fullPath === route.fullPath"
        @click.stop="handleReload"
        class="multi-tab-reload-btn multi-tab-btn"
        icon="reload-outlined"
        style="font-size: 12px; margin: 0 4px 0 4px"
      ></Icon>
      <Icon
        v-if="tabinfo.enableClose"
        icon="close-outlined"
        style="font-size: 12px; margin: 0 0px 0 4px"
        class="multi-tab-close-btn multi-tab-btn"
        @click.stop="handleClose"
      />
    </div>
    <div v-else>
      <Icon
        v-if="tabinfo.fullPath === route.fullPath"
        class="ant-tabs-extra-more-btn"
        icon="more-outlined"
      ></Icon>
    </div>
  </ADropdown>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/types'
import Icon from '@/components/icon/Icon.vue'
import { useRoute, type RouteLocationNormalized, useRouter } from 'vue-router'
import { useAppStore, useTabStore } from '@/stores'
import { computed, unref } from 'vue'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

const props = defineProps<{
  tabinfo: TabInfo
  isExtra?: boolean
}>()

const getTabInfo = computed(() => {
  const [tab] = tabStore.tabList.filter((tab) => tab.fullPath === props.tabinfo.fullPath)
  return tab
})

const showReLoad = computed(() => appStore.enableReLoad)

const handleReload = () => {
  tabStore.refreshPage(unref(getTabInfo))
}
const handleClose = () => {
  console.log('close', props.tabinfo.fullPath)
  tabStore.closeTab(props.tabinfo.fullPath as string, router)
}
</script>

<style lang="less">
.multi-tab-btn {
  color: rgba(0, 0, 0, 0.65) !important;
}
.multi-tab-btn:hover {
  color: unset !important;
}
</style>
