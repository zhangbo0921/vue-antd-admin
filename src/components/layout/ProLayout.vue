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
          <Icon icon="menu-fold-outlined" v-if="!isSiderCollapsed" style="font-size: 18px" />
          <Icon icon="menu-unfold-outlined" v-else style="font-size: 18px" />
        </div>
        <div v-if="isTop" class="unvue-header-menu-container">
          <SimpleMenu
            mode="horizontal"
            :theme="headerTheme"
            :data="menuInfo"
            :openKeys="menuState.openKeys"
            v-model:selectedKeys="menuState.selectKeys"
          />
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
        :isSiderCollapsed="isSiderCollapsed"
        :style="isSiderCollapsed ? { width: siderCollapsedWidth + 'px' } : {}"
      />
      <div class="unvue-menu-container">
        <SimpleMenu
          mode="inline"
          :theme="siderTheme"
          :data="menuInfo"
          :openKeys="menuState.openKeys"
          v-model:selectedKeys="menuState.selectKeys"
        />
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
        <SimpleMenu
          mode="inline"
          :theme="siderTheme"
          :data="menuInfo"
          :openKeys="menuState.openKeys"
          v-model:selectedKeys="menuState.selectKeys"
        />
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
              <Icon icon="menu-fold-outlined" v-if="!isSiderCollapsed" style="font-size: 20px" />
              <Icon icon="menu-unfold-outlined" v-else style="font-size: 20px" />
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
          <div v-if="isEnableMultiTab && isFixedMultiTab" class="mutiple-tab-height"></div>
          <MultipleTab
            v-if="isEnableMultiTab"
            :class="{ 'pro-fixed-multiple-tab': isFixedMultiTab }"
          >
          </MultipleTab>
          <PageView></PageView>
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
      Enable Tab
      <a-radio-group v-model:value="isEnableMultiTab">
        <a-radio-button :value="true">true</a-radio-button>
        <a-radio-button :value="false">false</a-radio-button>
      </a-radio-group>
      <br />
      Fixed Tab
      <a-radio-group v-model:value="isFixedMultiTab" :disabled="!isEnableMultiTab">
        <a-radio-button :value="true">true</a-radio-button>
        <a-radio-button :value="false">false</a-radio-button>
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
      <Icon icon="setting-outlined" />
    </div>
  </a-layout>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import SimpleMenu from '@/components/menu/SimpleMenu.vue'
import Logo from '@/components/header/Logo.vue'
import HeaderItem from '@/components/header/HeaderItem.vue'
import type { MenuInfo, TabInfo } from '@/types/types'
import { useTabStore, useUserStore } from '@/stores/index'
import settings from '@/config/setting'
import { listenerRouteChange } from '@/utils/routeChange'
import type { RouteLocationNormalized } from 'vue-router'
import { findPath } from '@/utils/treeUtils'
import MultipleTab from '@/components/tab/MultipleTab.vue'
import PageView from '@/components/page/PageView.vue'

const userStore = useUserStore()
const tabStore = useTabStore()

// 内容全屏
const isContentFullscreen = ref(false)

const title = ref(settings.title as string)
const logoPath = ref(settings.logo)
const isShowSetting = ref(false)
// 布局：top/sider/mix
const layout = ref(settings.layout)

const isMix = computed(() => {
  return layout.value === 'mix'
})
const isTop = computed(() => {
  return layout.value === 'top'
})
const isSider = computed(() => {
  return layout.value === 'sider'
})

const isFixedHeader = ref(settings.fixHeader)
const isFixedSider = ref(settings.fixSiderbar)

const isSiderCollapsed = ref(false)
const siderCollapsedWidth = ref(settings.collapsedWidth)

// header主题：dark/light
const headerTheme = ref(settings.headerTheme)
const isHeaderLight = computed(() => {
  return headerTheme.value == 'light'
})

// sider主题：dark/light
const siderTheme = ref(settings.siderbarTheme)
const isSiderDark = computed(() => {
  return siderTheme.value === 'dark'
})

const isEnableFixedSider = ref(true)

// 是否启用tab页
const isEnableMultiTab = ref(settings.enableMultiTab)
// tab是否固定
const isFixedMultiTab = ref(settings.fixedMultiTab)

const menuState = ref({
  openKeys: [],
  selectKeys: []
})

const templateTopOpenKeys = ref([])

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
  if (isTop.value) {
    templateTopOpenKeys.value = menuState.value.openKeys
    menuState.value.openKeys = []
  } else {
    menuState.value.openKeys = templateTopOpenKeys.value
  }
})

const menuInfo: MenuInfo[] = userStore.getShowMenu()

const handleChangeRoute = (route: RouteLocationNormalized) => {
  // 如果菜单折叠了，就不要出发openKeys了
  if (!isSiderCollapsed.value) {
    menuState.value.openKeys = getMenuOpenKeys(route) as []
  }
  menuState.value.selectKeys = getMenuOpenKeys(route, true) as []
  if (settings.enableMultiTab) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { matched, redirectedFrom, hash, ...opt } = route as RouteLocationNormalized
    tabStore.addTabAction({ ...opt, enableClose: true } as TabInfo)
  }
}

const getMenuOpenKeys = (route: RouteLocationNormalized, includeMe = false) => {
  const path: MenuInfo[] = findPath<MenuInfo>(menuInfo, (item) => {
    return (
      item.path === route.path ||
      item.path === route.fullPath ||
      item.redirect === route.fullPath ||
      item.redirect === route.path
    )
  }) as MenuInfo[]
  if (path && path.length > 0) {
    !includeMe && path && path.pop()
  }
  return path && path.length > 0 ? path.map((routeInfo) => routeInfo.key) : []
}

listenerRouteChange((route) => {
  handleChangeRoute(route as RouteLocationNormalized)
})
</script>
<style lang="less">
@import '@/less/theme.less';
</style>
