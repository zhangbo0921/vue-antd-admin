import { isFunction } from '@/utils/is'
import type { ModalActionType, ModalParams, ModalProps, ModelSimpleParams } from '../types'
import { nextTick, reactive, ref, toRaw, unref, watchEffect } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'

const modalData = reactive<any>({})

export function useModal(callbackFn?: (data: any) => void): ModalActionType & {
  register: (instance: ModalActionType, uuid: string) => void
} {
  const modalActions = ref<ModalActionType | null>(null)
  const uid = ref('')

  function register(instance: ModalActionType, uuid: string) {
    tryOnUnmounted(() => {
      modalActions.value = null
      modalData[unref(uid)] = null
    })
    modalActions.value = instance
    uid.value = uuid
  }

  watchEffect(() => {
    const data = modalData[unref(uid)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  const methods: ModalActionType = {
    open: (props: ModalParams) => {
      modalActions.value?.open(props)
      if (props) {
        const params: ModelSimpleParams = {
          isUpdate: props.isUpdate as boolean,
          data: { ...toRaw(props.data) }
        }
        modalData[unref(uid)] = null
        modalData[unref(uid)] = params
      }
    },
    close: () => {
      modalActions.value?.close()
    },
    setProps: (props: ModalProps) => {
      modalActions.value?.setProps(props)
    },
    setLoading: (loading: boolean) => {
      modalActions.value?.setLoading(loading)
    }
  }

  return { register, ...methods }
}
