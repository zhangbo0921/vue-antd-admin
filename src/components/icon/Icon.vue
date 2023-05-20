<template>
  <component :is="icon" />
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>
