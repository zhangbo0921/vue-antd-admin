import { Constants } from '@/types/constants'
import axios, { type AxiosRequestHeaders } from 'axios'
import store from 'store2'

const http = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

let loading: any = false
let requestCount: number = 0

const showLoading = () => {
  if (requestCount === 0 && !loading) {
    loading = !loading
    console.log(loading)
  }
  return requestCount++
}

const hideLoading = () => {
  requestCount--
  if (requestCount === 0) {
    loading = !loading
    console.debug(loading)
  }
}

http.interceptors.request.use(
  (config) => {
    showLoading()
    const accessToken = store.get(Constants.AccessToken)
    config.headers.token = accessToken
    return config
  },
  (error) => {
    hideLoading()
    console.error(error)
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    hideLoading()
    console.debug(response)
    if (response.status !== 200) {
      return Promise.reject(response.data)
    }

    const { code, msg } = response.data

    // 访问成功，返回数据
    if (code === 200) {
      return response.data
    }

    // 重新登录，跳转登录
    if (code === 401) {
      // TODO
      return Promise.reject('Token 过期')
    }
  },
  (error) => {
    hideLoading()
    console.error(error)
    Promise.reject(error)
  }
)

export default http
