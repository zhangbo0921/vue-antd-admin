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
        <div class="logo">
          <img src="/static/logo.png" />
          <h3>{{ title }}</h3>
        </div>
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
          <a-menu mode="horizontal" :theme="headerTheme">
            <a-sub-menu key="1">
              <template #icon>
                <dashboard-outlined />
              </template>
              <template #title>仪表盘</template>
              <a-menu-item key="2">分析页</a-menu-item>
              <a-menu-item key="3">工作台</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="4">
              <template #icon>
                <setting-outlined />
              </template>
              <template #title>系统设置</template>
              <a-menu-item key="5">用户管理</a-menu-item>
              <a-menu-item key="6">权限管理</a-menu-item>
              <a-menu-item key="7">角色管理</a-menu-item>
              <a-menu-item key="8">数据字典</a-menu-item>
              <a-menu-item key="9">系统参数</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
      <div class="unvue-header-right">
        <div class="header-item-container">
          <a-space size="middle">
            <div class="header-item">
              <a-badge :dot="true">
                <a-tooltip placement="bottom">
                  <template #title>消息</template>
                  <bulb-outlined style="font-size: 20px" />
                </a-tooltip>
              </a-badge>
            </div>
            <div class="header-item">
              <a href="https://github.com/zhangbo0921/vue-antd-admin" target="_blank">
                <a-tooltip placement="bottom">
                  <template #title>仓库</template>
                  <github-outlined style="font-size: 20px" />
                </a-tooltip>
              </a>
            </div>
            <div class="header-item" @click="toggle">
              <a-tooltip placement="bottom">
                <fullscreen-outlined v-if="!isBrowserFullscreen" style="font-size: 20px" />
                <fullscreen-exit-outlined v-else style="font-size: 20px" />
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
                        <user-outlined />
                      </template>
                      <a href="javascript:;">我的信息</a>
                    </a-menu-item>
                    <a-menu-item>
                      <template #icon>
                        <user-switch-outlined />
                      </template>
                      <a href="javascript:;">切换角色</a>
                    </a-menu-item>
                    <a-menu-item>
                      <template #icon>
                        <poweroff-outlined />
                      </template>
                      <a href="javascript:;">安全退出</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </a-space>
        </div>
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
      <div class="logo" :style="isSiderCollapsed ? { width: siderCollapsedWidth + 'px' } : {}">
        <img src="/static/logo.png" />
        <h3 v-if="!isSiderCollapsed">{{ title }}</h3>
      </div>
      <div class="unvue-menu-container">
        <a-menu mode="inline" :theme="siderTheme">
          <a-sub-menu key="1">
            <template #icon>
              <dashboard-outlined />
            </template>
            <template #title>仪表盘</template>
            <a-menu-item key="2">分析页</a-menu-item>
            <a-menu-item key="3">工作台</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="4">
            <template #icon>
              <setting-outlined />
            </template>
            <template #title>系统设置</template>
            <a-menu-item key="5">用户管理</a-menu-item>
            <a-menu-item key="6">权限管理</a-menu-item>
            <a-menu-item key="7">角色管理</a-menu-item>
            <a-menu-item key="8">数据字典</a-menu-item>
            <a-menu-item key="9">系统参数</a-menu-item>
          </a-sub-menu>
        </a-menu>
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
        <a-menu mode="inline" :theme="siderTheme">
          <a-sub-menu key="1">
            <template #icon>
              <dashboard-outlined />
            </template>
            <template #title>仪表盘</template>
            <a-menu-item key="2">分析页</a-menu-item>
            <a-menu-item key="3">工作台</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="4">
            <template #icon>
              <setting-outlined />
            </template>
            <template #title>系统设置</template>
            <a-menu-item key="5">用户管理</a-menu-item>
            <a-menu-item key="6">权限管理</a-menu-item>
            <a-menu-item key="7">角色管理</a-menu-item>
            <a-menu-item key="8">数据字典</a-menu-item>
            <a-menu-item key="9">系统参数</a-menu-item>
          </a-sub-menu>
        </a-menu>
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
            <div class="header-item-container">
              <a-space size="middle">
                <div class="header-item">
                  <a-badge :dot="true">
                    <a-tooltip placement="bottom">
                      <template #title>消息</template>
                      <bulb-outlined style="font-size: 20px" />
                    </a-tooltip>
                  </a-badge>
                </div>
                <div class="header-item">
                  <a href="https://github.com/zhangbo0921/vue-antd-admin" target="_blank">
                    <a-tooltip placement="bottom">
                      <template #title>仓库</template>
                      <github-outlined style="font-size: 20px" />
                    </a-tooltip>
                  </a>
                </div>
                <div class="header-item" @click="toggle">
                  <a-tooltip placement="bottom">
                    <fullscreen-outlined v-if="!isBrowserFullscreen" style="font-size: 20px" />
                    <fullscreen-exit-outlined v-else style="font-size: 20px" />
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
                            <user-outlined />
                          </template>
                          <a href="javascript:;">我的信息</a>
                        </a-menu-item>
                        <a-menu-item>
                          <template #icon>
                            <user-switch-outlined />
                          </template>
                          <a href="javascript:;">切换角色</a>
                        </a-menu-item>
                        <a-menu-item>
                          <template #icon>
                            <poweroff-outlined />
                          </template>
                          <a href="javascript:;">安全退出</a>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </a-space>
            </div>
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
import { useFullscreen } from '@vueuse/core'
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  FullscreenOutlined,
  BulbOutlined,
  GithubOutlined,
  PoweroffOutlined,
  UserSwitchOutlined,
  UserOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue'

const html = ref<HTMLElement | null>(null)
const { isFullscreen, toggle } = useFullscreen(html)
// 浏览器全屏
const isBrowserFullscreen = computed(() => {
  return isFullscreen.value
})
// 内容全屏
const isContentFullscreen = ref(false)

const title = ref('Vue Antd Admin')
const userName = ref('unvue')
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
</script>
<style lang="less">
@import '@/less/theme.less';
</style>
