<template>
  <div class="logo">
    <img :src="img" />
    <h3>{{ title }}</h3>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  img: {
    type: String,
    required: true
  }
})
</script>
