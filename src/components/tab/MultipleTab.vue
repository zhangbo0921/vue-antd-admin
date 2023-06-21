<template>
  <div class="multi-tabs">
    <ATabs
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      size="small"
      :animated="false"
      :tabBarGutter="3"
      @change="handleChange"
    >
      <ATabPane
        v-for="(tab, index) in tabList"
        :key="tab.fullPath"
        :closable="false"
        :forceRender="true"
      >
        <template #tab>
          <TabContent :tabinfo="tab" :index="index"></TabContent>
        </template>
      </ATabPane>
      <template #rightExtra>
        <TabContent :tabinfo="currentRoute" :index="1" :isExtra="true">
          <Icon icon="more-outlined" style="font-size: 12px" class="ant-tabs-extra-more-btn" />
        </TabContent>
      </template>
    </ATabs>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '@/stores'
import { computed, ref } from 'vue'
import TabContent from '@/components/tab/TabContent.vue'
import Icon from '@/components/icon/Icon.vue'
import { listenerRouteChange } from '@/utils/routeChange'
import type { TabInfo } from '@/types/types'

const router = useRouter()
const route = useRoute()
const currentRoute = route as unknown as TabInfo
const tabStore = useTabStore()

const activeKey = ref('')

// 初始化
const tabList = computed(() => tabStore.tabList)

// 处理tab改变事件
const handleChange = (targetKey: any) => {
  router.push(targetKey as string)
}

// route监听
listenerRouteChange((route) => {
  activeKey.value = route?.fullPath as string
})
</script>

<style lang="less">
@import '@/less/var.less';
.multi-tabs {
  background: #fff;
  padding: 8px 8px 0px 8px;
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0 0 8px 0;
  }
  .ant-tabs-card.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab {
    padding: 6px 12px;
  }
  &.pro-fixed-multiple-tab {
    position: fixed;
    z-index: 18;
    width: 100%;
    top: @layout-header-height;
    border-top: 1px solid rgba(0, 21, 41, 0.08);
  }
}
</style>
