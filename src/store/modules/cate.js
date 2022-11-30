import { getCateList } from '@/api'

export default {
  namespaced: true,
  state: {
    cateList: []
  },
  mutations: {
    setCateList (state, cateList) {
      state.cateList = [...cateList]
    },
    removeCateList (state) {
      state.cateList = []
    }
  },
  actions: {
    async getCateList (context) {
      const cateList = await getCateList()
      context.commit('setCateList', cateList)
    }
  }
}
