import { getMenus } from '@/api'

export default {
  namespaced: true,
  state: {
    menus: []
  },
  mutations: {
    setMenus (state, menus) {
      state.menus = [...menus]
    },
    removeMenus (state) {
      state.menus = []
    }
  },
  actions: {
    async getMenus (context) {
      const menus = await getMenus()
      context.commit('setMenus', menus)
    }
  }
}
