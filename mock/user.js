export default [
  {
    url: '/mock/auth/auth/login',
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
    url: '/mock/system/auth/getRoutes',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: [
          {
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
              }
            ],
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
            redirect: ''
          }
        ],
        msg: '操作成功'
      }
    }
  }
]
