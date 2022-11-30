import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfoAPI } from '@/api'

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
    },
    async getUserInfo (context) {
      const userInfo = await getUserInfoAPI()
      context.commit('setUserInfo', userInfo)
    },
    logout (context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
      context.commit('removeUserMenus')
    }
  }
}
