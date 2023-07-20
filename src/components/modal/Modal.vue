<template>
  <AModal
    :visible="visible"
    :title="modalProps.title"
    :closable="true"
    :mask="true"
    :width="'40%'"
    :maskClosable="false"
    v-bind="$attrs"
    @cancel="close"
  >
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
      <template v-if="!hasFooter">
        <AButton @click="close">关闭</AButton>
        <AButton type="primary" :loading="loading" @click="handleSubmit"> 提交 </AButton>
      </template>
    </template>
  </AModal>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, ref, useSlots } from 'vue'
import type { ModalActionType, ModalProps, ModalParams } from './types'

const emit = defineEmits(['register', 'ok'])

const modalProps = ref<ModalProps>({
  title: ''
})

const hasFooter = computed(() => {
  const slots = useSlots()
  if (slots.footer) {
    return true
  }
  return false
})

const visible = ref(false)
const loading = ref(false)

const close = () => {
  visible.value = false
}

const open = (props: ModalParams) => {
  visible.value = true
  setProps(props.props)
}

const setProps = (props: ModalProps) => {
  modalProps.value = props as ModalProps
}

const setLoading = (_loading: boolean) => {
  loading.value = _loading
}

const modalAction: ModalActionType = {
  close,
  open,
  setProps,
  setLoading
}

const handleSubmit = (e: any) => {
  emit('ok', e)
}

const instance = getCurrentInstance()
instance && emit('register', modalAction, instance.uid)
</script>
