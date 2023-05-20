<template>
  <div class="logo">
    <img :src="img" />
    <h3 v-if="!isSiderCollapsed">{{ title }}</h3>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    required: true,
    type: String
  },
  img: {
    type: String,
    required: true
  },
  isSiderCollapsed: {
    type: Boolean,
    required: true
  }
})
</script>
