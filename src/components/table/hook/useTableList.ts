import { tryOnUnmounted } from '@vueuse/core'
import { ref, unref } from 'vue'
import type { TableListAction } from '../types'

export const useTableList = (): TableListAction & {
  register: (instance: TableListAction) => void
} => {
  const tableRef = ref()

  const register = (instance: TableListAction) => {
    tryOnUnmounted(() => {
      tableRef.value = null
    })
    tableRef.value = instance
  }

  const getTableListInstance = (): TableListAction => {
    const table = unref(tableRef)
    if (!table) {
      console.error('组件还未初始化')
    }
    return table as TableListAction
  }

  const methods: TableListAction = {
    reload: () => {
      return getTableListInstance().reload()
    },
    resetFields: () => {
      return getTableListInstance().resetFields()
    },
    getSelectedRowKeys: () => {
      return getTableListInstance().getSelectedRowKeys()
    }
  }

  return { register, ...methods }
}

export default useTableList
