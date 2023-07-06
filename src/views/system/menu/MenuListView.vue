<template>
  <div class="menu-list">
    <TableList :columns="columns" :api="getUserList" size="middle" bordered></TableList>
  </div>
</template>
<script setup lang="ts">
import { getUserList } from '@/api/system/user'
import TableList from '@/components/table/TableList.vue'

const columns = [
  {
    title: '图标',
    dataIndex: 'perms',
    sorter: false,
    width: '100'
  },
  {
    title: '名称',
    dataIndex: 'name',
    sorter: false,
    width: '100'
  },
  {
    title: '编码',
    dataIndex: 'enName',
    sorter: false,
    width: '100'
  },
  {
    title: '路由',
    dataIndex: 'path',
    sorter: false,
    width: '100'
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    sorter: false,
    width: '100'
  },
  {
    title: '组件',
    dataIndex: 'compoment',
    width: '100'
  },
  {
    title: '类型',
    dataIndex: 'type'
  }
]
</script>
