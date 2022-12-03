import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code === 0) {
      if (
        ![
          '获取用户基本信息成功！',
          '获取文章分类列表成功！',
          '获取文章列表成功！'
        ].includes(message)
      ) {
        Message.success(message)
      }
      if (response.data.token) {
        return response.data.token
      } else if (response.data.data) {
        if (response.data.total) {
          store.dispatch('article/getArticleTotal', response.data.total)
        }
        return response.data.data
      } else {
        return response.data
      }
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
