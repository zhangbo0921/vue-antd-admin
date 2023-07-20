<template>
  <div class="table-page">
    <div v-if="showSearch" class="search" ref="el">
      <div class="search-form">
        <a-form labelAlign="right" :labelCol="{ span: 5 }" ref="searchForm">
          <a-row>
            <a-col :span="24" :class="{ close: zhedie }">
              <slot name="search"></slot>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="toolbar" v-if="showToolBar">
      <div class="left">
        <a-space>
          <slot name="toolbar"></slot>
        </a-space>
      </div>
      <div class="right">
        <a-space>
          <div class="search-buttons" v-if="showSearch">
            <a-space>
              <a-button type="primary" size="small" @click="getTableListThrottle"> 查询 </a-button>
              <a-button size="small" @click="clearSearchForm">清空</a-button>
              <a-button
                size="small"
                @click="() => (zhedie = !zhedie)"
                v-if="slots.search && slots.search().length > 1"
                >{{ zhedie ? '展开' : '收起' }}</a-button
              >
            </a-space>
          </div>
        </a-space>
      </div>
    </div>
    <div class="list">
      <a-table
        :columns="realColumn"
        :dataSource="dataSource"
        v-bind="$attrs"
        size="small"
        bordered
        :rowSelection="showCheckedBox ? rowSelection : null"
        :pagination="pagination && mode !== 'tree' ? paginationConfig : false"
        :loading="tableConfig.loading"
        :scroll="tableScroll"
        @change="handleChange"
        :defaultExpandAllRows="true"
        :row-class-name="(_record:any, index:number) => (striped?(index % 2 === 1 ? 'table-striped' : null):null)"
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
import { tryOnMounted, useThrottleFn, useWindowSize, useResizeObserver } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, useSlots, watchEffect, type Ref } from 'vue'
import { Form } from 'ant-design-vue'
import type { TableListAction } from './types'

interface TableProps {
  // 模式
  mode?: 'list' | 'tree' | 'treeList'
  // 接口
  api: (params?: any) => Promise<any>
  // 标题
  title?: string
  // 列配置
  columns: any[]
  // 搜索参数
  searchParams?: any
  // 搜索前执行，一般用于参数调整
  handleSearchParams?: () => any
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
  // 斑马线
  striped?: boolean
  // 是否显示序号
  showIndex?: boolean
  // 显示选中
  showCheckedBox?: boolean
}

const emit = defineEmits(['register'])

/**
 * 定义porps
 */
const props = withDefaults(defineProps<TableProps>(), {
  mode: 'list',
  title: '',
  pagination: true,
  throttle: true,
  throttleSeconds: 1000,
  isTree: false,
  showOptColumn: true,
  striped: true,
  showIndex: true,
  showCheckedBox: true
})
/**
 * 钩子函数
 */
const appStore = useAppStore()

// 内部变量

const dataSource = ref([])
const zhedie = ref(true)
const tableConfig = ref({
  loading: false
})

const slots = useSlots()

const showToolBar = computed(() => {
  if (slots.toolbar && slots.toolbar().length > 0) {
    return true
  } else {
    if (showSearch.value) {
      return true
    }
  }
  return false
})

const showSearch = computed(() => {
  if (slots.search && slots.search().length > 0) {
    return true
  }
  return false
})

// 初始化
tryOnMounted(() => {
  getTableList()
})

/**
 * 分页
 */
const paginationConfig = ref({
  current: 1,
  pageSize: 20,
  total: 0,
  pageSizeOptions: ['20', '50', '100', '200'],
  showSizeChanger: true,
  showTotal: (total: number) => {
    return '共 ' + total + ' 条数据'
  }
})
// 分页参数
const pageParam = computed(() => {
  return props.pagination
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

const getSearchParams = () => {
  if (props.handleSearchParams) {
    return props.handleSearchParams()
  } else {
    return props.searchParams
  }
}

// 获取数据
const getTableList = async () => {
  tableConfig.value.loading = true
  try {
    const res = await props.api({ ...getSearchParams(), ...pageParam.value })
    if (props.mode === 'list') {
      dataSource.value = res.data.list
    }
    if (props.mode === 'tree') {
      dataSource.value = res.data
    }
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
    if (props.showIndex) {
      const optColumn = {
        title: '序号',
        dataIndex: 'index',
        width: 50,
        align: 'center'
      }
      const optIndex = props.columns.findIndex((item) => item.dataIndex === optColumn.dataIndex)
      if (optIndex > -1) {
        props.columns.splice(optIndex, 1, optColumn)
      } else {
        props.columns.unshift(optColumn)
      }
    }
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

const getSelectedRowKeys = (): [] => {
  return selectedRowKeys.value as []
}

/**
 * 抖动
 */
const getTableListThrottle = useThrottleFn(getTableList, props.throttle ? props.throttleSeconds : 0)

/**
 * searchForm 处理
 */
let clear: any = null
if (showSearch.value) {
  if (props.searchParams) {
    const useForm = Form.useForm
    const { resetFields } = useForm(props.searchParams)
    clear = resetFields
  } else {
    console.warn('请配置搜索参数：searchParams')
  }
}

const clearSearchForm = () => {
  if (clear) {
    clear()
  }
}

/**
 * 表格高度
 */
const { height: windowHeight } = useWindowSize()
const { headerHeight, fullScreen, enableMultiTab } = storeToRefs(appStore)

const tableScroll = ref({
  y: 0
})
// 计算搜索区域高度
const searchElHeight = ref(0)
const el = ref()
tryOnMounted(() => {
  useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { height } = entry.contentRect
    searchElHeight.value = height
  })
})
watchEffect(() => {
  if (fullScreen?.value) {
    tableScroll.value.y = windowHeight.value - 112 - 42
  } else {
    tableScroll.value.y =
      windowHeight.value -
      112 -
      (headerHeight?.value as number) -
      (enableMultiTab?.value ? 53 : 0) -
      (showSearch.value ? searchElHeight.value + 12 : 0) -
      (showToolBar.value ? 43 : 0)
  }
})

// useTable 后，返回暴露api
const tableListAction: TableListAction = {
  reload: getTableListThrottle,
  resetFields: clear,
  getSelectedRowKeys: getSelectedRowKeys
}
emit('register', tableListAction)
</script>

<style lang="less" scoped>
:deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
<style lang="less">
@import '@/less/var.less';
.table-page {
  padding: 4px;
  height: 100%;
  & > div {
    background: #fff;
  }
  .search {
    padding: 4px 8px;
    margin-top: 0px;
    .search-form {
      .ant-form-item {
        margin: 4px 0;
      }
      .close {
        .ant-row:nth-child(n + 2) {
          display: none;
        }
      }
    }
  }
  .toolbar {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    margin: 4px 0 0 0;
    border: 1px solid #f0f0f0;
    border-bottom: 0;
    .left {
      display: flex;
    }
    .right {
      display: flex;
    }
  }
  .ant-table-cell .ant-btn-link {
    height: 22px;
    padding: 0 4px;
  }
}
</style>
