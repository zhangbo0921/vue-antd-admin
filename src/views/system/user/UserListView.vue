<template>
  <div class="user-list">
    <TableList
      :columns="columns"
      :api="getUserList"
      @register="register"
      rowKey="uid"
      :title="'用户列表'"
      :search-params="formData"
      :handleSearchParams="handleSearchParams"
    >
      <template #search>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item>
              <a-range-picker
                v-model:value="formData.createTime"
                show-time
                style="width: 100%"
                :placeholder="['开始登记时间', '截止登记时间']"
                :format="'YYYY-MM-DD HH:mm:ss'"
                valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.orderNo" placeholder="工单编号" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.tel" placeholder="来电号码" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.hjNo" placeholder="汇聚编号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.username" placeholder="群众姓名" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.content" placeholder="工单内容" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input v-model:value="formData.status" placeholder="工单状态" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template #toolbar>
        <a-button type="primary" size="small" @click="testReload">添加</a-button>
        <a-button size="small">授权</a-button>
        <a-button size="small">修改</a-button>
        <a-button danger size="small">删除</a-button>
      </template>
      <template #bodyCell="{ record, column }">
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
import useTableList from '@/components/table/hook/useTableList'

const { register, reload, resetFields, getSelectedRowKeys } = useTableList()

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
  orderNo: null,
  tel: null,
  hjNo: null,
  createTime: [],
  username: null,
  content: null,
  status: null
})

const handleSearchParams = () => {
  // 提出createTime 和 其他参数到 searchParams
  const { createTime, ...searchParams } = formData.value
  // 解构搜索参数 searchParams
  const params: any = { ...searchParams }
  // 设置
  params.startTime = createTime[0]
  params.endTime = createTime[1]
  return params
}

// tableList 接口测试
const testReload = () => {
  console.log(reload())
}
</script>
