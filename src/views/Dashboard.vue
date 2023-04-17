<template>
  <div>
    {{ title }}
    <AButton @click="click">{{ counter.count }}</AButton>
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}
    <br />
    {{ title }}1
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
