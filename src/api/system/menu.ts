import type { R } from '@/types/types'
import http from '@/utils/http/request'

export interface MenuInfo {
  hideMenu: number
  mid: number
  pid: number
  updateTime: string
  sort: number
  hideChildren: number
  ignoreRoute: number
  type: number
  path: string
  component: string
  createBy: number
  createTime: string
  updateBy: number
  enName: string
  name: string
  perms: string
  pids: string
  status: number
  children: MenuInfo[]
}

enum Api {
  MenuList = '/api/system/menu/list',
  MenuTree = '/api/system/menu/tree'
}

// 菜单列表
export const getMenuList = (params?: any): Promise<R<MenuInfo[]>> => {
  return http.get<any, R<MenuInfo[]>>(Api.MenuList, { params })
}

// 菜单树
export const getMenuTree = (params?: any): Promise<R<MenuInfo[]>> => {
  return http.get<any, R<MenuInfo[]>>(Api.MenuTree, { params })
}
