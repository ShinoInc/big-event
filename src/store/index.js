import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cate from './modules/cate'
import article from './modules/article'
import menus from './modules/menus'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    cate,
    article,
    menus
  },
  getters
})
