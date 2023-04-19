<template>
  <a-menu v-bind="$attrs">
    <template v-for="item in data" :key="item.key">
      <template v-if="item.children">
        <SubMenu :data="item" :key="item.key"></SubMenu>
      </template>
      <template v-else>
        <a-menu-item :key="item.key">
          {{ item.meta?.title }}
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script setup lang="ts">
import type { MenuInfo } from '@/types/types'
import type { PropType } from 'vue'
import SubMenu from '@/components/menu/SubMenu.vue'

const props = defineProps({
  data: Array as PropType<MenuInfo[]>
})
</script>
