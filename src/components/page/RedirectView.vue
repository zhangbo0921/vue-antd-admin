<template>
  <div>redirect ...</div>
</template>
<script setup lang="ts">
import { unref } from 'vue'
import { useRouter } from 'vue-router'
const { currentRoute, replace } = useRouter()
const { params, query } = unref(currentRoute)
const path = params.path
delete params['path']
replace({
  path: path as string,
  query,
  params
})
</script>
