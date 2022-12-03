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
        path: 'cate',
        component: () => import('@/views/article/CateList')
      },
      {
        path: 'article',
        component: () => import('@/views/article/ArticleList')
      },
      {
        path: 'edit',
        component: () => import('@/views/article/ArticleEditor')
      },
      {
        path: 'userinfo',
        component: () => import('@/views/user/UserInfo')
      },
      {
        path: 'userpic',
        component: () => import('@/views/user/UserPic')
      },
      {
        path: 'userpwd',
        component: () => import('@/views/user/UserPwd')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
