<template>
  <ALayout class="unvue-layout">
    <ALayoutHeader class="unvue-header" style="background: #fff; padding: 0">Header</ALayoutHeader>
    <ALayout>
      <ALayoutSider>Sider</ALayoutSider>
      <ALayoutContent>
        <ASpace>
          <RouterLink to="/dashboard/analysis">Analysis</RouterLink>
          <RouterLink to="/dashboard/settings">Settings</RouterLink>
        </ASpace>
        <RouterView />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>
<script setup lang="ts"></script>
<style lang="less">
@import '@/less/theme.less';
</style>
