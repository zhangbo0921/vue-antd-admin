<template>
  <div class="user-list">
    <TableList :columns="columns" :api="getUserList" rowKey="uid">
      <template #bodyCell="{ text, record, column }">
        <template v-if="column.dataIndex === 'status'">
          <template v-if="record.status === 1"> <a-tag color="#2db7f5">启用</a-tag></template>
          <template v-else><a-tag color="#f50">禁用</a-tag></template>
        </template>
      </template>
    </TableList>
  </div>
</template>
<script setup lang="ts">
import { getUserList } from '@/api/system/user'
import TableList from '@/components/table/TableList.vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 50,
    align: 'center'
  },
  {
    title: '账号',
    dataIndex: 'account',
    sorter: false,
    width: 150
  },
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: false,
    width: 150
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    sorter: false,
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'status',
    sorter: true,
    width: 150
  }
]
</script>
