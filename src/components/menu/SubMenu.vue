<template>
  <a-sub-menu :key="data.key">
    <template #icon v-if="data.meta?.icon">
      <Icon :icon="(data.meta?.icon as string)" />1
    </template>
    <template #title>{{ data.meta?.title }}</template>
    <template v-for="item in data.children" :key="item.key">
      <template v-if="item.children">
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
  </a-sub-menu>
</template>
<script setup lang="ts">
import type { MenuInfo } from '@/types/types'
import type { PropType } from 'vue'
import SubMenu from '@/components/menu/SubMenu.vue'
import Icon from '@/components/icon/Icon.vue'
import { isUrl } from '@/utils/is'
defineProps({
  data: {
    type: Object as PropType<MenuInfo>,
    required: true
  }
})
</script>
