export interface ModalActionType {
  close: () => void
  open: (props: ModalParams) => void
  setProps: (props: ModalProps) => void
  setLoading: (loading: boolean) => void
}

export interface ModalProps {
  title?: string
}

export interface ModalParams {
  props: ModalProps
  isUpdate?: boolean
  data?: any
}

export type ModelSimpleParams = Omit<ModalParams, 'props'>
