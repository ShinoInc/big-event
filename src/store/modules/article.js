import { getArticleList } from '@/api'

export default {
  namespaced: true,
  state: {
    articleList: [],
    articleTotal: 0
  },
  mutations: {
    setArticleList (state, articleList) {
      state.articleList = articleList
    },
    removeArticleList (state) {
      state.articleList = []
    },
    setArticleTotal (state, articleTotal) {
      state.articleTotal = articleTotal
    },
    removeArticleTotal (state) {
      state.articleTotal = 0
    }
  },
  actions: {
    async getArticleList (context, data) {
      const articleList = await getArticleList(data)
      context.commit('setArticleList', articleList)
    },
    getArticleTotal (context, articleTotal) {
      context.commit('setArticleTotal', articleTotal)
    }
  }
}
