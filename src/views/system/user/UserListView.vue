<template>
  <div class=".user-list">
    <a-form
      :model="data"
      name="basic"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 22 }"
      autocomplete="off"
    >
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题!' }]">
        <a-input v-model:value="data.title" />
      </a-form-item>
      <a-form-item
        label="诉求内容"
        name="content"
        :rules="[{ required: true, message: '请输入诉求内容!' }]"
      >
        <a-input v-model:value="data.content" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { useCached } from '@/hooks/useCached'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const data = ref({
  title: '',
  content: ''
})
useCached(route.fullPath, data)
</script>
