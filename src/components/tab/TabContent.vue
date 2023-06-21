<template>
  <ADropdown :trigger="!props.isExtra ? ['contextmenu'] : ['hover']">
    <div v-if="!props.isExtra">
      {{ getTabInfo.query.title ? getTabInfo.query.title : getTabInfo.title }}
      <Icon
        v-if="showReLoad && props.tabinfo.fullPath === route.fullPath"
        @click="handleReload"
        class="multi-tab-reload-btn"
        icon="reload-outlined"
        style="font-size: 12px; margin: 0 4px 0 4px"
      ></Icon>
      <Icon
        icon="close-outlined"
        style="font-size: 12px; margin: 0 4px 0 4px"
        class="ant-tabs-extra-more-btn"
      />
    </div>
    <div v-else>
      <Icon
        v-if="props.tabinfo.fullPath === route.fullPath"
        class="ant-tabs-extra-more-btn"
        icon="more-outlined"
      ></Icon>
    </div>
  </ADropdown>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/types'
import Icon from '@/components/icon/Icon.vue'
import { useRoute, type RouteLocationNormalized } from 'vue-router'
import { useAppStore, useTabStore } from '@/stores'
import { computed, unref } from 'vue'

const appStore = useAppStore()
const route = useRoute()
const tabStore = useTabStore()

const props = defineProps<{
  tabinfo: TabInfo | RouteLocationNormalized
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
</script>
