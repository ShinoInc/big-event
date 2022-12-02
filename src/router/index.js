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
        component: () => import('@/views/cate')
      },
      {
        path: 'article',
        component: () => import('@/views/article')
      },
      {
        path: 'edit',
        component: () => import('@/views/edit')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
