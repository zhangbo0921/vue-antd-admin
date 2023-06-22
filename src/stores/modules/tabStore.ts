import type { CachePage, FrameInfo, TabInfo, TabState } from '@/types/types'
import { defineStore } from 'pinia'
import { useAppStore } from '..'
import { setDocumentTitle } from '@/utils/domUtils'
import { router } from '@/router'
import type { Router } from 'vue-router'
import { useGo } from '@/hooks/useGo'
import { RedirectName } from '@/types/constants'
import { unref } from 'vue'

export const tabStore = defineStore('tabStore', {
  state: (): TabState => {
    return {
      // 已经打开的tab列表，RouteLocationNormalized是路由的接口
      tabList: new Array<TabInfo>(),
      // 缓存页面
      cachePageList: new Array<CachePage>()
    }
  },
  actions: {
    // 添加tab标签
    addTabAction(tabinfo: TabInfo) {
      const appStore = useAppStore()
      const { path, fullPath } = tabinfo

      // 当前路由是否已经打开过
      const tabHasExits = this.tabList.some((tab) => {
        return tab.fullPath === fullPath
      })

      // 没有打开过,直接打开
      if (!tabHasExits) {
        // 不添加tab的页面，直接跳过
        if (path === appStore.errorPage || path === appStore.pageNotFound) {
          return
        }
        // 如果title 没有赋值，则给meta.title的值
        if (!tabinfo.meta.title) {
          tabinfo.meta.title = tabinfo.query.title
            ? tabinfo.query.title
            : (tabinfo.meta?.title as string)
        }
        // 如果fullpath 没有赋值，则给path的值
        if (!fullPath) {
          tabinfo.fullPath = path
        }
        // 如果是主页，不允许关闭
        if (tabinfo.path === appStore.homePath) {
          tabinfo.enableClose = false
        }
        this.tabList.push(tabinfo)
      }
      setDocumentTitle(
        tabinfo.query.title ? tabinfo.query.title : tabinfo.meta.title + '-' + appStore.title
      )
    },
    // 关闭tab标签
    closeTab(fullPath: string, router: Router) {
      // tabList长度==1 不能删除
      if (this.tabList.length === 1) {
        return
      }
      // 查找要关闭的tab的索引
      const tabIndex = this.tabList.findIndex((tab) => tab.fullPath === fullPath)
      // 没找到，直接跳过，找到了进入
      if (tabIndex !== -1) {
        //删除cachePage缓存
        this.removeCachedPage(fullPath)
        // 删除要删除的tab
        this.tabList.splice(tabIndex, 1)
        // 如果打开的tab总数大于0 并且 关闭的是当前路由页面，需要判断下一个打开的路由是
        if (this.tabList.length > 0 && router.currentRoute.value.fullPath === fullPath) {
          // 因为上面已经删除了数据，所以：
          // tabIndex 现在是要关闭的tab右侧的
          // tabIndex - 1 是要关闭的tab左侧的
          // 如果左侧有tab，就打开左侧的，如果没有就打开右侧的

          // 因为上面有关闭保护，也就是tabList.length 必须大于1，才能关闭.
          // 所以tabIndex 和 tabIndex - 1 肯定有一个有值
          if (this.tabList[tabIndex - 1]) {
            router.push(this.tabList[tabIndex - 1].fullPath as string)
          } else {
            router.push(this.tabList[tabIndex].fullPath as string)
          }
        }
      }
    },
    // 关闭当前路由
    closeCurrentTab(router: Router) {
      this.closeTab(router.currentRoute.value.fullPath, router)
    },
    // 关闭左侧路由
    closeLeftTab(tabinfo: TabInfo) {
      const tabIndex = this.tabList.findIndex((tab) => {
        if (tab.fullPath === tabinfo.fullPath) return true
      })
      let bulk = []
      if (tabIndex !== -1) {
        const closeTabList = this.tabList.slice(0, tabIndex)
        bulk = closeTabList.filter((tab) => tab.enableClose).map((tab) => tab.fullPath)
        this.bulkCloseTab(bulk as string[])
        // 路由跳转判断
        if (bulk.includes(router.currentRoute.value.fullPath)) {
          const { go } = useGo(router)
          go(tabinfo)
        }
      }
    },
    closeRightTab(tabinfo: TabInfo) {
      const tabIndex = this.tabList.findIndex((tab) => {
        if (tab.fullPath === tabinfo.fullPath) return true
      })
      let bulk = []
      if (tabIndex !== -1) {
        const closeTabList = this.tabList.slice(tabIndex + 1, this.tabList.length)
        bulk = closeTabList.filter((tab) => tab.enableClose).map((tab) => tab.fullPath)
        this.bulkCloseTab(bulk as string[])
        // 路由跳转判断
        if (bulk.includes(router.currentRoute.value.fullPath)) {
          const { go } = useGo(router)
          go(tabinfo)
        }
      }
    },
    closeOtherTab(tabinfo: TabInfo) {
      const tabIndex = this.tabList.findIndex((tab) => {
        if (tab.fullPath === tabinfo.fullPath) return true
      })
      let bulk = []
      if (tabIndex !== -1) {
        const closeTabList = this.tabList.filter((tab) => tab.fullPath !== tabinfo.fullPath)
        bulk = closeTabList.filter((tab) => tab.enableClose).map((tab) => tab.fullPath)
        this.bulkCloseTab(bulk as string[])
        // 路由跳转判断
        if (bulk.includes(router.currentRoute.value.fullPath)) {
          const { go } = useGo(router)
          go(tabinfo)
        }
      }
    },
    // 批量删除tab
    bulkCloseTab(bulk: string[]) {
      if (bulk && bulk.length) {
        this.tabList = this.tabList.filter(
          (tab) => !(bulk.includes(tab.fullPath as string) || bulk.includes(tab.path as string))
        )
        this.bulkRemoveCachedData(bulk as string[])
      }
    },
    // 更新tab信息
    updateTabinfo(tabInfo: TabInfo) {
      const appStore = useAppStore()
      // 查询tabInfo的位置
      const findIndex = this.tabList.findIndex((item) => item.path === tabInfo.path)
      if (findIndex) {
        // 更新title
        this.tabList[findIndex].meta.title = tabInfo.meta.title
        // 更新是否可以关闭
        this.tabList[findIndex].enableClose = tabInfo.enableClose
        // 更新浏览器标题
        setDocumentTitle(
          this.tabList[findIndex].query.title
            ? this.tabList[findIndex].query.title
            : this.tabList[findIndex].meta.title + '-' + appStore.title
        )
      }
    },

    refreshPage(tabInfo: TabInfo) {
      const { replace } = router
      const { name, params, query, path = '', fullPath = '' } = unref(tabInfo)

      if (name === RedirectName) {
        return
      }
      this.removeCachedPage(fullPath)
      params['path'] = path
      replace({ name: RedirectName, params, query })
    },
    // 获取需要IFrame显示的tab信息，直接让使用Frame渲染
    getFrameTabsAction(): FrameInfo[] {
      const tabList = this.tabList
        .filter((item: TabInfo) => {
          // item.meta.frameSrc有值，就是需要在IFrame里显示的菜单
          if (item.meta && item.meta.frameSrc) {
            return true
          }
          return false
        })
        ?.map((item: TabInfo): FrameInfo => {
          return {
            fullPath: item.fullPath as string,
            frameSrc: item.meta?.frameSrc as string
          }
        })
      return tabList
    },
    // 获取缓存页面信息
    getCachedData(fullPath: string) {
      return this.cachePageList.find((item) => item.fullPath === fullPath)?.data
    },
    // 添加缓存页面
    addCachedData(page: CachePage) {
      const index = this.cachePageList.findIndex((item) => item.fullPath === page.fullPath)
      if (index > -1) {
        this.cachePageList.splice(index, 1, page)
      } else {
        this.cachePageList.push(page)
      }
    },
    // 批量删除缓存页面
    bulkRemoveCachedData(fullPaths: string[]) {
      this.cachePageList = this.cachePageList.filter((cache) => !fullPaths.includes(cache.fullPath))
    },
    // 删除缓存
    removeCachedPage(fullPath: string) {
      const index = this.cachePageList.findIndex((item) => item.fullPath === fullPath)
      // 找到页面，删除缓存
      if (index > -1) {
        this.cachePageList.splice(index, 1)
      }
    },
    clear() {
      this.$reset()
    }
  }
})
