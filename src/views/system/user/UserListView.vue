<template>
  <div class=".user-list">
    <a-input v-model:value="name" placeholder="请输入内容"></a-input>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
</script>
