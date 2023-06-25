<template>
  <ADropdown :trigger="!isExtra ? ['contextmenu'] : ['hover']">
    <div v-if="!isExtra">
      {{ getTabInfo.query.title ? getTabInfo.query.title : getTabInfo.meta.title }}
      <Icon
        v-if="showReLoad && tabinfo.fullPath === route.fullPath"
        @click.stop="handleReload"
        class="multi-tab-reload-btn multi-tab-btn"
        icon="reload-outlined"
        style="font-size: 12px; margin: 0 4px 0 4px"
      ></Icon>
      <Icon
        v-if="tabinfo.enableClose && tabStore.tabList.length > 1"
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
    <template #overlay>
      <AMenu>
        <AMenuItem key="close" @click="handleCloseOther" :disabled="!showCloseOther">
          关闭其他
        </AMenuItem>
        <AMenuItem key="close-left" @click="handleCloseLeft" :disabled="!showCloseLeft">
          关闭左侧
        </AMenuItem>
        <AMenuItem key="close-right" @click="handleCloseRight" :disabled="!showCloseRight">
          关闭右侧
        </AMenuItem>
        <AMenuItem v-if="showReLoad" key="reload" @click="handleReload"> 刷新当前 </AMenuItem>
      </AMenu>
    </template>
  </ADropdown>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/types'
import Icon from '@/components/icon/Icon.vue'
import { useRoute, useRouter } from 'vue-router'
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
const tabIndex = computed(() => {
  return tabStore.tabList.findIndex((tab) => tab.fullPath === props.tabinfo.fullPath)
})

const getTabInfo = computed(() => {
  const [tab] = tabStore.tabList.filter((tab) => tab.fullPath === props.tabinfo.fullPath)
  return tab
})

const showReLoad = computed(() => appStore.enableReLoad)

const handleReload = () => {
  tabStore.refreshPage(unref(getTabInfo))
}
const handleClose = () => {
  tabStore.closeTab(props.tabinfo.fullPath as string, router)
}

const handleCloseOther = () => {
  tabStore.closeOtherTab(unref(getTabInfo))
}
const handleCloseRight = () => {
  tabStore.closeRightTab(unref(getTabInfo))
}
const handleCloseLeft = () => {
  tabStore.closeLeftTab(unref(getTabInfo))
}
const showCloseOther = computed(() => tabStore.tabList.length > 1)
const showCloseLeft = computed(() => tabIndex.value > 0)
const showCloseRight = computed(() => tabIndex.value + 1 < tabStore.tabList.length)
</script>

<style lang="less">
.multi-tab-btn {
  color: rgba(0, 0, 0, 0.65) !important;
}
.multi-tab-btn:hover {
  color: unset !important;
}
</style>
