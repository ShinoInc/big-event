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
    async getArticleList (context, params) {
      const articleList = await getArticleList(params)
      articleList.forEach((value) => {
        value.pub_date = new Date(value.pub_date)
          .toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          .replace(/\//g, '-')
      })
      context.commit('setArticleList', articleList)
    },
    getArticleTotal (context, articleTotal) {
      context.commit('setArticleTotal', articleTotal)
    }
  }
}
