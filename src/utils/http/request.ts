import { Constants } from '@/types/constants'
import axios from 'axios'
import store from 'store2'

const http = axios.create({
  baseURL: import.meta.env.BASE_URL,
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
    console.error(error)
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response.data)
    }

    const { code, msg } = response.data

    // 访问成功，返回数据
    if (code === 200) {
      console.log('返回数据：', response.data)
      return response.data
    }

    // 重新登录，跳转登录
    if (code === 401) {
      // TODO
      return Promise.reject(msg)
    }
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

export default http
