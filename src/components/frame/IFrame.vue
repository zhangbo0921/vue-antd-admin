<template>
  <div class="yz-pro-iframe-page">
    <ASpin :spinning="loading" :style="getWrapStyle">
      <iframe
        class="yz-pro-iframe-page__main"
        :src="frameSrc"
        :style="getWrapStyle"
        ref="frameRef"
        @load="handleOnLoad"
      ></iframe>
    </ASpin>
  </div>
</template>
<script lang="ts" setup>
import { ref, type CSSProperties, computed, unref } from 'vue'
import { useAppStore } from '@/stores'

import { useWindowSizeFn } from '@/hooks/useWindowResize'

defineProps({
  frameSrc: String
})
const appStore = useAppStore()

// loading 处理
const loading = ref(true)
const handleOnLoad = () => {
  loading.value = false
}
// frame 高度处理
const heightRef = ref(0)
const frameRef = ref<HTMLIFrameElement>()
function viewHeight() {
  const frame = unref(frameRef)
  if (!frame) {
    return
  }
  heightRef.value = window.innerHeight - (appStore.headerHeight as number) - 56
}
// 监听窗口变化，修改frame高度
useWindowSizeFn<void>(viewHeight, 150, { immediate: true })
const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`
  }
})
</script>
<style lang="less">
.yz-pro-iframe-page {
  height: 100%;
  .ant-spin-nested-loading {
    position: relative;
    height: 100%;

    .ant-spin-container {
      width: 100%;
      height: 100%;
    }
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
