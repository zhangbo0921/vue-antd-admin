<template>
  <div class="user-list">
    <TableList :columns="columns" :api="getUserList" rowKey="uid" :title="'用户列表'">
      <template #search>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item>
              <a-range-picker
                v-model:value="formData.rangeDate"
                style="width: 100%"
                :placeholder="['开始登记时间', '截止登记时间']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="工单编号" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="来电号码" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="汇聚编号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item>
              <a-range-picker
                v-model:value="formData.rangeDate"
                style="width: 100%"
                :placeholder="['开始登记时间', '截止登记时间']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="工单编号" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="来电号码" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="汇聚编号" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template #toolbar>
        <a-button type="primary" size="small">添加</a-button>
        <a-button size="small">授权</a-button>
        <a-button size="small">修改</a-button>
        <a-button danger size="small">删除</a-button>
      </template>
      <template #bodyCell="{ text, record, column }">
        <template v-if="column.dataIndex === 'status'">
          <template v-if="record.status == 1"> <a-tag color="#2db7f5">启用</a-tag></template>
          <template v-else><a-tag color="#f50">禁用</a-tag></template>
        </template>
      </template>
    </TableList>
  </div>
</template>
<script setup lang="ts">
import { getUserList } from '@/api/system/user'
import TableList from '@/components/table/TableList.vue'
import { ref } from 'vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 50,
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: false,
    width: 150
  },
  {
    title: '账号',
    dataIndex: 'account',
    width: 150,
    sorter: {
      compare: (a: any, b: any) => a.account - b.account,
      multiple: 1
    }
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
    sorter: {
      compare: (a: any, b: any) => a.status - b.status,
      multiple: 1
    },
    width: 150
  }
]

const formData = ref({
  username: '',
  type: [],
  date: '',
  rangeDate: [],
  rangeDate1: []
})

const listData = [
  {
    value: 'jack',
    label: 'Jack (100)'
  },
  {
    value: 'lilei',
    label: 'lilei (200)'
  }
]
</script>
