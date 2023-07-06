import type { R } from '@/types/types'
import http from '@/utils/http/request'

interface UserInfo {
  account: string
  avatar: string
  createTime: string
  deptId: number
  name: string
  nickName: string
  status: number
  tenantId: number
  uid: number
  updateTime: string
}

enum Api {
  UserList = '/api/system/user/list'
}

// 用户列表
export const getUserList = (params?: any): Promise<R<UserInfo[]>> => {
  return http.get<any, R<UserInfo[]>>(Api.UserList, { params })
}
