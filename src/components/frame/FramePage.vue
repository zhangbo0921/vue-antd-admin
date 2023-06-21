<template>
  <template v-for="frame in frameList" :key="frame.fullPath">
    <IFrame :frame-src="frame.frameSrc" v-show="route.fullPath === frame.fullPath"></IFrame>
  </template>
</template>
<script lang="ts" setup>
import IFrame from '@/components/frame/IFrame.vue'
import type { FrameInfo } from '@/types/types'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
defineProps({
  frameList: {
    type: Array as PropType<FrameInfo[]>
  }
})

const route = useRoute()
</script>
