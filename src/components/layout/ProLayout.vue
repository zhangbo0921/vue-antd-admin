<template>
  <a-layout class="unvue-layout">
    <a-layout-header
      v-if="(isTop || isMix) && !isContentFullscreen"
      class="unvue-header"
      :class="{
        'unvue-header-light': isHeaderLight,
        'unvue-header-dark': !isHeaderLight,
        'unvue-header-fixed unvue-header-fixed--sider': isFixedHeader
      }"
    >
      <div class="unvue-header-left">
        <Logo :title="title" :img="logoPath" />
      </div>
      <div class="unvue-header-menu">
        <div
          v-if="!isTop"
          class="trigger-collapsed"
          @click="() => (isSiderCollapsed = !isSiderCollapsed)"
        >
          <menu-fold-outlined v-if="!isSiderCollapsed" style="font-size: 18px" />
          <menu-unfold-outlined v-else style="font-size: 18px" />
        </div>
        <div v-if="isTop" class="unvue-header-menu-container">
          <SimpleMenu mode="horizontal" :theme="headerTheme" :data="menuInfo" />
        </div>
      </div>
      <div class="unvue-header-right">
        <HeaderItem />
      </div>
    </a-layout-header>
    <a-layout-header
      v-if="(isTop || isMix) && isFixedHeader && !isContentFullscreen"
      class="unvue-header"
      :class="{ 'unvue-header-light': isHeaderLight, 'unvue-header-dark': !isHeaderLight }"
    >
    </a-layout-header>
    <a-layout-sider
      v-if="isSider && !isContentFullscreen"
      v-model:collapsed="isSiderCollapsed"
      collapsible
      :trigger="null"
      class="unvue-sider"
      :theme="siderTheme"
      :collapsedWidth="siderCollapsedWidth"
      :class="{ 'unvue-sider-fixed': isFixedSider, 'unvue-layout-sider-dark': isSiderDark }"
      :style="isFixedSider && isSider ? { overflow: 'hidden', height: '100vh' } : {}"
    >
      <Logo
        :title="title"
        :img="logoPath"
        :style="isSiderCollapsed ? { width: siderCollapsedWidth + 'px' } : {}"
      />
      <div class="unvue-menu-container">
        <SimpleMenu mode="inline" :theme="siderTheme" :data="menuInfo" />
      </div>
    </a-layout-sider>
    <a-layout-sider
      v-if="isSider && isFixedSider && !isContentFullscreen"
      class="unvue-sider"
      :theme="siderTheme"
      v-model:collapsed="isSiderCollapsed"
      collapsible
      :trigger="null"
      :collapsedWidth="siderCollapsedWidth"
    ></a-layout-sider>
    <a-layout>
      <a-layout-sider
        v-if="isMix && !isContentFullscreen"
        v-model:collapsed="isSiderCollapsed"
        collapsible
        :trigger="null"
        :collapsedWidth="siderCollapsedWidth"
        class="unvue-sider"
        :theme="siderTheme"
        :class="{ 'unvue-sider-fixed': isFixedSider, 'unvue-layout-sider-dark': isSiderDark }"
      >
        <SimpleMenu mode="inline" :theme="siderTheme" :data="menuInfo" />
      </a-layout-sider>
      <a-layout-sider
        v-if="isMix && isFixedSider && !isContentFullscreen"
        class="unvue-sider"
        v-model:collapsed="isSiderCollapsed"
        collapsible
        :trigger="null"
        :theme="siderTheme"
        :collapsedWidth="siderCollapsedWidth"
      ></a-layout-sider>
      <a-layout-content>
        <a-layout-header
          v-if="isSider && !isContentFullscreen"
          class="unvue-header"
          :class="{
            'unvue-header-light': isHeaderLight,
            'unvue-header-dark': !isHeaderLight,
            'unvue-header-fixed': isFixedHeader,
            'unvue-header-collapsed--sider': isSiderCollapsed
          }"
        >
          <div class="unvue-header-left" style="justify-content: flex-start">
            <div class="trigger-collapsed" @click="() => (isSiderCollapsed = !isSiderCollapsed)">
              <menu-fold-outlined v-if="!isSiderCollapsed" style="font-size: 20px" />
              <menu-unfold-outlined v-else style="font-size: 20px" />
            </div>
          </div>
          <div class="unvue-header-right">
            <HeaderItem />
          </div>
        </a-layout-header>
        <a-layout-header
          v-if="isSider && isFixedHeader && !isContentFullscreen"
          :class="{ 'unvue-header-light': isHeaderLight, 'unvue-header-dark': !isHeaderLight }"
        >
        </a-layout-header>
        <div class="unvue-content">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
    <a-drawer
      v-model:visible="isShowSetting"
      width="270"
      title="设置"
      placement="right"
      :bodyStyle="{ padding: '16px' }"
    >
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
        <a-radio-group v-model:value="isFixedSider" :disabled="!isEnableFixedSider">
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
      内容全屏：
      <a-radio-group v-model:value="isContentFullscreen">
        <a-radio-button :value="true">true</a-radio-button>
        <a-radio-button :value="false">false</a-radio-button>
      </a-radio-group>
      <br />
    </a-drawer>
    <div
      class="setting-container"
      @click="
        () => {
          isShowSetting = !isShowSetting
        }
      "
    >
      <SettingOutlined />
    </div>
  </a-layout>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons-vue'
import SimpleMenu from '@/components/menu/SimpleMenu.vue'
import Logo from '@/components/header/Logo.vue'
import HeaderItem from '@/components/header/HeaderItem.vue'
import type { MenuInfo } from '@/types/types'

// 内容全屏
const isContentFullscreen = ref(false)

const title = ref('Vue Antd Admin')
const logoPath = ref('/static/logo.png')
const isShowSetting = ref(false)
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

const isSiderCollapsed = ref(false)
const siderCollapsedWidth = ref(48)

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

const isEnableFixedSider = ref(true)

watchEffect(() => {
  if (isSider.value) {
    if (isFixedHeader.value) {
      isFixedHeader.value = true
      isFixedSider.value = true
      isEnableFixedSider.value = false
    } else {
      isEnableFixedSider.value = true
    }
  }
  if (isMix.value) {
    if (isFixedHeader.value) {
      isFixedHeader.value = true
      isFixedSider.value = true
      isEnableFixedSider.value = false
    } else {
      isFixedSider.value = false
    }
  }
})

const menuInfo: MenuInfo[] = [
  {
    key: '1',
    path: '/dashboard',
    name: 'Dashboard',
    component: 'ProLayout',
    meta: {
      title: '仪表盘'
    },
    redirect: '/dashboard/analysis',
    children: [
      {
        key: '2',
        path: 'analysis',
        name: 'Analysis',
        component: 'Dashboard',
        meta: {
          title: '分析页'
        }
      },
      {
        key: '3',
        path: 'settings',
        name: 'Settings',
        component: 'Settings',
        meta: {
          title: '系统设置'
        }
      }
    ]
  }
]
</script>
<style lang="less">
@import '@/less/theme.less';
</style>
