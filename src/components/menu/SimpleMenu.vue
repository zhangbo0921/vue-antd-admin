<template>
  <a-menu v-bind="$attrs">
    <template v-for="item in data" :key="item.key">
      <template v-if="item.children && item.children.length > 0">
        <SubMenu :data="item" :key="item.key"></SubMenu>
      </template>
      <template v-else>
        <a-menu-item :key="item.key">
          <template #icon v-if="item.meta?.icon">
            <Icon :icon="(item.meta?.icon as string)" />
          </template>
          <RouterLink v-if="!isUrl(item.path)" :to="item.path"> {{ item.meta?.title }}</RouterLink>
          <a :href="item.path" target="_blank" v-else> {{ item.meta?.title }}</a>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script setup lang="ts">
import type { MenuInfo } from '@/types/types'
import type { PropType } from 'vue'
import SubMenu from '@/components/menu/SubMenu.vue'
import Icon from '@/components/icon/Icon.vue'
import { RouterLink } from 'vue-router'
import { isUrl } from '@/utils/is'

const props = defineProps({
  data: Array as PropType<MenuInfo[]>
})
</script>
