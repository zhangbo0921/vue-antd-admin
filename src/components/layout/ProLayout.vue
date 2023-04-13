<template>
  <a-layout class="unvue-layout">
    <a-layout-header
      v-if="isTop || isMix"
      class="unvue-header"
      :class="isHeaderLight ? 'unvue-header-light' : 'unvue-header-dark'"
    >
      Header
    </a-layout-header>
    <a-layout-sider v-if="isSider" :theme="siderTheme">Sider</a-layout-sider>
    <a-layout>
      <a-layout-sider v-if="isMix" :theme="siderTheme">Sider</a-layout-sider>
      <a-layout-content>
        <a-layout-header
          v-if="isSider"
          class="unvue-header"
          :class="isHeaderLight ? 'unvue-header-light' : 'unvue-header-dark'"
        >
          Header
        </a-layout-header>
        <div class="unvue-content">
          Layout：
          <a-radio-group v-model:value="layout">
            <a-radio-button value="top">top</a-radio-button>
            <a-radio-button value="mix">mix</a-radio-button>
            <a-radio-button value="sider">sider</a-radio-button>
          </a-radio-group>
          <br />
          Header Theme：
          <a-radio-group v-model:value="headerTheme">
            <a-radio-button value="light">light</a-radio-button>
            <a-radio-button value="dark">dark</a-radio-button>
          </a-radio-group>
          <br />
          <template v-if="!isTop">
            Sider Theme：
            <a-radio-group v-model:value="siderTheme">
              <a-radio-button value="light">light</a-radio-button>
              <a-radio-button value="dark">dark</a-radio-button>
            </a-radio-group>
            <br />
          </template>
          链接：
          <a-space>
            <RouterLink to="/dashboard/analysis">Analysis</RouterLink>
            <RouterLink to="/dashboard/settings">Settings</RouterLink>
          </a-space>
          <br />
          <br />
          <br />
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

// 布局：top/sider/mix
const layout = ref('mix')

const isMix = computed(() => {
  return layout.value === 'mix'
})
const isTop = computed(() => {
  return layout.value === 'top'
})
const isSider = computed(() => {
  return layout.value === 'sider'
})

// header主题：dark/light
const headerTheme = ref('light')

const isHeaderLight = computed(() => {
  return headerTheme.value == 'light'
})

// sider主题：dark/light
const siderTheme = ref('dark')
</script>
<style lang="less">
@import '@/less/theme.less';
</style>
