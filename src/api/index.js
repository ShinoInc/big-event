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

export const getUserInfo = () => {
  return service({
    url: '/my/userinfo'
  })
}

export const getCateList = () => {
  return service({
    url: '/my/cate/list'
  })
}

export const addCate = (data) => {
  return service({
    url: '/my/cate/add',
    method: 'post',
    data
  })
}

export const infoCate = ({ id, method, data }) => {
  if (method === 'put') {
    return service({
      url: '/my/cate/info',
      method,
      data
    })
  }
  return service({
    url: '/my/cate/info',
    params: {
      id
    }
  })
}

export const delCate = (id) => {
  return service({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}

export const getArticleList = (params) => {
  return service({
    url: '/my/article/list',
    params
  })
}

export const addArticle = (data) => {
  return service({
    url: '/my/article/add',
    method: 'post',
    data
  })
}

export const infoArticle = ({ id, method, data }) => {
  if (method === 'put') {
    return service({
      url: '/my/article/info',
      method,
      data
    })
  }
  if (method === 'delete') {
    return service({
      url: '/my/article/info',
      method,
      params: {
        id
      }
    })
  }
  return service({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

export const getMenus = () => {
  return service({
    url: '/my/menus'
  })
}
