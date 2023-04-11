<template>
  <div id="app">
    <AConfigProvider :locale="zhCN">
      <RouterView></RouterView>
      <ASpace>
        <a href="#/about">about</a>
        <a href="#">index</a>
      </ASpace>
    </AConfigProvider>
  </div>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style scoped></style>
