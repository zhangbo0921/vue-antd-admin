import { Constants } from '@/types/constants'
import axios from 'axios'
import store from 'store2'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const http = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

http.interceptors.request.use(
  (config) => {
    const accessToken = store.get(Constants.AccessToken)
    config.headers.token = accessToken
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response.data)
    }

    const { code, msg, data } = response.data

    // 访问成功，返回数据
    if (code === 200) {
      return response.data
    }

    // 重新登录，跳转登录
    if (code === 401) {
      const userStore = useUserStore()
      userStore.clearAll()
      const { replace } = useRouter()
      replace({ path: '/auth/login' })
      return Promise.reject(msg)
    }

    // 500错误
    if (code === 500) {
      message.error(data.errorMessage)
      return Promise.reject(msg)
    }
  },
  (error) => {
    Promise.reject(error)
  }
)

export default http
