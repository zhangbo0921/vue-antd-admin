export default [
  {
    url: '/api/auth/auth/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          access_token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjEsInJuU3RyIjoiNTNEaHlHMGNLSko2V2EzdUVST0RIaTdJcFVjVjE1TjgiLCJ0ZW5hbnRJZCI6MSwidXNlcklkIjoxLCJ1c2VyTmFtZSI6IuW8oOazoiIsIm5pY2tOYW1lIjoi6ZqP6aOO6ICM6YCdIiwiYXZhdGFyIjoiL3VzZXIvZGVmYXVsdC5wbmciLCJkZXB0SWQiOjEsImRlcHRQaWQiOjAsImRlcHRQaWRzIjoiMCIsImRlcHROYW1lIjoi5YyX5Lqs5oC76YOoIn0.wSJZ8yF9wasSqGlKyiWSrvInifl5ZJinFzO2XQ_F-lA',
          device: 'PC',
          expires_in: 1800
        },
        msg: '登录成功'
      }
    }
  },
  {
    url: '/api/system/auth/getRoutes',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: [
          {
            component: 'ProLayout',
            key: 1,
            meta: {
              activePath: '',
              frameSrc: '',
              hideChildren: false,
              hideMenu: false,
              icon: 'dashboard-outlined',
              ignoreRoute: false,
              realPath: '',
              title: '仪表盘'
            },
            name: 'dashboard',
            path: '/dashboard',
            pid: 0,
            redirect: '',
            children: [
              {
                component: '/welcome/Dashboard',
                key: 2,
                meta: {
                  activePath: '',
                  frameSrc: '',
                  hideChildren: false,
                  hideMenu: false,
                  icon: 'container-outlined',
                  ignoreRoute: false,
                  realPath: '',
                  title: '分析页'
                },
                name: 'analysis',
                path: '/dashboard/analysis',
                pid: 1,
                redirect: ''
              },
              {
                component: '/welcome/Settings',
                key: 3,
                meta: {
                  activePath: '',
                  frameSrc: '',
                  hideChildren: false,
                  hideMenu: false,
                  icon: 'setting-outlined',
                  ignoreRoute: false,
                  realPath: '',
                  title: '系统设置'
                },
                name: 'settings',
                path: '/dashboard/settings',
                pid: 1,
                redirect: ''
              },
              {
                component: 'FrameView',
                key: 4,
                meta: {
                  activePath: '',
                  frameSrc: 'https://www.taobao.com',
                  hideChildren: false,
                  hideMenu: false,
                  icon: 'taobao-circle-outlined',
                  ignoreRoute: false,
                  realPath: '',
                  title: '淘宝'
                },
                name: 'taobao',
                path: '/dashboard/taobao',
                pid: 1,
                redirect: ''
              }
            ]
          },
          {
            component: 'ProLayout',
            key: 11,
            meta: {
              activePath: '',
              frameSrc: '',
              hideChildren: false,
              hideMenu: false,
              icon: 'dashboard-outlined',
              ignoreRoute: false,
              realPath: '',
              title: '系统管理'
            },
            name: 'system',
            path: '/system',
            pid: 0,
            redirect: '',
            children: [
              {
                component: '/system/user/UserListView',
                key: 12,
                meta: {
                  activePath: '',
                  frameSrc: '',
                  hideChildren: false,
                  hideMenu: false,
                  icon: 'container-outlined',
                  ignoreRoute: false,
                  realPath: '',
                  title: '用户管理'
                },
                name: 'usermgr',
                path: '/system/user-list',
                pid: 1,
                redirect: ''
              }
            ]
          },
          {
            component: 'ProLayout',
            key: 21,
            meta: {
              activePath: '',
              frameSrc: '',
              hideChildren: true,
              hideMenu: false,
              icon: 'dashboard-outlined',
              ignoreRoute: false,
              realPath: '',
              title: '工单系统'
            },
            name: 'order',
            path: '/order',
            pid: 0,
            redirect: '',
            children: [
              {
                component: '/order/order/AddOrderView',
                key: 22,
                meta: {
                  activePath: '',
                  frameSrc: '',
                  hideChildren: false,
                  hideMenu: false,
                  icon: 'container-outlined',
                  ignoreRoute: false,
                  realPath: '',
                  title: '工单登记'
                },
                name: 'usermgr',
                path: '/order/save',
                pid: 1,
                redirect: ''
              }
            ]
          }
        ],
        msg: '操作成功'
      }
    }
  }
]
