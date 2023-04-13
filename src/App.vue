<template>
  <AConfigProvider :locale="zhCN" :prefixCls="prefixCls">
    <RouterView></RouterView>
  </AConfigProvider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
const prefixCls = 'unvue'
</script>
