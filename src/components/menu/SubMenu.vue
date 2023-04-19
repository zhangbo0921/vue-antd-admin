<template>
  <a-sub-menu :key="data?.key">
    <template #title>{{ data?.meta?.title }}</template>
    <template v-for="item in data?.children" :key="item.key">
      <template v-if="item.children">
        <SubMenu :data="item" :key="item.key"></SubMenu>
      </template>
      <template v-else>
        <a-menu-item :key="item.key">
          {{ item.meta?.title }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>
<script setup lang="ts">
import type { MenuInfo } from '@/types/types'
import type { PropType } from 'vue'
import SubMenu from '@/components/menu/SubMenu.vue'

const props = defineProps({
  data: Object as PropType<MenuInfo>
})
</script>
