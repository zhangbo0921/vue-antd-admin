<template>
  <div class="table-page">
    <div v-if="showSearch" class="search">search</div>
    <div class="list">
      <a-table
        :columns="realColumn"
        :dataSource="dataSource"
        v-bind="$attrs"
        size="small"
        bordered
        :rowSelection="rowSelection"
        :pagination="pagination ? paginationConfig : false"
        :loading="tableConfig.loading"
        :scroll="tableScroll"
        @change="handleChange"
      >
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <slot name="bodyCell" :column="column" :record="record" :text="text"></slot>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores'
import { tryOnMounted, useThrottleFn, useWindowSize } from '@vueuse/core'
import { computed, ref, watch, watchEffect } from 'vue'

interface TableProps {
  api: (params?: any) => Promise<any>
  // 列配置
  columns: any[]
  // 是否显示搜索表单
  showSearch?: any
  // 搜索参数
  searchParams?: any
  // 是否开启分页
  pagination?: boolean
  // 是否节流
  throttle?: boolean
  // 节流秒数
  throttleSeconds?: number
  // 是否显示操作列
  showOptColumn?: boolean
  // 操作列宽度
  optWidth?: string | number
}

/**
 * 定义porps
 */
const props = withDefaults(defineProps<TableProps>(), {
  pagination: true,
  throttle: true,
  throttleSeconds: 1000,
  isTree: false,
  searchParams: {},
  showOptColumn: true
})

const dataSource = ref([])
const tableConfig = ref({
  loading: false
})

tryOnMounted(() => {
  getTableList()
})

// 分页
const paginationConfig = ref({
  current: 1,
  pageSize: 15,
  total: 0,
  pageSizeOptions: ['15', '30', '50', '100', '200'],
  showSizeChanger: true,
  showTotal: (total: number) => {
    return '共 ' + total + ' 条数据'
  }
})
const pageParam = computed(() => {
  return props.searchParams
    ? {
        pageNum: paginationConfig.value.current,
        pageSize: paginationConfig.value.pageSize
      }
    : {}
})
// 分页事件
const handleChange = (pagination: any) => {
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
  getTableList()
}

// 获取数据
const getTableList = async () => {
  tableConfig.value.loading = true
  try {
    const res = await props.api({ ...props.searchParams, ...pageParam.value })
    dataSource.value = res.data.list
    if (props.pagination) {
      paginationConfig.value.total = res.data.total
    }
  } finally {
    tableConfig.value.loading = false
  }
}

// 最终columns计算结果
const realColumn = computed(() => {
  if (props.columns.length > 0) {
    if (props.showOptColumn) {
      const optColumn = {
        title: '操作',
        dataIndex: 'opt',
        width: props.optWidth
      }
      const optIndex = props.columns.findIndex((item) => item.dataIndex === optColumn.dataIndex)
      if (optIndex > -1) {
        props.columns.splice(optIndex, 1, optColumn)
      } else {
        props.columns.push(optColumn)
      }
    }
  }
  return props.columns
})

/**
 * 选中数据
 */
const selectedRowKeys = ref([])
const onChange = (keys: []) => {
  selectedRowKeys.value = keys
}
const rowSelection = { fixed: true, selectedRowKeys, onChange }

/**
 * 抖动
 */
const getTableListThrottle = useThrottleFn(getTableList, props.throttle ? props.throttleSeconds : 0)

// 表格高度
const { height: windowHeight } = useWindowSize()
const { headerHeight, fullScreen } = useAppStore()
console.log('windowHeight', windowHeight.value)
console.log('headerHeight', headerHeight)
console.log('enableMultiTab', 55)

const tableHeight = computed(() => {
  console.log(fullScreen)
  if (fullScreen) {
    return windowHeight.value
  } else {
    return 500
  }
})

const tableScroll = ref({
  y: tableHeight.value
})
</script>
<style lang="less" scoped>
@import '@/less/var.less';
.table-page {
  padding: 4px;
  background: #fff;
  height: 100%;
}
</style>
