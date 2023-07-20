import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import { ref, unref } from 'vue'

export interface TableListAction {
  reload: () => void
  resetFields: () => void
  getSelectedRowKeys: () => []
}

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
