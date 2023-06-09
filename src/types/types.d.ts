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
  // 激活路径
  activePath?: string
  // 是否缓存
  keepAlive?: boolean
  // 图标
  icon?: string
  // 是否隐藏菜单，注意：隐藏菜单，不代表不添加路由
  hideMenu?: boolean
  // 是否隐藏子菜单
  hideChildren?: boolean
  // 是否忽略此路由
  ignoreRoute?: boolean
  // frame 地址
  frameSrc?: string
  // 权限标识
  perms?: string
}

// 配置接口
export interface AppConfig {
  // 系统标题
  title?: string
  logo: string
  // 布局
  layout?: 'sider' | 'top' | 'mix'
  // 是否分割菜单
  splitMenus?: boolean
  // 侧边菜单收缩时的宽度
  collapsedWidth: number
  // 是否固定侧边栏
  fixSiderbar: boolean
  // 侧边栏宽度
  siderbarWidth?: number
  // 侧边栏主题
  siderbarTheme?: 'dark' | 'light'
  // 是否固定Header
  fixHeader?: boolean
  // Header 高度
  headerHeight?: number
  // Header 主题
  headerTheme?: 'dark' | 'light'
  // 内容区 宽度
  contentWidth?: 'Fluid' | 'Fixed'
  topLayoutHeaderLeftWidth?: number
  topLayoutHeaderRightWidth?: number
  // 页面缓存类型
  cacheType?: 'keepAlive' | 'cachePage'
  // 开启多标签
  enableMultiTab?: boolean
  // 固定多标签
  fixedMultiTab?: boolean
  // 全屏
  fullScreen?: boolean
  // 刷新页面
  enableReLoad?: boolean
  // 显示Title
  showTitle?: boolean
  // 显示Logo
  showLogo?: boolean
  // 顶栏
  showTopBar?: boolean
  // 侧边栏
  showSiderBar?: boolean
}

export interface RouterConfig {
  // 登录页
  loginPath: string
  // 首页
  homePath: string
  pageNotFound: string
  pageNotFoundName: string
  errorPage: string
  // 是否本地路由
  localRoutes: boolean
  // 是否开启NProgress
  openNProgress: boolean
  // 无需登录路由
  noLoginPath: string[]
}

export interface UserInfo {
  userId: string | number
  tenantId: string | number
  userName: string
  nickName: string
  avatar: string
  deptId: string | number
  deptPid: string | number
  deptPids: string
  deptName: string
  homePath: string
}

// 后台返回信息
export interface R<T> {
  code: number
  msg: string
  data: T
}

export interface TabState {
  // 已经打开的tab列表，RouteLocationNormalized是路由的接口
  tabList: TabInfo[]
  // 缓存页面
  cachePageList: CachePage[]
}

// tab信息
export interface TabInfo {
  // 路径
  path: string
  // 全路径
  fullPath?: string
  // 组件名称
  name?: string
  // 是否可以关闭
  enableClose: boolean
  // route 参数
  params?: RouteParams
  // route 查询阐述
  query?: LocationQuery
  // route meta 属性
  meta?: RouteMeta
}

// 缓存页面
export type CachePage = {
  fullPath: string
  data: unknown
}

// IFrame信息
export interface FrameInfo {
  // fullPath
  fullPath: string
  // iframe 的 src
  frameSrc: string
}
