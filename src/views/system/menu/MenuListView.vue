<template>
  <div class="menu-list">
    <TableList
      rowKey="mid"
      :columns="columns"
      :api="getMenuTree"
      mode="tree"
      :searchParams="formData"
    >
      <template #toolbar>
        <a-button type="primary" size="small">添加</a-button>
        <a-button size="small">修改</a-button>
        <a-button size="small">删除</a-button>
      </template>
      <template #search>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="菜单名称">
              <a-input v-model:value="formData.name" placeholder="菜单名称" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="菜单编码">
              <a-input v-model:value="formData.enName" placeholder="菜单编码" />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'icon'">
          <Icon :icon="record.icon"></Icon>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <template v-if="record.type === 0">目录</template>
          <template v-if="record.type === 1">菜单</template>
          <template v-if="record.type === 2">按钮</template>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <template v-if="record.status == 1"> <a-tag color="#2db7f5">启用</a-tag></template>
          <template v-else><a-tag color="#f50">禁用</a-tag></template>
        </template>
        <template v-if="column.dataIndex === 'opt'">
          <a-button type="link" size="small">修改</a-button>
          <a-button type="link" size="small">编辑</a-button>
          <a-button type="link" danger size="small">删除</a-button>
        </template>
      </template>
    </TableList>
  </div>
</template>
<script setup lang="ts">
import { getMenuTree } from '@/api/system/menu'
import TableList from '@/components/table/TableList.vue'
import { ref } from 'vue'

const columns = [
  {
    title: '图标',
    dataIndex: 'icon',
    sorter: false,
    width: '50px',
    align: 'center'
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    sorter: false,
    width: 200
  },
  {
    title: '菜单编码',
    dataIndex: 'enName',
    sorter: false,
    width: 160
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    sorter: false,
    width: 220
  },
  {
    title: '路由',
    dataIndex: 'path',
    sorter: false,
    width: 260
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 260
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80
  }
]

const formData = ref({
  name: '',
  enName: ''
})
</script>
