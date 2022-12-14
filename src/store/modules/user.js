import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    removeToken (state) {
      state.token = null
      removeToken()
    },
    setUserInfo (state, userInfo) {
      state.userInfo = { ...userInfo }
    },
    removeUserInfo (state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login (context, data) {
      const token = await login(data)
      context.commit('setToken', token)
      context.dispatch('menus/getMenus', {}, { root: true })
    },
    async getUserInfo (context) {
      const userInfo = await getUserInfo()
      context.commit('setUserInfo', userInfo)
    },
    logout (context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
      context.commit('menus/removeMenus', {}, { root: true })
    }
  }
}
