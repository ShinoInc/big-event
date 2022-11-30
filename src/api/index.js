// 以 /api 开头的请求路径，不需要访问权限
// 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功

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

export const getCateList = () => {
  return service({
    url: '/my/cate/list'
  })
}

export const getArticleList = (params) => {
  return service({
    url: '/my/article/list',
    params
  })
}

export const getMenusAPI = () => {
  return service({
    url: '/my/menus'
  })
}
