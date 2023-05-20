<template>
  <div class="header-item-container">
    <a-space size="middle">
      <div class="header-item">
        <a-badge :dot="true">
          <a-tooltip placement="bottom">
            <template #title>消息</template>
            <Icon icon="bulb-outlined" style="font-size: 20px" />
          </a-tooltip>
        </a-badge>
      </div>
      <div class="header-item">
        <a href="https://github.com/zhangbo0921/vue-antd-admin" target="_blank">
          <a-tooltip placement="bottom">
            <template #title>仓库</template>
            <Icon icon="github-outlined" style="font-size: 20px" />
          </a-tooltip>
        </a>
      </div>
      <div class="header-item" @click="toggleFullscreen">
        <a-tooltip placement="bottom">
          <Icon icon="fullscreen-outlined" v-if="!isBrowserFullscreen" style="font-size: 20px" />
          <Icon icon="fullscreen-exit-outlined" v-else style="font-size: 20px" />
        </a-tooltip>
      </div>
      <div class="header-item">
        <a-dropdown trigger="click">
          <a-avatar>
            {{ userName }}
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <template #icon>
                  <Icon icon="user-outlined" />
                </template>
                我的信息
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <Icon icon="user-switch-outlined" />
                </template>
                切换角色
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <Icon icon="poweroff-outlined" />
                </template>
                安全退出
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-space>
  </div>
</template>
<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import { useFullscreen } from '@vueuse/core'
import { computed, ref } from 'vue'

const html = ref<HTMLElement | null>(null)
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(html)
// 浏览器全屏
const isBrowserFullscreen = computed(() => {
  return isFullscreen.value
})

const userName = ref('unvue')
</script>
