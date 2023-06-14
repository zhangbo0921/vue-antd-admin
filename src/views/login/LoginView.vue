<template>
  <div class="login">
    <a-spin :spinning="loading">
      <a-form :model="loginParam" @finish="login" labelAlign="right" :labelCol="{ span: 3 }">
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名！' }]"
        >
          <a-input v-model:value="loginParam.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
          <a-input-password v-model:value="loginParam.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item :wrapperCol="{ span: 12, offset: 3 }">
          <a-space>
            <a-button type="primary" html-type="submit">登录</a-button>
            <a-button @click="goRegisterPage">注册</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import type { LoginParams } from '@/api/model/system'
import { useUserStore } from '@/stores'
import { Constants } from '@/types/constants'
import { ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const { push, replace } = useRouter()

const loading = ref(false)

const loginParam = ref<LoginParams>({
  username: 'admin',
  password: 'zhangbo@123',
  device: 'PC'
})

const login = async () => {
  try {
    loading.value = true
    await userStore.login(unref(loginParam))
    if (userStore.userInfo.deptName) {
      replace({ path: (route.query.redirect as string) || userStore.userInfo.homePath })
    }
  } finally {
    loading.value = false
  }
}

const goRegisterPage = () => {
  push({ path: Constants.RegisterPage })
}
</script>
<style lang="less">
.login {
  width: 50%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
