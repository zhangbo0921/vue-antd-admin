<template>
  <AConfigProvider :locale="zhCN">
    <RouterView></RouterView>
  </AConfigProvider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
