import router from '@/router'
import store from '@/store'

const whiteList = ['/register', '/login']

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.nickname) {
        await store.dispatch('user/getUserInfo')
      }
      if (store.getters.menus.length === 0) {
        await store.dispatch('menus/getMenus')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
