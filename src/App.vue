<template>
  <div id="app">
    <AConfigProvider :locale="zhCN">
      <AButton>Hello AnddUI</AButton>
      <AInput></AInput>
      <ADatePicker />
    </AConfigProvider>
  </div>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style scoped></style>
