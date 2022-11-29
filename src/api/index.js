// 以 /api 开头的请求路径，不需要访问权限

import service from '@/utils/service'

export const register = (data) => {
  return service({
    url: '/api/reg',
    method: 'post',
    data
  })
}

export const login = (data) => {
  return service({
    url: '/api/login',
    method: 'post',
    data
  })
}

export const getUserInfoAPI = () => {
  return service({
    url: '/my/userinfo'
  })
}

export const getMenusAPI = () => {
  return service({
    url: '/my/menus'
  })
}
