import type { MenuInfo, R } from '@/types/types'
import http from '@/utils/http/request'
import type { LoginParams, Token } from '../model/system'

enum Api {
  Login = '/mock/auth/auth/login',
  GetMenus = '/mock/auth/login'
}

// 登录
export const login = (data: LoginParams): Promise<R<Token>> => {
  return http.post<any, R<Token>>(Api.Login, data)
}

export const getMenus = (): Promise<R<MenuInfo[]>> => {
  return http.post<any, R<MenuInfo[]>>(Api.GetMenus)
}
