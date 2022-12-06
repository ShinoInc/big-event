import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'art-cate',
        component: () => import('@/views/article/CateList')
      },
      {
        path: 'art-list',
        component: () => import('@/views/article/ArticleList')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/UserInfo')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/UserPic')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/UserPwd')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
