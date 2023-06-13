import type { AppConfig, RouterConfig } from '@/types/types'

export const appSetting: AppConfig = {
  title: import.meta.env.VITE_APP_TITLE, // 标题
  logo: '/static/logo.png',
  layout: 'sider', // 布局，sider：侧边菜单布局 top: 顶部菜单布局 mix：混合布局
  headerHeight: 48, // header的高度，配合less/var.less 的 @layout-header-height 变量使用
  collapsedWidth: 48, // 侧边菜单收缩时的宽度，配合less/var.less 的 @menu-collapsed-width 变量使用
  siderbarWidth: 208, // 侧边菜单展开时的宽度
  siderbarTheme: 'dark', // 侧边菜单主题
  headerTheme: 'light', // header主题
  fixSiderbar: true, // 是否固定侧边菜单
  fixHeader: true, // 是否固定header，mix模式下，不能为false
  contentWidth: 'Fixed', // 内容区域宽度Fixed
  topLayoutHeaderLeftWidth: 192, // top布局下，header的左边宽度
  topLayoutHeaderRightWidth: 288, // top布局下，header的右边宽度
  cacheType: 'cachePage', // 缓存模式 cachePage：内存缓存  keepAlive：keepAlive 缓存
  enableMultiTab: true, // 是否开启多标签
  fixedMultiTab: true,
  fullScreen: false, // 是否全屏
  enableReLoad: true,
  showTitle: true,
  showLogo: true,
  showTopBar: true,
  showSiderBar: true
}

export const routerSetting: RouterConfig = {
  loginPath: '/auth/login', // 登录页
  homePath: '/dashboard/analysis', // 首页
  pageNotFound: '/404',
  pageNotFoundName: 'PageNotFoundName',
  errorPage: '/error',
  localRoutes: true, // 是否本地路由
  openNProgress: true, // 是否开启NProgress
  noLoginPath: [
    // 允许不登录的路由
    '/auth/login',
    '/auth/register'
  ]
}

export default {
  ...appSetting,
  ...routerSetting
}
