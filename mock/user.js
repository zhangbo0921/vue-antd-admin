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
    url: '/mock/auth/getMenu',
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
  }
]
