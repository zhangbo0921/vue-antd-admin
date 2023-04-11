<template>
  <div>
    {{ title }}
    <AButton @click="click">{{ counter.count }}</AButton>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/stores'
const counter = useCounterStore()

const click = () => {
  counter.increment()
}
const title = 'dashboard page'
</script>
