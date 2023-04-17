<template>
  <a-layout class="unvue-layout">
    <a-layout-header
      v-if="isTop || isMix"
      class="unvue-header"
      :class="{
        'unvue-header-light': isHeaderLight,
        'unvue-header-dark': !isHeaderLight,
        'unvue-header-fixed unvue-header-fixed--sider': isFixedHeader
      }"
    >
      <div class="unvue-header-left">Header Left</div>
      <div class="unvue-header-right">Header Right</div>
    </a-layout-header>
    <a-layout-header
      v-if="(isTop || isMix) && isFixedHeader"
      class="unvue-header"
      :class="{ 'unvue-header-light': isHeaderLight, 'unvue-header-dark': !isHeaderLight }"
    >
    </a-layout-header>
    <a-layout-sider
      v-if="isSider"
      class="unvue-sider"
      :theme="siderTheme"
      :class="{ 'unvue-sider-fixed': isFixedSider, 'unvue-layout-sider-dark': isSiderDark }"
      >Sider</a-layout-sider
    >
    <a-layout-sider
      v-if="isSider && isFixedSider"
      class="unvue-sider"
      :theme="siderTheme"
    ></a-layout-sider>
    <a-layout>
      <a-layout-sider
        v-if="isMix"
        class="unvue-sider"
        :theme="siderTheme"
        :class="{ 'unvue-sider-fixed': isFixedSider, 'unvue-layout-sider-dark': isSiderDark }"
      >
        Sider
      </a-layout-sider>
      <a-layout-sider
        v-if="isMix && isFixedSider"
        class="unvue-sider"
        :theme="siderTheme"
      ></a-layout-sider>
      <a-layout-content>
        <a-layout-header
          v-if="isSider"
          class="unvue-header"
          :class="{
            'unvue-header-light': isHeaderLight,
            'unvue-header-dark': !isHeaderLight,
            'unvue-header-fixed': isFixedHeader
          }"
        >
          <div class="unvue-header-left">Header Left</div>
          <div class="unvue-header-right">Header Right</div>
        </a-layout-header>
        <a-layout-header
          v-if="isSider && isFixedHeader"
          class="unvue-header"
          :class="{ 'unvue-header-light': isHeaderLight, 'unvue-header-dark': !isHeaderLight }"
        >
        </a-layout-header>
        <div class="unvue-content">
          Layout：
          <a-radio-group v-model:value="layout">
            <a-radio-button value="top">top</a-radio-button>
            <a-radio-button value="mix">mix</a-radio-button>
            <a-radio-button value="sider">sider</a-radio-button>
          </a-radio-group>
          <br />
          Fixed Header
          <a-radio-group v-model:value="isFixedHeader">
            <a-radio-button :value="true">true</a-radio-button>
            <a-radio-button :value="false">false</a-radio-button>
          </a-radio-group>
          <br />
          <template v-if="!isTop">
            Fixed Sider
            <a-radio-group v-model:value="isFixedSider">
              <a-radio-button :value="true">true</a-radio-button>
              <a-radio-button :value="false">false</a-radio-button>
            </a-radio-group>
            <br />
          </template>
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

const isFixedHeader = ref(true)
const isFixedSider = ref(false)

// header主题：dark/light
const headerTheme = ref('light')
const isHeaderLight = computed(() => {
  return headerTheme.value == 'light'
})

// sider主题：dark/light
const siderTheme = ref('dark')
const isSiderDark = computed(() => {
  return siderTheme.value === 'dark'
})
</script>
<style lang="less">
@import '@/less/theme.less';
</style>
