/**
 * 菜单信息
 */
export interface MenuInfo {
  // 唯一主键
  key?: string | number
  // 路由路径
  path: string
  // 路由名称/组件名称
  name: string
  // 组件
  component?: Component | string
  // 重定向路由地址
  redirect?: string
  // 元信息
  meta?: Meta
  // 子路由
  children?: MenuInfo[]
}

/**
 * 菜单元信息
 */
export interface Meta {
  // 菜单名称
  title?: string
  // 是否缓存
  keepAlive?: boolean
  // 图标
  icon?: string
  // 是否隐藏菜单，注意：隐藏菜单，不代表不添加路由
  hideMenu?: boolean
  // frame 地址
  frameSrc?: string
}
