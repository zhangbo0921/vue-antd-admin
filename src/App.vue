<template>
  <div id="app">
    <AConfigProvider :locale="zhCN">
      <RouterView></RouterView>
      <ASpace>
        <RouterLink to="/dashboard/analysis">Analysis</RouterLink>
        <RouterLink to="/dashboard/settings">Settings</RouterLink>
      </ASpace>
    </AConfigProvider>
  </div>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
