export interface TableListAction {
  reload: () => void
  resetFields: () => void
  getSelectedRowKeys: () => []
}
